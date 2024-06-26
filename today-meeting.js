const rootRefTodayMeeting = firebase.database().ref().child('MeetingHistory').limitToFirst(5);


//Display Users On Users Profile

rootRefTodayMeeting.on('child_added', snap => {

    var id = snap.child('id').val();
    var meeting_id = snap.child('meeting_id').val();
    var startTime = snap.child('startTime').val();



    $('#meeting_today').append('<tr><th scope="row">' + id + '</th><td>' + meeting_id + '</td><td>' + startTime + '</td><td>11:20PM</td><td><button class="btn btn-custom rejMeeting" data-meeting=' + meeting_id + '> Rejoin</button> <button class="btn btn-danger" > <i class="fa fa-trash"></i></button></td></tr></tr>');


});