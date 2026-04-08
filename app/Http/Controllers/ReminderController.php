<?php namespace BB\Http\Controllers;

use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ReminderController extends Controller
{

	public function create()
	{
        return Inertia::render('Auth/PasswordForgotten');
	}

    /**
     * Handle a POST request to remind a user of their password.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|null
     */
	public function store(Request $request)
	{
        $this->validate($request, ['email' => 'required|email']);

        $response = Password::sendResetLink($request->only('email'), function(Message $message)
        {
            $message->subject('Reset your password');
        });

        \FlashNotification::success(trans($response));
        return redirect()->back();
	}

	/**
	 * Display the password reset view for the given token.
	 *
	 * @param  string  $token
	 * @return Response
	 */
    public function getReset(Request $request, $token = null)
    {
        if (is_null($token))
        {
            throw new NotFoundHttpException;
        }
     
        $email = $request->input('email');
        
        return Inertia::render('Auth/PasswordReset', compact('token', 'email'));
	}

    /**
     * Handle a POST request to reset a user's password.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|null
     */
	public function postReset(Request $request)
	{
        $this->validate($request, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:12',
        ]);

        $credentials = $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );

        //We aren't using a confirm password box so this can be faked
        $credentials['password_confirmation'] = $credentials['password'];

        $response = Password::reset($credentials, function($user, $password) {
            $user->password = $password;

            $user->save();
        });

        switch ($response) {
            case Password::PASSWORD_RESET:
                \FlashNotification::success("Your password has been changed");
                return redirect()->home();

            default:
                \FlashNotification::error(trans($response));
                return redirect()->back()->withInput();
        }
    }

}
