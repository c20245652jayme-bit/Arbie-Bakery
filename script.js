gsap.registerPlugin(ScrollTrigger);

// ---- B1: DARK MODE TOGGLE ----
const darkModeToggle = document.querySelector("#darkModeToggle");

darkModeToggle.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
});


// ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----
const intro = gsap.timeline({
    defaults: {
        duration: 0.7,
        ease: "power2.out"
    }
});

// power2.out makes the elements slow down smoothly at the end.
intro.from("#hero h1", {
    y: 50,
    opacity: 0
});

// back.out adds a small bounce for a lively bakery introduction.
intro.from("#hero p", {
    y: 30,
    opacity: 0,
    ease: "back.out(1.7)"
}, "-=0.4");

// power2.out keeps the navigation animation smooth.
intro.from("#hero a, #hero button", {
    y: 20,
    opacity: 0,
    stagger: 0.2
}, "-=0.3");


// ---- D3: CLICK INTERACTION ----
document.querySelector("#replayBtn").addEventListener("click", function () {
    intro.restart();
});


// ---- E1: SCROLL REVEALS ----
gsap.utils.toArray(".reveal").forEach((section) => {
    gsap.from(section, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});


// ---- E2: SCROLL-LINKED EFFECT ----
gsap.to("#progressBar", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});


// ---- E3: REDUCED MOTION + CLEANUP ----
gsap.matchMedia().add(
    "(prefers-reduced-motion: reduce)",
    function () {
        // Show reveal sections without movement for reduced-motion visitors.
        gsap.set(".reveal", {
            opacity: 1,
            y: 0
        });

        // Disable the scroll-linked progress animation.
        gsap.set("#progressBar", {
            width: "0%"
        });

        return function () {
            // Cleanup when the media condition changes.
            gsap.set(".reveal", {
                clearProps: "opacity,transform"
            });

            gsap.set("#progressBar", {
                clearProps: "width"
            });
        };
    }
);
