
// analytics.google.com instructions ----------------------------------------

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-R361QCJS7C");

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
