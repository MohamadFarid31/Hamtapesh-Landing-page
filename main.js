document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("hero-img");
  const bg = document.getElementById("pink-bg");

  const circle1 = document.querySelector(".circle-1");
  const circle2 = document.querySelector(".circle-2");
  const circle3 = document.querySelector(".circle-3");
  const circle4 = document.querySelector(".circle-4");

  if (!img || !bg || !circle1 || !circle2 || !circle3 || !circle4) return;

  // تنظیم ارتفاع بک‌گراند
  function updateBgHeight() {
    const imgHeight = img.offsetHeight;
    if (imgHeight > 0) bg.style.height = imgHeight * 0.8 + "px";
  }

  // الگوریتم تنظیم موقعیت و ارتفاع دایره‌ها
  function adjustCirclePosition() {
    const h1 = circle1.offsetHeight;
    const h2 = circle2.offsetHeight;

    // بررسی اندازه‌ی صفحه (media query در JS)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const offset = isMobile ? 12 : 8;

    const diffMinusOffset = h1 - h2 - offset;
    const diff = h1 - h2;

    // circle1
    circle1.style.left = `${-diffMinusOffset / 2}px`;

    // circle3
    const h3 = h2 - (h1 - h2);
    circle3.style.height = `${h3}px`;
    circle3.style.left = `${diff / 2 + 10}px`;

    // circle4
    const h4 = h3 - (h2 - h3);
    circle4.style.height = `${h4}px`;
    const px = isMobile ? 12 : 10;
    circle4.style.left = `${diff + px}px`;
  }

  // تابع اصلی بروزرسانی
  function safeUpdate() {
    updateBgHeight();
    adjustCirclePosition();
  }

  if (img.complete) {
    safeUpdate();
  } else {
    img.onload = safeUpdate;
  }

  window.addEventListener("resize", safeUpdate);
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".health-section");
  const circles = document.querySelectorAll(".health-circle");

  if (!section || circles.length === 0) return;

  // تابع فعال‌سازی انیمیشن
  const activateCircles = () => {
    circles.forEach((circle, index) => {
      setTimeout(() => {
        circle.classList.add("active");
      }, index * 250); // تاخیر تدریجی
    });
  };

  // تابع برگشت به حالت اولیه
  const resetCircles = () => {
    circles.forEach((circle) => {
      circle.classList.remove("active");
    });
  };

  // استفاده از IntersectionObserver برای تشخیص ورود/خروج سکشن از دید کاربر
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateCircles();
        } else {
          resetCircles();
        }
      });
    },
    { threshold: 0.4 } // وقتی حدود 40٪ سکشن دیده شد فعال بشه
  );

  observer.observe(section);
});
