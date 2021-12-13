

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUNUISB4BvcdddHlHx25A-P_y0LZzRomY",
  authDomain: "filmoteka-auth-a4ede.firebaseapp.com",
  projectId: "filmoteka-auth-a4ede",
  storageBucket: "filmoteka-auth-a4ede.appspot.com",
  messagingSenderId: "560359018182",
  appId: "1:560359018182:web:a6a1195c4f88a57c7011c7"
};
firebase.initializeApp(firebaseConfig);

const login = document.getElementById('signin').addEventListener('click', signInWithPopup);
const logout = document.getElementById('signout').addEventListener('click', signoutUser)

const provider = new FacebookAuthProvider();

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

    function signoutUser(){
    firebase.auth().signOut().then(() => {
        console.log("Sign - out successful.");
        document.getElementById('signin').classList.remove('signOut');
      document.getElementById('signout').classList.remove('signIn');
      //document.getElementById('googleUser').style.display = "none";
    }).catch(error => {
          console.log(error)
        })
      }






//const provider = new GoogleAuthProvider();


/* function signinUser() {
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
    }).catch(error => {
          console.log(error)
        })
      }


      function renderGoogleUser(data){
          document.getElementById('googleUser').innerHTML = `
          <img class="user-img" src="${data.user.photoURL}">
        `
} */
      