import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config";
const provider = new GoogleAuthProvider();

export const loginGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential ?.accessToken;
            const user = result.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

export const logoutGoogle = () => {
    auth.signOut();
};