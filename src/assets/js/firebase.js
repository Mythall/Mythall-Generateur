import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPXqMolANbNIs5ARRhRt_nhSIDXlGCL4w",
  authDomain: "mythall-v7.firebaseapp.com",
  databaseURL: "https://mythall-v7.firebaseio.com",
  projectId: "mythall-v7",
  storageBucket: "mythall-v7.appspot.com",
  messagingSenderId: "24383131218",
  appId: "1:24383131218:web:f29312ceb56c9627d7598b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
