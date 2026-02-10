const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animatedCards = document.querySelectorAll(".skill-grid article, .impact-grid article, .timeline-item");

animatedCards.forEach((card, index) => {
  card.style.setProperty("--stagger", `${120 + index * 55}ms`);
});

if (prefersReducedMotion) {
  revealItems.forEach((el) => el.classList.add("visible"));
} else {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("visible"));
  }
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const setActiveNav = () => {
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.removeAttribute("aria-current");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.setAttribute("aria-current", "page");
    }
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", setActiveNav);
