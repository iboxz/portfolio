gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let Smoother = null;
Smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 0.8,
  effects: true,
  smoothTouch: false,
});
gsap.to("#sceneHolder", {
  scrollTrigger: {
    trigger: ".mainSec",
    start: "bottom top",
    end: "bottom center",
    toggleActions: "play none none reset",
  },
  display: "none",
  visibility: "hidden",
});

gsap.to("#mainText", {
  scrollTrigger: {
    trigger: "#mainText",
    start: "top top",
    end: "bottom center",
    scrub: 1,
  },
  y: 100,
});

gsap.to(".mainSec", {
  scrollTrigger: {
    trigger: ".mainSec",
    start: "80% center",
    end: "bottom center",
    toggleActions: "play none none reverse",
  },
  filter: "blur(5px)",
});

function TextElement(element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: "#letsText",
      start: "center bottom",
      toggleActions: "play none none reverse",
    },
    skewY: 10,
    rotationX: 100,
    xPercent: "-10",
    yPercent: "30",
    duration: 1,
  });
}

const projectsLink = document.getElementById("headerContact");
projectsLink.addEventListener("click", (e) => {
  e.preventDefault();
  Smoother.scrollTo("#contact", {
    duration: 1.5,
    ease: "power3.inOut",
  });
});

TextElement("#changeableTextRelative");
TextElement("#letsText");

gsap.to("#RotateAsterisque", {
  scrollTrigger: {
    trigger: "#RotateAsterisque",
    start: "top bottom",
    end: "300% center",
    scrub: 3,
  },
  // rotationZ: -360,
  skewX: -40,
});
gsap.from(".IAmDivSecInside", {
  scrollTrigger: {
    trigger: ".IAmDivSecInside",
    start: "-60% bottom",
    toggleActions: "play none none none",
  },
  y: "100%",
  filter: "blur(10px)",
  duration: 1,
});
function animateElement(element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      toggleActions: "play none none none",
    },
    y: "100%",
    duration: 0.6,
    ease: "power1.out",
    stagger: 0.1,
    filter: "blur(3px)",
  });
}

animateElement("#TextHelloWorld");
animateElement("#TextName");
animateElement("#TextIM");

function ContactElementAnimation(element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "center bottom",
      end: "center 80%",
      scrub: 2,
    },
    x: -150,
  });
}

const elements = [
  "#ContactTexts1",
  "#Copyemail",
  "#ContactTexts3",
  "#ContactTexts4",
  "#ContactTexts5",
  "#ContactTexts6",
  "#ContactTexts8",
  "#ContactTexts9",
  "#ContactTexts10",
];

elements.forEach(ContactElementAnimation);
