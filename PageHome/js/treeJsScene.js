// Device VRAM calculation, changing the 3D Scene to video if the rendering power is low

import { Application } from "@splinetool/runtime";

const checkGraphicsCapability = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return false;

    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const isShaderPrecisionValid = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const meetsRequirements = maxTextureSize >= 8192 && isShaderPrecisionValid && navigator.hardwareConcurrency >= 8 && !isMobile;

    console.log(maxTextureSize, navigator.hardwareConcurrency);
    return meetsRequirements;
  } catch (error) {
    return false;
  }
};

function checkVRAMAndWebGLSupport() {
  var gl = document.createElement("canvas").getContext("webgl");
  var maxVRAM = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  var webglSupport = !!gl;

  if (checkGraphicsCapability()) {
    // ----------- 3D Scene Handling -----------
    console.log(maxVRAM);
    const mainSec = document.querySelector("#sceneHolder");
    const canvas3D = document.createElement("canvas");
    canvas3D.setAttribute("class", "header3D");
    canvas3D.setAttribute("id", "canvas3d");
    mainSec.appendChild(canvas3D);

    const canvas = document.getElementById("canvas3d");
    const app = new Application(canvas);

    let counter = 0;
    function loadingCounter() {
      const loadingCounterElement = document.querySelector("#loadingCounter");

      if (counter < 100) {
        loadingCounterElement.textContent = counter + "%";
        counter++;
        setTimeout(loadingCounter, 50);
      }
    }
    loadingCounter();

    app
      .load("./src/scene.splinecode")
      .then(() => {
        counter = 100;
        document.querySelector("#loadingCounter").textContent = "100%";

        document.querySelector(".loadingSection").style.opacity = "0";
        document.body.style.overflow = "auto";
      })
      .catch((error) => {
        console.error("Error loading the 3D scene:", error);

        document.querySelector("#loadingCounter").textContent = "Load Error";
      });
  } else {
    // ----------- Video Handling -----------

    const mainSec = document.querySelector(".mainSec");
    const videoElement = document.createElement("video");
    videoElement.className = "headerVid";
    videoElement.setAttribute("width", "100%");
    videoElement.setAttribute("height", "100%");
    videoElement.poster = "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/hero-placeholder.webp";

    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;

    const sourceMP4 = document.createElement("source");
    sourceMP4.src = "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/home-hero.mp4";
    sourceMP4.type = "video/mp4";
    const sourceWEBM = document.createElement("source");
    sourceWEBM.src = "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/home-hero.webm";
    sourceWEBM.type = "video/webm";

    videoElement.appendChild(sourceMP4);
    videoElement.appendChild(sourceWEBM);
    mainSec.appendChild(videoElement);

    document.querySelector("#mainText").style.display = "flex";
    document.querySelector("#mainText").style.opacity = 1;

    let counter = 0;
    function loadingCounter() {
      const loadingCounterElement = document.querySelector("#loadingCounter");

      if (counter < 100) {
        loadingCounterElement.textContent = counter + "%";
        counter++;
        setTimeout(loadingCounter, 50);
      }
    }
    loadingCounter();

    videoElement.addEventListener(
      "canplaythrough",
      () => {
        counter = 100;
        document.querySelector("#loadingCounter").textContent = "100%";

        document.querySelector(".loadingSection").style.opacity = "0";
        document.body.style.overflow = "auto";
      },
      { once: true }
    );

    videoElement.addEventListener("error", () => {
      console.error("Error loading the video.");
      document.querySelector("#loadingCounter").textContent = "Load Error";
    });
  }
}

checkVRAMAndWebGLSupport();
