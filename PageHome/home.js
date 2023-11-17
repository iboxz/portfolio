const birthDate = "2005-02-01T01:10:05";

const today = new Date();

const birthTimeInMillis = new Date(birthDate).getTime();
const todayTimeInMillis = today.getTime();

const ageInYears = Math.floor(
  (todayTimeInMillis - birthTimeInMillis) / (1000 * 60 * 60 * 24 * 365.25)
);

const ageElement = document.querySelector("#MyAge");
ageElement.innerHTML = `${ageInYears}YearsOld&#160;&#8231;&#160;`;

// --------------------------------------------------------------
function CopyEmail() {
  navigator.clipboard.writeText("hadinezhad1383@gmail.com");

  const Copyemail = document.getElementById("Copyemail");
  Copyemail.textContent = "hadinezhad1383@gmail.com (copied)";
}
// ---------------------------------------------------------------
/* 
function getCPURAMInfo() {
  var ram = navigator.deviceMemory || "N/A";

  return {
    ram: ram,
  };
}

var userInfo = getCPURAMInfo();
console.log(userInfo.ram);
 */

function checkVRAMAndWebGLSupport() {
  var gl = document.createElement("canvas").getContext("webgl");
  var maxVRAM = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  var webglSupport = gl ? true : false;

  if (maxVRAM >= 1024 * 8 && webglSupport) {
    function addSection() {
      const mainSec = document.querySelector(".mainSec");

      const splineViewer = document.createElement("spline-viewer");
      splineViewer.setAttribute("class", "header3D");
      splineViewer.setAttribute("spinner-big-dark", true);
      splineViewer.setAttribute(
        "url",
        "https://prod.spline.design/pR4aKRID9cY5H6w0/scene.splinecode"
      );

      mainSec.appendChild(splineViewer);
    }

    addSection();

    window.onload = function () {
      var shadowRoot = document.querySelector("spline-viewer").shadowRoot;
      shadowRoot.querySelector("#logo").remove();
    };

    console.log("WebGL & 2GB Vram true true");
  } else {
    function addSection() {
      const mainSec = document.querySelector(".mainSec");
      mainSec.innerHTML += `
    <video class="headerVid" width="100%" height="100%" poster="https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/hero-placeholder.webp?v=1700195303317" playsinline loop
      autoplay muted>
      Your browser does not support the video tag.
      <source src="https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/home-hero.mp4?v=1700195308179" type="video/mp4" />
      <source src="https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/home-hero.mp4?v=1700195308179" type="video/webm" />
    </video>`;
    } 
    addSection( );

    document.querySelector("#mainText").style.display = "flex";
    document.querySelector("#mainText").style.opacity = 1;

    console.log("WebGL & 2GB Vram true false");
  }
  console.log(maxVRAM, webglSupport);
}
checkVRAMAndWebGLSupport();
//-----------------------------------------------

// -------------------------------------------
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

/* function ChangeScale() {
  var preloader = document.querySelector(".preloader");

  if (window.innerWidth > 768) {
   preloader.style.scale = 0.6;
  } else {
   preloader.style.scale = window.innerWidth / 1500;
  }
}
window.addEventListener("load", ChangeScale);
window.addEventListener("resize", ChangeScale);
 */
/*فالو اپ دیو توسط موس ------------------------------------------------------ */

let classNames = [
  "#headerAboutMe",
  "#headerBlog",
  "#headerContact",
  ".designerDiv",
  ".programmerDiv",
];

classNames.forEach(className => {
  let cursortracking = document.querySelector(className);

  if (cursortracking) {
    cursortracking.addEventListener("mousemove", e => {
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
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER2.png?v=1700189774008",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER3.png?v=1700189768874",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER4.png?v=1700189770241",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER5.png?v=1700189771518",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER6.png?v=1700189772639",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER.png?v=1699026292552",
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
//------------------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

gsap.to(".header3D", {
  scrollTrigger: {
    trigger: ".header3D",
    start: "bottom top",
    end: "bottom center",
    toggleActions: "play none none reset",
  },
  opacity: 0,
  display: "none",
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

function TextElement(element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: "#letsText",
      start: "center bottom",
      toggleActions: "play none none none",
    },
    skewY: 10,
    rotationX: 100,
    xPercent: "-10",
    yPercent: "30",
    duration: 1,
    // filter: "blur(10px)",
  });
}

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
  skewX: -70,
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

gsap.from("#SecProjects", {
  scrollTrigger: {
    trigger: "#SecProjects",
    start: "-90% bottom",
    toggleActions: "play none none none",
    // markers: true,
  },
  y: "100%",
  filter: "blur(10px)",
  duration: 1.5,
});

function ContactElementAnimation(element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "center bottom",
      end: "center 80%",
      toggleActions: "play none none none",
      scrub: 2,
    },
    x: "-150",
  });
}

ContactElementAnimation("#ContactTexts1");
ContactElementAnimation("#Copyemail");
ContactElementAnimation("#ContactTexts3");
ContactElementAnimation("#ContactTexts4");
ContactElementAnimation("#ContactTexts5");
ContactElementAnimation("#ContactTexts6");
ContactElementAnimation("#ContactTexts7");
ContactElementAnimation("#ContactTexts8");
ContactElementAnimation("#ContactTexts9");
ContactElementAnimation("#ContactTexts10");
ContactElementAnimation("#ContactTexts11");
