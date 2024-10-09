// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB1uryO5tGqQtjOTQvDK-whVzjf7Phbjkc",
    authDomain: "learnbydoing-328df.firebaseapp.com",
    projectId: "learnbydoing-328df",
    storageBucket: "learnbydoing-328df.appspot.com",
    messagingSenderId: "125551380359",
    appId: "1:125551380359:web:e98c3dba0bf21e1c173522"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export { auth,database};
