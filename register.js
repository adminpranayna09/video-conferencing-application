function register() {

    var userName = document.getElementById("name_field").value;

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;





    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);




    }).then((value) => {

        // window.alert("done : " + value);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // window.alert("done : " + user.uid);
                user.updateProfile({
                    displayName: userName,
                    photoURL: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png"
                }).then(function() {
                    var useruid = user.uid
                    var addUserRef = firebase.database().ref('Users').child(useruid);



                    addUserRef.set({
                        id: useruid,
                        email: userEmail,
                        name: userName,
                        profile_pic: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png"
                    })


                    window.alert("User Created: " + userName);

                    window.location.href = "index.html";

                }).catch(function(error) {
                    // An error happened.
                });
            } else {
                // User is signed out.
                // ...
            }
        });

    });






}