// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3QLeF-zPHJlYjc3ajeQdshep9yla728Q",
  authDomain: "my-chat-app-87115.firebaseapp.com",
  projectId: "my-chat-app-87115",
  storageBucket: "my-chat-app-87115.appspot.com",
  messagingSenderId: "448717647979",
  appId: "1:448717647979:web:441ea8492d53d58823812e",
  measurementId: "G-KWREK2WEHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firestore = getFirestore(app);

export { app, auth, getApp, getAuth, firestore };