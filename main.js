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
  const text = document.querySelector(".health-text");

  if (!section || circles.length === 0 || !text) return;

  // فعال‌سازی انیمیشن‌ها
  const activateElements = () => {
    text.classList.add("active");

    circles.forEach((circle, index) => {
      setTimeout(() => {
        circle.classList.add("active");
      }, index * 250);
    });
  };

  // بازگشت به حالت اولیه
  const resetElements = () => {
    text.classList.remove("active");
    circles.forEach((circle) => circle.classList.remove("active"));
  };

  // مشاهده ورود/خروج سکشن
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activateElements();
        else resetElements();
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
});

const btnIOS = document.getElementById("btn-ios");
const btnAndroid = document.getElementById("btn-android");
const iosLinks = document.getElementById("ios-links");
const androidLinks = document.getElementById("android-links");
const phoneImage = document.getElementById("phone-image");

btnIOS.addEventListener("click", () => {
  // Remove classes from iOS button
  btnIOS.classList.remove(
    "text-gray-600",
    "bg-white",
    "border",
    "border-gray-200"
  );

  // Add active classes to iOS button
  btnIOS.classList.add("bg-pink-300", "text-white");

  // Update iOS SVG color
  const iosSvg = btnIOS.querySelector("svg");
  iosSvg.classList.remove("text-gray-600");
  iosSvg.classList.add("text-white");

  // Remove active classes from Android button
  btnAndroid.classList.remove("bg-pink-300", "text-white");
  btnAndroid.classList.add(
    "text-gray-600",
    "bg-white",
    "border",
    "border-gray-200"
  );

  // Update Android SVG color
  const androidSvg = btnAndroid.querySelector("svg");
  androidSvg.classList.remove("text-white");
  androidSvg.classList.add("text-gray-600");

  iosLinks.classList.remove("hidden");
  androidLinks.classList.add("hidden");
  phoneImage.src = "assets/ios-phone.svg";
});

btnAndroid.addEventListener("click", () => {
  // Remove classes from Android button
  btnAndroid.classList.remove(
    "text-gray-600",
    "bg-white",
    "border",
    "border-gray-200"
  );

  // Add active classes to Android button
  btnAndroid.classList.add("bg-pink-300", "text-white");

  // Update Android SVG color
  const androidSvg = btnAndroid.querySelector("svg");
  androidSvg.classList.remove("text-gray-600");
  androidSvg.classList.add("text-white");

  // Remove active classes from iOS button
  btnIOS.classList.remove("bg-pink-300", "text-white");
  btnIOS.classList.add(
    "text-gray-600",
    "bg-white",
    "border",
    "border-gray-200"
  );

  // Update iOS SVG color
  const iosSvg = btnIOS.querySelector("svg");
  iosSvg.classList.remove("text-white");
  iosSvg.classList.add("text-gray-600");

  androidLinks.classList.remove("hidden");
  iosLinks.classList.add("hidden");
  phoneImage.src = "assets/android-phone.svg";
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  // بستن همه
  items.forEach((item) => closeItem(item));

  // باز کردن اولی
  openItem(items[0]);

  items.forEach((item) => {
    const header = item.querySelector(".faq-header");

    header.addEventListener("click", () => {
      const body = item.querySelector(".faq-body");
      const isOpen = body.classList.contains("open");

      // بستن بقیه
      items.forEach(closeItem);

      if (!isOpen) openItem(item);
    });
  });

  function openItem(item) {
    const body = item.querySelector(".faq-body");
    const icon = item.querySelector(".faq-icon");
    const title = item.querySelector("h3");

    body.classList.add("open");
    icon.classList.add("rotate-180");
    title.classList.add("text-pink-500");
  }

  function closeItem(item) {
    const body = item.querySelector(".faq-body");
    const icon = item.querySelector(".faq-icon");
    const title = item.querySelector("h3");

    body.classList.remove("open");
    icon.classList.remove("rotate-180");
    title.classList.remove("text-pink-500");
  }
});

const li = document.querySelector("li");
const svgPaths = li.querySelectorAll("svg path");

li.addEventListener("mouseenter", () => {
  svgPaths.forEach((p) => p.setAttribute("stroke", "#c83067")); // رنگ دلخواه
});

li.addEventListener("mouseleave", () => {
  svgPaths.forEach((p) => p.setAttribute("stroke", "#292D32")); // رنگ اولیه
});
