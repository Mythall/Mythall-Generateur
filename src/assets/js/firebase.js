import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAnalytics } from "firebase/analytics";

let firebaseConfig = {
  apiKey: "AIzaSyCfm8x8YPJUBDCVLCxOc1s958d4BgMnsUc",
  authDomain: "mythall-dev.firebaseapp.com",
  databaseURL: "https://mythall-dev.firebaseio.com",
  projectId: "mythall-dev",
  storageBucket: "mythall-dev.appspot.com",
  messagingSenderId: "451491306051",
  appId: "1:451491306051:web:de62bde507d19100"
};

if (import.meta.env.MODE == "production") {
  firebaseConfig = {
    apiKey: "AIzaSyCPXqMolANbNIs5ARRhRt_nhSIDXlGCL4w",
    authDomain: "mythall-v7.firebaseapp.com",
    databaseURL: "https://mythall-v7.firebaseio.com",
    projectId: "mythall-v7",
    storageBucket: "mythall-v7.appspot.com",
    messagingSenderId: "24383131218",
    appId: "1:24383131218:web:f29312ceb56c9627d7598b"
  };
}

// Forcing retry

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = initializeAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
