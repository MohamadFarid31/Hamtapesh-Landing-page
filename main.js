// Constants
const MOBILE_BREAKPOINT = 768;
const HEALTH_ANIMATION_DELAY = 250;
const HEALTH_INTERSECTION_THRESHOLD = 0.4;
const COLORS = {
  primary: "#c83067",
  default: "#292D32",
};

// Hero Section - Background & Circles
const initHeroSection = () => {
  const elements = {
    img: document.getElementById("hero-img"),
    bg: document.getElementById("pink-bg"),
    circles: [
      document.querySelector(".circle-1"),
      document.querySelector(".circle-2"),
      document.querySelector(".circle-3"),
      document.querySelector(".circle-4"),
    ],
  };

  if (!elements.img || !elements.bg || elements.circles.some((c) => !c)) return;

  const updateBgHeight = () => {
    const imgHeight = elements.img.offsetHeight;
    if (imgHeight > 0) {
      elements.bg.style.height = `${imgHeight * 0.8}px`;
    }
  };

  const adjustCirclePosition = () => {
    const [circle1, circle2, circle3, circle4] = elements.circles;
    const h1 = circle1.offsetHeight;
    const h2 = circle2.offsetHeight;
    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`
    ).matches;
    const offset = isMobile ? 12 : 8;
    const diff = h1 - h2;
    const diffMinusOffset = diff - offset;

    circle1.style.left = `${-diffMinusOffset / 2}px`;

    const h3 = h2 - diff;
    circle3.style.height = `${h3}px`;
    circle3.style.left = `${diff / 2 + 10}px`;

    const h4 = h3 - (h2 - h3);
    circle4.style.height = `${h4}px`;
    circle4.style.left = `${diff + (isMobile ? 12 : 10)}px`;
  };

  const updateLayout = () => {
    updateBgHeight();
    adjustCirclePosition();
  };

  if (elements.img.complete) {
    updateLayout();
  } else {
    elements.img.onload = updateLayout;
  }

  window.addEventListener("resize", updateLayout);
};

// Health Section - Animated Circles
const initHealthSection = () => {
  const section = document.querySelector(".health-section");
  const circles = document.querySelectorAll(".health-circle");
  const text = document.querySelector(".health-text");

  if (!section || circles.length === 0 || !text) return;

  const activateElements = () => {
    text.classList.add("active");
    circles.forEach((circle, index) => {
      setTimeout(() => {
        circle.classList.add("active");
      }, index * HEALTH_ANIMATION_DELAY);
    });
  };

  const resetElements = () => {
    text.classList.remove("active");
    circles.forEach((circle) => circle.classList.remove("active"));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateElements();
        } else {
          resetElements();
        }
      });
    },
    { threshold: HEALTH_INTERSECTION_THRESHOLD }
  );

  observer.observe(section);
};

// OS Selector - Toggle iOS/Android
const initOSSelector = () => {
  const elements = {
    btnIOS: document.getElementById("btn-ios"),
    btnAndroid: document.getElementById("btn-android"),
    iosLinks: document.getElementById("ios-links"),
    androidLinks: document.getElementById("android-links"),
    phoneImage: document.getElementById("phone-image"),
  };

  if (Object.values(elements).some((el) => !el)) return;

  const activeClasses = ["bg-pink-300", "text-white"];
  const inactiveClasses = [
    "text-gray-600",
    "bg-white",
    "border",
    "border-gray-200",
  ];

  const toggleButton = (activeBtn, inactiveBtn, isActive) => {
    const activeSvg = activeBtn.querySelector("svg");
    const inactiveSvg = inactiveBtn.querySelector("svg");

    if (isActive) {
      activeBtn.classList.remove(...inactiveClasses);
      activeBtn.classList.add(...activeClasses);
      activeSvg.classList.remove("fill-gray-600");
      activeSvg.classList.add("fill-white");

      inactiveBtn.classList.remove(...activeClasses);
      inactiveBtn.classList.add(...inactiveClasses);
      inactiveSvg.classList.remove("fill-white");
      inactiveSvg.classList.add("fill-gray-600");
    }
  };

  elements.btnIOS.addEventListener("click", () => {
    toggleButton(elements.btnIOS, elements.btnAndroid, true);
    elements.iosLinks.classList.remove("hidden");
    elements.androidLinks.classList.add("hidden");
    elements.phoneImage.src = "assets/ios-phone.svg";
    elements.phoneImage.alt = "iOS App";
  });

  elements.btnAndroid.addEventListener("click", () => {
    toggleButton(elements.btnAndroid, elements.btnIOS, true);
    elements.androidLinks.classList.remove("hidden");
    elements.iosLinks.classList.add("hidden");
    elements.phoneImage.src = "assets/android-phone.svg";
    elements.phoneImage.alt = "Android App";
  });
};

// FAQ Accordion
const initFAQ = () => {
  const items = document.querySelectorAll(".faq-item");
  if (items.length === 0) return;

  const toggleItem = (item, shouldOpen) => {
    const body = item.querySelector(".faq-body");
    const icon = item.querySelector(".faq-icon");
    const title = item.querySelector("h3");

    if (!body || !icon || !title) return;

    const action = shouldOpen ? "add" : "remove";
    body.classList[action]("open");
    icon.classList[action]("rotate-180");
    title.classList[action]("text-pink-500");
  };

  // Initialize: Close all, open first
  items.forEach((item) => toggleItem(item, false));
  toggleItem(items[0], true);

  items.forEach((item) => {
    const header = item.querySelector(".faq-header");
    if (!header) return;

    header.addEventListener("click", () => {
      const body = item.querySelector(".faq-body");
      const isOpen = body?.classList.contains("open");

      items.forEach((i) => toggleItem(i, false));
      if (!isOpen) toggleItem(item, true);
    });
  });
};

// Footer Links Hover Effect
const initFooterLinks = () => {
  const footerLinks = document.querySelectorAll("footer li");

  footerLinks.forEach((li) => {
    const svgPaths = li.querySelectorAll("svg path");
    if (svgPaths.length === 0) return;

    li.addEventListener("mouseenter", () => {
      svgPaths.forEach((path) => path.setAttribute("stroke", COLORS.primary));
    });

    li.addEventListener("mouseleave", () => {
      svgPaths.forEach((path) => path.setAttribute("stroke", COLORS.default));
    });
  });
};

// Initialize all modules
document.addEventListener("DOMContentLoaded", () => {
  initHeroSection();
  initHealthSection();
  initOSSelector();
  initFAQ();
  initFooterLinks();
});
