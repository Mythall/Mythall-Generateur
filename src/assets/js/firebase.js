import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

console.log("Hello world!");

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

const docRef = doc(db, "settings", "app");
getDoc(docRef).then(docSnap => {
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    document.querySelector("#appName").innerHTML = docSnap.data().name;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
});

export { app, auth, db };
