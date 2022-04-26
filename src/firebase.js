// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiqhK3iErMU_Xf1pRWZvWPkN8zsQP8bvI",
  authDomain: "taller-clase-react-firebase.firebaseapp.com",
  projectId: "taller-clase-react-firebase",
  storageBucket: "taller-clase-react-firebase.appspot.com",
  messagingSenderId: "979894131091",
  appId: "1:979894131091:web:b51dc255005e2490ec3066"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}