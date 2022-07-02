import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  deleteUser,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFirebase } from "./useFirebase";


export const useFirebaseAuth = () => {

  const { firebaseApp } = useFirebase();

  const auth: Auth = getAuth(firebaseApp);

  const authStateChanged = () => {

    // authの状態が変化した時に呼ばれる
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('signIn', user.uid);
        const uid = user.uid;

      } else {

      }
    });

  }

  const anonymousSignIn = async () => {

    const currentUser = auth.currentUser;

    if (currentUser) {
      return auth.currentUser;
    }

    const newUser = await signInAnonymously(auth).then(
      (userCredential) => {
        return userCredential.user;
      }
    );
    return newUser;
  }

  const persistenceAuthState = async (email: string, password: string) => {
    const result = setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const UserCredential = await signInWithEmailAndPassword(auth, email, password);
        return (UserCredential) ? true : false;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        return error;
      });
  }

  const deleteUserFn = async (): Promise<boolean> => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return false;
    }

    const result = await deleteUser(currentUser).then(() => {
      return true;
    }).catch((error) => {
      return false;
    });

    return result;
  }

  return {
    auth,
    anonymousSignIn,
    authStateChanged,
    deleteUserFn,
    persistenceAuthState,
  };
}

