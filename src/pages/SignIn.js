import React from 'react';
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { db, auth, provider } from '../firebase';

function SignIn() {

    const signInWithGoogle = async () => {
        try {
            const { user: { uid, displayName, email } } = await signInWithPopup(auth, provider);

            // Create a user document in Firestore
            const userDocRef = doc(db, "users", uid);
            const userData = {
                displayName: displayName,
                email: email,
                // include other relevant user data
            };
            await setDoc(userDocRef, userData);

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default SignIn;
