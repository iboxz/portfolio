const faviconImages = [
    "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/eye1.png?v=1700242730809",
    "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/eye2.png?v=1700242729942",
    "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/eye3.png?v=1700242729271",
    "https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/eye4.png?v=1700242728579",
  ];
  let imageCounter = 0;
  let intervalId;
  
  function updateFavicon() {
    const currentFavicon = document.querySelector("link[rel='icon']");
    if (currentFavicon !== null) {
      currentFavicon.parentNode.removeChild(currentFavicon);
    }
  
    const shortcutFavicon = document.querySelector("link[rel='shortcut icon']");
    if (shortcutFavicon !== null) {
      shortcutFavicon.parentNode.removeChild(shortcutFavicon);
    }
  
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = faviconImages[imageCounter];
    newFavicon.type = "image/gif";
    document.head.appendChild(newFavicon);
  
    imageCounter = (imageCounter + 1) % faviconImages.length;
  }
  
  intervalId = setInterval(updateFavicon, 1000);
  