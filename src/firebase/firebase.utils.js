import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAsXek7ZcGW4ZxWL35W8CEuEFuvxtCRzeM",
    authDomain: "crwn-db-f6183.firebaseapp.com",
    projectId: "crwn-db-f6183",
    storageBucket: "crwn-db-f6183.appspot.com",
    messagingSenderId: "878678848824",
    appId: "1:878678848824:web:bbc4753db0a7560aad7dcd",
    measurementId: "G-GZ9CKLX6P8"
  }


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }) 

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;