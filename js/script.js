// Знаходимо елементи
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__list");
const navItems = document.querySelectorAll(".header__item");

// Додаємо обробник події для бургера
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  menu.classList.toggle("active");
});

// Закриваємо меню при кліку на пункт
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    burger.classList.remove("open");
    menu.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector(".popup");
  const popupBody = document.querySelector(".popup__body");
  const openBtns = document.querySelectorAll(".open-popup-btn"); // ВСІ кнопки
  const closeBtn = document.querySelector(".popup__close");
  const closeContent = document.querySelector(".popup__content");

  // Відкриття попапу на всі кнопки
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Закриття попапу через кнопку закриття
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Закриття попапу при кліку на фон (за межами контенту)
  document.addEventListener("click", function (e) {
    if (
      popup.classList.contains("active") &&
      !closeContent.contains(e.target) &&
      ![...openBtns].includes(e.target)
    ) {
      popup.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

const readMoreBtn = document.getElementById("about-read-more");
const readMoreText = document.getElementById("read-more");

readMoreBtn.addEventListener("click", () => {
  if (readMoreText.classList.contains("open")) {
    readMoreText.classList.remove("open");
    readMoreBtn.textContent = "Read more";
  } else {
    readMoreText.classList.add("open");
    readMoreBtn.textContent = "Hide";
  }
});

// Коли DOM повністю завантажився
document.addEventListener("DOMContentLoaded", function () {
  // Отримуємо всі кнопки фільтрації
  const buttons = document.querySelectorAll(".portfolio__filters button");

  // Отримуємо всі елементи портфоліо
  const items = document.querySelectorAll(".portfolio__item");

  // Перебираємо кнопки
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter"); // яку категорію обрано

      items.forEach((item) => {
        const category = item.getAttribute("data-category");

        // Якщо обрано "all" або категорія співпадає з фільтром
        if (filter === "all" || category === filter) {
          item.style.display = "block"; // показуємо
        } else {
          item.style.display = "none"; // ховаємо
        }
      });
    });
  });
});
const filterButtons = document.querySelectorAll(".portfolio__filters button");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".portfolio__item");
  const showMoreBtn = document.querySelector(".portfolio__show-more");
  const hideBtn = document.querySelector(".portfolio__hide");
  const filterButtons = document.querySelectorAll(".portfolio__filters button");

  let isExpanded = false;
  let currentFilter = "all";

  // Фільтрація елементів
  function filterItems() {
    items.forEach((item) => {
      const category = item.dataset.category;
      if (currentFilter === "all" || category === currentFilter) {
        item.style.display = ""; // показати
      }
    });
  }

  // Оновлення видимості елементів з урахуванням мобільності, розширення та фільтра
  function updateVisibility() {
    const isMobile = window.innerWidth <= 576;
    const initialCount = isMobile ? 3 : items.length;

    let visibleIndex = 0;

    items.forEach((item) => {
      if (item.style.display !== "none") {
        if (!isMobile || isExpanded || visibleIndex < initialCount) {
          item.classList.add("visible");
        } else {
          item.classList.remove("visible");
        }
        visibleIndex++;
      } else {
        item.classList.remove("visible");
      }
    });

    // Кнопки керування для мобільної версії
    if (isMobile) {
      const totalVisible = Array.from(items).filter(
        (item) => item.style.display !== "none"
      ).length;

      showMoreBtn.style.display =
        !isExpanded && totalVisible > initialCount ? "block" : "none";
      hideBtn.style.display = isExpanded ? "block" : "none";
    } else {
      showMoreBtn.style.display = "none";
      hideBtn.style.display = "none";
    }
  }

  // Обробники фільтрів
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentFilter = btn.dataset.filter;
      isExpanded = false; // скидаємо "показати ще" при зміні фільтра
      filterItems();
      updateVisibility();
    });
  });

  // Обробники кнопок
  showMoreBtn.addEventListener("click", () => {
    isExpanded = true;
    updateVisibility();
  });

  hideBtn.addEventListener("click", () => {
    isExpanded = false;
    updateVisibility();
  });

  // Ініціалізація при завантаженні
  filterItems();
  updateVisibility();

  // Адаптація при зміні розміру вікна
  window.addEventListener("resize", updateVisibility);
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  slidesPerView: 2,
  slidesPerGroup: 2,
  loop: true,
  speed: 1000,
  spaceBetween: 30,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    220: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});

// Перший елемент
const movable1 = document.getElementById("move-me-1");
const originalParent1 = document.querySelector(".footer__text");
const targetParent1 = document.querySelector(".footer__contacts");

// Другий елемент
const movable2 = document.getElementById("move-me-2");
const originalParent2 = document.querySelector(".footer__nav");
const targetParent2 = document.querySelector(".footer__text");

function moveElements() {
  // Переміщення першого елемента
  if (window.innerWidth < 768) {
    if (!targetParent1.contains(movable1)) {
      targetParent1.appendChild(movable1);
    }
    if (!targetParent2.contains(movable2)) {
      targetParent2.appendChild(movable2);
    }
  } else {
    if (!originalParent1.contains(movable1)) {
      originalParent1.appendChild(movable1);
    }
    if (!originalParent2.contains(movable2)) {
      originalParent2.appendChild(movable2);
    }
  }
}

window.addEventListener("resize", moveElements);
window.addEventListener("DOMContentLoaded", moveElements);

// Анімація при завантаженні
gsap.from(".header", {
  y: -50,
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
});

gsap.from(".section-main__main-title", {
  y: 50,
  opacity: 0,
  duration: 2,
  delay: 0.5,
  ease: "power2.out",
});

gsap.from(".section-main__title", {
  y: 50,
  opacity: 0,
  duration: 2,
  delay: 1,
  ease: "power2.out",
});

gsap.from(".section-main__button", {
  y: 50,
  opacity: 0,
  duration: 2,
  delay: 1.5,
  ease: "power2.out",
});

gsap.from(".section-main_image", {
  x: 150,
  opacity: 0,
  duration: 3,
  delay: 1,
  ease: "power2.out",
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade-up").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: 150,
    opacity: 0,
    duration: 2,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".fade-left").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    x: -50,
    opacity: 0,
    duration: 2,
    delay: 1,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".fade-right").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: -150,
    opacity: 0,
    duration: 2,
    delay: 2,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".fade-top").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: -50,
    opacity: 0,
    duration: 2,
    delay: 1,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".fade-scale").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: -50,
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out",
  });
});
gsap.utils.toArray(".fade-scale2").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: -50,
    scale: 0,
    opacity: 0,
    duration: 1.5,
    delay: 1.5,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".fade-scale3").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: -50,
    scale: 0,
    opacity: 0,
    duration: 1.5,
    delay: 2,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".fade-scale4").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: -50,
    scale: 0,
    opacity: 0,
    duration: 2,
    delay: 2.3,
    ease: "power2.out",
  });
});
gsap.utils.toArray(".fade-up3").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: 150,
    opacity: 0,
    duration: 2,
    delay: 2,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".fade-right2").forEach((el) => {
   gsap.from(el, {
     scrollTrigger: el,
     x: -150,
     opacity: 0,
     duration: 1.5,
     delay: 1.5,
     ease: "power2.out",
   });
 });

 gsap.utils.toArray(".fade-right3").forEach((el) => {
   gsap.from(el, {
     scrollTrigger: el,
     y: 150,
     opacity: 0,
     duration: 1.5,
     delay: 2,
     ease: "power2.out",
   });
 });

 gsap.utils.toArray(".fade-right4").forEach((el) => {
   gsap.from(el, {
     scrollTrigger: el,
     x: 150,
     opacity: 0,
     duration: 1.5,
     delay: 2.3,
     ease: "power2.out",
   });
 });

 gsap.utils.toArray(".fade-top-1").forEach((el) => {
   gsap.from(el, {
     scrollTrigger: el,
     y: -150,
     opacity: 0,
     duration: 1.5,
     delay: 1.5,
     ease: "power2.out",
   });
 });
 gsap.utils.toArray(".fade-top-2").forEach((el) => {
   gsap.from(el, {
     scrollTrigger: el,
     y: -150,
     opacity: 0,
     duration: 1.5,
     delay: 2,
     ease: "power2.out",
   });
 });

 gsap.utils.toArray(".fade-top-3").forEach((el) => {
   gsap.from(el, {
     scrollTrigger: el,
     y: 150,
     opacity: 0,
     duration: 1.5,
     delay: 1,
     ease: "power2.out",
   });
 });

