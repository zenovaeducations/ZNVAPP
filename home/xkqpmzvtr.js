// ==========================================
// ZENOVA EDUCATIONS
// Universal Home
// ==========================================

import { auth, db } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// ELEMENTS
// ==========================================

const studentName =
    document.getElementById("studentName");

const studentClass =
    document.getElementById("studentClass");

const menuButton =
    document.getElementById("menuButton");

const notificationButton =
    document.getElementById("notificationButton");

const searchButton =
    document.getElementById("searchButton");


// ==========================================
// AUTHENTICATION
// ==========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.replace("../login/");

        return;

    }


    try {

        const studentRef =
            doc(
                db,
                "students",
                user.uid
            );


        const studentSnap =
            await getDoc(studentRef);


        if (!studentSnap.exists()) {

            window.location.replace("../onboarding/");

            return;

        }


        const student =
            studentSnap.data();


        // ==================================
        // DISPLAY STUDENT NAME
        // ==================================

        if (student.name) {

            studentName.textContent =
                student.name;

        } else {

            studentName.textContent =
                user.displayName || "Student";

        }


        // ==================================
        // DISPLAY CLASS
        // ==================================

        if (student.class) {

            studentClass.textContent =
                student.class;

        } else {

            studentClass.textContent =
                "Welcome to Zenova Educations";

        }


    } catch (error) {

        console.error(
            "Home profile error:",
            error
        );

    }

});


// ==========================================
// BANNER SLIDER
// ==========================================

const banners =
    document.querySelectorAll(".banner");

const dots =
    document.querySelectorAll(".banner-dot");

let currentBanner = 0;


function showBanner(index) {

    banners.forEach((banner) => {

        banner.classList.remove("active");

    });


    dots.forEach((dot) => {

        dot.classList.remove("active");

    });


    banners[index].classList.add("active");

    dots[index].classList.add("active");

    currentBanner = index;

}


function nextBanner() {

    let next =
        currentBanner + 1;

    if (next >= banners.length) {

        next = 0;

    }

    showBanner(next);

}


setInterval(
    nextBanner,
    5000
);


dots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {

            showBanner(index);

        }
    );

});


// ==========================================
// NAVIGATION HELPER
// ==========================================

function goToPage(page) {

    if (!page) return;

    window.location.href = page;

}


// ==========================================
// BOTTOM NAVIGATION
// ==========================================

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const page =
            item.dataset.page;

        goToPage(page);

    });

});


// ==========================================
// QUICK ACTIONS
// ==========================================

const quickCards =
    document.querySelectorAll(".quick-card");


quickCards.forEach((card) => {

    card.addEventListener("click", () => {

        const page =
            card.dataset.page;

        goToPage(page);

    });

});


// ==========================================
// SEARCH
// ==========================================

searchButton.addEventListener(
    "click",
    () => {

        goToPage("../search/");

    }
);


// ==========================================
// HEADER MENU
// ==========================================

menuButton.addEventListener(
    "click",
    () => {

        goToPage("../more/");

    }
);


// ==========================================
// NOTIFICATIONS
// ==========================================

notificationButton.addEventListener(
    "click",
    () => {

        goToPage("../notifications/");

    }
);


// ==========================================
// ANNOUNCEMENTS
// ==========================================

document
    .getElementById("announcementButton")
    .addEventListener(
        "click",
        () => {

            goToPage("../announcements/");

        }
    );


// ==========================================
// RESULTS
// ==========================================

document
    .getElementById("resultsButton")
    .addEventListener(
        "click",
        () => {

            goToPage("../results/");

        }
    );


// ==========================================
// BATCHES
// ==========================================

document
    .getElementById("batchesButton")
    .addEventListener(
        "click",
        () => {

            goToPage("../batches/");

        }
    );


// ==========================================
// FREE LEARNING
// ==========================================

document
    .getElementById("freeButton")
    .addEventListener(
        "click",
        () => {

            goToPage("../free/");

        }
    );
