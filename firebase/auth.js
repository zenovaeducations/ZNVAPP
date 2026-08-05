// =====================================
// Authentication Utilities
// =====================================

import { auth } from "./firebase-config.js";

import {

    GoogleAuthProvider,

    signInWithPopup,

    signOut,

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

export async function googleLogin() {

    return await signInWithPopup(auth, provider);

}

export async function logout() {

    return await signOut(auth);

}

export function authListener(callback) {

    return onAuthStateChanged(auth, callback);

}
