import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA7AdI1pKkLZgvevOOYqo4T0XCb8j0DskI",
  authDomain: "showoff-app-2f072.firebaseapp.com",
  projectId: "showoff-app-2f072",
  storageBucket: "showoff-app-2f072.appspot.com",
  messagingSenderId: "603764702967",
  appId: "1:603764702967:web:4c444dbab8ea92bd5b1df2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  });
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();