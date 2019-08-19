import * as firebase from "firebase/app";
import "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBkVXGtzn8PENyoSC0vqtjNLii2zpvf9Hg",
  authDomain: "prb101-034.firebaseapp.com",
  databaseURL: "https://prb101-034.firebaseio.com",
  projectId: "prb101-034",
  storageBucket: "",
  messagingSenderId: "785159332827",
  appId: "1:785159332827:web:959b653882ec92e7"
};

// Add your Firebase credentials
firebase.initializeApp(FIREBASE_CONFIG);

export const signin = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signup = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const signout = () => firebase.auth().signOut();

export const sendPasswordResetEmail = email =>
  firebase.auth().sendPasswordResetEmail(email);

export const confirmPasswordReset = (code, password) =>
  firebase.auth().confirmPasswordReset(code, password);

export const subscribe_user_state = callback =>
  firebase.auth().onAuthStateChanged(callback);
