import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBgVPYkoJSRUBNAL-TtaHIC45BWOWiMKpo",
    authDomain: "snapchat-clone-5c03f.firebaseapp.com",
    projectId: "snapchat-clone-5c03f",
    storageBucket: "snapchat-clone-5c03f.appspot.com",
    messagingSenderId: "576470424686",
    appId: "1:576470424686:web:453b38e5377c5e53b79a7f"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const storage = getStorage(firebaseApp);
  


  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider};
