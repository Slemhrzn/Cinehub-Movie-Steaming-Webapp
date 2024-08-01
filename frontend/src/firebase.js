// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrov3MNEb-UQQrZPq8a2pPz7YtZWSUvMc",
  authDomain: "cinehub-3a474.firebaseapp.com",
  projectId: "cinehub-3a474",
  storageBucket: "cinehub-3a474.appspot.com",
  messagingSenderId: "156324673331",
  appId: "1:156324673331:web:fee103d5fa192c71be7046",
  measurementId: "G-G185RTZG79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);