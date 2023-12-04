
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const mainContainer = document.querySelector(".cardsMainContainer");
const extraLongContainer = mainContainer.querySelector(".cardsContainer");

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  contect: "#smooth-content",
  smooth: 1,
  effects: true,
  smoothTouch: 0.01,
});

let scrollTween = gsap.to(".cardsContainer", {
  scrollTrigger: {
    pin: true,
    trigger: ".cardsMainContainer",
    start: "left left",
    end: () => `+=${extraLongContainer.offsetWidth} bottom`,
    scrub: 1,
  },
  xPercent: -100,
  x: () => window.innerWidth,
  ease: "none",
});

gsap.to("#heroImage", {
  scrollTrigger: {
    trigger: "#heroImage",
    start: "center center",
    end: "bottom center",
    scrub: 1,
  },
  yPercent: -5,
  scale: 1.1,
});

gsap.to(CSSRulePlugin.getRule(".hero #div1 > p:nth-child(2)::before"), {
  duration: 3,
  repeat: -1,
  ease: "none",
  cssRule: {
    transform: "rotate3d(1, 0, 0, 180deg)",
  },
});
gsap.to(CSSRulePlugin.getRule(".hero #div3:after"), {
  scrollTrigger: {
    trigger: ".hero #div3",
    start: "-70% center",
    end: "100% center",
    scrub: 1,
  },
  cssRule: {
    right: "0",
    left: "0",
  },
});

gsap.from("#HeroText-A", {
  opacity: 0.3,
  duration: 0.6,
  ease: "power1.out",
  stagger: 0.1,

  scrollTrigger: {
    trigger: "#HeroText-A",
    start: "top 70%",
  },
});

gsap.from(
  new SplitText("#HeroText-Q1", {
    type: "words",
    tagName: "span",
  }).words,
  {
    y: "10%",
    rotationZ: "10",
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.1,

    scrollTrigger: {
      trigger: "#HeroText-Q1",
      toggleActions: "play none none reverse",
      start: "top 70%",
    },
  }
);
gsap.from(
  new SplitText("#HeroText-Q2", {
    type: "words",
    tagName: "span",
  }).words,
  {
    y: "10%",
    rotationZ: "10",
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.1,

    scrollTrigger: {
      trigger: "#HeroText-Q2",
      toggleActions: "play none none reverse",
      start: "top 70%",
    },
  }
);
// section2--------------------------------------
gsap.from(".section2", {
  scrollTrigger: {
    trigger: ".section2",
    start: "20% bottom",
    toggleActions: "play none none none",
  },
  skewY: 5,
  duration: 1.5,
});

gsap.from(
  new SplitText(".section2 .div2  > p", {
    type: "words",
    tagName: "span",
  }).words,
  {
    x: "100%",
    opacity: 0.2,
    duration: 1,
    ease: "power4.out",
    stagger: 0.1,

    scrollTrigger: {
      trigger: ".section2 .div2 > p",
      start: "10% 80%",
      end: "center 80%",
    },
  }
);
gsap.from(
  new SplitText(".section2 .div3  > p", {
    type: "words",
    tagName: "span",
  }).words,
  {
    x: "100%",
    opacity: 0.2,
    duration: 1,
    ease: "power4.out",
    stagger: 0.1,

    scrollTrigger: {
      trigger: ".section2 .div3 > p",
      start: "10% 80%",
      end: "center 80%",
    },
  }
);

gsap.to(".section2 .div6 > img", {
  scale: 2,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".section2 .div6 ",
    toggleActions: "play reverse play reverse",
    start: "center 50%",
    end: "100% top",
    scrub: 2,
  },
});
gsap.from(
  new SplitText(".section2 .div5 > p", {
    type: "words",
    tagName: "span",
  }).words,
  {
    opacity: 0.2,
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.1,

    scrollTrigger: {
      trigger: ".section2 .div5",
      start: "top 70%",
    },
  }
);

gsap.to(".section2 .div1 > img ", {
  scrollTrigger: {
    trigger: ".section2 .div1",
    start: "center bottom",
    end: "center top",
    scrub: 7,
  },
  rotationZ: -90,
  scale: 1.4,
});
gsap.to(".section2 .div4 > img ", {
  scrollTrigger: {
    trigger: ".section2 .div4",
    start: "center bottom",
    end: "center top",
    scrub: 7,
  },
  rotationY: -180,
  scale: 1.4,
});

gsap.to(CSSRulePlugin.getRule(".section2 .div5::after"), {
  scrollTrigger: {
    trigger: ".section2 .div5",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
  cssRule: {
    width: "calc(100% - 2vw)",
    height: "calc(100% - 2vw)",
  },
});
gsap.to(CSSRulePlugin.getRule(".section2 .div5::before"), {
  scrollTrigger: {
    trigger: ".section2 .div5",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
  cssRule: {
    width: "calc(100% - 2vw)",
    height: "calc(100% - 2vw)",
  },
});
// section2--------------------------------------

gsap.from(".section3 .Card1", {
  scrollTrigger: {
    trigger: ".section3 .Card1",
    start: "20% bottom",
    toggleActions: "play none none none",
  },
  skewY: 10,
  xPercent: "-10",
  yPercent: "30",
  duration: 1,
});
gsap.to(".section3 .Card1", {
  scrollTrigger: {
    trigger: ".section3 .Card1",
    start: "center bottom",
    end: "center top",
    scrub: 1,
  },
  filter: "hue-rotate(300deg)",
  backgroundSize: "110% 110%",
});
gsap.from(".section3 .Card2", {
  scrollTrigger: {
    trigger: ".section3 .Card2",
    start: "20% bottom",
    toggleActions: "play none none none",
  },
  skewY: 10,
  xPercent: "-10",
  yPercent: "30",
  duration: 1,
});
gsap.from(".section3 .Card3", {
  scrollTrigger: {
    trigger: ".section3 .Card3",
    start: "20% bottom",
    toggleActions: "play none none none",
  },
  skewY: 10,
  xPercent: "-10",
  yPercent: "30",
  duration: 1,
});
gsap.from(".section3 .Card4", {
  scrollTrigger: {
    trigger: ".section3 .Card4",
    start: "20% bottom",
    toggleActions: "play none none none",
  },
  skewY: 10,
  xPercent: "-10",
  yPercent: "30",
  duration: 1,
});
gsap.to(".section3 .Card4", {
  scrollTrigger: {
    trigger: ".section3 .Card4",
    start: "center bottom",
    end: "center top",
    scrub: 7,
  },

  backgroundSize: "150% 150%",
});

gsap.from(".section3 .Card3 p:nth-child(2)", {
  opacity: 0.2,
  duration: 0.5,
  ease: "power1.out",
  stagger: 0.1,

  scrollTrigger: {
    trigger: ".section3 .Card3",
    start: "top 70%",
  },
});

gsap.to(".sectionFooter #middlePart p:nth-child(2) ", {
  duration: 2,
  scrollTrigger: {
    trigger: ".sectionFooter #middlePart",
    start: "center bottom",
    end: "center bottom",
    toggleActions: "play none none none",
  },
  scrambleText: {
    text: "Make your own story",
    chars: "X",
  },
});

// ageCalc
document.addEventListener("DOMContentLoaded", () => {
  const birthDate = "2005-02-01T01:10:05";
  const updateAge = () => {
    const now = new Date();
    const ageInSeconds = Math.floor((now - new Date(birthDate)) / 1000);
    const ageYears = Math.floor(ageInSeconds / 31556926);
    const ageMonths = Math.floor((ageInSeconds % 31556926) / 2592000);
    const ageDays = Math.floor((ageInSeconds % 2592000) / 86400);
    const ageHours = Math.floor((ageInSeconds % 86400) / 3600);
    const ageMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const ageSeconds = ageInSeconds % 60;
    document.getElementById(
      "ageInYears"
    ).textContent = `${ageYears} years, ${ageMonths} months`;
    document.getElementById(
      "ageInSeconds"
    ).textContent = `${ageDays} days, ${ageHours} hours, ${ageMinutes} minutes, ${ageSeconds} seconds`;
  };
  updateAge();
  setInterval(updateAge, 1000);
});

// myNavbarbar
var prevScrollpos = window.pageYOffset;

function hideNavbarOnScroll() {
  var currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {
    document.getElementById("myNavbar").style.top = "0";
  } else {
    document.getElementById("myNavbar").style.top = "-100px";
  }

  prevScrollpos = currentScrollPos;
}

document.addEventListener("scroll", hideNavbarOnScroll);



function myFunction() {
  var navbar = document.getElementById("myNavbar");
  var imageElement = document.getElementById("navbarIcon");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
    imageElement.src =
      "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/navbar-component4.svg";
    document.body.style.overflow = "hidden";
  } else {
    navbar.className = "navbar";
    imageElement.src =
      "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/navbar-component1.svg";
    document.body.style.overflow = "visible";
  }
}

// splash screen
document.addEventListener("DOMContentLoaded", function () {
  var counter = 0;

  function loadingCounter() {
    document.querySelector("#counter").textContent = counter;
    counter++;
    if (counter >= 101) {
    } else {
      setTimeout(loadingCounter, 50);
    }
  }
  loadingCounter();

  var fontSources = ["damn", "Italianno", "IBMPlexMono", "ElMessiri"];
  fontSources.forEach(function (fontSource) {
    var font = new FontFaceObserver(fontSource);

    font
      .load()
      .then(function () {
        counter = 100;
        document.querySelector(".splashScreen").style.opacity = "0";
        document.body.style.overflow = "auto";
      })
      .catch(function () {
        counter = 404;
      });
  });
});


// analytics.google.com instructions ----------------------------------------

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-R361QCJS7C");
