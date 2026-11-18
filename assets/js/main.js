/* Ridgeline Roofing — site script (vanilla, no dependencies)
   menu · header · slate edges · hero parallax · services explorer ·
   roof cross-section on scroll · gallery lightbox · quote form */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- slate-course edges: two staggered courses of slates ---------- */
  $$('[data-slate-row]').forEach(function (svg) {
    var down = svg.getAttribute('data-slate-row') === 'down';
    var out = '', i = 0;
    // slates roughly 2:1, three courses, each course offset by half a slate
    var widths = [46, 42, 50, 44, 48, 40, 52, 45, 43, 49];
    var drop = [0, 3, 1, 4, 0, 2, 5, 1, 3, 0, 2, 4];
    function row(x0, y0, h, jag) {
      var x = x0, k = 0;
      while (x < 1440) {
        var w = widths[(k + Math.abs(x0)) % widths.length];
        var t = jag ? drop[k % drop.length] : 0;
        var yy = y0 + t, hh = h - t;
        if (down) yy = 40 - yy - hh;
        out += '<rect x="' + x + '" y="' + yy + '" width="' + (w - 3) + '" height="' + hh + '" rx="1.5" fill="currentColor" fill-opacity="' + [1, .86, .94, .8, 1, .9][(i + k) % 6] + '" style="--i:' + (i++) + '"/>';
        x += w; k++;
      }
    }
    // when the edge rises from the section below (default), the jagged edge is at the top
    row(0, 27, 13, false); row(-22, 14, 12, false); row(-9, 0, 13, true);
    svg.setAttribute('viewBox', '0 0 1440 40');
    svg.innerHTML = out;
  });

  /* ---------- ridge lines (the logo's roof line), drawn in pixels so the stroke stays even ---------- */
  var ridges = $$('[data-ridge]');
  function drawRidges() {
    ridges.forEach(function (svg) {
      var r = svg.getBoundingClientRect(), w = r.width, h = r.height;
      if (!w || !h) return;
      svg.setAttribute('viewBox', '0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1));
      var parts = svg.getAttribute('data-ridge').split('|'), paths = $$('path', svg);
      function seg(p) {
        return p.trim().split(' ').filter(Boolean).map(function (pt, j) {
          var xy = pt.split(',');
          return (j ? 'L' : 'M') + (parseFloat(xy[0]) * w).toFixed(1) + ' ' + (parseFloat(xy[1]) * h).toFixed(1);
        }).join(' ');
      }
      if (paths.length === 1) paths[0].setAttribute('d', parts.map(seg).join(' '));
      else parts.forEach(function (p, i) { if (paths[i]) paths[i].setAttribute('d', seg(p)); });
    });
  }
  drawRidges();
  window.addEventListener('resize', drawRidges);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawRidges);

  /* ---------- header + active nav + mobile bar ---------- */
  var header = $('[data-header]');
  var mbar = $('[data-mbar]');
  var hero = $('#top');
  function onScroll() {
    var sy = window.scrollY;
    header.classList.toggle('is-scrolled', sy > 40);
    if (mbar && hero) mbar.classList.toggle('is-on', sy > hero.offsetHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var navLinks = $$('.nav-link');
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'how', 'work', 'about', 'contact'].forEach(function (id) { var el = document.getElementById(id); if (el) secIO.observe(el); });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = $('[data-menu-btn]');
  function setMenu(open) {
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) header.classList.add('is-scrolled'); else onScroll();
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    $$('[data-menu] a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- hero: layers shift a touch with the cursor (desktop only) ---------- */
  if (fine && !reduced && hero) {
    var layers = $$('[data-parallax]', hero), raf = null, mx = 0, my = 0;
    hero.addEventListener('pointermove', function (e) {
      mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        layers.forEach(function (el) {
          var k = parseFloat(el.getAttribute('data-parallax')) || 6;
          var base = el.tagName === 'IMG' ? ' scale(1.06)' : '';
          el.style.transform = 'translate3d(' + (-mx * k).toFixed(1) + 'px,' + (-my * k).toFixed(1) + 'px,0)' + base;
        });
      });
    });
  }

  /* ---------- reveal + heading ridge lines ---------- */
  var inview = $$('[data-inview], .rise, .slide-in');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    inview.forEach(function (el) { io.observe(el); });
  } else {
    inview.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- services explorer ---------- */
  var caps = ['Stripped back to the rafters', 'Opened up for a repair beside a dormer', 'Low-pitch roof recovered in slate', 'Terracotta clay tiles, granite wall in front', 'Slate courses up to the ridge'];
  var rows = $$('[data-svc]');
  var photos = $$('[data-svc-photos] img');
  var cap = $('[data-svc-cap]');
  function openSvc(i) {
    rows.forEach(function (r, j) {
      var open = j === i;
      r.classList.toggle('is-open', open);
      $('button', r).setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    photos.forEach(function (p, j) { p.classList.toggle('is-on', j === i); });
    if (cap) cap.textContent = caps[i];
  }
  rows.forEach(function (r, i) {
    $('button', r).addEventListener('click', function () {
      if (r.classList.contains('is-open') && window.innerWidth < 1024) { r.classList.remove('is-open'); this.setAttribute('aria-expanded', 'false'); return; }
      openSvc(i);
    });
  });

  /* service links pre-fill the form */
  var sel = $('#f-service');
  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () { if (sel) sel.value = a.getAttribute('data-pick'); });
  });

  /* ---------- the roof goes on, layer by layer ---------- */
  var xsec = $('.xsec');
  var steps = $$('[data-step]');
  var bars = $$('.stage-bar span');
  // step -> how many layers of the drawing are on (step 2 checks the timbers, step 3 adds membrane AND battens)
  var layerFor = [0, 1, 1, 3, 4, 5];
  function setStage(step) {
    if (!xsec) return;
    var n = layerFor[step];
    xsec.setAttribute('data-stage', n);
    $$('.layer', xsec).forEach(function (l) {
      var k = +l.getAttribute('data-l');
      var cur = step === 3 ? (k === 2 || k === 3) : k === n;
      l.classList.toggle('is-current', cur);
      l.classList.toggle('is-done', k < n && !cur);
    });
    steps.forEach(function (s) { s.classList.toggle('is-current', +s.getAttribute('data-step') === step); });
    bars.forEach(function (b, i) { b.style.transform = 'scaleX(' + (i < step ? 1 : 0) + ')'; });
    var names = ['Scaffold up', 'Stripped to the rafters', 'Timbers checked and kept', 'Membrane and battens on', 'Slated', 'Ridge on. Done and dusted.'];
    var nm = $('[data-stage-name]'), ct = $('[data-stage-count]');
    if (nm) nm.textContent = names[step];
    if (ct) ct.textContent = 'Stage ' + step + ' of 5';
  }
  if (xsec) {
    if (reduced || !('IntersectionObserver' in window)) {
      setStage(5);
      steps.forEach(function (s) { s.classList.add('is-current'); });
    } else {
      setStage(0);
      var stepIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) setStage(+e.target.getAttribute('data-step')); });
      }, { rootMargin: '-40% 0px -45% 0px' });
      steps.forEach(function (s) { stepIO.observe(s); });
    }
  }

  /* ---------- gallery lightbox ---------- */
  var tiles = $$('[data-gallery] a');
  var lb = $('[data-lightbox]');
  if (lb && tiles.length) {
    var lbImg = $('[data-lb-img]', lb), lbCap = $('[data-lb-cap]', lb), cur = 0, lastFocus = null;
    function show(i) {
      cur = (i + tiles.length) % tiles.length;
      var t = tiles[cur];
      lbImg.style.opacity = 0;
      var img = new Image();
      img.onload = function () { lbImg.src = t.getAttribute('href'); lbImg.alt = $('img', t).alt; lbImg.style.opacity = 1; };
      img.src = t.getAttribute('href');
      lbCap.textContent = t.getAttribute('data-cap') + '  ·  ' + (cur + 1) + ' / ' + tiles.length;
    }
    function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; $('[data-lb-close]', lb).focus(); }
    function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
    tiles.forEach(function (t, i) { t.addEventListener('click', function (e) { e.preventDefault(); open(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(cur - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
      if (e.key === 'Tab') { // keep focus inside
        var f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- quote form: inline validation + sending state ---------- */
  var form = $('[data-form]');
  if (form) {
    var fields = $$('.field', form);
    function check(f) {
      var el = $('input, select, textarea', f);
      var ok = el.checkValidity() && (el.value || '').trim() !== '';
      f.classList.toggle('is-bad', !ok);
      f.classList.toggle('is-ok', ok && el.tagName !== 'SELECT');
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    }
    fields.forEach(function (f) {
      var el = $('input, select, textarea', f);
      el.addEventListener('blur', function () { if (el.value) check(f); });
      el.addEventListener('input', function () { if (f.classList.contains('is-bad')) check(f); });
      el.addEventListener('change', function () { check(f); });
    });
    form.addEventListener('submit', function (e) {
      var bad = fields.filter(function (f) { return !check(f); });
      if (bad.length) { e.preventDefault(); $('input, select, textarea', bad[0]).focus(); return; }
      var btn = $('[data-send]', form);
      btn.classList.add('is-loading');
      $('[data-send-label]', form).textContent = 'Sending…';
    });
  }
})();
