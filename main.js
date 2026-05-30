/* TRINETRA — shared interactions */
(function () {
  "use strict";

  // ====== Contact details ======
  var WHATSAPP = "573502853075";            // WhatsApp number, country code, no +
  var PHONE_DISPLAY = "+57 350 2853075";
  // ==============================

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
      });
    });
  }

  /* Header scrolled state + scroll progress + back-to-top */
  var header = document.querySelector(".site-header");

  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  var top = document.createElement("button");
  top.className = "to-top";
  top.setAttribute("aria-label", "Back to top");
  top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
  document.body.appendChild(top);
  top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  var onScroll = function () {
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    if (header) header.classList.toggle("scrolled", y > 24);
    top.classList.toggle("show", y > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Scroll cue */
  var cue = document.querySelector(".scroll-cue");
  if (cue) cue.addEventListener("click", function () {
    window.scrollTo({ top: window.innerHeight - 60, behavior: "smooth" });
  });

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Animated count-up for stats */
  var nums = document.querySelectorAll(".stat .num");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (nums.length && "IntersectionObserver" in window && !reduce) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        countObs.unobserve(el);
        var raw = el.textContent.trim();
        var m = raw.match(/([^\d]*)([\d,]+)(.*)/);
        if (!m) return;
        var pre = m[1], suf = m[3];
        var target = parseInt(m[2].replace(/,/g, ""), 10);
        if (isNaN(target)) return;
        var dur = 1500, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.round(target * eased);
          el.textContent = pre + val.toLocaleString("en-IN") + suf;
          if (p < 1) requestAnimationFrame(step);
        }
        el.textContent = pre + "0" + suf;
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { countObs.observe(n); });
  }

  /* Testimonial carousel */
  var carousel = document.querySelector(".tcarousel");
  if (carousel) {
    var slides = carousel.querySelectorAll(".tslide");
    var dotsWrap = carousel.querySelector(".tdots");
    var i = 0, timer;
    slides.forEach(function (_, idx) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Testimonial " + (idx + 1));
      if (idx === 0) b.classList.add("active");
      b.addEventListener("click", function () { go(idx); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll("button");
    function go(n) {
      slides[i].classList.remove("active");
      dots[i].classList.remove("active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("active");
      dots[i].classList.add("active");
    }
    function reset() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6000); }
    reset();
  }

  /* Contact / enquiry form -> WhatsApp prefill */
  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var service = (data.get("service") || "General Enquiry").toString();
      var msg = (data.get("message") || "").toString().trim();
      var text =
        "New enquiry — Trinetra Detective Agency%0A%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Phone: " + encodeURIComponent(phone) + "%0A" +
        "Service: " + encodeURIComponent(service) + "%0A" +
        "Details: " + encodeURIComponent(msg);
      var ok = form.querySelector(".form-success");
      if (ok) ok.classList.add("show");
      window.open("https://wa.me/" + WHATSAPP + "?text=" + text, "_blank");
      form.reset();
    });
  });

  /* Footer year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
