//device VRAM calculation, Changing the 3D Scene to video if the rendering power is low -----

import { Application } from "@splinetool/runtime";
function checkVRAMAndWebGLSupport() {
  var gl = document.createElement("canvas").getContext("webgl");
  var maxVRAM = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  var webglSupport = gl ? true : false;

  if (maxVRAM >= 1024 * 10 && webglSupport) {
    function addSection() {
      const mainSec = document.querySelector("#sceneHolder");

      const CreatCanvas = document.createElement("canvas");
      CreatCanvas.setAttribute("class", "header3D");
      CreatCanvas.setAttribute("id", "canvas3d");

      mainSec.appendChild(CreatCanvas);
    }

    addSection();

    const canvas = document.getElementById("canvas3d");
    const app = new Application(canvas);

    const scene = app.load("./src/scene.splinecode");
    // ---------------------------------------------loadingSection for 3D scene
    var counter = 0;

    function loadingCounter() {
      document.querySelector("#loadingCounter").textContent = counter;
      counter++;
      if (counter === 101) {
      } else {
        setTimeout(loadingCounter, 50);
      }
    }
    loadingCounter();

    setTimeout(() => {
      if (scene) {
        counter = 100;
        document.querySelector(".loadingSection").style.opacity = "0";
        document.body.style.overflow = "auto";
      }
    }, 5000);

    console.log("WebGL & 2GB Vram true true");
  } else {
    function addSection() {
      const mainSec = document.querySelector(".mainSec");
      mainSec.innerHTML += `
  <video class="headerVid" width="100%" height="100%" poster="https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/hero-placeholder.webp" playsinline loop
    autoplay muted>
    Your browser does not support the video tag.
    <source src="https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/home-hero.mp4" type="video/mp4" />
    <source src="https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/home-hero.mp4" type="video/webm" />
  </video>`;
    }
    addSection();

    document.querySelector("#mainText").style.display = "flex";
    document.querySelector("#mainText").style.opacity = 1;

    // ---------------------------------------------loadingSection for video
    var counter = 0;

    function loadingCounter() {
      document.querySelector("#loadingCounter").textContent = counter;
      counter++;
      if (counter === 101) {
      } else {
        setTimeout(loadingCounter, 50);
      }
    }
    loadingCounter();

    setTimeout(() => {
      counter = 100;
      document.querySelector(".loadingSection").style.opacity = "0";
      document.body.style.overflow = "auto";
    }, 3000);

    console.log("WebGL & 2GB Vram true false");
  }
  console.log(maxVRAM, webglSupport);
}
checkVRAMAndWebGLSupport();
