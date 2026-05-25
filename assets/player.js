(function () {
  // change this to swap the song — title, cover, and preview auto-fetch from /api/preview
  var SONG_URL = "https://open.spotify.com/track/2OZVskV28xxJjjhQqKTLSg?si=d288262368a94834";

  var PREVIEW_KEY = 'preview:' + SONG_URL;
  var TITLE_KEY = 'title:' + SONG_URL;
  var COVER_KEY = 'cover:' + SONG_URL;
  var STATE_KEY = 'songState';

  var audio = null;
  var btn = null;

  function setBtn() {
    if (!btn) return;
    btn.textContent = audio && !audio.paused ? 'pause' : 'play';
  }

  function saveState() {
    if (!audio || !audio.src) return;
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

  function attachAutoResume() {
    var resume = function () {
      if (audio && audio.paused) audio.play().catch(function () {});
      document.removeEventListener('click', resume, true);
      document.removeEventListener('touchstart', resume, true);
      document.removeEventListener('keydown', resume, true);
    };
    document.addEventListener('click', resume, true);
    document.addEventListener('touchstart', resume, true);
    document.addEventListener('keydown', resume, true);
  }

  function initAudio(previewUrl) {
    if (audio) return;
    audio = new Audio();
    audio.preload = 'auto';
    audio.loop = true;
    audio.src = previewUrl;
    try { audio.load(); } catch (e) {}

    audio.addEventListener('timeupdate', saveState);
    audio.addEventListener('play', function () { setBtn(); saveState(); });
    audio.addEventListener('pause', function () { setBtn(); saveState(); });
    window.addEventListener('pagehide', saveState);
    window.addEventListener('beforeunload', saveState);

    var s = loadState();
    if (s.t) {
      try { audio.currentTime = s.t; } catch (e) {}
    }
    if (s.playing) {
      var p = audio.play();
      if (p && p.catch) {
        p.catch(function () { attachAutoResume(); });
      }
    }
  }

  function tryPlay() {
    if (!audio) return;
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function () {
        try { audio.load(); } catch (e) {}
        var retry = function () {
          audio.removeEventListener('canplay', retry);
          audio.play().catch(function () {});
        };
        audio.addEventListener('canplay', retry);
      });
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
    if (btn) {
      setBtn();
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!audio || !audio.src) {
          window.open(SONG_URL, '_blank', 'noopener');
          return;
        }
        if (audio.paused) tryPlay();
        else audio.pause();
      });
    }
  }

  var cachedPreview = sessionStorage.getItem(PREVIEW_KEY);
  var cachedTitle = sessionStorage.getItem(TITLE_KEY);
  var cachedCover = sessionStorage.getItem(COVER_KEY);

  if (cachedPreview) initAudio(cachedPreview);
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
          initAudio(d.preview);
        }
        applyUI(d.title || cachedTitle, d.cover || cachedCover);
      })
      .catch(function () {});
  }
})();
