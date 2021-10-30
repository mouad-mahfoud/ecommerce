import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {firebaseConfig} from "./config";


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const {uid} = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
        const {displayName, email} = userAuth;
        try {

            await userRef.set({
                displayName,
                email,
                createdAt: new Date(),
                ...additionalData
            })

        } catch (err) {
            console.log(err)
        }
    }

    return userRef;
}