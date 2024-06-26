var myUserDatauid = '';


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('User Logged in')
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;
        myUserDatauid = user
            //window.location.href = 'main.html';

        if (user != null) {

            window.location.href = "/main.html";
        }

    } else {
        // No user is signed in.

        //window.location.href = '/login.html'

    }
    
});










// function checkUserLogin(){
//   var user = firebase.auth().currentUser;

// };
function checkUserNotLogin(user) {
    if (user == null) {
        window.location.href = 'index.html'
    } else {
        window.location.href = 'main.html'
    }
};

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });
}


function logout() {
    firebase.auth().signOut();
    window.location.href = 'index.html';
}