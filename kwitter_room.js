



const firebaseConfig = {
    apiKey: "AIzaSyBaR7d0V4KNaA38L34zO3CCsbNevJOSx9Y",
    authDomain: "sanskruti-chat-app.firebaseapp.com",
    projectId: "sanskruti-chat-app",
    storageBucket: "sanskruti-chat-app.appspot.com",
    messagingSenderId: "1097959548402",
    appId: "1:1097959548402:web:2e89de07cce480398f376b"
  };
  
 
 firebase.initializeApp(firebaseConfig);


 var user_name = localStorage.getItem("user_name");
document.getElementById("username").innerHTML = " Welcome " + user_name + "!";

function add_room() {
      var room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding rooms"
      });

      localStorage.setItem("room_names", room_name);

      window.location = "Kwitter_page.html";
}


function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;
                //Start code
console.log("room_names"+ Room_names);
row="<div class='room_name' id=" + Room_names +" onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";
document.getElementById("output").innerHTML += row;
                  //End code
   
   });
});

}
getData();
function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
     window.location = "kwitter_page.html";
}



function log_out() {
      window.location = "index.html";
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
}