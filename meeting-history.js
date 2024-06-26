var myUserData = '';


//User Data
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const rootRefUserData = firebase.database().ref().child('Users').child(user.uid);
        myUserData = user.uid;

        //Display Users On Users Profile


    }
})


const rootRefTodayMeeting = firebase.database().ref().child('MeetingHistory');


//Display Users On Users Profile

rootRefTodayMeeting.on('child_added', snap => {
    var uid = snap.child('userId').val();

    if (myUserData == uid) {



        var id = snap.child('id').val();
        var meeting_id = snap.child('meeting_id').val();
        var startTime = snap.child('startTime').val();
        console.log(startTime + " count")
        var endTime = snap.child('endTime').val();



        $('#Meeting_History').append('<tr><th scope="row">' + id + '</th><td>' + meeting_id + '</td><td>' + startTime + '</td><td>' + endTime + '</td><td><button class="btn btn-danger"    onclick=\'delete_click("' + id + "\");'>Remove </button></td>'");

    }

});

function logout() {
    firebase.auth().signOut();
    window.location.href = 'index.html';
}

function delete_click(d) {
    firebase.database().ref("/MeetingHistory/").child(d).remove()
    alert("Meeting  Deleted")
    window.location.reload()

}