// Minimal JS: sticky nav, mobile menu, ember/ash particles, YouTube thumbnail fallback, footer year.
(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');

  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  // Cover art: try maxresdefault, fall back to hqdefault, then to the CSS moon-and-pines placeholder.
  // (YouTube serves a 120x90 grey image for missing sizes, so check naturalWidth too.)
  document.querySelectorAll('img[data-yt]').forEach(function (img) {
    var id = img.getAttribute('data-yt');
    function fail() {
      if (!img.classList.contains('is-hq')) {
        img.classList.add('is-hq');
        img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
      } else {
        img.remove(); // placeholder art + title show through
      }
    }
    function check() { if (img.naturalWidth && img.naturalWidth <= 120) fail(); }
    img.addEventListener('error', fail);
    img.addEventListener('load', check);
    if (img.complete) { img.naturalWidth ? check() : fail(); }
  });

  // Embers: blood-red sparks and grey ash (skipped for reduced motion)
  var box = document.querySelector('.embers');
  if (box && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var n = window.innerWidth < 700 ? 18 : 34;
    for (var i = 0; i < n; i++) {
      var e = document.createElement('span');
      e.className = 'ember' + (Math.random() < 0.4 ? ' ember--ash' : '');
      var s = (Math.random() * 2.5 + 1.5).toFixed(1);
      e.style.left = (Math.random() * 100).toFixed(1) + '%';
      e.style.width = e.style.height = s + 'px';
      e.style.setProperty('--dx', ((Math.random() - 0.5) * 160).toFixed(0) + 'px');
      e.style.animationDuration = (Math.random() * 8 + 8).toFixed(1) + 's';
      e.style.animationDelay = (-Math.random() * 14).toFixed(1) + 's';
      box.appendChild(e);
    }
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
