<?php namespace BB\Http\Controllers;

class GiftController extends Controller
{


    public function index()
    {
        return \Inertia\Inertia::render('Gift/Index');
    }



}
