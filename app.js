var myUserData = '';


//User Data
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const rootRefUserData = firebase.database().ref().child('Users').child(user.uid);
        myUserData = user.uid;

        //Display Users On Users Profile


        return rootRefUserData.once('value').then(function(snap) {

            var name = snap.val().name;
            var profile_pic = snap.val().profile_pic;

            $('#user_data').append(' <img src="' + profile_pic + '" style="background-color: transparent; border-radius: 50%;"  alt=""><span id="mynameis">Hi, ' + name + '</span>')



            // ...
        });
    }
})


const rootRefTodayMeeting = firebase.database().ref().child('MeetingHistory');


//Display Users On Users Profile
var count = 0;
rootRefTodayMeeting.on('child_added', snap => {
    var uid = snap.child('userId').val();

    if (count < 5) {
        if (myUserData == uid) {

            var id = snap.child('id').val();
            var meeting_id = snap.child('meeting_id').val();
            var startTime = snap.child('endTime').val();
            count++;


            $('#meeting_today').append('<tr><th scope="row">' + id + '</th><td>' + meeting_id + '</td><td>' + startTime + '</td><td><button class="btn btn-custom rejMeeting" data-meeting=' + meeting_id + '> Rejoin</button> </td></tr></tr>');
        }
    }
});



function logout() {
    firebase.auth().signOut();
    window.location.href = 'index.html';
}

function writeUserData(endtime, meetinid, starttime) {


    var addMeetingRef = firebase.database().ref('MeetingHistory').push();

    var key = addMeetingRef.key

    addMeetingRef.set({
        endTime: endtime,
        meeting_id: meetinid,
        id: key,
        userId: myUserData,
        startTime: starttime
    })

}