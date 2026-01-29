const VIDEO_URLS = {
  poster: "./assets/home-hero.jpg",
  mp4: "./assets/home-hero.mp4",
  webm: "./assets/home-hero.webm",
};

const SELECTORS = {
  sceneHolder: "#sceneHolder",
  loadingSection: ".loadingSection",
  loadingCounter: "#loadingCounter",
  mainText: "#mainText",
  canvas3d: "#canvas3d",
};

const createVideoElement = () => {
  const video = document.createElement("video");
  video.className = "headerVid";
  video.setAttribute("width", "100%");
  video.setAttribute("height", "100%");
  video.poster = VIDEO_URLS.poster;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  const mp4 = document.createElement("source");
  mp4.src = VIDEO_URLS.mp4;
  mp4.type = "video/mp4";
  video.appendChild(mp4);

  const webm = document.createElement("source");
  webm.src = VIDEO_URLS.webm;
  webm.type = "video/webm";
  video.appendChild(webm);

  return video;
};

const createLoadingCounter = (callback) => {
  let counter = 0;
  const counterEl = document.querySelector(SELECTORS.loadingCounter);

  const update = () => {
    if (counter < 100) {
      counterEl.textContent = counter + "%";
      counter++;
      setTimeout(update, 50);
    } else {
      callback();
    }
  };
  update();
};

const finishLoading = () => {
  document.querySelector(SELECTORS.loadingCounter).textContent = "100%";
  document.querySelector(SELECTORS.loadingSection).style.opacity = "0";
  document.body.style.overflow = "auto";
};

const appendVideoToScene = (container, showText = false) => {
  container.innerHTML = "";
  const video = createVideoElement();
  container.appendChild(video);

  if (showText) {
    const mainText = document.querySelector(SELECTORS.mainText);
    mainText.style.display = "flex";
    mainText.style.opacity = 1;
  }

  createLoadingCounter(finishLoading);

  video.addEventListener("canplaythrough", finishLoading, { once: true });
  video.addEventListener("error", () => {
    console.error("Error loading the video.");
    document.querySelector(SELECTORS.loadingCounter).textContent = "Load Error";
  });
};

const initializeScene = () => {
  if (window.canRender3D === false) {
    appendVideoToScene(document.querySelector(SELECTORS.sceneHolder), true);
    return;
  }

  if (window.canRender3D === true) {
    try {
      import("@splinetool/runtime")
        .then(({ Application }) => {
          const sceneHolder = document.querySelector(SELECTORS.sceneHolder);
          const canvas3D = document.createElement("canvas");
          canvas3D.className = "header3D";
          canvas3D.id = "canvas3d";
          sceneHolder.appendChild(canvas3D);

          const app = new Application(canvas3D);

          createLoadingCounter(() => {});

          app
            .load("../src/treeJs/scene.splinecode")
            .then(() => finishLoading())
            .catch((error) => {
              console.error("Error loading 3D scene:", error);
              document.querySelector(SELECTORS.loadingCounter).textContent = "Load Error";
              setTimeout(() => appendVideoToScene(sceneHolder), 1000);
            });
        })
        .catch((error) => {
          console.error("Error importing Spline runtime:", error);
          appendVideoToScene(document.querySelector(SELECTORS.sceneHolder), true);
        });
    } catch (error) {
      console.error("Error initializing 3D scene:", error);
      appendVideoToScene(document.querySelector(SELECTORS.sceneHolder), true);
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeScene);
} else {
  initializeScene();
}
