// analytics.google.com instructions ----------------------------------------

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-R361QCJS7C");

// Calculate my age automatically ----------------------------------------

const birthDate = new Date("2005-02-01T01:10:05");
const ageInYears = Math.floor((new Date() - birthDate) / (1000 * 60 * 60 * 24 * 365.25));

document.querySelector("#MyAge").textContent = `${ageInYears} Years Old\u00A0\u2022\u00A0`;

// Copy the email in the contact section ----------------------------------
function CopyEmail() {
  navigator.clipboard.writeText("firstibox@outlook.com");

  const Copyemail = document.getElementById("Copyemail");
  Copyemail.textContent = "firstibox@outlook.com (copied)";
}

// Mouse follow-up by hovered objects------------------------------------------------------

const productImg = document.getElementById("productImg");

gsap.set(productImg, {
  xPercent: -50,
  yPercent: -50,
  transformOrigin: "center",
});

const followMouse = (e) => {
  const windowWidth = window.innerWidth;
  const imgWidth = productImg.offsetWidth;
  const centerX = windowWidth / 2 - imgWidth / 3;
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  if (windowWidth < 992) {
    gsap.to(productImg, {
      duration: 0.1,
      ease: "none",
      x: mouseX,
      y: mouseY,
      xPercent: -100,
      yPercent: 0,
    });
  } else {
    const distanceFromCenter = mouseX - centerX;

    gsap.to(productImg, {
      duration: 1,
      ease: "power3",
      x: distanceFromCenter * 0.3,
      y: mouseY / 1.5,
    });
  }

  const clipPath = `polygon(
    ${(mouseX / window.innerWidth) * 10}% 0%,
    ${100 - (mouseY / window.innerHeight) * 10}% 0%,
    ${100 - (mouseX / window.innerWidth) * 10}% 100%,
    ${(mouseY / window.innerHeight) * 10}% 100%)`;

  gsap.to(productImg, {
    duration: 1,
    ease: "power3",
    clipPath: clipPath,
  });
};

document.addEventListener("mousemove", followMouse);

const section4 = document.querySelector("#IAmDivSec");
const boxes = section4.querySelectorAll("div:nth-child(2)");
const viewText = document.getElementById("viewText");

const images = [
  "./assets/Ai-generate2.jpg",
  "./assets/Degital-art.jpg",
  "./assets/Degital-art2.jpg",
  "./assets/Poster-design.jpg",
  "./assets/Poster-design2.jpg",
  "./assets/Product-Photography.jpg",
  "./assets/Product-Photography2.jpg",
  "./assets/Ai-generate.jpg",
];
let currentImageIndex = 0;

boxes.forEach((box) => {
  box.addEventListener("mouseover", function () {
    productImg.style.opacity = "1";
    productImg.style.filter = "blur(0)";
    viewText.textContent = "Click to view more";
  });

  box.addEventListener("mouseout", function () {
    productImg.style.opacity = "0";
    productImg.style.filter = "blur(5vmin)";
    viewText.textContent = "Hold to view";
  });

  box.addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.querySelector("#productImg img").src = images[currentImageIndex];
  });
});
//------------------------------Animated vertical text / contact section-----------------------
let loops = gsap.utils.toArray(".MovingTextSingle").map((line, i) => {
  const links = line.querySelectorAll(".js-text");
  return horizontalLoop(links, {
    repeat: -1,
    speed: 1.5 + i * 0.5,
    reversed: false,
    paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")),
  });
});

let currentScroll = 0;
let scrollDirection = 1;

window.addEventListener("scroll", () => {
  let direction = window.pageYOffset > currentScroll ? 1 : -1;
  if (direction !== scrollDirection) {
    loops.forEach((tl) => {
      gsap.to(tl, { timeScale: direction, overwrite: true });
    });
    scrollDirection = direction;
  }
  currentScroll = window.pageYOffset;
});

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap((parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
        },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

//----------------------------changeableText--------------------------------------------
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
  "weave a story!",
  "inject some fun",
  "give it a go",
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
/* ---------------------------- */

document.querySelector("#SecProjects div:nth-child(1)").addEventListener("click", function(event) {
  if (event.target.tagName.toLowerCase() !== 'a') {
    window.open("https://strumix.com/", "_blank");
  }
});

const targetElement = document.querySelector("#SecProjects div:nth-child(1) p");
let hue = 0;
const hueIncrement = 0.5;
const interval = 50;
let lastTime = Date.now();

function updateColor() {
  const currentTime = Date.now();
  if (currentTime - lastTime >= interval) {
    targetElement.style.color = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + hueIncrement) % 360;
    lastTime = currentTime;
  }
  requestAnimationFrame(updateColor);
}

updateColor();

var mWrap = document.querySelectorAll(".mouseSticky");

function parallaxIt(e, wrap, movementPositive = 0.2, movementNegative = 0.8) {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var boundingRect = wrap.getBoundingClientRect();
  var halfDiff = Math.abs(boundingRect.width - boundingRect.height) / 2;
  var relX = e.pageX - boundingRect.left - halfDiff;
  var relY = e.pageY - boundingRect.top;

  // تعیین ضریب حرکت بر اساس جهت
  var movementX = relX - boundingRect.width / 6 >= 0 ? movementPositive : movementNegative;

  gsap.to(wrap, {
    x: (relX - boundingRect.width / 6) * movementX,
    y: (relY - boundingRect.height / 2 - scrollTop) * movementNegative, // در صورت نیاز می‌توانید ضریب حرکت y را نیز تنظیم کنید
    ease: "power1",
    duration: 0.6,
  });
}

mWrap.forEach(function (wrap) {
  wrap.addEventListener("mousemove", function (e) {
    parallaxIt(e, wrap);
  });

  wrap.addEventListener("mouseleave", function (e) {
    gsap.to(wrap, {
      scale: 1,
      x: 0,
      y: 0,
      ease: "power3",
      duration: 1,
    });
  });
});
