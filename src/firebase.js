// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ7NJXtG5z8M__bA6swxHM_9WWw8bNHjk",
  authDomain: "daw-mbw-dfba5.firebaseapp.com",
  projectId: "daw-mbw-dfba5",
  storageBucket: "daw-mbw-dfba5.appspot.com",
  messagingSenderId: "380050388077",
  appId: "1:380050388077:web:41f80a8309e84ac2c17b64",
  measurementId: "G-84JSTSVV2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
