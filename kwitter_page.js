const firebaseConfig = {
    apiKey: "AIzaSyBVw6jEsCZ4eVUOVjchC2U5f1hFbp8lClo",
    authDomain: "kwitter-dade6.firebaseapp.com",
    databaseURL: "https://kwitter-dade6-default-rtdb.firebaseio.com",
    projectId: "kwitter-dade6",
    storageBucket: "kwitter-dade6.appspot.com",
    messagingSenderId: "167962115136",
    appId: "1:167962115136:web:9dfb359cd0da79f16433a5"
};

firebase.initializeApp(firebaseConfig);
var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
    });

    document.getElementById("msg").value = "";
};

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
           snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                 childData = childSnapshot.val();
                 if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      console.log(firebase_message_id);
                      console.log(message_data);
                      names = message_data["name"];
                      message = message_data["message"];
                      likes = message_data["like"];
                      nameTag = "<h4>" + names + "<img class='user_tick' src='tick.png'> </h4>";
                      messageTag = "<h4 class='message_h4'>" + message + "</h4>";
                      likesTag = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + likes + "onclick='update_likes(this.id)'>";
                      spanTag = "<span class='glyphicon glyphicon-thumbs-up'> like: " + likes + "</span> </button>  <hr>";
                      output = nameTag + messageTag + likesTag + spanTag;
                      document.getElementById("out_put").innerHTML +=  output; 
                      
                
                }
          });
    });
}
getData();




function update_likes(message_id) {

    like = document.getElementById(message_id).value;
    updatedLikes = Number(like) + 1;
    firebase.database().ref(room_name).child(message_id).update({
          like: updatedLikes
    });
}

function log_out() {
    window.location = "index.html";
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
}