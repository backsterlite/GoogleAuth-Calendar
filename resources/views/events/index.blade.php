@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-2">
                <h3>Full Calendar</h3>
                <button class="btn btn-info" id="home">HOME</button>
                <div id="dialog">
                    <form>
                        <div class="form-group">
                            <label for="title">Event Name</label>
                            <input type="text" class="form-control" id="title" placeholder="event name">

                        </div>
                        <div class="form-group">
                            <label for="start">Start Event</label>
                            <input type="text" autocomplete="off" class="form-control" id="start">
                        </div>
                        <div class="form-group">
                            <label for="end">End Event</label>
                            <input type="text" autocomplete="off" class="form-control" id="end">
                        </div>
                        <button id="create" class="btn btn-success">Create</button>
                        <button id="update" class="btn btn-warning">Update</button>
                        <button id="delete" class="btn btn-danger">Delete</button>
                        <button id="back" class="btn btn-default">Back</button>
                    </form>
                </div>
                <div id="fullcall">

                </div>

            </div>
        </div>

    </div>
@stop