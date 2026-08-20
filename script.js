/* Kunal Kashyap — portfolio
   Vanilla JS. No animation libraries. */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- current year in footer ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---------- sticky topbar border on scroll ---------- */
    var topbar = document.getElementById("topbar");
    var onScroll = function () {
      if (topbar) topbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- mobile nav ---------- */
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("nav");

    var closeNav = function () {
      if (!nav || !toggle) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });

      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") closeNav();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeNav();
      });
    }

    /* ---------- reveal on scroll ---------- */
    var targets = document.querySelectorAll(
      ".section-head, .role, .project, .skills, .two-col, .contact-grid, .stats"
    );

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      targets.forEach(function (el) {
        el.classList.add("reveal");
      });

      var revealer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );

      targets.forEach(function (el) {
        revealer.observe(el);
      });
    }

    /* ---------- active nav link ---------- */
    var sections = Array.prototype.slice.call(
      document.querySelectorAll("main section[id]")
    );
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll(".nav a")
    );

    if (sections.length && navLinks.length && "IntersectionObserver" in window) {
      var setActive = function (id) {
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + id
          );
        });
      };

      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );

      sections.forEach(function (s) {
        spy.observe(s);
      });
    }
  });
})();
