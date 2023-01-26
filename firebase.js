// Import the functions you need from the SDKs you need
//import * as firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClcvFKfJBWIsCfP5RhXrr4ApId7s51IxY",
  authDomain: "fir-auth-e2573.firebaseapp.com",
  projectId: "fir-auth-e2573",
  storageBucket: "fir-auth-e2573.appspot.com",
  messagingSenderId: "398714385920",
  appId: "1:398714385920:web:bcccb72538fc4bba8e8ae5"
};

// Initialize Firebase
let app; 
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app();
  }

const auth = firebase.auth()

export { auth };