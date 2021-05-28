import firebase from "firebase"; 
 require("@firebase/firestore")
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC9W139s5_CojwXI4Q-xGhyGxPFibyHYjE",
    authDomain: "book-santa-4de0e.firebaseapp.com",
    projectId: "book-santa-4de0e",
    storageBucket: "book-santa-4de0e.appspot.com",
    messagingSenderId: "535197704415",
    appId: "1:535197704415:web:b94e0be3267c9f96bc896a",
    measurementId: "G-EM2L2Q3EPD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase.firestore();