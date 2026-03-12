// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "auto";
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (
      navMenu &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, targetId);
      }
    });
  });

  // ===== ACTIVE LINK HIGHLIGHTING =====
  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`,
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
    }
  });

  // ===== FIX #8: BILLING TOGGLE (Monthly / Yearly) =====
  const billingToggle = document.getElementById("billing-toggle-input");
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");

  if (billingToggle) {
    billingToggle.addEventListener("change", function () {
      const isYearly = this.checked;

      // Update label styles
      monthlyLabel.style.color = isYearly ? "#a0aec0" : "#1a2b3c";
      yearlyLabel.style.color = isYearly ? "#1a2b3c" : "#a0aec0";

      // Toggle price display
      document.querySelectorAll(".price-monthly").forEach((el) => {
        el.style.display = isYearly ? "none" : "inline";
      });
      document.querySelectorAll(".price-yearly").forEach((el) => {
        el.style.display = isYearly ? "inline" : "none";
      });

      // Update plan-billing text
      document.querySelectorAll(".plan-billing").forEach((el) => {
        el.textContent = isYearly ? "Yearly (billed annually)" : "Monthly";
      });
    });
  }

  // ===== FIX #7: FAQ ACCORDION =====
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      // Close all open items
      faqItems.forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});
