<?php namespace BB\Http\Controllers;

use BB\Models\User;
use Inertia\Inertia;

class MembersController extends Controller
{
    
    private $profileRepo;
    private $profileSkillsRepository;
    private $userRepository;

    function __construct(\BB\Repo\ProfileDataRepository $profileRepo, \BB\Repo\ProfileSkillsRepository $profileSkillsRepository, \BB\Repo\UserRepository $userRepository)
    {
        $this->profileRepo = $profileRepo;
        $this->profileSkillsRepository = $profileSkillsRepository;
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $users = $this->userRepository->getActivePublicList();
        return Inertia::render('Members/Index', ['users' => $users]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        if (\Auth::guest() && $user->profile_private) {
            return abort(404);
        }

        if (!\Auth::user()->isAdmin() && !$user->active) {
            \FlashNotification::error("This user's profile is no longer available as they are not an active member.");
            return \Redirect::route('members.index');
        }

        $profileData = $this->profileRepo->getUserProfile($id);
        $userSkills = array_intersect_ukey($this->profileSkillsRepository->getAll(), array_flip($profileData->skills), [$this, 'key_compare_func']);
        
        return Inertia::render('Members/Show', [
            'user' => $user,
            'profileData' => $profileData,
            'userSkills' => $userSkills,
            'can' => [
                'edit' => !\Auth::guest() && $user->id == \Auth::user()->id,
                'viewAccount' => !\Auth::guest() && ($user->id == \Auth::user()->id || \Auth::user()->hasRole('admin')),
            ],
        ]);
    }

    private function key_compare_func($key1, $key2)
    {
        if ($key1 == $key2) {
            return 0;
        } else if ($key1 > $key2) {
            return 1;
        } else {
            return -1;
        }
    }

}
