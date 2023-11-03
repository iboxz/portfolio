// data-scroll-speed ----------------------------------------------------------

$.fn.moveIt = function () {
  var $window = $(window);
  var instances = [];

  $(this).each(function () {
    instances.push(new moveItItem($(this)));
  });

  window.addEventListener(
    "scroll",
    function () {
      var scrollTop = $window.scrollTop();
      instances.forEach(function (inst) {
        inst.update(scrollTop);
      });
    },
    { passive: true }
  );
};

var moveItItem = function (el) {
  this.el = $(el);
  this.speed = parseInt(this.el.attr("data-scroll-speed"));
};

moveItItem.prototype.update = function (scrollTop) {
  this.el.css("transform", "translateY(" + -(scrollTop / this.speed) + "px)");
};

// Initialization
$(function () {
  $("[data-scroll-speed]").moveIt();
});

// -----------------






//ایمپورت المنت اچ تی ام ال از فایل مجزا--------------------------------

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("includeHTML");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("includeHTML");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}
includeHTML();

//تا پایان انیمیشن اسپلش اسکرین اجازه اسکرول به کاربر نمیده-----------------------
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.body.style.overflow = "auto";
  }, 7500);
});


/* //   با ریسپانس به اسکرولsvg نمایش تدریجی----------------------------------
// Get the id of the <path> element and the length of <path>
var triangle = document.getElementById("triangle");
var length = triangle.getTotalLength();

// The start position of the drawing
triangle.style.strokeDasharray = length;

// Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
triangle.style.strokeDashoffset = length;

// Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
window.addEventListener("scroll", myFunction);

function myFunction() {
  var scrollpercent =
    (document.body.scrollTop + document.documentElement.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);

  // Adjust the threshold to 0.5 to make it appear at 200vh
  var threshold = 1.1;
  if (scrollpercent >= threshold) {
    // If scroll percentage exceeds the threshold, set dash offset to zero to show the whole SVG
    triangle.style.strokeDashoffset = 0;
  } else {
    var draw = length * (scrollpercent / threshold);
    // Reverse the drawing (when scrolling upwards)
    triangle.style.strokeDashoffset = length - draw;
  }
}
 */

// --- کج کردن تکس بر اساس سرعت اسکرول ----------------------------------------------

const section = document.querySelector(".Skew-Scrolling");

let currentPos = window.scrollY;

const update = () => {
  const newPos = window.scrollY;
  const diff = newPos - currentPos;
  const speed = diff * 0.2;

  section.style.transform = `skewY(${speed}deg)`;

  currentPos = newPos;

  requestAnimationFrame(update);
};

update();

// محاسبه سن-----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  function calculateAge(birthDate) {
    const now = new Date();
    const birth = new Date(birthDate);
    const ageInMilliseconds = now - birth;
    const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
    const years = Math.floor(ageInSeconds / (365 * 24 * 60 * 60));
    const months = Math.floor(
      (ageInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
    );
    const days = Math.floor(
      (ageInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
    );
    const hours = Math.floor((ageInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((ageInSeconds % (60 * 60)) / 60);
    const seconds = ageInSeconds % 60;

    return {
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function updateAge() {
    const birthDate = "2005-02-01T01:10:05"; // تاریخ تولد به فرمت ISO 8601
    const age = calculateAge(birthDate);
    const ageYearsElement = document.getElementById("ageInYears");
    ageYearsElement.textContent = `${age.years} years, ${age.months} months`;

    const ageSecendElement = document.getElementById("ageInSeconds");
    ageSecendElement.textContent = `${age.days} days, ${age.hours} hours, ${age.minutes} minutes, ${age.seconds} seconds`;
  }

  updateAge();
  setInterval(updateAge, 1000);
});

// موومنت گربه بالا صفحه با ریکیشن به پوزیشن موس----------------------------------------

$(document).ready(function () {
  $(".water").mousemove(function (event) {
    var cat = $(".moving-cat");
    var mouseX = event.pageX - $(window).scrollLeft();
    var mouseY = event.pageY - $(window).scrollTop();

    function animate() {
      var catX = cat.offset().left;
      var catY = cat.offset().top;

      var deltaX = (mouseX - catX) / 10;
      var deltaY = (mouseY - catY) / 10;

      cat.css({
        transform: "translate(" + deltaX + "px, " + deltaY + "px)",
      });

      requestAnimationFrame(animate);
    }

    animate();
  });
});

// جا به جایی گیف شهر بر اساس اسکرول -------------------------------------------------

// ----------------------- هاید و شو کردن وکتور اسکرول بالا صفحه

var isMouseHidden = false; // این متغیر وضعیت مخفی بودن موس را نشان می‌دهد

window.addEventListener("scroll", function () {
  var mouseElement = document.querySelector(".mouse");

  // اگر موس وجود دارد و در حالت نمایش است و کاربر به بالا اسکرول کرده است
  if (mouseElement && !isMouseHidden && window.scrollY > 0) {
    // اضافه کردن کلاس 'hidden' برای اجرای انیمیشن
    mouseElement.classList.add("hidden");

    // تغییر وضعیت مخفی بودن موس به 'true'
    isMouseHidden = true;
  }

  // اگر کاربر به بالا اسکرول کرده و موس مخفی شده است، نمایش موس با انیمیشن
  if (isMouseHidden && window.scrollY === 0) {
    mouseElement.classList.remove("hidden");

    // تغییر وضعیت مخفی بودن موس به 'false'
    isMouseHidden = false;
  }

  const paralaxTitles = document.getElementById("imgCity");

  const scrollY = window.scrollY;
  paralaxTitles.style.transform = `translateX(-${
    (scrollY - window.innerHeight) / 10
  }px)`;
});

// -----------------------------------
