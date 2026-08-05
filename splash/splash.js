// ===============================
// ZENOVA EDUCATIONS
// Splash Screen
// ===============================
// ==========================================
// ZENOVA EDUCATIONS
// Splash Screen
// ==========================================

import { auth, db } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Wait for splash animation
setTimeout(() => {

    onAuthStateChanged(auth, async (user) => {

        try {

            // --------------------------------
            // User Not Logged In
            // --------------------------------

            if (!user) {

                window.location.replace("../login/");
                return;

            }

            // --------------------------------
            // Check Student Record
            // --------------------------------

            const studentRef = doc(db, "students", user.uid);

            const studentSnap = await getDoc(studentRef);

            // Student not registered

            if (!studentSnap.exists()) {

                window.location.replace("../register/");
                return;

            }

            const student = studentSnap.data();

            // --------------------------------
            // Approval Status
            // --------------------------------

            switch (student.approvalStatus) {

                case "approved":

                    window.location.replace("../dashboard/");
                    break;

                case "pending":

                    window.location.replace("../waiting/");
                    break;

                case "rejected":

                    window.location.replace("../rejected/");
                    break;

                case "blocked":

                    window.location.replace("../blocked/");
                    break;

                default:

                    window.location.replace("../waiting/");
                    break;

            }

        } catch (error) {

            console.error("Splash Error:", error);

            alert("Unable to load application.");

        }

    });

}, 2500);
