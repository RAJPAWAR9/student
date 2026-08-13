/* ==========================================================================
   BOOSTER OS 2.0V MAX — Core Application Architecture
   Designed by RAJ
   ========================================================================== */

const API_BASE = 'https://jiosaavn-api.raj-pawar091206.workers.dev';
const LYRICS_BASE = 'https://lrclib.net/api';

/* ---------------- STATE ENGINE ---------------- */
const state = {
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  shuffle: false,
  repeat: 'off',
  volume: parseFloat(localStorage.getItem('bo_volume') || '0.8'),
  speed: parseFloat(localStorage.getItem('bo_speed') || '1.0'),
  visualizerMode: localStorage.getItem('bo_viz_mode') || 'spectrum',
  theme: localStorage.getItem('bo_theme') || 'dark',
  favorites: JSON.parse(localStorage.getItem('bo_favorites') || '[]'),
  recentlyPlayed: JSON.parse(localStorage.getItem('bo_recent') || '[]'),
  playlists: JSON.parse(localStorage.getItem('bo_playlists') || '[]'),
  localTracks: [],
  lastPosition: JSON.parse(localStorage.getItem('bo_lastpos') || 'null'),
  quality: localStorage.getItem('bo_quality') || '320kbps',
  crossfade: parseInt(localStorage.getItem('bo_crossfade') || '0'),
  gapless: localStorage.getItem('bo_gapless') !== 'false',
  tvMode: false,
  eqGains: JSON.parse(localStorage.getItem('bo_eq') || '[0,0,0,0,0,0,0,0,0,0]'),
  activePreset: localStorage.getItem('bo_preset') || 'Normal',
  sleepTimerDeadline: null
};

const EQ_FREQS = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const PRESETS = {
  Normal: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Pop: [-1, 0, 2, 3, 3, 2, 0, -1, -1, -1],
  Rock: [4, 3, 2, 0, -1, -1, 0, 2, 3, 4],
  Bass: [7, 6, 5, 3, 1, 0, 0, 0, 0, 0],
  Classical: [0, 0, 0, 0, 0, 0, -2, -2, -2, -3],
  Jazz: [2, 1, 0, 0, 0, 0, 1, 2, 2, 1],
  Vocal: [-2, -1, 0, 2, 4, 4, 3, 1, 0, -1],
  Electronic: [5, 4, 1, 0, -1, 0, 1, 3, 5, 6]
};

/* ---------------- SAFE FETCH LAYER ---------------- */
async function safeFetch(url, options = {}, retries = 2) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout || 8000);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    if (retries > 0) return safeFetch(url, options, retries - 1);
    throw err;
  }
}

/* ---------------- UTILITIES ---------------- */
function decodeEntities(str) {
  const t = document.createElement('textarea');
  t.innerHTML = str || '';
  return t.value;
}

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}

function hashColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const h = Math.abs(hash) % 360;
  return hslToRgb(h, 72, 52);
}

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function saveLS() {
  localStorage.setItem('bo_favorites', JSON.stringify(state.favorites));
  localStorage.setItem('bo_recent', JSON.stringify(state.recentlyPlayed));
  localStorage.setItem('bo_playlists', JSON.stringify(state.playlists));
  localStorage.setItem('bo_volume', state.volume);
  localStorage.setItem('bo_speed', state.speed);
  localStorage.setItem('bo_eq', JSON.stringify(state.eqGains));
  localStorage.setItem('bo_theme', state.theme);
  localStorage.setItem('bo_preset', state.activePreset);
  localStorage.setItem('bo_quality', state.quality);
  localStorage.setItem('bo_crossfade', state.crossfade);
  localStorage.setItem('bo_gapless', state.gapless);
  localStorage.setItem('bo_viz_mode', state.visualizerMode);
}

function trackKey(t) { return t.id + '::' + (t.source || 'api'); }
function isFavorite(t) { return state.favorites.some(f => trackKey(f) === trackKey(t)); }

/* ---------------- NORMALIZERS ---------------- */
function normalizeSong(song) {
  const imgArr = song.image || [];
  const img = (imgArr[2] || imgArr[imgArr.length - 1] || imgArr[0] || {}).url || '';
  const dl = song.downloadUrl || [];
  const pick = dl.find(d => d.quality === state.quality) || dl[dl.length - 1] || dl[0] || {};
  const artists = song.artists && song.artists.primary ? song.artists.primary.map(a => a.name).join(', ') : (song.primaryArtists || 'Unknown Artist');
  return {
    id: song.id,
    title: decodeEntities(song.name || song.title || 'Untitled Track'),
    artist: decodeEntities(artists),
    album: song.album ? decodeEntities(song.album.name || '') : '',
    image: img,
    duration: song.duration || 0,
    streamUrl: pick.url || '',
    source: 'api',
    year: song.year || ''
  };
}

function normalizeLocalFile(file) {
  const url = URL.createObjectURL(file);
  return {
    id: 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2),
    title: file.name.replace(/\.[^/.]+$/, ''),
    artist: 'Local Library',
    album: 'Device File',
    image: '',
    duration: 0,
    streamUrl: url,
    source: 'local',
    year: ''
  };
}

/* ================= API LAYER ================= */
async function apiSearchSongs(q) {
  const data = await safeFetch(`${API_BASE}/api/search/songs?query=${encodeURIComponent(q)}&limit=20`);
  return (data?.data?.results || []).map(normalizeSong);
}

async function apiSearchAlbums(q) {
  const data = await safeFetch(`${API_BASE}/api/search/albums?query=${encodeURIComponent(q)}`);
  return data?.data?.results || [];
}

async function apiSearchArtists(q) {
  const data = await safeFetch(`${API_BASE}/api/search/artists?query=${encodeURIComponent(q)}`);
  return data?.data?.results || [];
}

async function apiSearchPlaylists(q) {
  const data = await safeFetch(`${API_BASE}/api/search/playlists?query=${encodeURIComponent(q)}`);
  return data?.data?.results || [];
}

async function apiGetAlbum(id) {
  const data = await safeFetch(`${API_BASE}/api/albums?id=${id}`);
  return data?.data;
}

async function apiGetArtist(id) {
  const data = await safeFetch(`${API_BASE}/api/artists/${id}?page=0&songCount=20`);
  return data?.data;
}

async function apiGetPlaylist(id) {
  const data = await safeFetch(`${API_BASE}/api/playlists?id=${id}&limit=50`);
  return data?.data;
}

/* ---------------- LYRICS ENGINE ---------------- */
async function fetchLyrics(track) {
  try {
    const url = `${LYRICS_BASE}/search?track_name=${encodeURIComponent(track.title)}&artist_name=${encodeURIComponent(track.artist.split(',')[0])}`;
    const list = await safeFetch(url, { headers: { 'Lrclib-Client': 'BoosterOS/2.0 MAX' } });
    const hit = Array.isArray(list) ? list.find(x => x.syncedLyrics) || list[0] : null;
    if (!hit) return null;
    if (hit.syncedLyrics) return { synced: true, lines: parseLRC(hit.syncedLyrics) };
    if (hit.plainLyrics) return { synced: false, lines: hit.plainLyrics.split('\n').map(t => ({ time: 0, text: t })) };
    return null;
  } catch (e) {
    return null;
  }
}

function parseLRC(lrc) {
  const lines = [];
  const re = /\[(\d{2}):(\d{2})(?:\.(\d{1,2}))?\]/g;
  lrc.split('\n').forEach(line => {
    let times = [];
    const text = line.replace(re, (full, mm, ss, cs) => {
      times.push(parseInt(mm) * 60 + parseInt(ss) + (cs ? parseInt(cs) / (cs.length === 2 ? 100 : 1000) : 0));
      return '';
    }).trim();
    times.forEach(t => lines.push({ time: t, text }));
  });
  return lines.sort((a, b) => a.time - b.time);
}

/* ================= WEB AUDIO ENGINE ================= */
let audioEl = new Audio();
audioEl.crossOrigin = 'anonymous';
audioEl.preload = 'auto';

let audioCtx, analyser, sourceNode, gainNode;
let eqFilters = [], bassFilter, trebleFilter, compressor, pannerNode;
let freqData, timeData, useSimulatedBeat = false, silentFrameCount = 0;

function initAudioGraph() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  sourceNode = audioCtx.createMediaElementSource(audioEl);

  eqFilters = EQ_FREQS.map((f, i) => {
    const filt = audioCtx.createBiquadFilter();
    filt.type = 'peaking';
    filt.frequency.value = f;
    filt.Q.value = 1.4;
    filt.gain.value = state.eqGains[i] || 0;
    return filt;
  });

  bassFilter = audioCtx.createBiquadFilter();
  bassFilter.type = 'lowshelf';
  bassFilter.frequency.value = 120;
  bassFilter.gain.value = 0;

  trebleFilter = audioCtx.createBiquadFilter();
  trebleFilter.type = 'highshelf';
  trebleFilter.frequency.value = 6000;
  trebleFilter.gain.value = 0;

  pannerNode = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
  compressor = audioCtx.createDynamicsCompressor();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = state.volume;

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.8;

  freqData = new Uint8Array(analyser.frequencyBinCount);
  timeData = new Uint8Array(analyser.frequencyBinCount);

  let chain = sourceNode;
  eqFilters.forEach(f => { chain.connect(f); chain = f; });
  chain.connect(bassFilter); chain = bassFilter;
  chain.connect(trebleFilter); chain = trebleFilter;
  if (pannerNode) { chain.connect(pannerNode); chain = pannerNode; }
  chain.connect(compressor); chain = compressor;
  chain.connect(gainNode); chain = gainNode;
  chain.connect(analyser);
  analyser.connect(audioCtx.destination);
}

function playTrack(track, addToQueueIfMissing = true) {
  initAudioGraph();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

  const idx = state.queue.findIndex(t => trackKey(t) === trackKey(track));
  if (idx >= 0) {
    state.currentIndex = idx;
  } else if (addToQueueIfMissing) {
    state.queue.push(track);
    state.currentIndex = state.queue.length - 1;
  }

  audioEl.src = track.streamUrl;
  audioEl.playbackRate = state.speed;

  audioEl.play().then(() => {
    state.isPlaying = true;
    updatePlayButtons();
  }).catch(() => {
    toast('Playback blocked by browser permissions');
  });

  addToRecent(track);
  updateNowPlayingUI(track);
  fetchAndRenderLyrics(track);
  extractAndApplyColors(track);
  setMediaSessionMeta(track);
  renderQueueViews();
  saveResumeState(track, 0);
}

function addToRecent(track) {
  state.recentlyPlayed = [track, ...state.recentlyPlayed.filter(t => trackKey(t) !== trackKey(track))].slice(0, 40);
  saveLS();
}

function togglePlay() {
  if (!audioEl.src) return;
  initAudioGraph();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

  if (state.isPlaying) {
    audioEl.pause();
    state.isPlaying = false;
  } else {
    audioEl.play().catch(() => {});
    state.isPlaying = true;
  }
  updatePlayButtons();
}

function playNext(manual = false) {
  if (!state.queue.length) return;
  if (state.repeat === 'one' && !manual) {
    audioEl.currentTime = 0;
    audioEl.play();
    return;
  }
  let next = state.currentIndex + 1;
  if (state.shuffle) next = Math.floor(Math.random() * state.queue.length);
  if (next >= state.queue.length) {
    if (state.repeat === 'all') next = 0;
    else {
      state.isPlaying = false;
      updatePlayButtons();
      return;
    }
  }
  playTrack(state.queue[next]);
}

function playPrev() {
  if (!state.queue.length) return;
  let prev = state.currentIndex - 1;
  if (prev < 0) prev = state.repeat === 'all' ? state.queue.length - 1 : 0;
  playTrack(state.queue[prev]);
}

function toggleShuffle() {
  state.shuffle = !state.shuffle;
  updatePlayButtons();
  toast(state.shuffle ? 'Shuffle Enabled' : 'Shuffle Disabled');
}

function cycleRepeat() {
  state.repeat = state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off';
  updatePlayButtons();
  toast('Repeat Mode: ' + state.repeat.toUpperCase());
}

function updatePlayButtons() {
  const icon = state.isPlaying ? '⏸' : '▶';
  document.getElementById('miniPlayBtn').textContent = icon;
  document.getElementById('npPlayBtn').textContent = icon;
  document.getElementById('shuffleBtn').classList.toggle('on', state.shuffle);
  document.getElementById('npShuffleBtn').classList.toggle('on', state.shuffle);
  document.getElementById('repeatBtn').classList.toggle('on', state.repeat !== 'off');
  document.getElementById('npRepeatBtn').classList.toggle('on', state.repeat !== 'off');
  document.getElementById('repeatBtn').textContent = state.repeat === 'one' ? '🔂' : '🔁';
  document.getElementById('npRepeatBtn').textContent = state.repeat === 'one' ? '🔂' : '🔁';
}

function currentTrack() { return state.queue[state.currentIndex] || null; }

/* AUDIO EVENT LISTENERS */
audioEl.addEventListener('timeupdate', () => {
  if (!audioEl.duration) return;
  const pct = (audioEl.currentTime / audioEl.duration) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('npFill').style.width = pct + '%';
  document.getElementById('timeCurrent').textContent = formatTime(audioEl.currentTime);
  document.getElementById('timeTotal').textContent = formatTime(audioEl.duration);
  document.getElementById('npTimeCurrent').textContent = formatTime(audioEl.currentTime);
  document.getElementById('npTimeTotal').textContent = formatTime(audioEl.duration);
  updateActiveLyric(audioEl.currentTime);
  checkSleepTimer();
  const t = currentTrack();
  if (t) saveResumeState(t, audioEl.currentTime);
});

audioEl.addEventListener('ended', () => playNext(false));
audioEl.addEventListener('play', () => { state.isPlaying = true; updatePlayButtons(); });
audioEl.addEventListener('pause', () => { state.isPlaying = false; updatePlayButtons(); });

function saveResumeState(track, time) {
  state.lastPosition = { track, time };
  clearTimeout(window._saveTO);
  window._saveTO = setTimeout(() => localStorage.setItem('bo_lastpos', JSON.stringify(state.lastPosition)), 800);
}

function resumePlay() {
  if (state.lastPosition && state.lastPosition.track) {
    playTrack(state.lastPosition.track);
    setTimeout(() => { audioEl.currentTime = state.lastPosition.time || 0; }, 400);
  } else {
    switchView('search');
    document.getElementById('mainSearchInput').focus();
  }
}

/* SLEEP TIMER ENGINE */
function openSleepTimerModal() { openModal('sleepTimerModal'); updateSleepTimerUI(); }
function setSleepTimer(minutes) {
  state.sleepTimerDeadline = Date.now() + minutes * 60 * 1000;
  toast(`Sleep timer set for ${minutes} minutes`);
  updateSleepTimerUI();
}
function clearSleepTimer() {
  state.sleepTimerDeadline = null;
  toast("Sleep timer disabled");
  updateSleepTimerUI();
}
function updateSleepTimerUI() {
  const status = document.getElementById('sleepTimerStatus');
  if (state.sleepTimerDeadline) {
    const leftSec = Math.max(0, Math.round((state.sleepTimerDeadline - Date.now()) / 1000));
    status.textContent = `Music will pause in ${formatTime(leftSec)}`;
  } else {
    status.textContent = "No timer active";
  }
}
function checkSleepTimer() {
  if (state.sleepTimerDeadline && Date.now() >= state.sleepTimerDeadline) {
    state.sleepTimerDeadline = null;
    if (state.isPlaying) togglePlay();
    toast("Sleep timer ended. Audio paused.");
  }
}

/* SEEK CONTROLS */
['miniBar', 'npBar'].forEach(id => {
  document.getElementById(id).addEventListener('click', e => {
    if (!audioEl.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audioEl.currentTime = ((e.clientX - rect.left) / rect.width) * audioEl.duration;
  });
});

document.getElementById('volumeSlider').addEventListener('input', e => {
  state.volume = parseFloat(e.target.value);
  if (gainNode) gainNode.gain.value = state.volume;
  saveLS();
});
document.getElementById('volumeSlider').value = state.volume;

/* ================= NOW PLAYING OVERLAY UI ================= */
function updateNowPlayingUI(track) {
  document.getElementById('miniTitle').textContent = track.title;
  document.getElementById('miniArtist').textContent = track.artist;
  document.getElementById('miniArt').src = track.image || placeholderArt();
  document.getElementById('npTitle').textContent = track.title;
  document.getElementById('npArtist').textContent = track.artist;
  document.getElementById('npArt').src = track.image || placeholderArt();

  const favActive = isFavorite(track);
  document.getElementById('favMiniBtn').textContent = favActive ? '♥' : '♡';
  document.getElementById('favMiniBtn').classList.toggle('active', favActive);
  document.getElementById('npFavBtn').textContent = (favActive ? '♥ Favorited' : '♡ Favorite');
  document.getElementById('npFavBtn').classList.toggle('on', favActive);

  document.getElementById('spotlightTitle').textContent = 'Now Playing: ' + track.title;
  document.getElementById('spotlightSub').textContent = track.artist + ' • Dynamic HD Engine Active';
  highlightPlayingCards(track);
}

function placeholderArt() {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#7928ca"/><text x="50%" y="55%" font-size="60" text-anchor="middle" fill="white">♪</text></svg>`);
}

function highlightPlayingCards(track) {
  document.querySelectorAll('.track-card').forEach(c => {
    c.classList.toggle('playing', c.dataset.trackkey === trackKey(track));
  });
}

function toggleFavoriteCurrent() {
  const t = currentTrack();
  if (!t) return;
  if (isFavorite(t)) state.favorites = state.favorites.filter(f => trackKey(f) !== trackKey(t));
  else state.favorites.push(t);
  saveLS();
  updateNowPlayingUI(t);
  if (document.getElementById('view-library').classList.contains('active')) renderLibrary();
}

function openNowPlaying() { document.getElementById('npOverlay').classList.add('open'); }
function closeNowPlaying() { document.getElementById('npOverlay').classList.remove('open'); }

/* ================= LYRICS ENGINE ================= */
let currentLyrics = null, activeLyricIndex = -1;
async function fetchAndRenderLyrics(track) {
  const box = document.getElementById('lyricsContainer');
  box.innerHTML = '<div class="empty-state">Loading synced lyrics...</div>';
  currentLyrics = null; activeLyricIndex = -1;

  if (track.source === 'local') {
    box.innerHTML = '<div class="empty-state">Synced lyrics unavailable for local device files</div>';
    return;
  }

  const data = await fetchLyrics(track);
  if (!data || !data.lines.length) {
    box.innerHTML = '<div class="empty-state">No lyrics found for this track</div>';
    return;
  }

  currentLyrics = data;
  box.innerHTML = data.lines.map((l, i) =>
    `<div class="lyric-line" data-i="${i}" data-t="${l.time}" onclick="seekToLyric(${l.time})">${l.text || '&nbsp;'}</div>`
  ).join('');
}

function seekToLyric(t) { if (audioEl.duration) audioEl.currentTime = t; }

function updateActiveLyric(currentTime) {
  if (!currentLyrics || !currentLyrics.synced) return;
  const lines = currentLyrics.lines;
  let idx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].time <= currentTime) idx = i;
    else break;
  }
  if (idx !== activeLyricIndex) {
    activeLyricIndex = idx;
    document.querySelectorAll('.lyric-line').forEach(el => el.classList.remove('active'));
    if (idx >= 0) {
      const el = document.querySelector(`.lyric-line[data-i="${idx}"]`);
      if (el) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}

/* ================= DYNAMIC COLOR EXTRACTION ================= */
let currentColorRGB = [0, 242, 254], targetColorRGB = [0, 242, 254], colorAnimId = null;

async function extractAndApplyColors(track) {
  let rgb = null;
  if (track.image) {
    rgb = await new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const c = document.createElement('canvas'); c.width = 24; c.height = 24;
          const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, 24, 24);
          const data = ctx.getImageData(0, 0, 24, 24).data;
          let r = 0, g = 0, b = 0, n = 0, maxSat = -1, vr = 0, vg = 0, vb = 0;
          for (let i = 0; i < data.length; i += 4) {
            const R = data[i], G = data[i + 1], B = data[i + 2];
            r += R; g += G; b += B; n++;
            const mx = Math.max(R, G, B), mn = Math.min(R, G, B);
            const sat = mx === 0 ? 0 : (mx - mn) / mx;
            if (sat > maxSat && mx > 50) { maxSat = sat; vr = R; vg = G; vb = B; }
          }
          resolve(maxSat > 0.15 ? [vr, vg, vb] : [Math.round(r / n), Math.round(g / n), Math.round(b / n)]);
        } catch (e) { resolve(null); }
      };
      img.onerror = () => resolve(null);
      img.src = track.image;
    });
  }
  if (!rgb) rgb = hashColor(track.title + track.artist);
  targetColorRGB = rgb;
  animateColorTransition();
  document.getElementById('npBg').style.background = `radial-gradient(circle at 30% 20%, rgb(${rgb[0]},${rgb[1]},${rgb[2]}) 0%, transparent 60%)`;
}

function animateColorTransition() {
  if (colorAnimId) cancelAnimationFrame(colorAnimId);
  const start = currentColorRGB.slice();
  const startTime = performance.now();
  const dur = 900;

  function step(now) {
    const p = Math.min(1, (now - startTime) / dur);
    const cur = [0, 1, 2].map(i => Math.round(start[i] + (targetColorRGB[i] - start[i]) * p));
    currentColorRGB = cur;
    const [r, g, b] = cur;
    document.documentElement.style.setProperty('--accent', `rgb(${r},${g},${b})`);
    document.documentElement.style.setProperty('--accent3', `rgb(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${Math.min(255, b + 60)})`);
    document.documentElement.style.setProperty('--accent2', `rgb(${Math.max(0, r - 40)},${Math.max(0, g - 20)},${Math.min(255, b + 80)})`);
    document.documentElement.style.setProperty('--glow', `rgba(${r},${g},${b},.35)`);
    if (p < 1) colorAnimId = requestAnimationFrame(step);
  }
  colorAnimId = requestAnimationFrame(step);
}

/* ================= VISUALIZER ENGINE ================= */
const ambientCanvas = document.getElementById('ambientCanvas');
const ambCtx = ambientCanvas.getContext('2d');
const vizCanvas = document.getElementById('vizCanvas');
const vizCtx = vizCanvas.getContext('2d');
let particles = [];

function resizeCanvases() {
  ambientCanvas.width = window.innerWidth;
  ambientCanvas.height = window.innerHeight;
  vizCanvas.width = vizCanvas.clientWidth * 2 || 800;
  vizCanvas.height = vizCanvas.clientHeight * 2 || 400;
}
window.addEventListener('resize', resizeCanvases);
resizeCanvases();

let bassAvg = 0, midAvg = 0, trebleAvg = 0, beatPulse = 0, simTime = 0;

function analyzeAudio() {
  if (!analyser) { bassAvg = midAvg = trebleAvg = 0; return; }
  analyser.getByteFrequencyData(freqData);
  analyser.getByteTimeDomainData(timeData);
  const len = freqData.length;
  let bass = 0, mid = 0, treb = 0, total = 0;

  for (let i = 0; i < len; i++) {
    total += freqData[i];
    if (i < len * 0.12) bass += freqData[i];
    else if (i < len * 0.5) mid += freqData[i];
    else treb += freqData[i];
  }

  bass /= (len * 0.12); mid /= (len * 0.38); treb /= (len * 0.5);

  if (state.isPlaying) {
    if (total < 2) silentFrameCount++; else silentFrameCount = 0;
    useSimulatedBeat = silentFrameCount > 60;
  }

  if (useSimulatedBeat && state.isPlaying) {
    simTime += 0.045;
    const bpmPhase = Math.abs(Math.sin(simTime * 1.6));
    bass = 120 + bpmPhase * 110; mid = 90 + Math.sin(simTime * 2.1) * 40; treb = 70 + Math.cos(simTime * 3.3) * 50;
  } else if (!state.isPlaying) {
    bass *= 0.9; mid *= 0.9; treb *= 0.9;
  }

  bassAvg = bassAvg * 0.7 + bass * 0.3;
  midAvg = midAvg * 0.7 + mid * 0.3;
  trebleAvg = trebleAvg * 0.7 + treb * 0.3;

  const norm = Math.min(1, bassAvg / 180);
  beatPulse = beatPulse * 0.82 + norm * 0.18;
  document.documentElement.style.setProperty('--pulse', beatPulse.toFixed(3));
}

function drawAmbient() {
  ambCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
  const [r, g, b] = currentColorRGB;
  const intensity = 0.08 + beatPulse * 0.18;
  const radius = Math.min(ambientCanvas.width, ambientCanvas.height) * (0.35 + beatPulse * 0.15);

  const grad = ambCtx.createRadialGradient(
    ambientCanvas.width * 0.3, ambientCanvas.height * 0.1, 0,
    ambientCanvas.width * 0.3, ambientCanvas.height * 0.1, radius * 2.2
  );
  grad.addColorStop(0, `rgba(${r},${g},${b},${intensity})`);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ambCtx.fillStyle = grad;
  ambCtx.fillRect(0, 0, ambientCanvas.width, ambientCanvas.height);

  const grad2 = ambCtx.createRadialGradient(
    ambientCanvas.width * 0.75, ambientCanvas.height * 0.85, 0,
    ambientCanvas.width * 0.75, ambientCanvas.height * 0.85, radius * 1.8
  );
  grad2.addColorStop(0, `rgba(${g},${b},${r},${intensity * 0.7})`);
  grad2.addColorStop(1, 'rgba(0,0,0,0)');
  ambCtx.fillStyle = grad2;
  ambCtx.fillRect(0, 0, ambientCanvas.width, ambientCanvas.height);
}

function drawViz() {
  const w = vizCanvas.width, h = vizCanvas.height;
  vizCtx.clearRect(0, 0, w, h);
  const [r, g, b] = currentColorRGB;
  const mode = state.visualizerMode;

  if (mode === 'spectrum') {
    const bars = 48; const bw = w / bars;
    for (let i = 0; i < bars; i++) {
      const idx = Math.floor(i * (freqData ? freqData.length : 32) / bars);
      const v = (freqData ? freqData[idx] : 0) / 255 * (useSimulatedBeat ? 1.3 : 1);
      const barH = Math.max(4, v * h * 0.9);
      vizCtx.fillStyle = `rgba(${r},${g},${b},${0.55 + v * 0.4})`;
      vizCtx.shadowColor = `rgb(${r},${g},${b})`; vizCtx.shadowBlur = 14;
      vizCtx.fillRect(i * bw + 2, h - barH, bw - 4, barH);
    }
  } else if (mode === 'waveform') {
    vizCtx.beginPath(); vizCtx.lineWidth = 4; vizCtx.strokeStyle = `rgb(${r},${g},${b})`;
    vizCtx.shadowColor = `rgb(${r},${g},${b})`; vizCtx.shadowBlur = 16;
    const slice = w / (timeData ? timeData.length : 64);
    for (let i = 0; i < (timeData ? timeData.length : 64); i++) {
      const v = timeData ? timeData[i] / 255 : 0.5;
      const y = v * h;
      i === 0 ? vizCtx.moveTo(0, y) : vizCtx.lineTo(i * slice, y);
    }
    vizCtx.stroke();
  } else if (mode === 'circular') {
    const cx = w / 2, cy = h / 2, baseR = Math.min(w, h) * 0.22;
    const bars = 64;
    for (let i = 0; i < bars; i++) {
      const idx = Math.floor(i * (freqData ? freqData.length : 32) / bars);
      const v = (freqData ? freqData[idx] : 0) / 255;
      const angle = (i / bars) * Math.PI * 2;
      const len = baseR * 0.4 + v * baseR * 0.9;
      const x1 = cx + Math.cos(angle) * baseR, y1 = cy + Math.sin(angle) * baseR;
      const x2 = cx + Math.cos(angle) * (baseR + len), y2 = cy + Math.sin(angle) * (baseR + len);
      vizCtx.strokeStyle = `rgba(${r},${g},${b},${0.5 + v * 0.5})`; vizCtx.lineWidth = 5;
      vizCtx.shadowColor = `rgb(${r},${g},${b})`; vizCtx.shadowBlur = 10;
      vizCtx.beginPath(); vizCtx.moveTo(x1, y1); vizCtx.lineTo(x2, y2); vizCtx.stroke();
    }
  } else if (mode === 'particles') {
    const spawnRate = Math.floor(trebleAvg / 12);
    for (let i = 0; i < spawnRate; i++) {
      particles.push({
        x: Math.random() * w, y: h,
        vx: (Math.random() - 0.5) * 1.5, vy: -(1 + Math.random() * 3),
        life: 1, size: 2 + Math.random() * 4
      });
    }
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life -= 0.012;
      vizCtx.fillStyle = `rgba(${r},${g},${b},${p.life})`;
      vizCtx.shadowColor = `rgb(${r},${g},${b})`; vizCtx.shadowBlur = 8;
      vizCtx.beginPath(); vizCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2); vizCtx.fill();
    });
    if (particles.length > 400) particles.splice(0, 100);
  } else if (mode === 'ambient') {
    const grad = vizCtx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * (0.3 + beatPulse * 0.4));
    grad.addColorStop(0, `rgba(${r},${g},${b},${0.5 + beatPulse * 0.4})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    vizCtx.fillStyle = grad;
    vizCtx.fillRect(0, 0, w, h);
  }
}

function rafLoop() {
  analyzeAudio();
  drawAmbient();
  if (document.getElementById('npOverlay').classList.contains('open')) drawViz();
  requestAnimationFrame(rafLoop);
}
rafLoop();

document.getElementById('vizModeRow').innerHTML = ['spectrum', 'waveform', 'circular', 'particles', 'ambient'].map(m =>
  `<button class="np-mode-btn ${m === state.visualizerMode ? 'active' : ''}" data-mode="${m}">${m[0].toUpperCase() + m.slice(1)}</button>`
).join('');

document.getElementById('vizModeRow').addEventListener('click', e => {
  const btn = e.target.closest('.np-mode-btn');
  if (!btn) return;
  state.visualizerMode = btn.dataset.mode;
  document.querySelectorAll('.np-mode-btn').forEach(b => b.classList.toggle('active', b === btn));
  saveLS();
});

/* ================= MEDIA SESSION API ================= */
function setMediaSessionMeta(track) {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album || 'BOOSTER OS 2.0V MAX',
      artwork: track.image ? [{ src: track.image, sizes: '500x500', type: 'image/jpeg' }] : []
    });
    navigator.mediaSession.setActionHandler('play', () => togglePlay());
    navigator.mediaSession.setActionHandler('pause', () => togglePlay());
    navigator.mediaSession.setActionHandler('previoustrack', () => playPrev());
    navigator.mediaSession.setActionHandler('nexttrack', () => playNext(true));
    navigator.mediaSession.setActionHandler('seekto', details => {
      if (details.seekTime != null) audioEl.currentTime = details.seekTime;
    });
  } catch (e) {}
}

/* ================= NAVIGATION ================= */
function switchView(id) {
  document.querySelectorAll('.view-panel').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  document.querySelectorAll('.sidebar .nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === id));
  document.querySelectorAll('.mobile-nav button').forEach(n => n.classList.toggle('active', n.dataset.view === id));
  if (id === 'library') renderLibrary();
  if (id === 'playlists') renderPlaylists();
  if (id === 'queue') renderQueueViews();
  if (id === 'dsp') renderDSPControls();
}

document.querySelectorAll('.sidebar .nav-item[data-view]').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
document.querySelectorAll('.mobile-nav button[data-view]').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));

/* Theme */
document.querySelectorAll('.theme-btn').forEach(b => {
  b.classList.toggle('active', b.dataset.theme === state.theme);
  b.addEventListener('click', () => {
    state.theme = b.dataset.theme;
    document.body.dataset.theme = state.theme;
    document.querySelectorAll('.theme-btn').forEach(x => x.classList.toggle('active', x === b));
    saveLS();
  });
});
document.body.dataset.theme = state.theme;

/* TV Mode */
document.getElementById('tvModeBtn').addEventListener('click', () => {
  state.tvMode = !state.tvMode;
  document.body.classList.toggle('tv-mode', state.tvMode);
  if (state.tvMode && currentTrack()) openNowPlaying();
  toast(state.tvMode ? 'TV Mode Enabled' : 'TV Mode Disabled');
});

/* ================= CARD RENDERING ================= */
function trackCardHTML(t) {
  const fav = isFavorite(t);
  return `<div class="track-card" data-trackkey="${trackKey(t)}">
    <div class="track-thumb-wrap">
      <img class="track-thumb" src="${t.image || placeholderArt()}" onload="this.classList.add('loaded')" onerror="this.src='${placeholderArt()}';this.classList.add('loaded')" alt="${t.title}">
      <div class="thumb-play">▶</div>
    </div>
    <div class="track-name">${t.title}</div>
    <div class="track-artist">${t.artist}</div>
    <div class="track-footer">
      <button class="fav-btn ${fav ? 'active' : ''}" data-favkey="${trackKey(t)}" aria-label="Favorite">${fav ? '♥' : '♡'}</button>
      <div style="display:flex;gap:6px;">
        <button class="btn-small" data-queuekey="${trackKey(t)}">+ Queue</button>
        <button class="btn-small" data-playkey="${trackKey(t)}">Play</button>
      </div>
    </div>
  </div>`;
}

function bindCardEvents(container, tracks) {
  container.querySelectorAll('[data-playkey]').forEach(btn => {
    const t = tracks.find(x => trackKey(x) === btn.dataset.playkey);
    btn.addEventListener('click', e => { e.stopPropagation(); if (t) playTrack(t); });
  });
  container.querySelectorAll('.track-card').forEach(card => {
    const t = tracks.find(x => trackKey(x) === card.dataset.trackkey);
    card.addEventListener('click', () => { if (t) playTrack(t); });
  });
  container.querySelectorAll('[data-queuekey]').forEach(btn => {
    const t = tracks.find(x => trackKey(x) === btn.dataset.queuekey);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (t) {
        state.queue.push(t);
        renderQueueViews();
        toast('Added to queue: ' + t.title);
      }
    });
  });
  container.querySelectorAll('.fav-btn').forEach(btn => {
    const t = tracks.find(x => trackKey(x) === btn.dataset.favkey);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (!t) return;
      if (isFavorite(t)) {
        state.favorites = state.favorites.filter(f => trackKey(f) !== trackKey(t));
        btn.textContent = '♡'; btn.classList.remove('active');
      } else {
        state.favorites.push(t);
        btn.textContent = '♥'; btn.classList.add('active');
      }
      saveLS();
    });
  });
  highlightPlayingCards(currentTrack() || {});
}

/* ================= HOME VIEW ================= */
async function loadHome() {
  const grid = document.getElementById('homeGrid');
  grid.innerHTML = Array(8).fill('<div class="skeleton"></div>').join('');
  try {
    const songs = await apiSearchSongs('Bollywood Latest');
    grid.innerHTML = songs.map(trackCardHTML).join('');
    bindCardEvents(grid, songs);
  } catch (e) {
    grid.innerHTML = '<div class="empty-state">Failed to load tracks. Please check connection.</div>';
  }
  renderRecentHome();
}

function renderRecentHome() {
  const grid = document.getElementById('recentGrid');
  if (!state.recentlyPlayed.length) {
    grid.innerHTML = '<div class="empty-state">No recently played tracks yet</div>';
    return;
  }
  const tracks = state.recentlyPlayed.slice(0, 8);
  grid.innerHTML = tracks.map(trackCardHTML).join('');
  bindCardEvents(grid, tracks);
}

document.getElementById('moodTags').addEventListener('click', async e => {
  const tag = e.target.closest('.tag'); if (!tag) return;
  document.querySelectorAll('#moodTags .tag').forEach(t => t.classList.toggle('active', t === tag));
  if (tag.dataset.fav) { switchView('library'); renderLibrary('favorites'); return; }
  const grid = document.getElementById('homeGrid');
  grid.innerHTML = Array(8).fill('<div class="skeleton"></div>').join('');
  const songs = await apiSearchSongs(tag.dataset.q);
  grid.innerHTML = songs.map(trackCardHTML).join('');
  bindCardEvents(grid, songs);
});

/* ================= SEARCH VIEW ================= */
let searchType = 'songs';
document.getElementById('searchTypeTags').addEventListener('click', e => {
  const tag = e.target.closest('.tag'); if (!tag) return;
  document.querySelectorAll('#searchTypeTags .tag').forEach(t => t.classList.toggle('active', t === tag));
  searchType = tag.dataset.type;
  const q = document.getElementById('mainSearchInput').value.trim();
  if (q) runSearch(q);
});

function goSearch(q) {
  q = q.trim(); if (!q) return;
  switchView('search');
  document.getElementById('mainSearchInput').value = q;
  runSearch(q);
}

async function runSearch(q) {
  const grid = document.getElementById('searchGrid');
  document.getElementById('searchResultTitle').textContent = `Results for "${q}"`;
  grid.innerHTML = Array(8).fill('<div class="skeleton"></div>').join('');
  try {
    if (searchType === 'songs') {
      const songs = await apiSearchSongs(q);
      grid.innerHTML = songs.length ? songs.map(trackCardHTML).join('') : '<div class="empty-state">No songs found</div>';
      bindCardEvents(grid, songs);
    } else if (searchType === 'albums') {
      const albums = await apiSearchAlbums(q);
      grid.innerHTML = albums.length ? albums.map(a => albumCardHTML(a)).join('') : '<div class="empty-state">No albums found</div>';
      bindAlbumEvents(grid, albums);
    } else if (searchType === 'artists') {
      const artists = await apiSearchArtists(q);
      grid.innerHTML = artists.length ? artists.map(a => artistCardHTML(a)).join('') : '<div class="empty-state">No artists found</div>';
      bindArtistEvents(grid, artists);
    } else if (searchType === 'playlists') {
      const pls = await apiSearchPlaylists(q);
      grid.innerHTML = pls.length ? pls.map(p => playlistCardHTML(p)).join('') : '<div class="empty-state">No playlists found</div>';
      bindApiPlaylistEvents(grid, pls);
    }
  } catch (e) {
    grid.innerHTML = '<div class="empty-state">Search query failed. Check connection.</div>';
  }
}

function albumCardHTML(a) {
  const img = (a.image?.[2] || a.image?.[0] || {}).url || '';
  return `<div class="track-card" data-albumid="${a.id}">
    <div class="track-thumb-wrap"><img class="track-thumb loaded" src="${img}" alt="${decodeEntities(a.name)}"><div class="thumb-play">▶</div></div>
    <div class="track-name">${decodeEntities(a.name)}</div>
    <div class="track-artist">${a.year || ''} · Album</div>
  </div>`;
}

function artistCardHTML(a) {
  const img = (a.image?.[2] || a.image?.[0] || {}).url || '';
  return `<div class="track-card" data-artistid="${a.id}">
    <div class="track-thumb-wrap" style="border-radius:50%;overflow:hidden;"><img class="track-thumb loaded" src="${img}" style="border-radius:50%;" alt="${decodeEntities(a.name)}"></div>
    <div class="track-name">${decodeEntities(a.name)}</div>
    <div class="track-artist">Artist</div>
  </div>`;
}

function playlistCardHTML(p) {
  const img = (p.image?.[2] || p.image?.[0] || {}).url || '';
  return `<div class="track-card" data-playlistid="${p.id}">
    <div class="track-thumb-wrap"><img class="track-thumb loaded" src="${img}" alt="${decodeEntities(p.name)}"><div class="thumb-play">▶</div></div>
    <div class="track-name">${decodeEntities(p.name)}</div>
    <div class="track-artist">${p.songCount || ''} songs</div>
  </div>`;
}

function bindAlbumEvents(grid) { grid.querySelectorAll('[data-albumid]').forEach(c => c.addEventListener('click', () => openAlbum(c.dataset.albumid))); }
function bindArtistEvents(grid) { grid.querySelectorAll('[data-artistid]').forEach(c => c.addEventListener('click', () => openArtist(c.dataset.artistid))); }
function bindApiPlaylistEvents(grid) { grid.querySelectorAll('[data-playlistid]').forEach(c => c.addEventListener('click', () => openApiPlaylist(c.dataset.playlistid))); }

/* ================= DETAIL VIEWS ================= */
async function openAlbum(id) {
  switchView('detail');
  const header = document.getElementById('detailHeader'); const grid = document.getElementById('detailGrid');
  header.innerHTML = '<div class="skeleton" style="height:180px;"></div>'; grid.innerHTML = '';
  const album = await apiGetAlbum(id);
  const img = (album.image?.[2] || album.image?.[0] || {}).url || '';
  header.innerHTML = `<div class="album-header">
    <img src="${img}" alt="Album Artwork">
    <div>
      <div style="font-size:.7rem;color:var(--text-dim);">ALBUM</div>
      <h2>${decodeEntities(album.name)}</h2>
      <div style="color:var(--text-dim);font-size:.82rem;margin-top:6px;">${album.year || ''} · ${album.songCount || 0} songs</div>
      <button class="btn-action" style="margin-top:12px;" id="playAlbumBtn">▶ Play All</button>
    </div>
  </div>`;
  const tracks = (album.songs || []).map(normalizeSong);
  grid.innerHTML = tracks.map(trackCardHTML).join('');
  bindCardEvents(grid, tracks);
  document.getElementById('playAlbumBtn').addEventListener('click', () => { state.queue = tracks.slice(); playTrack(tracks[0]); });
}

async function openArtist(id) {
  switchView('detail');
  const header = document.getElementById('detailHeader'); const grid = document.getElementById('detailGrid');
  header.innerHTML = '<div class="skeleton" style="height:180px;"></div>'; grid.innerHTML = '';
  const artist = await apiGetArtist(id);
  const img = (artist.image?.[2] || artist.image?.[0] || {}).url || '';
  header.innerHTML = `<div class="artist-header">
    <img src="${img}" style="border-radius:50%;" alt="Artist Artwork">
    <div>
      <div style="font-size:.7rem;color:var(--text-dim);">ARTIST</div>
      <h2>${decodeEntities(artist.name)}</h2>
      <div style="color:var(--text-dim);font-size:.82rem;margin-top:6px;">${(artist.followerCount || 0).toLocaleString()} followers</div>
    </div>
  </div>`;
  const tracks = (artist.topSongs || []).map(normalizeSong);
  grid.innerHTML = tracks.map(trackCardHTML).join('');
  bindCardEvents(grid, tracks);
}

async function openApiPlaylist(id) {
  switchView('detail');
  const header = document.getElementById('detailHeader'); const grid = document.getElementById('detailGrid');
  header.innerHTML = '<div class="skeleton" style="height:180px;"></div>'; grid.innerHTML = '';
  const pl = await apiGetPlaylist(id);
  const img = (pl.image?.[2] || pl.image?.[0] || {}).url || '';
  header.innerHTML = `<div class="album-header">
    <img src="${img}" alt="Playlist Artwork">
    <div>
      <div style="font-size:.7rem;color:var(--text-dim);">PLAYLIST</div>
      <h2>${decodeEntities(pl.name)}</h2>
      <div style="color:var(--text-dim);font-size:.82rem;margin-top:6px;">${pl.songCount || 0} songs</div>
      <button class="btn-action" style="margin-top:12px;" id="playPlBtn">▶ Play All</button>
    </div>
  </div>`;
  const tracks = (pl.songs || []).map(normalizeSong);
  grid.innerHTML = tracks.map(trackCardHTML).join('');
  bindCardEvents(grid, tracks);
  document.getElementById('playPlBtn').addEventListener('click', () => { state.queue = tracks.slice(); playTrack(tracks[0]); });
}

/* ================= LIBRARY VIEW ================= */
let activeLibTab = 'favorites';
document.getElementById('libTabs').addEventListener('click', e => {
  const tag = e.target.closest('.tag'); if (!tag) return;
  document.querySelectorAll('#libTabs .tag').forEach(t => t.classList.toggle('active', t === tag));
  renderLibrary(tag.dataset.lib);
});

function renderLibrary(tab) {
  activeLibTab = tab || activeLibTab;
  document.querySelectorAll('#libTabs .tag').forEach(t => t.classList.toggle('active', t.dataset.lib === activeLibTab));
  const grid = document.getElementById('libraryGrid');
  let tracks = [];

  if (activeLibTab === 'favorites') tracks = state.favorites;
  else if (activeLibTab === 'recent') tracks = state.recentlyPlayed;
  else if (activeLibTab === 'most') {
    const counts = {};
    state.recentlyPlayed.forEach(t => { counts[trackKey(t)] = (counts[trackKey(t)] || 0) + 1; });
    tracks = [...state.recentlyPlayed].sort((a, b) => (counts[trackKey(b)] || 0) - (counts[trackKey(a)] || 0));
  }
  else if (activeLibTab === 'local') tracks = state.localTracks;
  else if (activeLibTab === 'downloads') tracks = [];

  document.getElementById('localDrop').style.display = activeLibTab === 'local' ? 'block' : 'none';

  if (!tracks.length) {
    grid.innerHTML = activeLibTab === 'downloads'
      ? '<div class="empty-state">Offline download management is available for user-owned files. Remote streaming downloads are restricted by API policy.</div>'
      : '<div class="empty-state">No tracks found in this category</div>';
    return;
  }
  grid.innerHTML = tracks.map(trackCardHTML).join('');
  bindCardEvents(grid, tracks);
}

document.getElementById('localFileInput').addEventListener('change', e => {
  const files = Array.from(e.target.files || []);
  files.forEach(f => state.localTracks.push(normalizeLocalFile(f)));
  toast(`${files.length} local track(s) imported`);
  if (activeLibTab === 'local') renderLibrary('local');
});

const dz = document.getElementById('localDrop');
['dragover'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.style.borderColor = 'var(--accent)'; }));
['dragleave', 'drop'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.style.borderColor = 'var(--border)'; }));
dz.addEventListener('drop', e => {
  const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('audio'));
  files.forEach(f => state.localTracks.push(normalizeLocalFile(f)));
  if (files.length) { toast(`${files.length} file(s) added`); renderLibrary('local'); }
});

/* ================= PLAYLISTS MANAGEMENT ================= */
function renderPlaylists() {
  const grid = document.getElementById('playlistsGrid');
  if (!state.playlists.length) {
    grid.innerHTML = '<div class="empty-state">No playlists created yet. Click "+ New Playlist" to start.</div>';
    return;
  }
  grid.innerHTML = state.playlists.map(p => `
    <div class="track-card" data-plid="${p.id}">
      <div class="track-thumb-wrap">
        <img class="track-thumb loaded" src="${(p.tracks[0] && p.tracks[0].image) || placeholderArt()}" alt="${p.name}">
        <div class="thumb-play">▶</div>
      </div>
      <div class="track-name">${p.name}</div>
      <div class="track-artist">${p.tracks.length} tracks</div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-plid]').forEach(card => {
    card.addEventListener('click', () => {
      const pl = state.playlists.find(p => p.id === card.dataset.plid);
      openLocalPlaylist(pl);
    });
  });
}

function openLocalPlaylist(pl) {
  switchView('detail');
  const header = document.getElementById('detailHeader'); const grid = document.getElementById('detailGrid');
  header.innerHTML = `<div class="album-header">
    <img src="${(pl.tracks[0] && pl.tracks[0].image) || placeholderArt()}" alt="Playlist Cover">
    <div>
      <div style="font-size:.7rem;color:var(--text-dim);">PLAYLIST</div>
      <h2>${pl.name}</h2>
      <div style="color:var(--text-dim);font-size:.82rem;margin-top:6px;">${pl.tracks.length} tracks</div>
      <button class="btn-action" style="margin-top:12px;" id="playLocalPlBtn">▶ Play All</button>
    </div>
  </div>`;
  grid.innerHTML = pl.tracks.length ? pl.tracks.map(trackCardHTML).join('') : '<div class="empty-state">Playlist is empty</div>';
  bindCardEvents(grid, pl.tracks);
  document.getElementById('playLocalPlBtn').addEventListener('click', () => {
    if (pl.tracks.length) {
      state.queue = pl.tracks.slice();
      playTrack(pl.tracks[0]);
    }
  });
}

function exportPlaylists() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.playlists));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `booster_os_playlists_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  toast("Playlists exported successfully!");
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function openCreatePlaylist() { closeModal('addToPlaylistModal'); document.getElementById('playlistNameInput').value = ''; openModal('playlistModal'); }

function confirmCreatePlaylist() {
  const name = document.getElementById('playlistNameInput').value.trim();
  if (!name) return toast('Please enter a playlist name');
  const pl = { id: 'pl-' + Date.now(), name, tracks: [] };
  state.playlists.push(pl);
  saveLS();
  closeModal('playlistModal');
  renderPlaylists();
  toast('Playlist created: ' + name);
}

function addCurrentToPlaylistPrompt() {
  const t = currentTrack(); if (!t) return toast('No track playing');
  const list = document.getElementById('playlistPickerList');
  if (!state.playlists.length) {
    list.innerHTML = '<div class="empty-state">No playlists found</div>';
  } else {
    list.innerHTML = state.playlists.map(p => `<button class="btn-small" style="text-align:left;padding:10px;" data-addpl="${p.id}">${p.name} (${p.tracks.length})</button>`).join('');
  }
  openModal('addToPlaylistModal');
  list.querySelectorAll('[data-addpl]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pl = state.playlists.find(p => p.id === btn.dataset.addpl);
      if (pl && !pl.tracks.some(x => trackKey(x) === trackKey(t))) {
        pl.tracks.push(t);
        saveLS();
        toast('Added to ' + pl.name);
      }
      closeModal('addToPlaylistModal');
    });
  });
}

/* ================= QUEUE VIEWS ================= */
function renderQueueViews() {
  const nowGrid = document.getElementById('queueNowGrid');
  const t = currentTrack();
  nowGrid.innerHTML = t ? trackCardHTML(t) : '<div class="empty-state">Nothing playing right now</div>';
  if (t) bindCardEvents(nowGrid, [t]);

  const upNext = state.queue.slice(state.currentIndex + 1);
  const grid = document.getElementById('queueGrid');
  grid.innerHTML = upNext.length ? upNext.map(trackCardHTML).join('') : '<div class="empty-state">Queue is empty</div>';
  bindCardEvents(grid, upNext);
}

function clearQueue() {
  const t = currentTrack();
  state.queue = t ? [t] : [];
  state.currentIndex = t ? 0 : -1;
  renderQueueViews();
  toast('Queue cleared');
}

/* ================= PRO DSP & EQUALIZER CONTROLS ================= */
function renderDSPControls() {
  renderEQBands();
  renderPresets();
}

function renderEQBands() {
  const box = document.getElementById('eqBands');
  box.innerHTML = EQ_FREQS.map((f, i) => `
    <div class="eq-band">
      <input type="range" min="-12" max="12" value="${state.eqGains[i]}" data-band="${i}">
      <span>${f >= 1000 ? (f / 1000) + 'k' : f}</span>
    </div>
  `).join('');

  box.querySelectorAll('input[type=range]').forEach(inp => {
    inp.addEventListener('input', () => {
      const i = parseInt(inp.dataset.band);
      state.eqGains[i] = parseFloat(inp.value);
      if (eqFilters[i]) eqFilters[i].gain.value = state.eqGains[i];
      state.activePreset = 'Custom';
      highlightPreset();
      saveLS();
    });
  });
}

function renderPresets() {
  const box = document.getElementById('presetRow');
  box.innerHTML = Object.keys(PRESETS).map(p =>
    `<button class="preset-btn ${p === state.activePreset ? 'active' : ''}" data-p="${p}">${p}</button>`
  ).join('');

  box.addEventListener('click', e => {
    const btn = e.target.closest('.preset-btn');
    if (!btn) return;
    const p = btn.dataset.p;
    state.activePreset = p;
    state.eqGains = PRESETS[p].slice();
    state.eqGains.forEach((g, i) => { if (eqFilters[i]) eqFilters[i].gain.value = g; });
    renderEQBands();
    highlightPreset();
    saveLS();
  });
}

function highlightPreset() {
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.toggle('active', b.dataset.p === state.activePreset));
}

/* Tone Controls */
document.getElementById('bassSlider').addEventListener('input', e => {
  const v = parseFloat(e.target.value);
  document.getElementById('bassVal').textContent = `${v} dB`;
  if (bassFilter) bassFilter.gain.value = v;
});

document.getElementById('trebleSlider').addEventListener('input', e => {
  const v = parseFloat(e.target.value);
  document.getElementById('trebleVal').textContent = `${v} dB`;
  if (trebleFilter) trebleFilter.gain.value = v;
});

document.getElementById('speedSlider').addEventListener('input', e => {
  state.speed = parseFloat(e.target.value);
  document.getElementById('speedVal').textContent = `${state.speed.toFixed(2)}x`;
  audioEl.playbackRate = state.speed;
  saveLS();
});

document.getElementById('qualitySelect').value = state.quality;
document.getElementById('qualitySelect').addEventListener('change', e => {
  state.quality = e.target.value;
  saveLS();
  toast(`Audio quality set to ${state.quality}`);
});

document.getElementById('crossfadeSlider').addEventListener('input', e => {
  state.crossfade = parseInt(e.target.value);
  document.getElementById('crossfadeVal').textContent = `${state.crossfade}s`;
  saveLS();
});

/* Keyboard Shortcuts */
window.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  else if (e.code === 'ArrowRight') { e.preventDefault(); playNext(true); }
  else if (e.code === 'ArrowLeft') { e.preventDefault(); playPrev(); }
  else if (e.key === 'm' || e.key === 'M') {
    audioEl.muted = !audioEl.muted;
    toast(audioEl.muted ? 'Muted' : 'Unmuted');
  }
});

/* PWA Service Worker Registration */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* App Initialization */
window.addEventListener('DOMContentLoaded', () => {
  loadHome();
  renderDSPControls();
});
