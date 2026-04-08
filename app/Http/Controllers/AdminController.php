<?php namespace BB\Http\Controllers;

class AdminController extends Controller
{

    public function index()
    {
        return \Inertia\Inertia::render('Admin/Index');
    }


}
