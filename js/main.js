/* ==========================================================================
   The Visualization Playbook — behavior
   --------------------------------------------------------------------------
   1. Scroll-spy: highlights the current section in the sticky TOC sidebar.
   2. Smooth scrolling for TOC + mobile menu anchor links.
   3. Mobile contents menu open/close.
   No dependencies. Plain JavaScript.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Scroll-spy for the desktop sidebar ---------- */
  var tocLinks = document.querySelectorAll(".toc-list a[data-section]");
  var sections = [];
  tocLinks.forEach(function (link) {
    var el = document.getElementById(link.getAttribute("data-section"));
    if (el) sections.push({ id: link.getAttribute("data-section"), el: el, link: link });
  });

  function setActive(id) {
    tocLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("data-section") === id);
    });
  }

  // Highlight the section whose top has most recently passed ~1/3 down the viewport.
  function onScroll() {
    var current = sections.length ? sections[0].id : null;
    var probe = window.scrollY + window.innerHeight * 0.33;
    sections.forEach(function (s) {
      if (s.el.offsetTop <= probe) current = s.id;
    });
    setActive(current);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Smooth scrolling (with sticky-bar offset on mobile) ---------- */
  function smoothTo(target) {
    var bar = document.querySelector(".mobile-bar");
    var offset = bar && getComputedStyle(bar).display !== "none" ? bar.offsetHeight + 8 : 12;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      smoothTo(target);
      // Close the mobile menu after jumping.
      document.getElementById("mobileMenu").classList.remove("open");
      // Update the address bar without jumping.
      history.replaceState(null, "", "#" + id);
    });
  });

  /* ---------- 3. Mobile contents menu ---------- */
  var menuBtn = document.getElementById("mobileMenuBtn");
  var menu = document.getElementById("mobileMenu");
  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("open");
  });

  // If the page loads with a #section hash, nudge it into view under the bar.
  if (location.hash) {
    var initial = document.getElementById(location.hash.slice(1));
    if (initial) setTimeout(function () { smoothTo(initial); }, 60);
  }
})();
