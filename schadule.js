var myUserData = '';







//User Data
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const rootRefUserData = firebase.database().ref().child('Users').child(user.uid);
        myUserData = user.uid;

        //Display Users On Users Profile



    }
})


const rootRefTodayMeeting = firebase.database().ref().child('Schedule');


//Display Users On Users Profile

rootRefTodayMeeting.on('child_added', snap => {
    var uid = snap.child('userId').val();

    if (myUserData == uid) {



        var id = snap.child('id').val();
        var meeting_id = snap.child('meeetingId').val();
        var startTime = snap.child('startTime').val();
        var title = snap.child('title').val();
        var date = snap.child('date').val();
        var duration = snap.child('duration').val();




        $('#schadule_today').append(` <tr><th scope="row">${id}</th><td>${meeting_id}</td><td>${title}</td><td>${date}</td><td>${startTime}</td> <td><button class="btn btn-danger"    onclick='joinmeet("${meeting_id}");'>Start </button> <button class='btn btn-sm btn-outline-info btn-rounded btn-fw'   onclick=delete_click("${id}")>Delete </button></td></tr></tr>')`);

    }

});



function joinmeet(meetcode) {


    var a = 5;
    var b = 10;
    console.log(`Sum is equal: ${a + b}`);


    //alert(meetcode)
    var meetUrl = "https://meet.jit.si/" + meetcode;
    //alert(meetUrl)
    if (meetUrl != null) {
        newwindow = window.open(meetUrl, "igenmeet", 'height=' + $(document).height() + ',width=' + $(document).width());
        if (window.focus) {
            newwindow.focus()
        }
    }

    //window.alert(id)
}


$('#addSchadule').click(function() {





    var mytitle = $("#schaduleTitle").val();
    var mydate = $("#datepicker").val();
    var mystarttime = $("#startTime").val();

    var myreqcode = "123456";
    var useridis = ""
    if (myUserData != null) {
        useridis = myUserData
    }

    var myUserid = useridis;

    var mydure = $("#schaduleDuration").val();
    mydate = mydate.replace("/", '-');
    mydate = mydate.replace("/", '-');


    var addscheRef = firebase.database().ref('Schedule').push();

    var key = addscheRef.key

    addscheRef.set({
        date: mydate,
        duration: mydure,
        id: key,
        meeetingId: genMeetingCode(),
        startTime: mystarttime,
        title: mytitle,
        userId: myUserid,
        reminderIdandrequestcode: myreqcode
    }).then(function() {

        window.alert("Schedule Added")

        window.location.reload()

    })


})

function logout() {
    firebase.auth().signOut();
    window.location.href = 'index.html';
}

function delete_click(d) {

    if (d) {
        firebase.database().ref("/Schedule/").child(d).remove()
        alert("Schadule  Deleted " + d)
        window.location.reload()
    } else {

        alert("Schadule  Deleted Error ")
    }
}


function stringGen(len) {
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function genMeetingCode() {
    return "vidxa-" + stringGen(3) + stringGen(3) + stringGen(2);
}

$(document).on("click", ".copy-code", function() {
    copyer("meet-code");
});