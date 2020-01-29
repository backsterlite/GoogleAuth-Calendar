<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $gCalendar = new gCalendarController();
        $result = $gCalendar->index();
        if($result)
        {
            return $result;
        }else
        {
             return redirect()->route('oauthCallback');
        }
    }

    public function show()
    {
        return view('events.index');
    }
}
