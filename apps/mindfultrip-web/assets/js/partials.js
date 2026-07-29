/* ==========================================================================
   MindfulTrip — partials.js
   Injects the shared footer so it stays consistent across all pages.
   Runs before main.js's footer-year hook fires? main.js reads [data-year]
   on DOMContentLoaded via defer order — this file is loaded after main.js
   but both are `defer`, so they execute in order; we re-stamp the year here
   to be safe. Pure string template, no dependency.
   ========================================================================== */
(function () {
  "use strict";
  var mount = document.querySelector("[data-footer]");
  if (!mount) return;

  // Compute relative path prefix so links work from / and /trips/.
  var prefix = location.pathname.indexOf("/trips/") > -1 ? "../" : "";

  mount.innerHTML = [
    '<div class="container">',
      '<div class="footer-grid">',
        '<div class="footer-brand">',
          '<a class="brand" href="', prefix, 'index.html" aria-label="MindfulTrip">',
            '<span class="brand__mark">Mindful<b>Trip</b></span>',
          '</a>',
          '<p class="footer-about">Évasion &amp; Élégance — escapades culturelles et bien-être haut de gamme au départ de la Belgique.</p>',
          '<div class="social">',
            '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg></a>',
            '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9v11M4 5.5v.01M9 20v-6a3 3 0 0 1 6 0v6M9 12v8"/></svg></a>',
            '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1Z"/></svg></a>',
          '</div>',
        '</div>',

        '<div>',
          '<h5>Escapades</h5>',
          '<nav class="footer-links" aria-label="Escapades">',
            '<a href="', prefix, 'trips/paris-bien-etre-culture.html">Paris — Bien-être &amp; Culture</a>',
            '<a href="', prefix, 'trips.html">Toutes les escapades</a>',
            '<a href="', prefix, 'groups.html">Groupes &amp; Entreprises</a>',
            '<a href="', prefix, 'booking.html">Réserver</a>',
          '</nav>',
        '</div>',

        '<div>',
          '<h5>Maison</h5>',
          '<nav class="footer-links" aria-label="La maison">',
            '<a href="', prefix, 'about.html">À propos</a>',
            '<a href="', prefix, 'wellness.html">Philosophie bien-être</a>',
            '<a href="', prefix, 'journal.html">Journal</a>',
            '<a href="', prefix, 'contact.html">Contact &amp; FAQ</a>',
          '</nav>',
        '</div>',

        '<div>',
          '<h5>Contact</h5>',
          '<nav class="footer-links" aria-label="Contact">',
            '<a href="tel:+3240000000">+32 4 000 00 00</a>',
            '<a href="mailto:bonjour@mindfultrip.be">bonjour@mindfultrip.be</a>',
            '<a href="https://wa.me/32400000000">WhatsApp</a>',
            '<span>Départs : Liège-Guillemins, Belgique</span>',
          '</nav>',
        '</div>',
      '</div>',

      '<div class="footer-bottom">',
        '<span>© <span data-year>2026</span> MindfulTrip · tdksoftconsulting. Tous droits réservés.</span>',
        '<nav aria-label="Légal">',
          '<a href="#">Mentions légales</a>',
          '<a href="#">Conditions générales</a>',
          '<a href="#">Confidentialité</a>',
          '<a href="#">Cookies</a>',
        '</nav>',
      '</div>',
    '</div>'
  ].join("");

  var y = mount.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
