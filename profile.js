//User Data

var myUserDatauid = ''
firebase.auth().onAuthStateChanged(user => {
    if (user) {

        const rootRefUserData = firebase.database().ref().child('Users').child(user.uid);

        //Display Users On Users Profile

        myUserDatauid = user;
        return rootRefUserData.once('value').then(function(snap) {

            var name = snap.val().name;
            var profile_pic = snap.val().profile_pic;
            var email = snap.val().email;

            $('#Admin_profile').append('<img id="blah" src="' + profile_pic + '" alt=""><h5>' + name + '</h5><p>' + email + '</p>')





        });

    };

});

function logout() {
    firebase.auth().signOut();
    window.location.href = 'index.html';
}

$('#submit').click(function() {
    if ($('#user_name').val() == '') {
        alert('Input can not be left blank');
    } else {
        var newName = document.getElementById("user_name").value
            // alert(myUserDatauid.uid)

        var userRef = firebase.database().ref().child('Users').child(myUserDatauid.uid);

        userRef.update({
            'name': newName
        }).then((value) => {

            // user.updateProfile({
            //     displayName: newName,

            // })

            alert("Name Updated ")
            window.location.reload()



        })
    }
});