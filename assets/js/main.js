/* Ridgeline Roofing — site scripts (no dependencies) */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: background once scrolled, mobile bar after hero ---------- */
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.mobile-bar');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    if (bar) bar.classList.toggle('is-shown', y > window.innerHeight * 0.55);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { doc.classList.add('menu-open'); });
      document.body.style.overflow = 'hidden';
    } else {
      doc.classList.remove('menu-open');
      document.body.style.overflow = '';
      setTimeout(function () { if (!doc.classList.contains('menu-open')) menu.hidden = true; }, 450);
    }
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && doc.classList.contains('menu-open')) setMenu(false); });
  }

  /* ---------- Reveal on scroll (staggered within each section) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-gallery] .g-item').forEach(function (el, i) { el.style.setProperty('--d', (i % 3) * 70 + 'ms'); });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Active nav link ---------- */
  var links = document.querySelectorAll('.nav-link');
  if ('IntersectionObserver' in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'process', 'work', 'about', 'contact'].forEach(function (id) { var s = document.getElementById(id); if (s) navIo.observe(s); });
  }

  /* ---------- Services explorer (accessible tabs) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.svc-tab'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      selectTab(tab);
      // On phones, bring the opened panel into view
      if (window.innerWidth < 1024) {
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        var top = panel.getBoundingClientRect().top;
        if (top > window.innerHeight * 0.6) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
    tab.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });
  // Footer links open a specific service
  document.querySelectorAll('[data-tab]').forEach(function (a) {
    a.addEventListener('click', function () { var t = document.getElementById('tab-' + a.getAttribute('data-tab')); if (t) selectTab(t); });
  });

  /* ---------- Service buttons pre-fill the form ---------- */
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      var v = a.getAttribute('data-service');
      Array.prototype.forEach.call(serviceSelect.options, function (o) { if (o.text === v || o.value === v) serviceSelect.value = o.value || o.text; });
    });
  });

  /* ---------- Gallery filter ---------- */
  var chips = document.querySelectorAll('.chip');
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      items.forEach(function (it) {
        var show = f === 'all' || it.getAttribute('data-cat') === f;
        it.classList.toggle('is-hidden', !show);
        if (show) it.classList.add('is-in');
      });
    });
  });

  /* ---------- Lightbox: arrows, Esc, swipe ---------- */
  var lb = document.querySelector('[data-lightbox]');
  var lbImg = lb.querySelector('[data-lb-img]');
  var lbCap = lb.querySelector('[data-lb-caption]');
  var lbCount = lb.querySelector('[data-lb-count]');
  var current = 0, lastFocus = null;
  function visible() { return items.filter(function (it) { return !it.classList.contains('is-hidden'); }); }
  function show(i) {
    var list = visible();
    current = (i + list.length) % list.length;
    var it = list[current], btn = it.querySelector('button'), img = btn.querySelector('img');
    lbImg.classList.add('is-swapping');
    var next = new Image();
    next.onload = next.onerror = function () {
      lbImg.src = btn.getAttribute('data-full');
      lbImg.alt = img.alt;
      lbImg.classList.remove('is-swapping');
    };
    next.src = btn.getAttribute('data-full');
    lbCap.textContent = it.querySelector('p').textContent;
    lbCount.textContent = (current + 1) + ' / ' + list.length;
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('[data-lb-close]').focus();
  }
  function closeLb() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (it) {
    it.querySelector('button').addEventListener('click', function () { openLb(visible().indexOf(it)); });
  });
  lb.querySelector('[data-lb-close]').addEventListener('click', closeLb);
  lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('flex-1')) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'Tab') { // keep focus inside
      var f = Array.prototype.filter.call(lb.querySelectorAll('button'), function (b) { return b.offsetParent; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var sx = 0, sy = 0;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    else if (dy > 90) closeLb();
  });

  /* ---------- Quote form: inline validation + sending state ---------- */
  var form = document.querySelector('[data-form]');
  if (form) {
    var fields = form.querySelectorAll('input:not([type=hidden]):not([name=_honey]), select, textarea');
    function check(el) {
      var ok = el.checkValidity();
      el.setAttribute('aria-invalid', String(!ok));
      return ok;
    }
    fields.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      fields.forEach(function (el) { if (!check(el) && !firstBad) firstBad = el; });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = form.querySelector('[type=submit]');
      btn.disabled = true;
      btn.classList.add('opacity-80');
      btn.querySelector('[data-label]').textContent = 'Sending…';
      btn.querySelector('[data-spinner]').classList.remove('hidden');
    });
  }

  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
