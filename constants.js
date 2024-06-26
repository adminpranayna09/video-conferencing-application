const meeting_BASEURL = 'https://meet.jit.si/'


function getDateTime() {
    var dataTime = null;
    var date = new Date();
    var dateDay = date.getDate() + "";
    dateDay = dateDay.length == 1 ? "0" + dateDay : dateDay;
    var month = (date.getMonth() + 1) + "";
    month = month.length == 1 ? "0" + month : month;
    var year = date.getFullYear();

    var hour = date.getHours() + "";
    hour = hour.length == 1 ? "0" + hour : hour;
    var minutes = date.getMinutes() + "";
    minutes = minutes.length == 1 ? "0" + minutes : minutes;
    var second = date.getSeconds();

    return dateDay + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + second;
}

function getDate() {
    var dataTime = null;
    var date = new Date();
    var dateDay = date.getDate() + "";
    dateDay = dateDay.length == 1 ? "0" + dateDay : dateDay;
    var month = (date.getMonth() + 1) + "";
    month = month.length == 1 ? "0" + month : month;
    var year = date.getFullYear();
    return dateDay + "-" + month + "-" + year;
}


function updatePrifileImage(useridis) {

    var newPostKey = firebase.database().ref("/Users/").child(useridis);
    newPostKey.update({ 'profile_pic': "mynameisusama" })
}