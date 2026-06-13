import { initContactForm } from "./contact.js";
import { initVisuals } from "./visuals.js";

document.documentElement.classList.add("js");

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initNavigation() {
  const nav = document.querySelector(".site-nav");
  const mobileNav = document.getElementById("mobileNav");
  const hamburger = document.getElementById("hamburger");

  if (nav) {
    const updateNavState = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 18);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
  }

  if (!mobileNav || !hamburger) return;

  const overlay = document.createElement("div");
  overlay.className = "nav-mobile-overlay";
  document.body.appendChild(overlay);

  const closeMobileNav = () => {
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    const nextState = !mobileNav.classList.contains("open");
    mobileNav.classList.toggle("open", nextState);
    hamburger.setAttribute("aria-expanded", String(nextState));
    overlay.classList.toggle("open", nextState);
    document.body.style.overflow = nextState ? "hidden" : "";
  });

  overlay.addEventListener("click", closeMobileNav);

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initScrollSpy() {
  if (document.body.dataset.page !== "home") return;

  const sectionLinks = document.querySelectorAll("[data-spy-link]");
  const sections = [...document.querySelectorAll("main section[id]")];
  if (!sectionLinks.length || !sections.length) return;

  const activate = () => {
    let currentId = "hero";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 140) {
        currentId = section.id;
      }
    });

    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.spyLink === currentId);
    });
  };

  activate();
  window.addEventListener("scroll", activate, { passive: true });
}

function initRevealAnimations() {
  const revealNodes = [...document.querySelectorAll("[data-reveal]")];
  if (!revealNodes.length) return;

  const useGsap = Boolean(window.gsap) && !prefersReducedMotion();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const delay = Number(entry.target.dataset.revealDelay || 0);

        if (useGsap) {
          window.gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
          });
          return;
        }

        entry.target.style.transitionDelay = `${delay}s`;
        entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -48px 0px" }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function formatCounterValue(value, decimals = 0) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toString();
}

function initCounters() {
  const counters = [...document.querySelectorAll("[data-counter-target]")];
  if (!counters.length) return;

  const animateCounter = (node) => {
    const target = Number(node.dataset.counterTarget || 0);
    const decimals = Number(node.dataset.counterDecimals || 0);
    const prefix = node.dataset.counterPrefix || "";
    const suffix = node.dataset.counterSuffix || "";
    const useGsap = Boolean(window.gsap) && !prefersReducedMotion();

    if (!useGsap) {
      node.textContent = `${prefix}${formatCounterValue(target, decimals)}${suffix}`;
      return;
    }

    const proxy = { value: 0 };
    window.gsap.to(proxy, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        node.textContent = `${prefix}${formatCounterValue(proxy.value, decimals)}${suffix}`;
      },
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animateCounter(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initReportTabs() {
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  if (!tabGroups.length) return;

  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll("[data-tab]");
    const panels = group.querySelectorAll("[data-panel]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;
        buttons.forEach((item) => {
          item.classList.toggle("is-active", item === button);
          item.setAttribute("aria-selected", String(item === button));
        });
        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.dataset.panel === target);
        });
      });
    });
  });
}

function initTiltEffects() {
  if (prefersReducedMotion()) return;

  const cards = document.querySelectorAll("[data-tilt]");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width;
      const py = (event.clientY - bounds.top) / bounds.height;
      const rx = (0.5 - py) * 8;
      const ry = (px - 0.5) * 10;
      card.style.setProperty("--tilt-rotate-x", `${rx.toFixed(2)}deg`);
      card.style.setProperty("--tilt-rotate-y", `${ry.toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-rotate-x");
      card.style.removeProperty("--tilt-rotate-y");
    });
  });
}

function initTypewriters() {
  const typewriters = document.querySelectorAll(".typewriter");
  if (!typewriters.length || prefersReducedMotion()) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const el = entry.target;
        const text = el.getAttribute("data-typewriter") || "";
        el.classList.add("is-typing");

        let i = 0;
        const type = () => {
          if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 35); // Typing speed
          } else {
            setTimeout(() => {
              el.classList.remove("is-typing");
              el.style.minHeight = "";
            }, 2000); // Remove blinking cursor after 2 seconds
          }
        };

        setTimeout(type, 400); // Sync start time with GSAP reveal
      });
    },
    { threshold: 0.5 }
  );

  typewriters.forEach((el) => {
    el.setAttribute("data-typewriter", el.textContent.trim());
    const height = el.getBoundingClientRect().height;
    if (height > 0) el.style.minHeight = `${height}px`; // Prevent layout jump
    el.textContent = "";
    observer.observe(el);
  });
}

function initCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSmoothScroll();
  initScrollSpy();
  initRevealAnimations();
  initCounters();
  initReportTabs();
  initTiltEffects();
  initTypewriters();
  initCurrentYear();
  initContactForm();
  initVisuals();
});
