import { auth } from './config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addUser } from './user';

export function signup(email, password, username, householdSize) {
  createUserWithEmailAndPassword(auth, email, password, username)
    .then((userCredential) => {
      // Signed up - firebase uses different hashing parameters for each project
      const user = userCredential.user;

      // add row to users collection - do not need to store password
      addUser(user.uid, email, username, householdSize)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage)
    });
}

export function signin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // code here may execute after onAuthStateChange

      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage)
    });
}

export function signout() {

  signOut(auth).then(() => {
    // code here may execute after onAuthStateChange

    // Sign-out successful.
    console.log('signed out')
  }).catch((error) => {
    // An error happened.
    console.error(error)
  });
}