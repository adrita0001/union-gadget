// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE__apiKey);
const firebaseConfig = {
    
 apiKey: "AIzaSyBj72TBJ5SnePHF26iwg_EIUZ9OlNr1w-U",
  authDomain: "uniongadget-859bc.firebaseapp.com",
  projectId: "uniongadget-859bc",
  storageBucket: "uniongadget-859bc.appspot.com",
  messagingSenderId: "326733429157",
  appId: "1:326733429157:web:1bfc7f04f8a2b53332d04c",
  measurementId: "G-JZTRLCM8RM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;