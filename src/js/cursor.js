// تغییر افکت کرسر
const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", e => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(function loop() {
  const easting = 8;
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

  cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
  requestAnimationFrame(loop);
});

document.querySelectorAll("[data-cursor]").forEach(item => {
  item.addEventListener("mouseover", e => {
    if (item.dataset.cursor === "pointer") {
      cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .6)";
      cursorBorder.style.setProperty("--size", "30px");
    }
    //-------------
    else if (item.dataset.cursor === "pointer2") {
      cursorBorder.style.backgroundColor = "white";
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.setProperty("--size", "80px");
    }
    //-------------
    else if (item.dataset.cursor === "pointer3") {
      cursorBorder.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      cursorBorder.style.setProperty("--size", "30px");
    }
    //-------------
    else if (item.dataset.cursor === "pointerDisable") {
      cursorBorder.style.zIndex = "-999";
      cursor.style.zIndex = "-999";
    }
    //-------------
    else if (item.dataset.cursor === "pointerNoOutLine") {
      cursorBorder.style.boxShadow = "none";

      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    }
    //-------------
    else if (item.dataset.cursor === "pointerNoOutLineBlendMode") {
      cursorBorder.style.backgroundColor = "white";
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.setProperty("--size", "80px");
    }
  });
  item.addEventListener("mouseout", e => {
    cursorBorder.style.boxShadow = "0 0 0 1px white";
    cursorBorder.style.backgroundColor = "unset";
    cursorBorder.style.mixBlendMode = "unset";
    cursorBorder.style.setProperty("--size", "50px");
    cursorBorder.style.zIndex = "999";
    cursor.style.zIndex = "999";

    cursor.style.width = "10px";
    cursor.style.height = "10px";
    cursor.style.backgroundColor = "white";
    cursor.style.mixBlendMode = "unset";
  });
});
