// analytics.google.com instructions ----------------------------------------

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-G3MZ9D6KXL");

// Calculate my age automatically ----------------------------------------

const birthDate = new Date("2005-02-01T01:10:05");
const ageInYears = Math.floor(
  (new Date() - birthDate) / (1000 * 60 * 60 * 24 * 365.25)
);

document.querySelector(
  "#MyAge"
).textContent = `${ageInYears} Years Old\u00A0\u2022\u00A0`;

// Copy the email in the contact section ----------------------------------
function CopyEmail() {
  navigator.clipboard.writeText("firstibox@outlook.com");

  const Copyemail = document.getElementById("Copyemail");
  Copyemail.textContent = "firstibox@outlook.com (copied)";
}
//device VRAM calculation, Changing the 3D Scene to video if the rendering power is low -----
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
    addSection();

    document.querySelector("#mainText").style.display = "flex";
    document.querySelector("#mainText").style.opacity = 1;

    console.log("WebGL & 2GB Vram true false");
  }
  console.log(maxVRAM, webglSupport);
}
checkVRAMAndWebGLSupport();

// Mouse follow-up by hovered objects------------------------------------------------------

const classNames = [
  "#headerAboutMe",
  "#headerBlog",
  "#headerContact",
  ".designerDiv",
  ".programmerDiv",
];

classNames.forEach(className => {
  const el = document.querySelector(className);
  if (el)
    el.addEventListener("mousemove", e => {
      const { left, top } = el.getBoundingClientRect(),
        { clientX: x, clientY: y } = e;
      el.style.setProperty("--x", x - left + "px");
      el.style.setProperty("--y", y - top + "px");
    });
});

//Changing the images displayed in the DIGITAL DESIGNER section with each click--------
const images = [
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER2.png?v=1700189774008",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER3.png?v=1700189768874",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER4.png?v=1700189770241",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER5.png?v=1700189771518",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER6.png?v=1700189772639",
  "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/DIGITAL_DESIGNER.png?v=1699026292552",
];

let counter = 0;
const designerDiv = document.querySelector(".designerDiv");

designerDiv.addEventListener("click", () => {
  const content = getComputedStyle(designerDiv, ":before").backgroundImage;
  designerDiv.style.setProperty("--before-bg-image", `url(${images[counter]})`);
  counter = (counter + 1) % images.length;
});

//------------------------------------------------------------------------
