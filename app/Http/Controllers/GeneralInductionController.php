<?php

namespace BB\Http\Controllers;

use BB\Models\KeyFob;
use BB\Repo\UserRepository;
use Illuminate\Http\Request;
use BB\Models\Settings;
use BB\Rules\GeneralInductionCodeRule;
use BB\Rules\KeyFobRule;
use Illuminate\Validation\Rules\Unique;

class GeneralInductionController extends Controller
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Show the peer induction page
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $user = \Auth::user();
        $induction_code = Settings::get("general_induction_code");
        $prefill_code = $request->has('code') ? $request->input('code') : '';

        return \Inertia\Inertia::render('Inductions/Show', [
            'user' => $user,
            'general_induction_code' => $induction_code,
            'prefill_induction_code' => $prefill_code,
        ]);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'induction_code' => ['required', new GeneralInductionCodeRule],
            'key_id' => [
                'nullable',
                new KeyFobRule,
                new Unique((new KeyFob)->getTable(), 'key_id'),
            ],
        ]);

        $this->userRepository->recordInductionCompleted(\Auth::id());

        if ($request->has('key_id')) {
            KeyFob::create([
                'user_id' => \Auth::id(),
                'key_id' => $request->get('key_id')
            ]);
        }

        \FlashNotification::success('General Induction complete!');
        return redirect()->route('account.show', \Auth::id());
    }
}
