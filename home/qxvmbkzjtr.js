// ==========================================
// ZENOVA EDUCATIONS
// UNIVERSAL HOME
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

const notificationDot =
    document.getElementById("notificationDot");


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


        // ================================
        // STUDENT NAME
        // ================================

        studentName.textContent =
            student.name ||
            user.displayName ||
            "Student";


        // ================================
        // STUDENT CLASS
        // ================================

        studentClass.textContent =
            student.class ||
            "Student";


    } catch (error) {

        console.error(
            "Home profile error:",
            error
        );

    }

});


// ==========================================
// PAGE NAVIGATION
// ==========================================

function goToPage(page) {

    if (!page) return;

    window.location.href = page;

}


// ==========================================
// BOTTOM NAVIGATION
// ==========================================

document
    .querySelectorAll(".nav-item")
    .forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                goToPage(
                    item.dataset.page
                );

            }
        );

    });


// ==========================================
// QUICK ACCESS
// ==========================================

document
    .querySelectorAll(".quick-card")
    .forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                goToPage(
                    card.dataset.page
                );

            }
        );

    });


// ==========================================
// HERO BUTTONS
// ==========================================

document
    .querySelectorAll(".hero-button")
    .forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                goToPage(
                    button.dataset.page
                );

            }
        );

    });


// ==========================================
// HERO CAROUSEL
// ==========================================

const slides =
    document.querySelectorAll(".hero-slide");

const dots =
    document.querySelectorAll(".hero-dot");

let currentSlide = 0;


function showSlide(index) {

    slides.forEach(
        (slide) => {

            slide.classList.remove(
                "active"
            );

        }
    );


    dots.forEach(
        (dot) => {

            dot.classList.remove(
                "active"
            );

        }
    );


    slides[index]
        .classList.add("active");


    dots[index]
        .classList.add("active");


    currentSlide = index;

}


function nextSlide() {

    let next =
        currentSlide + 1;


    if (next >= slides.length) {

        next = 0;

    }


    showSlide(next);

}


let carouselTimer =
    setInterval(
        nextSlide,
        5000
    );


dots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(index);


                clearInterval(
                    carouselTimer
                );


                carouselTimer =
                    setInterval(
                        nextSlide,
                        5000
                    );

            }
        );

    }
);


// ==========================================
// ANNOUNCEMENTS
// ==========================================

document
    .getElementById("announcementsButton")
    .addEventListener(
        "click",
        () => {

            goToPage(
                "../announcements/"
            );

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

            goToPage(
                "../batches/"
            );

        }
    );


// ==========================================
// STUDY NOW
// ==========================================

document
    .getElementById("studyButton")
    .addEventListener(
        "click",
        () => {

            goToPage(
                "../study/"
            );

        }
    );


// ==========================================
// LAUNCH
// ==========================================

document
    .getElementById("launchButton")
    .addEventListener(
        "click",
        () => {

            goToPage(
                "../batches/"
            );

        }
    );


// ==========================================
// HEADER MENU
// ==========================================

menuButton.addEventListener(
    "click",
    () => {

        goToPage(
            "../more/"
        );

    }
);


// ==========================================
// NOTIFICATIONS
// ==========================================

notificationButton.addEventListener(
    "click",
    () => {

        goToPage(
            "../notifications/"
        );

    }
);


// ==========================================
// EMPTY / START LEARNING
// ==========================================

const learningContainer =
    document.getElementById(
        "learningContainer"
    );


// For now we show the universal
// "Start Learning" state.
//
// Later this will be replaced
// automatically with purchased
// batch data from Firestore.

learningContainer.innerHTML = `

    <div class="no-learning">

        <span>
            YOUR LEARNING
        </span>

        <h3>
            Start your learning journey.
        </h3>

        <p>
            Explore Zenova batches and
            choose the program that's
            right for you.
        </p>

        <button id="exploreLearningButton">
            Explore Batches
        </button>

    </div>

`;


document
    .getElementById(
        "exploreLearningButton"
    )
    .addEventListener(
        "click",
        () => {

            goToPage(
                "../batches/"
            );

        }
    );
