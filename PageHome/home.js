const elts = {
  text1: document.getElementById("changeableText1"),
  text2: document.getElementById("changeableText2"),
};

const texts = [
  "storytell!",
  "engage!",
  "technomagic!",
  "marvel!",
  "give it a try!",
  "experiment!",
  "go artificial!",
  "innovate!",
  "get serious!",
  "have fun!",
  "entertain!",
  "build art",
  // "cultivate innovation",
  "weave a story!",
  // "create experiences",
  "inject some fun",
  "give it a go",
  // "dive into experiments",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

animate();

/*فالو اپ دیو توسط موس ------------------------------------------------------ */
function ChangeScale() {
  var preloader = document.querySelector(".preloader");

  if (window.innerWidth > 768) {
    kos = preloader.style.scale = 0.6;
  } else {
    kos = preloader.style.scale = window.innerWidth / 1500;
  }
}
window.addEventListener("load", ChangeScale);
window.addEventListener("resize", ChangeScale);

let classNames = [
  "#headerAboutMe",
  "#headerBlog",
  "#headerContact",
  ".designerDiv",
  ".programmerDiv",
  "#ProjectsBoxy",
];

classNames.forEach((className) => {
  let cursortracking = document.querySelector(className);

  if (cursortracking) {
    cursortracking.addEventListener("mousemove", (e) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      cursortracking.style.setProperty("--x", x + "px");
      cursortracking.style.setProperty("--y", y + "px");
    });
  }
});
/* تغییر عکس های بیفور با هر بار کلیک---------------------------------------------------------*/
const images = [
  "../images/DIGITAL_DESIGNER2.png",
  "../images/DIGITAL_DESIGNER3.png",
  "../images/DIGITAL_DESIGNER4.png",
  "../images/DIGITAL_DESIGNER5.png",
  "../images/DIGITAL_DESIGNER6.png",
  "../images/DIGITAL_DESIGNER.png",
];

let counter = 0;

document.querySelector(".designerDiv").addEventListener("click", function () {
  let content = window
    .getComputedStyle(this, ":before")
    .getPropertyValue("background-image");

  this.style.setProperty("--before-bg-image", `url(${images[counter]})`);

  // افزایش شمارنده یا بازگشت به ابتدا اگر به انتها رسیده‌ایم
  counter = (counter + 1) % images.length;
});

gsap.registerPlugin(ScrollTrigger);

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
    filter: "blur(10px)",
  });
}

TextElement("#changeableTextRelative");
TextElement("#letsText");

gsap.to(".Circles", {
  scrollTrigger: {
    trigger: ".Circles",
    start: "top bottom",
    end: "300% center",
    scrub: 5,
  },
  rotationY: -1200,
});
gsap.to("#RotateAsterisque", {
  scrollTrigger: {
    trigger: "#RotateAsterisque",
    start: "top bottom",
    end: "300% center",
    scrub: 3,
  },
  // rotationZ: -360,
  skewX: -70,
});

gsap.to(".preloaderMain", {
  scrollTrigger: {
    trigger: ".preloaderMain",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
  y: 100,
  opacity: 0,
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
    trigger: "#mainText",
    start: "80% center",
    end: "bottom center",
    toggleActions: "play none none reverse",
  },
  filter: "blur(5px)",
});
gsap.from(".IAmDivSecInside", {
  scrollTrigger: {
    trigger: ".IAmDivSecInside",
    start: "-60% bottom",
    toggleActions: "play none none reverse",
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
      toggleActions: "play none none reverse",
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

gsap.from("#SecProjects", {
  scrollTrigger: {
    trigger: "#SecProjects",
    start: "-80% bottom",
    toggleActions: "play none none none",
    // markers: true,
  },
  y: "100%",
  filter: "blur(10px)",
  duration: 2,
});

gsap.from(".section4", {
  scrollTrigger: {
    trigger: ".section4",
    start: "120% 90%",
    end: "190% 90%",

    toggleActions: "play none none reverse",
    scrub: 2,
  },
  yPercent: "-150",
});
