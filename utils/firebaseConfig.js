// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKTOcSwqgbxEDIBp6QAPrkqInYE0CxK-M",
  authDomain: "create-ai-4cd98.firebaseapp.com",
  projectId: "create-ai-4cd98",
  storageBucket: "create-ai-4cd98.appspot.com",
  messagingSenderId: "1012439188721",
  appId: "1:1012439188721:web:e4705ac88e53e437951550",
  measurementId: "G-V0MS1QLFNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage=getStorage(app);
