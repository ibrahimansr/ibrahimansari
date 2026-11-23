(function () {
  if (window.__player) return;   // pages are swapped in place (see go() below), so this runs once per tab
  window.__player = true;
  // i only have ts bc i dont have spotify premium
  var SONG_URL = "https://open.spotify.com/track/6PYARtb5IfAdxG0ZPFYBSo?si=a894292f8669436d";

  var PREVIEW_KEY = 'preview:' + SONG_URL;
  var TITLE_KEY = 'title:' + SONG_URL;
  var COVER_KEY = 'cover:' + SONG_URL;
  var STATE_KEY = 'songState';

  // create audio element synchronously at page load so it always exists
  var audio = new Audio();
  audio.preload = 'none';
  audio.loop = true;
  var btn = null;
  var pendingPlay = false;

  function setBtn() {
    if (!btn) return;
    if (!audio.src) { btn.textContent = 'loading'; return; }
    btn.textContent = audio.paused ? 'play' : 'pause';
  }

  function saveState() {
    if (!audio.src) return;
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify({
        t: audio.currentTime,
        playing: !audio.paused,
        ts: Date.now()
      }));
    } catch (e) {}
  }

  function loadState() {
    try {
      var s = JSON.parse(sessionStorage.getItem(STATE_KEY) || '{}');
      if (!s.ts || Date.now() - s.ts > 5 * 60 * 1000) return {};
      return s;
    } catch (e) { return {}; }
  }

  audio.addEventListener('timeupdate', saveState);
  audio.addEventListener('play', function () { setBtn(); saveState(); });
  audio.addEventListener('pause', function () { setBtn(); saveState(); });
  audio.addEventListener('canplay', function () {
    if (wantsResumeAt !== null) {
      try { audio.currentTime = wantsResumeAt; } catch (e) {}
      wantsResumeAt = null;
    }
    setBtn();
    if (pendingPlay) {
      pendingPlay = false;
      audio.play().catch(function () {});
    }
  });
  window.addEventListener('pagehide', saveState);
  window.addEventListener('beforeunload', saveState);

  function attachAutoResume() {
    var resume = function () {
      if (audio.paused) audio.play().catch(function () {});
      document.removeEventListener('click', resume, true);
      document.removeEventListener('touchstart', resume, true);
      document.removeEventListener('keydown', resume, true);
    };
    document.addEventListener('click', resume, true);
    document.addEventListener('touchstart', resume, true);
    document.addEventListener('keydown', resume, true);
  }

  var wantsResumeAt = null;
  function setSrc(previewUrl) {
    if (audio.src) return;
    audio.src = previewUrl;
    setBtn();
    var s = loadState();
    if (s.t) wantsResumeAt = s.t;
    var hasButton = !!document.querySelector('.play-btn');

    if (s.playing) {
      // try to auto-resume on both pages. on stuff.html, fall back to wait-for-tap.
      // on index.html, fall back to waiting for user to click the play button.
      var p = audio.play();
      if (p && p.catch) {
        p.catch(function () {
  if (window.__player) return;   // pages are swapped in place (see go() below), so this runs once per tab
  window.__player = true;
          if (!hasButton) attachAutoResume();
        });
      }
    }
  }

  function applyUI(title, cover) {
    var link = document.querySelector('.song-link');
    var titleEl = document.querySelector('.song-title');
    var coverEl = document.querySelector('.album-cover');
    btn = document.querySelector('.play-btn');
    if (link) link.href = SONG_URL;
    if (titleEl && title) titleEl.textContent = title.toLowerCase();
    if (coverEl && cover) coverEl.src = cover;
    if (btn && !btn.dataset.wired) {
      btn.dataset.wired = '1';
      setBtn();
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!audio.src) {
          pendingPlay = true;
          return;
        }
        if (audio.paused) {
          var p = audio.play();
          if (p && p.catch) {
            p.catch(function () { pendingPlay = true; });
          }
        } else {
          audio.pause();
        }
      });
    } else if (btn) {
      setBtn();
    }
  }

  var cachedPreview = sessionStorage.getItem(PREVIEW_KEY);
  var cachedTitle = sessionStorage.getItem(TITLE_KEY);
  var cachedCover = sessionStorage.getItem(COVER_KEY);

  if (cachedPreview) setSrc(cachedPreview);
  applyUI(cachedTitle, cachedCover);

  if (!cachedPreview || !cachedTitle || !cachedCover) {
    fetch('/api/preview?url=' + encodeURIComponent(SONG_URL))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        if (d.title) { try { sessionStorage.setItem(TITLE_KEY, d.title); } catch (e) {} }
        if (d.cover) { try { sessionStorage.setItem(COVER_KEY, d.cover); } catch (e) {} }
        if (d.preview && !cachedPreview) {
          try { sessionStorage.setItem(PREVIEW_KEY, d.preview); } catch (e) {}
          setSrc(d.preview);
        }
        applyUI(d.title || cachedTitle, d.cover || cachedCover);
      })
      .catch(function () {});
  }
  // ── in-place navigation ──
  // a full page load would kill `audio`, so internal links fetch the next page and swap it in instead
  // (what the old Next.js version got for free from client-side routing). Any failure falls back to a normal load.
  var SKIP = /player\.js$|_vercel\/insights/;   // already running; don't run twice

  function fresh(n) {
    if (n.tagName !== 'SCRIPT') return document.importNode(n, true);
    var s = document.createElement('script');
    for (var i = 0; i < n.attributes.length; i++) s.setAttribute(n.attributes[i].name, n.attributes[i].value);
    s.async = false;   // keep execution order (katex before auto-render)
    s.text = n.text;
    return s;
  }

  function go(href, push) {
    fetch(href).then(function (r) {
      if (!r.ok || (r.headers.get('content-type') || '').indexOf('text/html') < 0) throw 0;
      return r.text();
    }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      if (push) history.pushState(null, '', href);
      document.title = doc.title;
      var have = {}, want = {};
      Array.prototype.forEach.call(document.head.children, function (n) { have[n.outerHTML] = n; });
      Array.prototype.forEach.call(doc.head.children, function (n) {
        want[n.outerHTML] = 1;
        if (!have[n.outerHTML]) document.head.appendChild(fresh(n));
      });
      Object.keys(have).forEach(function (k) { if (!want[k]) have[k].remove(); });
      document.body.replaceChildren.apply(document.body, Array.prototype.map.call(doc.body.childNodes, function (n) {
        return n.tagName === 'SCRIPT' && SKIP.test(n.src) ? document.createComment('') : fresh(n);
      }));
      window.scrollTo(0, 0);
      applyUI(sessionStorage.getItem(TITLE_KEY), sessionStorage.getItem(COVER_KEY));
    }).catch(function () { location.href = href; });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname.indexOf('/api/') === 0) return;
    if (url.pathname === location.pathname && url.hash) return;   // same-page anchor
    e.preventDefault();
    go(url.href, true);
  });
  window.addEventListener('popstate', function () { go(location.href, false); });
})();
