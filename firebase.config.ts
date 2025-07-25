// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeMArjccK8Zy5xFwY_SZ-cJdXdk84NYu0",
  authDomain: "cnee-educa.firebaseapp.com",
  projectId: "cnee-educa",
  storageBucket: "cnee-educa.firebasestorage.app",
  messagingSenderId: "395034915624",
  appId: "1:395034915624:web:435604794b1a8b355c961d",
  measurementId: "G-YK90DT3QGK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth }