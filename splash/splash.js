// ===============================
// ZENOVA EDUCATIONS
// Splash Screen
// ===============================

import { auth, db } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// Wait 2.5 seconds before redirecting
setTimeout(() => {

    onAuthStateChanged(auth, async (user) => {

        // User NOT Logged In
        if (!user) {

            window.location.href = "../login/";

            return;

        }

        try {

            // Check if student profile exists
            const studentRef = doc(db, "students", user.uid);

            const studentSnap = await getDoc(studentRef);

            // Registered Student
            if (studentSnap.exists()) {

                window.location.href = "../dashboard/";

            }

            // Logged In But Registration Pending
            else {

                window.location.href = "../register/";

            }

        }

        catch (error) {

            console.error(error);

            alert("Something went wrong. Please try again.");

        }

    });

}, 2500);
