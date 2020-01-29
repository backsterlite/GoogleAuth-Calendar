$(document).ready(function () {
    let id;
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: 'drop',
            duration: 500
        },
        hide: {
            effect: 'clip',
            duration: 500
        }
    });
    let calendarEl = document.getElementById('fullcall');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'luxon','dayGrid', 'timeGrid', 'interaction', 'moment'],
        events: 'event/get',
        eventSourceFailure: function(errorObj){
            console.log(errorObj);
            console.log('errorObj');
            window.location.replace( "http://googleloginapi.com/oauth");
        },
        dateClick: function(date){
            $("#dialog").dialog('open');
            $("#create").show();
            $("#update, #delete").hide();
            $("#start").datepicker({
                dateFormat: "yy-mm-dd"
            }).val(date.dateStr);
            $("#end").datepicker({
                dateFormat: "yy-mm-dd"
            });
        },

        eventClick: function(el, event, jsEvent, view ){
            id = el.event.id;
            $("#dialog").dialog('open');
            $("#update, #delete").show();
            $("#create").hide();
            $("#title").val(el.event.title);
            $("#start").datepicker({
                dateFormat: "yy-mm-dd"
            }).val(calendar.formatDate(el.event.start, {year:'numeric', month: '2-digit', day: '2-digit' }));
            $("#end").datepicker({
                dateFormat: "yy-mm-dd"
            }).val(calendar.formatDate(el.event.end, {year:'numeric', month: '2-digit', day: '2-digit' }));
         }

    });

    calendar.render();
    $("#home").on('click', function (event) {
        event.preventDefault();
        window.location.replace( "http://googleloginapi.com/");
    });

    $("#create").on('click', function (event) {
        event.preventDefault();
        let title       = $("#title").val(),
            description =  $("#description").val(),
            start       = $("#start").val(),
            end         = $("#end").val();
        $.ajax({
            url: 'gcalendar/store',
            type: 'GET',

            data: {
                title      : title,
                description: description,
                start      : calendar.formatIso(start),
                end        : calendar.formatIso(end)
            },
            headers: {

                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')

            },
            beforeSend: function () {
                $("#start").attr("disabled", true);
            }
        })
            .done(function (data) {
                console.log(data);
                $("#title").val("");
                $("#description").val("");
                $("#start").val("").attr("disabled", false);
                $("#end").val("");
                $("#dialog").dialog('close');
                calendar.refetchEvents();


            })
            .fail(function () {
                console.log("data");
                $("#title").val("");
                $("#description").val("");
                $("#start").val("").attr("disabled", false);
                $("#end").val("");
                $("#dialog").dialog('close');
                window.location.replace( "http://googleloginapi.com/oauth");

            });
    });

    $("#back").on('click', function (event) {
        event.preventDefault();
        $("#title").val("");
        $("#description").val("");
        $("#start").val("");
        $("#end").val("");
        $("#dialog").dialog('close');
    });

    $("#update").on('click', function (event) {
        event.preventDefault();
       let title       = $("#title").val(),
           description =  $("#description").val(),
           start       = $("#start").val(),
           end         = $("#end").val();
        $.ajax({
            url: 'gcalendar/update?id='+id,
            type: 'GET',

            data: {
                title      : title,
                description: description,
                start      : start,
                end        : end
            },
            headers: {

                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')

            },
            beforeSend: function () {
                $("#update").attr("disabled", true);
                $("#delete").attr("disabled", true);
            }
        })
            .done(function (data) {
                console.log(data);
                $("#title").val("");
                $("#description").val("");
                $("#start").val("");
                $("#end").val("");
                $("#dialog").dialog('close');
                $("#update").val("").attr("disabled", false);
                $("#delete").val("").attr("disabled", false);
                calendar.refetchEvents();

            })
            .fail(function () {
                console.log("data");
                $("#title").val("");
                $("#description").val("");
                $("#update").val("").attr("disabled", false);
                $("#delete").val("").attr("disabled", false);
                $("#end").val("");
                $("#dialog").dialog('close');
                window.location.replace( "http://googleloginapi.com/oauth");
            });
    });

    $("#delete").on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: 'gcalendar/destroy?id='+id,
            type: 'GET',
            headers: {

                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')

            },
            beforeSend: function () {
                $("#update").attr("disabled", true);
                $("#delete").attr("disabled", true);
            }
        })
            .done(function (data) {
                console.log(data);
                $("#title").val("");
                $("#description").val("");
                $("#start").val("");
                $("#end").val("");
                $("#dialog").dialog('close');
                $("#update").val("").attr("disabled", false);
                $("#delete").val("").attr("disabled", false);
                calendar.refetchEvents();

            })
            .fail(function () {
                console.log("data");
                $("#title").val("");
                $("#description").val("");
                $("#update").val("").attr("disabled", false);
                $("#delete").val("").attr("disabled", false);
                $("#end").val("");
                $("#dialog").dialog('close');
                window.location.replace( "http://googleloginapi.com/oauth");
            });
    });

});
