// ==========================================
// ZENOVA EDUCATIONS
// Login Page
// ==========================================

import { auth, db } from "../firebase/firebase-config.js";

import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const googleLoginBtn = document.getElementById("googleLoginBtn");
const loading = document.getElementById("loading");

const provider = new GoogleAuthProvider();

googleLoginBtn.addEventListener("click", async () => {

    googleLoginBtn.disabled = true;

    loading.classList.remove("hidden");

    try {

        // Google Login
        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        // Check Student Record
        const studentRef = doc(db, "students", user.uid);

        const studentDoc = await getDoc(studentRef);

        // -----------------------------
        // Student Not Registered
        // -----------------------------
        if (!studentDoc.exists()) {

            window.location.href = "../register/";

            return;

        }

        const student = studentDoc.data();

        // -----------------------------
        // Approval Status
        // -----------------------------

        switch (student.approvalStatus) {

            case "approved":

                window.location.href = "../dashboard/";
                break;

            case "pending":

                window.location.href = "../waiting/";
                break;

            case "rejected":

                window.location.href = "../rejected/";
                break;

            default:

                window.location.href = "../waiting/";

        }

    }

    catch (error) {

        console.error(error);

        alert(error.message);

        googleLoginBtn.disabled = false;

        loading.classList.add("hidden");

    }

});
