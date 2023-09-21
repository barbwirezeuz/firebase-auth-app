
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBOt3WpXpjJbWXLJATdsWfF6xIopCHBDfY",
    authDomain: "my-authentication-app-54ef1.firebaseapp.com",
    projectId: "my-authentication-app-54ef1",
    storageBucket: "my-authentication-app-54ef1.appspot.com",
    messagingSenderId: "725994124559",
    appId: "1:725994124559:web:a1f2b5f961a5f964eeba7a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInWithFirebase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
