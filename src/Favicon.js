const faviconImages = [
  "../assets/fav/BOXeye0.png",
  "../assets/fav/BOXeye1.png",
  "../assets/fav/BOXeye2.png",
  "../assets/fav/BOXeye3.png",
  "../assets/fav/BOXeye4.png",
];

let imageCounter = 0;
let direction = 1;
let faviconElement;
let intervalId;

function preloadImages() {
  faviconImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function initFavicon() {
  faviconElement = document.querySelector("link[rel='icon']");

  if (!faviconElement) {
    faviconElement = document.createElement("link");
    faviconElement.rel = "icon";
    faviconElement.type = "image/png";
    document.head.appendChild(faviconElement);
  }

  faviconElement.href = faviconImages[0];
}

function updateFavicon() {
  imageCounter += direction;

  if (imageCounter >= faviconImages.length - 1) {
    direction = -1;
  } else if (imageCounter <= 0) {
    direction = 1;
  }

  faviconElement.href = faviconImages[imageCounter];
}

preloadImages();
initFavicon();
intervalId = setInterval(updateFavicon, 300);
