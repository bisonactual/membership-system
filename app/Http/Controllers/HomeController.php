<?php

namespace BB\Http\Controllers;

use BB\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        $user = \Auth::user();

        if ($user instanceof User) {
            return \Redirect::route('account.show', [$user->id]);
        }

        return \Inertia\Inertia::render('Home/Index');
    }
}
