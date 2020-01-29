<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});
//Auth::routes();


//

//
Route::group(['middleware' => 'auth'], function () {

    Route::get('/', function () {
        return view('home');
    });

    Route::resource('notebooks', 'NotebooksController');
    Route::resource('notes', 'NotesController');

    Route::get('notes/{notebookId}/createNote', 'NotesController@createNote')->name('notes.createNote');

});

Route::get('events', 'EventController@show');
Route::get('event/get', 'EventController@index');

Route::get('gcalendar/store', 'gCalendarController@store');
Route::get('gcalendar/update', 'gCalendarController@update');
Route::get('gcalendar/destroy', 'gCalendarController@destroy');
Route::get('oauth', ['as' => 'oauthCallback', 'uses' => 'gCalendarController@oauth']);

Auth::routes();

Route::get('/auth/{provider}', 'Auth\LoginController@redirectToProvider');
Route::get('/auth/{provider}/callback', 'Auth\LoginController@handleProviderCallback');
Route::get('/home', 'HomeController@index')->name('home');