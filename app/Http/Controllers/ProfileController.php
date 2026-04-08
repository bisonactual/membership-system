<?php namespace BB\Http\Controllers;

use BB\Models\User;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{

    /**
     * @var \BB\Repo\ProfileDataRepository
     */
    private $profileRepo;
    /**
     * @var \BB\Validators\ProfileValidator
     */
    private $profileValidator;
    /**
     * @var \BB\Repo\ProfileSkillsRepository
     */
    private $profileSkillsRepository;
    /**
     * @var \BB\Services\UserImage
     */
    private $userImage;

    function __construct(
        \BB\Repo\ProfileDataRepository $profileRepo,
        \BB\Validators\ProfileValidator $profileValidator,
        \BB\Repo\ProfileSkillsRepository $profileSkillsRepository,
        \BB\Services\UserImage $userImage)
    {
        $this->profileRepo = $profileRepo;
        $this->profileValidator = $profileValidator;
        $this->profileSkillsRepository = $profileSkillsRepository;
        $this->userImage = $userImage;
    }

    public function edit($userId)
    {
        //Verify the user can access this user record
        $user = User::findWithPermission($userId);

        $profileData = $this->profileRepo->getUserProfile($userId);
        $skills = $this->profileSkillsRepository->getSelectArray();
        return \Inertia\Inertia::render('Account/ProfileEdit', [
            'profileData' => $profileData,
            'userId' => $userId,
            'skills' => $skills,
            'user' => $user,
        ]);
    }

    public function update($userId)
    {
        //Verify the user can access this user record - we don't need the record just the auth check
        $user = User::findWithPermission($userId);

        $input = \Request::all();
        //Clear the profile photo field as this is handled separately below.
        unset($input['new_profile_photo']);

        if (empty($input['profile_photo_private'])) {
            $input['profile_photo_private'] = false;
        }

        //Trim all the data so some of the validation doesn't choke on spaces
        foreach ($input as $key => $value) {
            if (is_string($value)) {
                $input[$key] = trim($value);
            }
        }

        $this->profileValidator->validate($input, $userId);

        $this->profileRepo->update($userId, $input);

        if (\Request::file('new_profile_photo')) {
            try {
                $this->userImage->uploadPhoto($user->hash, \Request::file('new_profile_photo')->getRealPath(), true);

                $this->profileRepo->update($userId, ['new_profile_photo'=>1]);

                \FlashNotification::success("Photo uploaded, it will be checked and appear shortly");
            } catch (\Exception $e) {
                Log::error($e);
            }
        } else {
            \FlashNotification::success("Profile Updated");
        }

        return \Redirect::route('members.show', $userId);
    }

} 