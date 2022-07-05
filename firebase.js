// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKzLJpuVb1jnkvVnuNNi59DKvQZjMNB9c",
  authDomain: "fir-auth-2bd78.firebaseapp.com",
  projectId: "fir-auth-2bd78",
  storageBucket: "fir-auth-2bd78.appspot.com",
  messagingSenderId: "423085804364",
  appId: "1:423085804364:web:6d84e7a2a06b746c8e1de9"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
} 

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };