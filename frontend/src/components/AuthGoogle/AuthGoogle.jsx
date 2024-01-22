import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../firebase.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.error('Всплывающее окно было закрыто до того, как операция могла быть завершена.');
      } else {
        console.error(error);
      }
    }
  };