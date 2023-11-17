const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", e => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

const easting = 8;

function loop() {
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;
  cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

document.querySelectorAll("[data-cursor]").forEach(item => {
  item.addEventListener("mouseover", e => {
    switch (item.dataset.cursor) {
      case "pointer3":
        cursorBorder.style.display = "none";
        cursor.style.setProperty("--sizeMainCursor", "5px");
        cursor.style.backgroundColor = "black";
        break;
      case "pointerDisable":
        cursorBorder.style.display = "none";
        cursor.style.display = "none";
        break;
      case "pointerBlendMode":
        cursorBorder.style.backgroundColor = "white";
        cursorBorder.style.mixBlendMode = "difference";
        cursorBorder.style.setProperty("--size", "80px");
        break;
      case "pointerLink":
        cursorBorder.style.display = "none";

        cursor.style.setProperty("--sizeMainCursor", "120px");
        cursor.style.backgroundImage =
          "url(https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/arrow-up-right-black.svg?v=1700189666557)";
        cursor.style.backgroundRepeat = "no-repeat";
        cursor.style.backgroundSize = "40px 40px";
        cursor.style.backgroundPosition = "40px 40px";

        break;
      case "pointerWaveBorder":
        cursorBorder.style.display = "none";

        cursor.style.setProperty("--sizeMainCursor", "120px");
        cursor.style.background =
          "linear-gradient(120deg, #ffffff, #000000, #ffffff, #000000, #ffffff)";
        cursor.style.animation =
          "blobRadius 5s ease infinite, blobBackground 15s ease infinite";
        cursor.style.backgroundSize = " 1600% 1600%";
        cursor.style.mixBlendMode = "difference";

        break;
      case "pointerLine":
        cursorBorder.style.animation = "blobRadius 5s ease infinite";
        cursor.style.setProperty("--sizeMainCursor", "30px");
        cursor.style.backgroundImage =
          "url(https://cdn.glitch.global/8352fc0e-bebe-4680-ae0b-269da8b54259/arrow-up-right-white.svg?v=1700189665777)";
        cursor.style.backgroundRepeat = "no-repeat";
        cursor.style.backgroundSize = "30px 30px";
        cursor.style.backgroundColor = "unset";

        break;
    }
  });

  item.addEventListener("mouseout", e => {
    cursorBorder.style.boxShadow = "0 0 0 1px white";

    cursor.style.backgroundImage = "unset";

    cursorBorder.style.backgroundColor = "unset";
    cursorBorder.style.mixBlendMode = "unset";

    cursorBorder.style.setProperty("--size", "50px");
    cursor.style.setProperty("--sizeMainCursor", "10px");

    if (window.innerWidth < 768) {
      cursorBorder.style.display = "none";
      cursor.style.display = "none";
    } else {
      cursorBorder.style.display = "inline";
      cursor.style.display = "inline";
    }

    cursor.style.animation = "unset";
    cursorBorder.style.animation = "unset";

    cursor.style.backgroundColor = "white";
    cursor.style.mixBlendMode = "unset";

    cursor.style.width = "var(--sizeMainCursor)";
    cursor.style.borderRadius = "50%";
  });
});
