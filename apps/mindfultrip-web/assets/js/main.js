/* ==========================================================================
   MindfulTrip — main.js
   Progressive-enhancement layer. The site is fully usable without JS;
   this adds sticky-nav states, mobile menu, scroll reveals, gallery
   lightbox, FAQ accordion, bilingual toggle, form UX and booking maths.
   Vanilla ES2015+, no dependencies. ~5 KB.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var on = function (el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts || false); };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- 1. Sticky header: transparent -> solid on scroll ---------------- */
  var header = $(".site-header");
  var setHeaderState = function () {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  setHeaderState();
  on(window, "scroll", setHeaderState, { passive: true });

  /* ---- 2. Mobile navigation ------------------------------------------- */
  var toggle = $(".nav-toggle");
  var nav = $(".nav");
  var closeNav = function () {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.removeProperty("overflow");
  };
  on(toggle, "click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$(".nav a").forEach(function (a) { on(a, "click", closeNav); });
  on(document, "keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* ---- 3. Reveal-on-scroll -------------------------------------------- */
  var reveals = $$("[data-reveal]");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- 4. Lightweight hero parallax ----------------------------------- */
  var parallax = $$("[data-parallax]");
  if (parallax.length && !prefersReduced) {
    var tick = function () {
      var y = window.scrollY;
      parallax.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
        el.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
      });
    };
    on(window, "scroll", function () { window.requestAnimationFrame(tick); }, { passive: true });
  }

  /* ---- 5. Gallery lightbox -------------------------------------------- */
  var lightbox = $("[data-lightbox]");
  if (lightbox) {
    var lbImg = $("img", lightbox);
    var openLB = function (src, alt) {
      lbImg.src = src; lbImg.alt = alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      $(".lightbox__close", lightbox).focus();
    };
    var closeLB = function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    $$("[data-lb-src]").forEach(function (fig) {
      on(fig, "click", function () { openLB(fig.getAttribute("data-lb-src"), fig.getAttribute("data-lb-alt")); });
      fig.setAttribute("tabindex", "0"); fig.setAttribute("role", "button");
      on(fig, "keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLB(fig.getAttribute("data-lb-src"), fig.getAttribute("data-lb-alt")); } });
    });
    on($(".lightbox__close", lightbox), "click", closeLB);
    on(lightbox, "click", function (e) { if (e.target === lightbox) closeLB(); });
    on(document, "keydown", function (e) { if (e.key === "Escape") closeLB(); });
  }

  /* ---- 6. FAQ accordion ----------------------------------------------- */
  $$(".accordion__trigger").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    on(btn, "click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
    });
  });

  /* ---- 7. Bilingual toggle (FR <-> EN) -------------------------------- */
  var applyLang = function (lang) {
    document.documentElement.setAttribute("lang", lang);
    try { window.localStorage.setItem("mt-lang", lang); } catch (e) {}
    $$("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    // Recompute open accordion heights (content length changes with language)
    $$('.accordion__trigger[aria-expanded="true"]').forEach(function (btn) {
      var p = document.getElementById(btn.getAttribute("aria-controls"));
      if (p) p.style.maxHeight = p.scrollHeight + "px";
    });
  };
  var savedLang;
  try { savedLang = window.localStorage.getItem("mt-lang"); } catch (e) {}
  if (savedLang) applyLang(savedLang);
  $$("[data-lang]").forEach(function (b) {
    on(b, "click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  /* ---- 8. Number steppers --------------------------------------------- */
  $$(".stepper").forEach(function (stp) {
    var input = $("input", stp);
    var min = parseInt(input.getAttribute("min") || "0", 10);
    var max = parseInt(input.getAttribute("max") || "99", 10);
    $$("button", stp).forEach(function (b) {
      on(b, "click", function () {
        var v = parseInt(input.value || "0", 10);
        v += b.getAttribute("data-step") === "up" ? 1 : -1;
        v = Math.max(min, Math.min(max, v));
        input.value = v;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
  });

  /* ---- 9. Booking price calculator ------------------------------------ */
  var bookingForm = $("[data-booking]");
  if (bookingForm) {
    var money = function (n) { return "€" + n.toLocaleString("fr-BE"); };
    var recalc = function () {
      var base = parseInt(bookingForm.getAttribute("data-base-price") || "290", 10);
      var pax = parseInt(($("[name=passengers]", bookingForm) || {}).value || "1", 10) || 1;
      var extras = 0;
      $$("[data-extra]:checked", bookingForm).forEach(function (c) {
        extras += parseInt(c.getAttribute("data-extra"), 10) * pax;
      });
      var subtotal = base * pax + extras;
      var setText = function (sel, val) { var el = $(sel); if (el) el.textContent = val; };
      setText("[data-sum-base]", money(base) + " × " + pax);
      setText("[data-sum-base-total]", money(base * pax));
      setText("[data-sum-extras]", money(extras));
      setText("[data-sum-total]", money(subtotal));
      setText("[data-sum-pax]", pax);
    };
    on(bookingForm, "change", recalc);
    on(bookingForm, "input", recalc);
    recalc();
  }

  /* ---- 10. Demo form submit (placeholder for Formspree/Netlify) ------- */
  $$("[data-demo-form]").forEach(function (form) {
    on(form, "submit", function (e) {
      // Real deployment: remove this handler and let the action POST to
      // Formspree / Web3Forms / Netlify Forms. This just shows a success state.
      if (form.getAttribute("data-demo-form") === "live") return; // allow real POST
      e.preventDefault();
      var success = $(".form-success", form.closest("section") || document) || $(".form-success");
      form.style.display = "none";
      if (success) { success.classList.add("is-visible"); success.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" }); }
    });
  });

  /* ---- 11. Trip filters (Experiences page) ---------------------------- */
  var filterBar = $("[data-filters]");
  if (filterBar) {
    var cards = $$("[data-tags]");
    $$(".filter-pill", filterBar).forEach(function (pill) {
      on(pill, "click", function () {
        $$(".filter-pill", filterBar).forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
        pill.setAttribute("aria-pressed", "true");
        var f = pill.getAttribute("data-filter");
        cards.forEach(function (card) {
          var show = f === "all" || (card.getAttribute("data-tags") || "").indexOf(f) > -1;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---- 12. Detail-page sticky mobile CTA ------------------------------ */
  var stickyCta = $(".sticky-cta");
  if (stickyCta) {
    var sentinel = $("[data-cta-sentinel]");
    if (sentinel && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        stickyCta.classList.toggle("is-active", !entries[0].isIntersecting);
      }, { rootMargin: "0px 0px -80% 0px" }).observe(sentinel);
    } else {
      stickyCta.classList.add("is-active");
    }
  }

  /* ---- 13. Footer year ------------------------------------------------ */
  var yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
