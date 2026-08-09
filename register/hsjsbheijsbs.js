// ==========================================
// ZENOVA EDUCATIONS
// Universal Onboarding
// ==========================================

import { auth, db } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// ELEMENTS
// ==========================================

const nameStep = document.getElementById("nameStep");
const classStep = document.getElementById("classStep");

const studentName = document.getElementById("studentName");

const nameContinueBtn =
    document.getElementById("nameContinueBtn");

const classContinueBtn =
    document.getElementById("classContinueBtn");

const classCards =
    document.querySelectorAll(".class-card");

const nameError =
    document.getElementById("nameError");

const classError =
    document.getElementById("classError");

const progressBar =
    document.getElementById("progressBar");

const stepText =
    document.getElementById("stepText");

const loadingOverlay =
    document.getElementById("loadingOverlay");


// ==========================================
// VARIABLES
// ==========================================

let currentUser = null;
let selectedClass = "";


// ==========================================
// AUTH CHECK
// ==========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.replace("../login/");

        return;

    }

    currentUser = user;

    // Check if profile already exists

    try {

        const studentRef =
            doc(db, "students", user.uid);

        const studentSnap =
            await getDoc(studentRef);

        if (studentSnap.exists()) {

            // Student already completed onboarding

            window.location.replace("../home/");

            return;

        }

    } catch (error) {

        console.error(
            "Profile check error:",
            error
        );

    }

});


// ==========================================
// NAME VALIDATION
// ==========================================

studentName.addEventListener("input", () => {

    const value =
        studentName.value.trim();

    if (value.length >= 2) {

        nameContinueBtn.disabled = false;

        nameError.textContent = "";

    } else {

        nameContinueBtn.disabled = true;

    }

});


// ==========================================
// STEP 1 → STEP 2
// ==========================================

nameContinueBtn.addEventListener("click", () => {

    const name =
        studentName.value.trim();


    if (name.length < 2) {

        nameError.textContent =
            "Please enter your name.";

        return;

    }


    if (!currentUser) {

        nameError.textContent =
            "Please wait while your account is loading.";

        return;

    }


    // Move to class selection

    nameStep.classList.remove("active");

    classStep.classList.add("active");


    // Update progress

    progressBar.style.width = "100%";

    stepText.textContent = "Step 2 of 2";

});


// ==========================================
// CLASS SELECTION
// ==========================================

classCards.forEach((card) => {

    card.addEventListener("click", () => {

        // Remove previous selection

        classCards.forEach((item) => {

            item.classList.remove("selected");

        });


        // Select current card

        card.classList.add("selected");

        selectedClass =
            card.dataset.class;


        classContinueBtn.disabled = false;

        classError.textContent = "";

    });

});


// ==========================================
// SAVE PROFILE
// ==========================================

classContinueBtn.addEventListener("click", async () => {

    if (!selectedClass) {

        classError.textContent =
            "Please select your class.";

        return;

    }


    if (!currentUser) {

        classError.textContent =
            "Your account is still loading.";

        return;

    }


    loadingOverlay.classList.add("show");


    try {

        const studentRef =
            doc(
                db,
                "students",
                currentUser.uid
            );


        const studentData = {

            uid: currentUser.uid,

            name: studentName.value.trim(),

            email: currentUser.email || "",

            photoURL: currentUser.photoURL || "",

            class: selectedClass,

            approvalStatus: "approved",

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        };


        await setDoc(
            studentRef,
            studentData
        );


        // Go to Universal Home

        window.location.replace("../home/");


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        loadingOverlay.classList.remove("show");


        classError.textContent =
            "Something went wrong. Please try again.";

    }

});
