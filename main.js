/* Potato Knowledge Hub — interactions (vanilla JS, works offline) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- theme ---- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
    else if (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');
  } catch (e) {}
  var tbtn = $('#themeBtn');
  function paintTheme() { if (tbtn) tbtn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀' : '☾'; }
  paintTheme();
  if (tbtn) tbtn.addEventListener('click', function () {
    var n = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', n);
    try { localStorage.setItem('theme', n); } catch (e) {}
    paintTheme();
  });

  /* ---- mobile menu ---- */
  var burger = $('#burger'), nav = $('#nav');
  if (burger && nav) burger.addEventListener('click', function () { nav.classList.toggle('open'); });

  /* ---- reading progress + back to top ---- */
  var bar = $('.progress i'), topBtn = $('#top');
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (topBtn) topBtn.classList.toggle('show', h.scrollTop > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---- reveal on scroll ---- */
  var rev = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rev.forEach(function (r) { io.observe(r); });
  } else rev.forEach(function (r) { r.classList.add('in'); });

  /* ---- TOC scroll-spy ---- */
  var links = $$('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { links.forEach(function (l) { l.classList.remove('on'); }); var a = map[e.target.id]; if (a) a.classList.add('on'); }
      });
    }, { rootMargin: '-90px 0px -65% 0px' });
    $$('.prose h2[id]').forEach(function (h) { spy.observe(h); });
  }

  /* ---- animated counters ---- */
  $$('[data-count]').forEach(function (el) {
    var end = +el.getAttribute('data-count'), done = false;
    function run() {
      if (done) return; done = true; var t0 = null;
      (function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en'); if (p < 1) requestAnimationFrame(step); })(performance.now());
    }
    if ('IntersectionObserver' in window) { var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { run(); o.disconnect(); } }); o.observe(el); } else run();
  });

  /* ---- animated bars (report) ---- */
  $$('.bar-row .tr i[data-w]').forEach(function (i) {
    if ('IntersectionObserver' in window) { var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { i.style.width = i.getAttribute('data-w') + '%'; o.disconnect(); } }); o.observe(i); }
    else i.style.width = i.getAttribute('data-w') + '%';
  });

  /* ---- search + category filter (home) ---- */
  var input = $('#q'), box = $('#results'), chips = $$('.chip[data-cat]'), cards = $$('.card[data-cat]'), empty = $('.empty');
  function norm(s) {
    return (s || '').toLowerCase().replace(/[\u064B-\u0652\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
  }
  var activeCat = 'all';
  function filterCards() {
    var q = norm(input ? input.value.trim() : ''), shown = 0;
    cards.forEach(function (c) {
      var okCat = activeCat === 'all' || c.getAttribute('data-cat') === activeCat;
      var okQ = !q || norm(c.textContent).indexOf(q) > -1;
      c.style.display = okCat && okQ ? '' : 'none'; if (okCat && okQ) shown++;
    });
    $$('.cat-block').forEach(function (b) {
      var vis = $$('.card', b).some(function (c) { return c.style.display !== 'none'; });
      b.style.display = vis ? '' : 'none';
    });
    if (empty) empty.style.display = shown ? 'none' : 'block';
  }
  chips.forEach(function (ch) {
    ch.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('on'); }); ch.classList.add('on');
      activeCat = ch.getAttribute('data-cat'); filterCards();
    });
  });
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fullSearch() {
    if (!box || !window.SEARCH_DATA) return;
    var raw = input.value.trim(), q = norm(raw);
    if (q.length < 2) { box.classList.remove('show'); box.innerHTML = ''; return; }
    var out = [];
    window.SEARCH_DATA.forEach(function (d) {
      var n = norm(d.text), i = n.indexOf(q);
      if (i > -1) {
        var count = n.split(q).length - 1;
        var s = Math.max(0, i - 60), snip = d.text.substr(s, 170);
        out.push({ d: d, count: count, snip: (s > 0 ? '… ' : '') + snip + ' …' });
      } else if (norm(d.title).indexOf(q) > -1) out.push({ d: d, count: 1, snip: d.text.substr(0, 150) + ' …' });
    });
    out.sort(function (a, b) { return b.count - a.count; });
    box.innerHTML = out.length ? out.slice(0, 8).map(function (r) {
      return '<a href="' + r.d.url + '"><b>' + esc(r.d.title) + '</b> <small>(' + r.count + ' ظهور)</small><p>' + esc(r.snip) + '</p></a>';
    }).join('') : '<a href="#" onclick="return false"><b>لا توجد نتائج</b><p>جرّب كلمة أخرى.</p></a>';
    box.classList.add('show');
  }
  if (input) input.addEventListener('input', function () { filterCards(); fullSearch(); });

  /* ---- service worker (offline cache when served over http/https) ---- */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    var base = document.currentScript && document.currentScript.src ? document.currentScript.src.replace(/main\.js.*$/, '') : '';
    navigator.serviceWorker.register(base + 'sw.js').catch(function () {});
  }
})();
