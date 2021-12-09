

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUNUISB4BvcdddHlHx25A-P_y0LZzRomY",
  authDomain: "filmoteka-auth-a4ede.firebaseapp.com",
  projectId: "filmoteka-auth-a4ede",
  storageBucket: "filmoteka-auth-a4ede.appspot.com",
  messagingSenderId: "560359018182",
  appId: "1:560359018182:web:a6a1195c4f88a57c7011c7"
};
firebase.initializeApp(firebaseConfig);

const login = document.getElementById('signin').addEventListener('click', signinUser);
const logout = document.getElementById('signout').addEventListener('click', signoutUser)

const provider = new GoogleAuthProvider();


function signinUser() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data){
          console.log(data)
          document.getElementById('signin').classList.add('signOut');
          document.getElementById('signout').classList.add('signIn');
          document.getElementById('googleUser').style.display = "block";
            renderGoogleUser(data);
        })
        .catch(function(error){
            console.log(error)
        })
    }

function signoutUser(){
    firebase.auth().signOut().then(() => {
        console.log("Sign - out successful.");
        document.getElementById('signin').classList.remove('signOut');
      document.getElementById('signout').classList.remove('signIn');
      document.getElementById('googleUser').style.display = "none";
    }).catch(e => {
          console.log(e)
        })
      }


      function renderGoogleUser(data){
          document.getElementById('googleUser').innerHTML = `
          <img class="user-img" src="${data.user.photoURL}">
        `
}
      