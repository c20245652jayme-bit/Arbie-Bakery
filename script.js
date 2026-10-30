gsap.registerPlugin(ScrollTrigger);

const darkModeToggle = document.querySelector("#darkModeToggle");

darkModeToggle.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
});

const intro = gsap.timeline({
    defaults: {
        duration: 0.7,
        ease: "power2.out"
    }
});

intro.from("#hero h1", {
    y: 50,
    opacity: 0
});

intro.from("#hero p", {
    y: 30,
    opacity: 0,
    ease: "back.out(1.7)"
}, "-=0.4");

intro.from("#hero a, #hero button", {
    y: 20,
    opacity: 0,
    stagger: 0.2
}, "-=0.3");

document.querySelector("#replayBtn").addEventListener("click", function () {
    intro.restart();
});

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

gsap.matchMedia().add(
    "(prefers-reduced-motion: reduce)",
    function () {
        
        gsap.set(".reveal", {
            opacity: 1,
            y: 0
        });


        gsap.set("#progressBar", {
            width: "0%"
        });

        return function () {
    
            gsap.set(".reveal", {
                clearProps: "opacity,transform"
            });

            gsap.set("#progressBar", {
                clearProps: "width"
            });
        };
    }
);
