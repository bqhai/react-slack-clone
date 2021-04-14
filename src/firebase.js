import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
var firebaseConfig = {
    apiKey: "AIzaSyDNShKtNgQYFYEsmHKbESu4K46sQKhDWQ4",
    authDomain: "react-demo-bde4c.firebaseapp.com",
    projectId: "react-demo-bde4c",
    storageBucket: "react-demo-bde4c.appspot.com",
    messagingSenderId: "224367413549",
    appId: "1:224367413549:web:e3682602e1d639dcf9aba4",
    measurementId: "G-B1E990Q1GM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;