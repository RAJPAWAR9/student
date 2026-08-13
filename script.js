/**
 * BOOSTER V1.0 - Next-Gen Audio OS Engine & Beat Reactive Suite
 * Designed by Raj Pawar
 * Integrated with LRCLIB API Engine for exact time-synchronized lyrics.
 */

const SECURITY_PASSWORD = "raj123";
const BASE_FOLDER_2026 = "song/2026 music";
const BASE_FOLDER_90S = "song/2026 music/90s";

const QUALITY_CHAIN = ["flac", "wav", "m4a", "mp3"];

const playlist = {
  "Trending": [
    { title: "Aa Re Pritam Pyaare", artist: "Mamta Sharma, Sajid-Wajid", file: "Aa Re Pritam Pyaare" },
    { title: "Aapka Kya Hoga", artist: "Mika Singh, Sunidhi Chauhan", file: "Aapka Kya Hoga" },
    { title: "Apna Time Aayega", artist: "Ranveer Singh, DIVINE", file: "Apna Time Aayega - Ranveer Singh, DIVINE" },
    { title: "Badtameez Dil", artist: "Benny Dayal, Shefali Alvares", file: "Badtameez Dil - Benny Dayal, Shefali Alvares" },
    { title: "Balam Pichkari", artist: "Vishal Dadlani, Shalmali Kholgade", file: "Balam Pichkari" },
    { title: "Balma", artist: "Shriram Iyer, Shreya Ghoshal", file: "Balma - Shriram Iyer, Shriram Ghoshal" },
    { title: "Beedi", artist: "Sukhwinder Singh, Sunidhi Chauhan", file: "Beedi - Sukhwinder Singh, Sunidhi Chauhan" },
    { title: "Blue Eyes", artist: "Yo Yo Honey Singh", file: "Blue Eyes - Yo Yo Honey Singh" },
    { title: "Chaar Botal Vodka", artist: "Yo Yo Honey Singh", file: "Chaar Botal Vodka - Yo Yo Honey Singh" },
    { title: "Character Dheela", artist: "Neeraj Shridhar, Amrita Kak", file: "Character Dheela" },
    { title: "Chikni Chameli", artist: "Shreya Ghoshal", file: "Chikni Chameli - Shreya Ghoshal" },
    { title: "Chinta Ta Ta Chita Chita", artist: "Mika Singh, Wajid", file: "Chinta Ta Ta Chita Chita - Mika Singh, Wajid" },
    { title: "Dagabaaz Re", artist: "Rahat Fateh Ali Khan, Shreya Ghoshal", file: "Dagabaaz Re" },
    { title: "Desi Kalakaar", artist: "Yo Yo Honey Singh", file: "Desi Kalakaar - Yo Yo Honey Singh" },
    { title: "Dhinka Chika", artist: "Amrita Kak, Mika Singh", file: "Dhinka Chika - Amrita Kak, Mika Singh" },
    { title: "Dil Ka Jo Haal Hai", artist: "Abhijeet, Shreya Ghoshal", file: "Dil Ka Jo Haal Hai - Abhijeet, Shreya Ghoshal" },
    { title: "Dilliwaali Girlfriend", artist: "Sunidhi Chauhan, Arijit Singh", file: "Dilliwaali Girlfriend" },
    { title: "Fevicol Se", artist: "Mamta Sharma, Wajid", file: "Fevicol Se" },
    { title: "Ghagra", artist: "Vishal Dadlani, Rekha Bhardwaj", file: "Ghagra - Vishal Dadlani, Rekha Bhardwaj" },
    { title: "Gulabi Sadi", artist: "Sanju Rathod, G-SPXRK", file: "Gulabi Sadi - Sanju Rathod, G-SPXRK" },
    { title: "Hud Hud Dabangg", artist: "Sukhwinder Singh, Wajid", file: "Hud Hud Dabangg" },
    { title: "Hum Pyaar Karne", artist: "Shashwat Sachdev, Atsana", file: "Hum Pyaar Kame" },
    { title: "Jadoo Ki Jhappi", artist: "Mika Singh, Neha Kakkar", file: "Jadoo Ki Jhappi - Mika Singh, Neha Kakkar" },
    { title: "Jungle Hai", artist: "Kumar Sanu, Hema Sardesai", file: "Jungle Hai" },
    { title: "Lallati Bhandar", artist: "Ajay-Atul", file: "Lallati Bhandar - Ajay-Atul" },
    { title: "Love Dose", artist: "Yo Yo Honey Singh", file: "Love Dose - Yo Yo Honey Singh" },
    { title: "Lungi Dance", artist: "Yo Yo Honey Singh", file: "Lungi Dance - Yo Yo Honey Singh" },
    { title: "Maan Meri Jaan", artist: "King", file: "Maan Meri Jaan - King" },
    { title: "Mujhko Yaad Sataye", artist: "Himesh Reshammiya", file: "Mujhko Yaad Sataye" },
    { title: "Munni Badnaam", artist: "Mamta Sharma, Aishwarya", file: "Munni Badnaam" },
    { title: "Naal Nachna", artist: "Shashwat Sachdev, Atsana", file: "Naal Nachna" },
    { title: "Nusta Paisa", artist: "MC STAN", file: "Nusta Paisa - MC STAN" },
    { title: "One Two Three Four", artist: "Get on the Dance Floor", file: "One Two Three Four" },
    { title: "Party All Night", artist: "Yo Yo Honey Singh", file: "Party All Night - Yo Yo Honey Singh" },
    { title: "Shaky", artist: "Sanju Rathod", file: "Shaky - Sanju Rathod" },
    { title: "Shararat", artist: "Shashwat Sachdev, Madhubanti", file: "Shararat" },
    { title: "Tera Rastaa", artist: "Anusha Mani, Amitabh Bhattacharya", file: "Tera Rastaa" },
    { title: "Tere Liye", artist: "Atif Aslam", file: "Tere Liye - Atif Aslam" },
    { title: "Tinku Jiya", artist: "Mamta Sharma, Javed Ali", file: "Tinku Jiya" },
    { title: "Vazan", artist: "SAMBATA, Karan Kanchan", file: "Vazan" },
    { title: "Yeh Dil Deewana", artist: "Sonu Nigam, Hema Sardesai", file: "Yeh Dil Deewana" }
  ],
  "90s": [
    { title: "Aise Na Mujhe", artist: "Kishore Kumar", file: "Aise_Na_Mujhe" },
    { title: "Gulabi Ankhen", artist: "Mohd. Rafi", file: "gulabi aahken" },
    { title: "Kiska Rasta Dekhe", artist: "Kishore Kumar", file: "Kiska_Rasta_Dekhe_" },
    { title: "Mehbooba Mehbooba", artist: "R.D. Burman", file: "Mehbooba Mehbooba" },
    { title: "Pal Bhar Ke Liye", artist: "Kishore Kumar & Asha Bhosle", file: "Pal_Bhar_Ke_Liye_" },
    { title: "Pal Pal Dil Ke Paas", artist: "Kishore Kumar", file: "Pal_Pal_Dil_Ke_Paas" },
    { title: "Yunhi Tum Mujhse", artist: "Mohd. Rafi & Lata Mangeshkar", file: "Yunhi_Tum_Mujhse" }
  ],
  "3D Audio": [
    { title: "Dil Ka Jo Haal Hai (3D)", artist: "Abhijeet, Shreya Ghoshal", file: "Dil Ka Jo Haal Hai - Abhijeet, Shreya Ghoshal" },
    { title: "Gulabi Aankhen (Unplugged)", artist: "Sanam", file: "Gulabi Aankhen" },
    { title: "Maan Meri Jaan", artist: "King", file: "Maan Meri Jaan" },
    { title: "Vaaste", artist: "Dhvani Bhanushali, Tanishk Bagchi", file: "Vaaste" },
    { title: "Kesariya", artist: "Arijit Singh, Pritam", file: "Kesariya" },
    { title: "Gehra Hua", artist: "Artist Name", file: "Gehra Hua" },
    { title: "Breathless", artist: "Shankar Mahadevan", file: "Breathless" },
    { title: "Yeh Raaten Yeh Mausam", artist: "Kishore Kumar, Asha Bhosle", file: "Yeh Raaten Yeh Mausam" },
    { title: "Ye Tune Kya Kiya", artist: "Javed Bashir", file: "Ye Tune Kya Kiya" },
    { title: "Bairan", artist: "Papon", file: "Bairan" },
    { title: "Mann Mera", artist: "Gajendra Verma", file: "Mann Mera" },
    { title: "Gun Gun Guna Re", artist: "Sunidhi Chauhan, Udit Narayan", file: "Gun Gun Guna Re" },
    { title: "Naach Meri Jaan", artist: "Pritam, Kamaal Khan", file: "Naach Meri Jaan" },
    { title: "Barso Re", artist: "Shreya Ghoshal, A.R. Rahman", file: "Barso Re" },
    { title: "Dil Dooba", artist: "Sonu Nigam, Shreya Ghoshal", file: "Dil Dooba" },
    { title: "Arz Kiya Hai", artist: "Anuv Jain", file: "Arz Kiya Hai" },
    { title: "Tu Hai Kahan", artist: "AUR", file: "Tu Hai Kahan" },
    { title: "O Meri Laila", artist: "Atif Aslam, Jyotica Tangri", file: "O Meri Laila" },
    { title: "Mere Rashke Qamar", artist: "Nusrat Fateh Ali Khan, Rahat Fateh Ali Khan", file: "Mere Rashke Qamar" },
    { title: "Jo Tere Sang", artist: "Mustafa Ceilingwala", file: "Jo Tere Sang" },
    { title: "Premika Ne Pyar Se", artist: "S.P. Balasubrahmanyam", file: "Premika Ne Pyar Se" }
  ]
};

// Caches for LRCLIB lyrics fetched per song file
const lyricsMemoryCache = new Map();

// ===== Icons =====
const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';
const ICON_HEART_OUTLINE = '♡';
const ICON_HEART_FILLED = '♥';
const SPEED_STEPS = [0.75, 1, 1.25, 1.5, 1.75, 2];

// ===== State =====
let currentCategory = "Trending";
let currentSongIndex = 0;
let displayedList = [];
let songHistory = [];
let customQueue = [];
let favorites = new Set(safeParseJSON(localStorage.getItem('booster_favorites'), []));
let shuffleMode = false;
let repeatMode = 'all'; 
let playbackSpeed = 1;

let playerA = new Audio();
let playerB = new Audio();
playerA.crossOrigin = "anonymous";
playerB.crossOrigin = "anonymous";
playerA.preload = "auto";
playerB.preload = "auto";

let activeAudio = playerA;
let nextAudio = playerB;

let globalVolume = 0.8;
let crossfadeTime = 10;
let crossfadeStarted = false;
let preloadedForCurrent = false;

let audioCtx, analyser, srcNodeA, srcNodeB;
let masterGain, bassFilterNode, trebleFilterNode, pannerNode, vibeBassNode;
let eqNodes = [];
const eqFrequencies = [60, 230, 910, 3600, 14000];

let isDspEnabled = false;
let isVibeModeEnabled = false;
let vibeIntensity = 0.5;
let lastVibrationTime = 0;

let pendingBass = 0, pendingTreble = 0, pendingPan = 0;
let pendingEq = [0, 0, 0, 0, 0];

let sleepTimerHandle = null;
let sleepTimerEnd = 0;
let lastPersistTime = 0;

let lastFocusedBeforeModal = null;
let lastLyricsUserScroll = 0;
let currentLyricLineIndex = -1;
let currentActiveParsedLyrics = null;

// ===== Helpers =====
function safeParseJSON(raw, fallback) {
  try { return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3000);
}

function formatTime(secs) {
  if (isNaN(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== Accessibility & Focus =====
function getFocusableIn(el) {
  if (!el) return [];
  return Array.from(el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
    .filter(e => !e.disabled && e.offsetParent !== null);
}

function trapFocusHandler(e, modalEl) {
  if (e.key !== 'Tab') return;
  const focusables = getFocusableIn(modalEl);
  if (focusables.length === 0) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function openModalAccessible(modalEl) {
  if (!modalEl) return;
  lastFocusedBeforeModal = document.activeElement;
  modalEl.classList.add('active');
  const focusables = getFocusableIn(modalEl);
  if (focusables[0]) focusables[0].focus();
  modalEl._trapHandler = (e) => trapFocusHandler(e, modalEl);
  document.addEventListener('keydown', modalEl._trapHandler);
}

function closeModalAccessible(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  if (modalEl._trapHandler) {
    document.removeEventListener('keydown', modalEl._trapHandler);
    modalEl._trapHandler = null;
  }
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    lastFocusedBeforeModal.focus();
  }
}

// ===== Roving focus =====
function enableRovingFocus(container, itemsSelector, opts = {}) {
  if (!container) return;
  const { horizontal = true, vertical = false } = opts;
  container.addEventListener('keydown', (e) => {
    const items = Array.from(container.querySelectorAll(itemsSelector))
      .filter(el => !el.disabled && el.offsetParent !== null);
    const currentIndex = items.indexOf(document.activeElement);
    if (currentIndex === -1) return;
    let nextIndex = null;
    if (horizontal && e.key === 'ArrowRight') nextIndex = Math.min(items.length - 1, currentIndex + 1);
    if (horizontal && e.key === 'ArrowLeft') nextIndex = Math.max(0, currentIndex - 1);
    if (vertical && e.key === 'ArrowDown') nextIndex = Math.min(items.length - 1, currentIndex + 1);
    if (vertical && e.key === 'ArrowUp') nextIndex = Math.max(0, currentIndex - 1);
    if (nextIndex !== null && nextIndex !== currentIndex) {
      e.preventDefault();
      e.stopPropagation();
      items[nextIndex].focus();
    }
  });
}

function detectTVEnvironment() {
  const ua = navigator.userAgent || "";
  return /smart-?tv|smarttv|tizen|webos|viera|netcast|roku|appletv|googletv|hbbtv|aft[a-z]?|crkey|bravia/i.test(ua);
}

// ===== Password Lock =====
function initPasswordLock() {
  const lockBtn = document.getElementById('unlock-btn');
  const passInput = document.getElementById('access-pass');
  const lockError = document.getElementById('lock-error');
  const lockScreen = document.getElementById('lock-screen');
  const lockCard = document.querySelector('.lock-card');
  const rememberCheckbox = document.getElementById('remember-me');
  const toggleVis = document.getElementById('toggle-pass-visibility');

  if (localStorage.getItem('booster_unlocked') === 'true' && lockScreen) {
    lockScreen.style.opacity = '0';
    lockScreen.style.display = 'none';
  }

  function tryUnlock() {
    if (passInput.value === SECURITY_PASSWORD) {
      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('booster_unlocked', 'true');
      }
      lockScreen.style.opacity = '0';
      setTimeout(() => lockScreen.style.display = 'none', 300);
    } else {
      lockError.style.display = 'block';
      if (lockCard) {
        lockCard.classList.remove('shake');
        requestAnimationFrame(() => lockCard.classList.add('shake'));
      }
    }
  }

  if (lockBtn) lockBtn.onclick = tryUnlock;
  if (passInput) {
    passInput.focus();
    passInput.onkeypress = (e) => { if (e.key === 'Enter') tryUnlock(); };
  }
  if (toggleVis && passInput) {
    toggleVis.onclick = () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      toggleVis.textContent = isPass ? '🙈' : '👁';
      toggleVis.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
    };
  }
}

// ===== URL & List Helpers =====
function buildUrl(song, extension = "m4a") {
  if (!song || !song.file) return "";
  const is90s = playlist["90s"].some(s => s.file === song.file);
  const basePath = is90s ? BASE_FOLDER_90S : BASE_FOLDER_2026;
  return `${basePath}/${song.file}.${extension}`.split('/').map(part => encodeURIComponent(part)).join('/');
}

function getFormatChainForSong(song) {
  return QUALITY_CHAIN;
}

function getAllSongsFlat() {
  return [...playlist["Trending"], ...playlist["90s"], ...playlist["3D Audio"]];
}

function getActiveList() {
  if (currentCategory === "All") return getAllSongsFlat();
  if (currentCategory === "Favorites") return getAllSongsFlat().filter(s => favorites.has(s.file));
  return playlist[currentCategory] || playlist["Trending"];
}

function isFavorite(song) { return !!(song && favorites.has(song.file)); }

function toggleFavorite(song) {
  if (!song) return;
  if (favorites.has(song.file)) favorites.delete(song.file);
  else favorites.add(song.file);
  localStorage.setItem('booster_favorites', JSON.stringify([...favorites]));
  syncFavoriteButtons();
  renderTrendingGrid();
}

function syncFavoriteButtons() {
  const list = displayedList.length > 0 ? displayedList : getActiveList();
  const current = list[currentSongIndex];
  const fav = isFavorite(current);
  const miniHeart = document.getElementById('fav-btn');
  const modalHeart = document.getElementById('modal-fav-btn');
  if (miniHeart) {
    miniHeart.textContent = fav ? ICON_HEART_FILLED : ICON_HEART_OUTLINE;
    miniHeart.classList.toggle('is-fav', fav);
    miniHeart.setAttribute('aria-pressed', String(fav));
  }
  if (modalHeart) {
    modalHeart.textContent = (fav ? ICON_HEART_FILLED + ' ' : ICON_HEART_OUTLINE + ' ') + (fav ? 'Added to Favorites' : 'Add to Favorites');
    modalHeart.classList.toggle('is-fav', fav);
    modalHeart.setAttribute('aria-pressed', String(fav));
  }
}

function updateMoodLighting(song) {
  const ambientGlow = document.getElementById('ambient-glow');
  if (!ambientGlow) return;
  const is90s = song && playlist["90s"].some(s => s.file === song.file);
  const is3D = song && playlist["3D Audio"].some(s => s.file === song.file);
  if (is90s) ambientGlow.style.background = 'radial-gradient(circle, rgba(255,170,0,0.2) 0%, rgba(255,85,0,0.15) 40%, rgba(0,0,0,0) 70%)';
  else if (is3D) ambientGlow.style.background = 'radial-gradient(circle, rgba(255,0,128,0.25) 0%, rgba(0,242,254,0.2) 40%, rgba(0,0,0,0) 70%)';
  else ambientGlow.style.background = 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, rgba(121,40,202,0.1) 40%, rgba(0,0,0,0) 70%)';
}

// ===== Audio Engine =====
function initAudioEngine() {
  if (audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    srcNodeA = audioCtx.createMediaElementSource(playerA);
    srcNodeB = audioCtx.createMediaElementSource(playerB);

    masterGain = audioCtx.createGain();

    bassFilterNode = audioCtx.createBiquadFilter();
    bassFilterNode.type = "lowshelf";
    bassFilterNode.frequency.value = 150;
    bassFilterNode.gain.value = pendingBass;

    trebleFilterNode = audioCtx.createBiquadFilter();
    trebleFilterNode.type = "highshelf";
    trebleFilterNode.frequency.value = 3000;
    trebleFilterNode.gain.value = pendingTreble;

    vibeBassNode = audioCtx.createBiquadFilter();
    vibeBassNode.type = "lowshelf";
    vibeBassNode.frequency.value = 80;
    vibeBassNode.gain.value = isVibeModeEnabled ? (vibeIntensity * 12) : 0;

    eqNodes = eqFrequencies.map((freq, index) => {
      const eq = audioCtx.createBiquadFilter();
      if (index === 0) eq.type = 'lowshelf';
      else if (index === eqFrequencies.length - 1) eq.type = 'highshelf';
      else eq.type = 'peaking';
      eq.frequency.value = freq;
      eq.gain.value = pendingEq[index] || 0;
      return eq;
    });

    if (audioCtx.createStereoPanner) {
      pannerNode = audioCtx.createStereoPanner();
      pannerNode.pan.value = pendingPan;
    }

    routeAudioGraph();
    renderBeatSyncVisualizer();
  } catch (e) {
    console.log("Audio Engine Initialization Error:", e);
  }
}

function ensureAudioEngine() {
  initAudioEngine();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function routeAudioGraph() {
  if (!audioCtx) return;
  srcNodeA.disconnect();
  srcNodeB.disconnect();

  if (!isDspEnabled && !isVibeModeEnabled) {
    srcNodeA.connect(analyser);
    srcNodeB.connect(analyser);
    analyser.disconnect();
    analyser.connect(audioCtx.destination);
    const desc = document.getElementById('dsp-status-desc');
    if (desc) desc.textContent = "Status: Pure Direct Studio Bypass (0% Quality Loss)";
  } else {
    srcNodeA.connect(bassFilterNode);
    srcNodeB.connect(bassFilterNode);
    let current = bassFilterNode;
    current.connect(trebleFilterNode); current = trebleFilterNode;
    current.connect(vibeBassNode); current = vibeBassNode;
    eqNodes.forEach((eq) => { current.connect(eq); current = eq; });
    if (pannerNode) { current.connect(pannerNode); current = pannerNode; }
    current.connect(masterGain);
    masterGain.connect(analyser);
    analyser.disconnect();
    analyser.connect(audioCtx.destination);
    const desc = document.getElementById('dsp-status-desc');
    if (desc) desc.textContent = "Status: Pro Audio DSP & Extreme Vibe Active";
  }
}

// ===== Visualizer =====
function renderBeatSyncVisualizer() {
  const canvas = document.getElementById("visualizer-canvas");
  const spectrumCanvas = document.getElementById("spectrum-canvas");
  const glowTargets = document.querySelectorAll('.beat-glow-target');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    if (spectrumCanvas) { spectrumCanvas.width = spectrumCanvas.clientWidth; spectrumCanvas.height = spectrumCanvas.clientHeight; }
  }
  resize();
  window.addEventListener("resize", debounce(resize, 150));
  window.addEventListener("orientationchange", () => setTimeout(resize, 200));

  const bufferLength = analyser ? analyser.frequencyBinCount : 0;
  const dataArray = new Uint8Array(bufferLength);
  let visualizerRafId = null;

  function renderFrame() {
    visualizerRafId = requestAnimationFrame(renderFrame);
    if (analyser) analyser.getByteFrequencyData(dataArray);

    let subBassSum = 0;
    const subBassBins = Math.min(8, bufferLength);
    for (let i = 0; i < subBassBins; i++) subBassSum += dataArray[i] || 0;
    const subBassAvg = subBassBins > 0 ? subBassSum / subBassBins : 0;
    const bassRatio = subBassAvg / 255;

    if (!reduceMotion) {
      if (!activeAudio.paused && bassRatio > 0.1) {
        const glowRadius = 15 + bassRatio * 50;
        const glowOpacity = 0.25 + bassRatio * 0.75;
        const scaleVal = 1 + bassRatio * 0.03;
        glowTargets.forEach(el => {
          el.style.boxShadow = `0 0 ${glowRadius}px rgba(0,242,254,${glowOpacity}), 0 0 ${glowRadius * 1.5}px rgba(107,17,255,${glowOpacity * 0.6})`;
          el.style.transform = `scale(${scaleVal})`;
        });
      } else {
        glowTargets.forEach(el => { el.style.boxShadow = `0 0 20px rgba(0,242,254,0.2)`; el.style.transform = `scale(1)`; });
      }

      const ambientGlow = document.getElementById("ambient-glow");
      if (ambientGlow && !activeAudio.paused) {
        ambientGlow.style.transform = `translate(-50%, -50%) scale(${1 + bassRatio * 0.25})`;
      }
    }

    if (isVibeModeEnabled && subBassAvg > 190 && "vibrate" in navigator) {
      const now = Date.now();
      if (now - lastVibrationTime > 180) {
        const duration = Math.floor(bassRatio * 60 * vibeIntensity);
        if (duration > 10) navigator.vibrate(duration);
        lastVibrationTime = now;
      }
    }

    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!activeAudio.paused && analyser) {
        const radius = 80 + bassRatio * 350;
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 10, canvas.width / 2, canvas.height / 2, Math.max(radius, 20));
        const dynamicHue = (Date.now() / 20 + subBassAvg) % 360;
        gradient.addColorStop(0, `hsla(${dynamicHue}, 100%, 50%, ${0.15 + bassRatio * 0.25})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    if (spectrumCanvas && analyser) {
      const sctx = spectrumCanvas.getContext("2d");
      sctx.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);
      const barCount = Math.min(48, bufferLength);
      const barWidth = spectrumCanvas.width / barCount;
      for (let i = 0; i < barCount; i++) {
        const v = dataArray[i] || 0;
        const h = (v / 255) * spectrumCanvas.height;
        sctx.fillStyle = `hsla(${190 + i * 3}, 100%, 55%, 0.9)`;
        sctx.fillRect(i * barWidth, spectrumCanvas.height - h, barWidth - 2, h);
      }
    }
  }

  visualizerRafId = requestAnimationFrame(renderFrame);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (visualizerRafId) cancelAnimationFrame(visualizerRafId);
      visualizerRafId = null;
    } else if (!visualizerRafId) {
      visualizerRafId = requestAnimationFrame(renderFrame);
    }
  });
}

// ===== Playback core =====
function playAudioWithFallback(audioElement, song, chainIndex = 0) {
  if (!song) return;
  const chain = getFormatChainForSong(song);
  if (chainIndex >= chain.length) {
    updatePlaybackUI(false);
    showToast("Unable to load this track — file missing");
    return;
  }
  audioElement.src = buildUrl(song, chain[chainIndex]);
  audioElement.playbackRate = playbackSpeed;
  const playPromise = audioElement.play();
  if (playPromise !== undefined) {
    playPromise.then(() => updatePlaybackUI(true)).catch(() => {
      playAudioWithFallback(audioElement, song, chainIndex + 1);
    });
  }
}

function updateQueueAndHistoryUI() {
  const upnextList = document.getElementById('upnext-list');
  const historyList = document.getElementById('history-list');
  const list = displayedList.length > 0 ? displayedList : getActiveList();

  if (upnextList) {
    upnextList.innerHTML = '';
    let queueToShow = customQueue.length > 0 ? [...customQueue] : [];
    if (customQueue.length === 0 && list.length > 0) {
      for (let i = 1; i <= 5; i++) {
        const idx = (currentSongIndex + i) % list.length;
        if (list[idx]) queueToShow.push(list[idx]);
      }
    }
    queueToShow.forEach((song, idx) => {
      const item = document.createElement('div');
      item.className = 'queue-item';
      item.innerHTML = `
        <div>
          <div style="font-size:13px; font-weight:600; color:#fff;">${escapeHtml(song.title || `Track ${idx + 1}`)}</div>
          <div style="font-size:11px; color:var(--text-secondary);">${escapeHtml(song.artist || "BOOSTER Audio")}</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:11px; color:var(--primary-glow);">#${idx + 1}</span>
          ${customQueue.length > 0 ? `<button data-remove-idx="${idx}" aria-label="Remove from queue" style="background:none; border:none; color:#ff0055; cursor:pointer; font-size:14px;">✕</button>` : ''}
        </div>`;
      upnextList.appendChild(item);
    });
    upnextList.querySelectorAll('[data-remove-idx]').forEach(btn => {
      btn.onclick = (e) => { e.stopPropagation(); removeFromQueue(parseInt(btn.dataset.removeIdx)); };
    });
  }

  if (historyList) {
    historyList.innerHTML = '';
    songHistory.forEach((song) => {
      const item = document.createElement('div');
      item.className = 'queue-item';
      item.innerHTML = `
        <div style="font-size:13px; font-weight:600; color:#fff;">${escapeHtml(song.title || 'Track')}</div>
        <div style="font-size:11px; color:var(--text-secondary);">${escapeHtml(song.artist || 'BOOSTER Audio')}</div>`;
      historyList.appendChild(item);
    });
  }
}

function removeFromQueue(index) {
  customQueue.splice(index, 1);
  updateQueueAndHistoryUI();
}

function peekNextSong() {
  if (customQueue.length > 0) return customQueue[0];
  const list = displayedList.length > 0 ? displayedList : getActiveList();
  if (list.length === 0) return null;
  if (repeatMode === 'one') return list[currentSongIndex];
  if (shuffleMode) return list.length > 1 ? true : list[0];
  const isLast = currentSongIndex >= list.length - 1;
  if (isLast && repeatMode === 'none') return null;
  return list[(currentSongIndex + 1) % list.length];
}

function getNextSong() {
  if (customQueue.length > 0) return customQueue.shift();
  const list = displayedList.length > 0 ? displayedList : getActiveList();
  if (list.length === 0) return null;

  if (repeatMode === 'one') return list[currentSongIndex];

  if (shuffleMode) {
    if (list.length === 1) return list[0];
    let idx;
    do { idx = Math.floor(Math.random() * list.length); } while (idx === currentSongIndex);
    currentSongIndex = idx;
    return list[idx];
  }

  const isLast = currentSongIndex >= list.length - 1;
  if (isLast && repeatMode === 'none') return null;
  currentSongIndex = (currentSongIndex + 1) % list.length;
  return list[currentSongIndex];
}

function loadAndPlaySong(songToPlay = null, isManualTrigger = true) {
  ensureAudioEngine();

  const list = displayedList.length > 0 ? displayedList : getActiveList();
  let song = songToPlay || list[currentSongIndex];
  if (!song) return;

  const titleText = song.title || `Track ${currentSongIndex + 1}`;
  const artistText = song.artist ? (song.artist + " • Designed by Raj Pawar") : "BOOSTER V1.0 • Designed by Raj Pawar";

  if (!songHistory.some(s => s.file === song.file)) {
    songHistory.unshift(song);
    if (songHistory.length > 10) songHistory.pop();
  }

  setTextSafe('mini-title', titleText);
  setTextSafe('mini-artist', artistText);
  setTextSafe('modal-title', titleText);
  setTextSafe('modal-artist', artistText);
  setTextSafe('np-title', titleText);
  setTextSafe('np-artist', artistText);
  setTextSafe('lyrics-fs-title', titleText);
  setTextSafe('lyrics-fs-artist', artistText);

  updateMoodLighting(song);
  showToast(`Now Playing: ${titleText}`);
  setupMediaSession(song);
  syncFavoriteButtons();
  preloadedForCurrent = false;

  // Fetch LRCLIB real synced lyrics
  fetchAndRenderLrclibLyrics(song);

  if (isManualTrigger) {
    crossfadeStarted = false;
    playerA.pause(); playerB.pause();
    playerA.currentTime = 0; playerB.currentTime = 0;
    activeAudio = playerA; nextAudio = playerB;
    activeAudio.volume = globalVolume;
    playAudioWithFallback(activeAudio, song);
  }

  updateQueueAndHistoryUI();
  syncActiveCardHighlight();
}

function setTextSafe(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function attachAudioEvents(audioPlayer) {
  audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer !== activeAudio || !activeAudio.duration) return;

    const percent = (activeAudio.currentTime / activeAudio.duration) * 100;
    setStyleWidth('progress-fill', percent);
    setStyleWidth('modal-progress-fill', percent);

    const formattedCurrent = formatTime(activeAudio.currentTime);
    const formattedTotal = formatTime(activeAudio.duration);
    setTextSafe('time-current', formattedCurrent);
    setTextSafe('time-total', formattedTotal);
    setTextSafe('modal-time-current', formattedCurrent);
    setTextSafe('modal-time-total', formattedTotal);

    updateLyricsHighlight(activeAudio.currentTime);

    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.setPositionState({
          duration: activeAudio.duration,
          playbackRate: activeAudio.playbackRate,
          position: activeAudio.currentTime
        });
      } catch (e) {}
    }

    const now = Date.now();
    if (now - lastPersistTime > 5000) { persistPlaybackState(); lastPersistTime = now; }

    const timeLeft = activeAudio.duration - activeAudio.currentTime;

    if (!preloadedForCurrent && crossfadeTime <= 2 && timeLeft <= 6 && timeLeft > crossfadeTime) {
      const upcoming = peekNextSong();
      if (upcoming && typeof upcoming === 'object') {
        nextAudio.src = buildUrl(upcoming, 'm4a');
        nextAudio.load();
        preloadedForCurrent = true;
      }
    }

    if (timeLeft <= crossfadeTime && !crossfadeStarted && crossfadeTime > 0) {
      const peeked = peekNextSong();
      if (peeked) {
        crossfadeStarted = true;
        const nextSong = getNextSong();
        if (nextSong) startCrossfade(nextSong);
      }
    }
  });

  audioPlayer.addEventListener('ended', () => {
    if (audioPlayer !== activeAudio || crossfadeStarted) return;
    const nextSong = getNextSong();
    if (nextSong) {
      loadAndPlaySong(nextSong, true);
    } else {
      updatePlaybackUI(false);
      showToast("Playback finished");
    }
  });
}

function setStyleWidth(id, percent) {
  const el = document.getElementById(id);
  if (el) el.style.width = `${percent}%`;
}

function startCrossfade(nextSong) {
  nextAudio.currentTime = 0;
  nextAudio.volume = 0;
  playAudioWithFallback(nextAudio, nextSong);

  const fadeStartVol = typeof activeAudio.volume === 'number' ? activeAudio.volume : globalVolume;
  const fadeDurationMs = Math.max(500, crossfadeTime * 1000);
  const fadeStepMs = 50;
  const totalSteps = fadeDurationMs / fadeStepMs;
  let stepCount = 0;

  const fadeInterval = setInterval(() => {
    stepCount++;
    const progress = Math.min(1, stepCount / totalSteps);
    activeAudio.volume = Math.max(0, fadeStartVol * (1 - progress));
    nextAudio.volume = Math.min(globalVolume, globalVolume * progress);

    if (progress >= 1) {
      clearInterval(fadeInterval);
      activeAudio.volume = 0;
      nextAudio.volume = globalVolume;
      activeAudio.pause();

      const temp = activeAudio;
      activeAudio = nextAudio;
      nextAudio = temp;
      crossfadeStarted = false;
      preloadedForCurrent = false;

      if (!songHistory.some(s => s.file === nextSong.file)) {
        songHistory.unshift(nextSong);
        if (songHistory.length > 10) songHistory.pop();
      }

      const nextTitle = nextSong.title || "Audio Track";
      const nextArtist = nextSong.artist ? (nextSong.artist + " • Designed by Raj Pawar") : "BOOSTER V1.0 • Designed by Raj Pawar";
      setTextSafe('mini-title', nextTitle);
      setTextSafe('mini-artist', nextArtist);
      setTextSafe('modal-title', nextTitle);
      setTextSafe('modal-artist', nextArtist);
      setTextSafe('np-title', nextTitle);
      setTextSafe('np-artist', nextArtist);
      setTextSafe('lyrics-fs-title', nextTitle);
      setTextSafe('lyrics-fs-artist', nextArtist);

      updateMoodLighting(nextSong);
      showToast(`Now Playing: ${nextTitle}`);
      setupMediaSession(nextSong);
      syncFavoriteButtons();
      updateQueueAndHistoryUI();
      syncActiveCardHighlight();
      fetchAndRenderLrclibLyrics(nextSong);
    }
  }, fadeStepMs);
}

function updatePlaybackUI(isPlaying) {
  const btn = document.getElementById('master-play-btn');
  const modalBtn = document.getElementById('modal-play-btn');
  const icon = isPlaying ? ICON_PAUSE : ICON_PLAY;
  if (btn) { btn.innerHTML = icon; btn.setAttribute('aria-pressed', String(isPlaying)); }
  if (modalBtn) { modalBtn.innerHTML = icon; modalBtn.setAttribute('aria-pressed', String(isPlaying)); }
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
  }
}

// ===== REAL LRCLIB API LYRICS ENGINE =====
function parseLRC(lrcText) {
  if (!lrcText) return [];
  const lines = lrcText.split('\n');
  const timeTagRe = /\[(\d{2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
  const result = [];
  lines.forEach(rawLine => {
    const tags = [...rawLine.matchAll(timeTagRe)];
    if (tags.length === 0) return;
    const text = rawLine.replace(timeTagRe, '').trim();
    tags.forEach(tag => {
      const mins = parseInt(tag[1], 10);
      const secs = parseInt(tag[2], 10);
      const fracStr = tag[3] ? (tag[3].length === 2 ? tag[3] : tag[3].padEnd(3, '0')) : '0';
      const frac = parseFloat(`0.${fracStr}`);
      const time = mins * 60 + secs + frac;
      if (text.length > 0) {
        result.push({ time, text });
      }
    });
  });
  return result.sort((a, b) => a.time - b.time);
}

async function fetchAndRenderLrclibLyrics(song) {
  currentLyricLineIndex = -1;
  currentActiveParsedLyrics = null;

  const targets = [
    document.getElementById('lyrics-list'),
    document.getElementById('lyrics-fullscreen-list')
  ];

  targets.forEach(container => {
    if (container) {
      container.innerHTML = `<p class="lyrics-empty-state">Searching synced lyrics on LRCLIB API...</p>`;
    }
  });

  if (!song) return;

  if (lyricsMemoryCache.has(song.file)) {
    const cached = lyricsMemoryCache.get(song.file);
    renderParsedLyrics(cached);
    return;
  }

  const trackTitle = song.title || song.file;
  const primaryArtist = song.artist ? song.artist.split(',')[0].trim() : '';

  try {
    // Attempt direct match first
    let getUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(trackTitle)}`;
    if (primaryArtist) getUrl += `&artist_name=${encodeURIComponent(primaryArtist)}`;

    let response = await fetch(getUrl);
    let data = null;

    if (response.ok) {
      data = await response.json();
    } else {
      // Search endpoint fallback
      const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(trackTitle + ' ' + primaryArtist)}`;
      const searchRes = await fetch(searchUrl);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (Array.isArray(searchData) && searchData.length > 0) {
          data = searchData.find(item => item.syncedLyrics) || searchData[0];
        }
      }
    }

    if (data && data.syncedLyrics) {
      const parsed = parseLRC(data.syncedLyrics);
      lyricsMemoryCache.set(song.file, parsed);
      renderParsedLyrics(parsed);
    } else if (data && data.plainLyrics) {
      const plainLines = data.plainLyrics.split('\n').filter(l => l.trim().length > 0).map((line, idx) => ({ time: idx * 4, text: line.trim() }));
      lyricsMemoryCache.set(song.file, plainLines);
      renderParsedLyrics(plainLines);
    } else {
      lyricsMemoryCache.set(song.file, []);
      renderParsedLyrics([]);
    }
  } catch (err) {
    console.error("LRCLIB API Fetch Error:", err);
    lyricsMemoryCache.set(song.file, []);
    renderParsedLyrics([]);
  }
}

function renderParsedLyrics(lines) {
  currentActiveParsedLyrics = lines;
  const targets = [
    document.getElementById('lyrics-list'),
    document.getElementById('lyrics-fullscreen-list')
  ];

  targets.forEach(container => {
    if (!container) return;
    if (!lines || lines.length === 0) {
      container.innerHTML = `<p class="lyrics-empty-state">No time-synchronized lyrics found on LRCLIB for this song.</p>`;
      return;
    }
    container.innerHTML = lines.map((line, idx) =>
      `<p class="lyrics-line" data-idx="${idx}" data-time="${line.time}">${escapeHtml(line.text || '···')}</p>`
    ).join('');
  });
}

function updateLyricsHighlight(currentTime) {
  const lines = currentActiveParsedLyrics;
  if (!lines || lines.length === 0) return;

  let idx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].time <= currentTime) idx = i; else break;
  }
  if (idx === currentLyricLineIndex) return;
  currentLyricLineIndex = idx;

  [document.getElementById('lyrics-list'), document.getElementById('lyrics-fullscreen-list')].forEach(container => {
    if (!container) return;
    container.querySelectorAll('.lyrics-line').forEach(el => el.classList.remove('active'));
    const activeEl = container.querySelector(`.lyrics-line[data-idx="${idx}"]`);
    if (activeEl) {
      activeEl.classList.add('active');
      if (Date.now() - lastLyricsUserScroll > 4000) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

function openLyricsFullscreen() {
  const overlay = document.getElementById('lyrics-fullscreen');
  openModalAccessible(overlay);
}
function closeLyricsFullscreen() {
  const overlay = document.getElementById('lyrics-fullscreen');
  closeModalAccessible(overlay);
}

// ===== Grid rendering =====
function renderTrendingGrid() {
  const grid = document.getElementById('trending-grid');
  const noResults = document.getElementById('no-results-msg');
  if (!grid) return;

  if (displayedList.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';

  grid.innerHTML = '';
  displayedList.forEach((song, index) => {
    const displayTitle = song.title || `Track ${index + 1}`;
    const displayArtist = song.artist || "BOOSTER Audio";
    const card = document.createElement('div');
    card.className = `track-card ${index === currentSongIndex ? 'active' : ''}`;
    card.dataset.index = index;
    card.tabIndex = 0;
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `${displayTitle} by ${displayArtist}`);
    card.style.animationDelay = `${Math.min(index, 20) * 25}ms`;
    card.innerHTML = `
      <div class="track-info">
        <div class="track-title">${index + 1}. ${escapeHtml(displayTitle)}</div>
        <div class="track-artist">${escapeHtml(displayArtist)}</div>
      </div>
      <div class="track-actions">
        <button class="card-heart-btn ${isFavorite(song) ? 'is-fav' : ''}" data-fav-idx="${index}" aria-label="Toggle favorite" aria-pressed="${isFavorite(song)}">${isFavorite(song) ? ICON_HEART_FILLED : ICON_HEART_OUTLINE}</button>
        <button class="add-queue-btn" data-queue-idx="${index}">+ Queue</button>
      </div>`;
    grid.appendChild(card);
  });

  grid.querySelectorAll('[data-fav-idx]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.favIdx);
      toggleFavorite(displayedList[idx]);
    };
  });
  grid.querySelectorAll('[data-queue-idx]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.queueIdx);
      customQueue.push(displayedList[idx]);
      updateQueueAndHistoryUI();
      showToast(`Added to Queue: ${displayedList[idx].title}`);
    };
  });
  grid.querySelectorAll('.track-card').forEach(card => {
    card.onclick = () => {
      currentSongIndex = parseInt(card.dataset.index);
      loadAndPlaySong(displayedList[currentSongIndex], true);
    };
    card.onkeydown = (e) => { if (e.key === 'Enter') card.click(); };
  });

  grid.onkeydown = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const cards = Array.from(grid.querySelectorAll('.track-card'));
    const idx = cards.indexOf(document.activeElement);
    if (idx === -1) return;
    e.preventDefault();
    e.stopPropagation();
    let target = idx;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') target = Math.min(cards.length - 1, idx + 1);
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') target = Math.max(0, idx - 1);
    cards[target].focus();
  };
}

function syncActiveCardHighlight() {
  const grid = document.getElementById('trending-grid');
  if (!grid) return;
  grid.querySelectorAll('.track-card').forEach(card => {
    card.classList.toggle('active', parseInt(card.dataset.index) === currentSongIndex);
  });
}

// ===== Media Session =====
function setupMediaSession(song) {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title || 'Unknown Track',
      artist: song.artist || 'BOOSTER Audio',
      album: 'BOOSTER V1.0'
    });
    navigator.mediaSession.setActionHandler('play', () => togglePlay(true));
    navigator.mediaSession.setActionHandler('pause', () => togglePlay(false));
    navigator.mediaSession.setActionHandler('previoustrack', () => playPrev());
    navigator.mediaSession.setActionHandler('nexttrack', () => playNext());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (activeAudio.duration && typeof details.seekTime === 'number') activeAudio.currentTime = details.seekTime;
    });
  } catch (e) {}
}

// ===== Settings persistence =====
function persistPlaybackState() {
  try {
    const list = displayedList.length > 0 ? displayedList : getActiveList();
    const song = list[currentSongIndex];
    if (!song) return;
    localStorage.setItem('booster_lastplayed', JSON.stringify({
      category: currentCategory,
      file: song.file,
      title: song.title,
      artist: song.artist,
      position: activeAudio.currentTime || 0
    }));
  } catch (e) {}
}

function saveSettings() {
  const settings = {
    volume: globalVolume,
    crossfade: crossfadeTime,
    dspEnabled: isDspEnabled,
    vibeEnabled: isVibeModeEnabled,
    vibeIntensity: vibeIntensity,
    bass: bassFilterNode ? bassFilterNode.gain.value : pendingBass,
    treble: trebleFilterNode ? trebleFilterNode.gain.value : pendingTreble,
    pan: pannerNode ? pannerNode.pan.value : pendingPan,
    eq: eqNodes.length ? eqNodes.map(n => n.gain.value) : pendingEq,
    shuffle: shuffleMode,
    repeat: repeatMode,
    speed: playbackSpeed
  };
  localStorage.setItem('booster_settings', JSON.stringify(settings));
}

function loadSettingsIntoState() {
  const s = safeParseJSON(localStorage.getItem('booster_settings'), null);
  if (!s) return;
  globalVolume = typeof s.volume === 'number' ? s.volume : globalVolume;
  crossfadeTime = typeof s.crossfade === 'number' ? s.crossfade : crossfadeTime;
  isDspEnabled = !!s.dspEnabled;
  isVibeModeEnabled = !!s.vibeEnabled;
  vibeIntensity = typeof s.vibeIntensity === 'number' ? s.vibeIntensity : vibeIntensity;
  pendingBass = typeof s.bass === 'number' ? s.bass : 0;
  pendingTreble = typeof s.treble === 'number' ? s.treble : 0;
  pendingPan = typeof s.pan === 'number' ? s.pan : 0;
  pendingEq = Array.isArray(s.eq) ? s.eq : pendingEq;
  shuffleMode = !!s.shuffle;
  repeatMode = s.repeat || 'all';
  playbackSpeed = typeof s.speed === 'number' ? s.speed : 1;
}

function applySettingsToUI() {
  const volSlider = document.getElementById('master-volume');
  if (volSlider) volSlider.value = globalVolume;

  document.querySelectorAll('.crossfade-slider-input').forEach(i => i.value = crossfadeTime);
  document.querySelectorAll('.crossfade-val-disp').forEach(d => d.textContent = `${crossfadeTime}s`);

  const dspToggle = document.getElementById('master-dsp-toggle');
  if (dspToggle) dspToggle.checked = isDspEnabled;
  const vibeToggle = document.getElementById('vibe-mode-toggle');
  if (vibeToggle) vibeToggle.checked = isVibeModeEnabled;
  const vibeSlider = document.getElementById('vibe-intensity-slider');
  const vibeDisp = document.getElementById('vibe-slider-val');
  if (vibeSlider) vibeSlider.value = Math.round(vibeIntensity * 100);
  if (vibeDisp) vibeDisp.textContent = `${Math.round(vibeIntensity * 100)}%`;

  const bassSlider = document.getElementById('bass-boost-slider');
  const bassDisp = document.getElementById('bass-boost-val');
  if (bassSlider) bassSlider.value = pendingBass;
  if (bassDisp) bassDisp.textContent = `${pendingBass} dB`;

  const trebleSlider = document.getElementById('treble-boost-slider');
  const trebleDisp = document.getElementById('treble-boost-val');
  if (trebleSlider) trebleSlider.value = pendingTreble;
  if (trebleDisp) trebleDisp.textContent = `${pendingTreble} dB`;

  const pannerSlider = document.getElementById('panner-slider');
  const pannerDisp = document.getElementById('panner-val');
  if (pannerSlider) pannerSlider.value = pendingPan;
  if (pannerDisp) pannerDisp.textContent = pendingPan === 0 ? "Center (0.0)" : (pendingPan < 0 ? `Left (${pendingPan})` : `Right (+${pendingPan})`);

  document.querySelectorAll('.eq-slider').forEach((slider) => {
    const band = parseInt(slider.dataset.band);
    const val = pendingEq[band] || 0;
    slider.value = val;
    const disp = slider.closest('.eq-band')?.querySelector('.eq-val');
    if (disp) disp.textContent = `${val > 0 ? '+' : ''}${val}dB`;
  });

  const speedSlider = document.getElementById('speed-slider');
  const speedDisp = document.getElementById('speed-val');
  if (speedSlider) speedSlider.value = playbackSpeed;
  if (speedDisp) speedDisp.textContent = `${playbackSpeed.toFixed(2).replace(/\.?0+$/, '') || playbackSpeed}x`;
  const modalSpeedBtn = document.getElementById('modal-speed-btn');
  if (modalSpeedBtn) modalSpeedBtn.textContent = `${playbackSpeed}x`;
  playerA.playbackRate = playbackSpeed;
  playerB.playbackRate = playbackSpeed;

  syncShuffleRepeatUI();
}

function syncShuffleRepeatUI() {
  [document.getElementById('shuffle-btn'), document.getElementById('modal-shuffle-btn')].forEach(btn => {
    if (btn) { btn.classList.toggle('active-state', shuffleMode); btn.setAttribute('aria-pressed', String(shuffleMode)); }
  });
  const repeatIcons = { none: '🔁', all: '🔁', one: '🔂' };
  [document.getElementById('repeat-btn'), document.getElementById('modal-repeat-btn')].forEach(btn => {
    if (!btn) return;
    btn.textContent = repeatIcons[repeatMode] || '🔁';
    btn.classList.toggle('active-state', repeatMode !== 'none');
    btn.setAttribute('aria-pressed', String(repeatMode !== 'none'));
    btn.title = `Repeat: ${repeatMode}`;
  });
}

// ===== Sleep timer =====
function startSleepTimer(minutes) {
  cancelSleepTimer();
  sleepTimerEnd = Date.now() + minutes * 60000;
  document.querySelectorAll('.sleep-btn').forEach(b => b.classList.remove('active-timer'));
  const activeBtn = document.querySelector(`.sleep-btn[data-min="${minutes}"]`);
  if (activeBtn) activeBtn.classList.add('active-timer');

  sleepTimerHandle = setInterval(() => {
    const remaining = sleepTimerEnd - Date.now();
    updateSleepTimerDisplay(remaining);
    if (remaining <= 0) {
      activeAudio.pause();
      nextAudio.pause();
      updatePlaybackUI(false);
      showToast("Sleep Timer: Playback Paused");
      cancelSleepTimer();
    }
  }, 1000);
  showToast(`Sleep Timer set: ${minutes} min`);
}

function cancelSleepTimer() {
  if (sleepTimerHandle) clearInterval(sleepTimerHandle);
  sleepTimerHandle = null;
  sleepTimerEnd = 0;
  document.querySelectorAll('.sleep-btn').forEach(b => b.classList.remove('active-timer'));
  updateSleepTimerDisplay(0);
}

function updateSleepTimerDisplay(remainingMs) {
  const el = document.getElementById('sleep-timer-status');
  if (!el) return;
  if (remainingMs <= 0) { el.textContent = "Sleep Timer: Off"; return; }
  const mins = Math.floor(remainingMs / 60000);
  const secs = Math.floor((remainingMs % 60000) / 1000);
  el.textContent = `Sleep Timer: ${mins}:${secs < 10 ? '0' + secs : secs} remaining`;
}

// ===== Continue Listening =====
function setupContinueListening() {
  const data = safeParseJSON(localStorage.getItem('booster_lastplayed'), null);
  if (!data || !data.file) return;

  const heroTitle = document.getElementById('hero-title');
  const heroArtist = document.getElementById('hero-artist');
  const heroBtn = document.getElementById('hero-resume-btn');
  if (heroTitle) heroTitle.textContent = `Continue: ${data.title || data.file}`;
  if (heroArtist) heroArtist.textContent = `${data.artist || 'BOOSTER Audio'} • Tap to resume where you left off`;
  if (heroBtn) {
    heroBtn.style.display = 'inline-flex';
    heroBtn.onclick = () => {
      const song = getAllSongsFlat().find(s => s.file === data.file);
      if (!song) return;
      currentCategory = (data.category && playlist[data.category]) ? data.category : 'Trending';
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      const catMap = { Trending: 'btn-2026', '90s': 'btn-90s', '3D Audio': 'btn-3d', Favorites: 'btn-favorites', All: 'btn-all' };
      const btnId = catMap[currentCategory];
      if (btnId) document.getElementById(btnId)?.classList.add('active');
      displayedList = getActiveList();
      currentSongIndex = Math.max(0, displayedList.findIndex(s => s.file === song.file));
      loadAndPlaySong(displayedList[currentSongIndex], true);
      setTimeout(() => { if (data.position && activeAudio) activeAudio.currentTime = data.position; }, 900);
    };
  }
}

// ===== DSP Controls Binding =====
function bindProDspControls() {
  const dspToggle = document.getElementById('master-dsp-toggle');
  if (dspToggle) {
    dspToggle.onchange = (e) => {
      ensureAudioEngine();
      isDspEnabled = e.target.checked;
      routeAudioGraph();
      saveSettings();
      showToast(isDspEnabled ? "Master DSP Enabled" : "Direct Studio Bypass Active");
    };
  }

  const vibeToggle = document.getElementById('vibe-mode-toggle');
  const vibeSlider = document.getElementById('vibe-intensity-slider');
  const vibeDisp = document.getElementById('vibe-slider-val');

  if (vibeToggle) {
    vibeToggle.onchange = (e) => {
      ensureAudioEngine();
      isVibeModeEnabled = e.target.checked;
      if (vibeBassNode) vibeBassNode.gain.value = isVibeModeEnabled ? (vibeIntensity * 12) : 0;
      routeAudioGraph();
      saveSettings();
      showToast(isVibeModeEnabled ? "Extreme Bass & Beat Glow ON" : "Extreme Vibe OFF");
    };
  }

  if (vibeSlider) {
    vibeSlider.oninput = (e) => {
      const val = parseInt(e.target.value);
      vibeIntensity = val / 100;
      if (vibeDisp) vibeDisp.textContent = `${val}%`;
      if (vibeBassNode && isVibeModeEnabled) vibeBassNode.gain.value = vibeIntensity * 12;
      saveSettings();
    };
  }

  const bassSlider = document.getElementById('bass-boost-slider');
  const bassDisp = document.getElementById('bass-boost-val');
  if (bassSlider) {
    bassSlider.oninput = (e) => {
      ensureAudioEngine();
      const val = parseFloat(e.target.value);
      if (bassDisp) bassDisp.textContent = `${val} dB`;
      pendingBass = val;
      if (bassFilterNode) bassFilterNode.gain.value = val;
      saveSettings();
    };
  }

  const trebleSlider = document.getElementById('treble-boost-slider');
  const trebleDisp = document.getElementById('treble-boost-val');
  if (trebleSlider) {
    trebleSlider.oninput = (e) => {
      ensureAudioEngine();
      const val = parseFloat(e.target.value);
      if (trebleDisp) trebleDisp.textContent = `${val} dB`;
      pendingTreble = val;
      if (trebleFilterNode) trebleFilterNode.gain.value = val;
      saveSettings();
    };
  }

  const pannerSlider = document.getElementById('panner-slider');
  const pannerDisp = document.getElementById('panner-val');
  if (pannerSlider) {
    pannerSlider.oninput = (e) => {
      ensureAudioEngine();
      const val = parseFloat(e.target.value);
      if (pannerDisp) pannerDisp.textContent = val === 0 ? "Center (0.0)" : (val < 0 ? `Left (${val})` : `Right (+${val})`);
      pendingPan = val;
      if (pannerNode) pannerNode.pan.value = val;
      saveSettings();
    };
  }

  document.querySelectorAll('.eq-slider').forEach((slider) => {
    slider.oninput = (e) => {
      ensureAudioEngine();
      const bandIndex = parseInt(e.target.dataset.band);
      const val = parseFloat(e.target.value);
      const disp = e.target.closest('.eq-band')?.querySelector('.eq-val');
      if (disp) disp.textContent = `${val > 0 ? '+' : ''}${val}dB`;
      pendingEq[bandIndex] = val;
      if (eqNodes[bandIndex]) eqNodes[bandIndex].gain.value = val;
      saveSettings();
    };
  });

  const flatBtn = document.getElementById('eq-flat-btn');
  if (flatBtn) {
    flatBtn.onclick = () => {
      document.querySelectorAll('.eq-slider').forEach((slider) => {
        slider.value = 0;
        const disp = slider.closest('.eq-band')?.querySelector('.eq-val');
        if (disp) disp.textContent = "0dB";
      });
      pendingEq = [0, 0, 0, 0, 0];
      eqNodes.forEach(eq => eq.gain.value = 0);
      saveSettings();
      showToast("EQ Reset to Flat Mode");
    };
  }

  const speedSlider = document.getElementById('speed-slider');
  const speedDisp = document.getElementById('speed-val');
  if (speedSlider) {
    speedSlider.oninput = (e) => {
      playbackSpeed = parseFloat(e.target.value);
      if (speedDisp) speedDisp.textContent = `${playbackSpeed}x`;
      const modalSpeedBtn = document.getElementById('modal-speed-btn');
      if (modalSpeedBtn) modalSpeedBtn.textContent = `${playbackSpeed}x`;
      playerA.playbackRate = playbackSpeed;
      playerB.playbackRate = playbackSpeed;
      saveSettings();
    };
  }

  document.querySelectorAll('.sleep-btn:not(.cancel)').forEach(btn => {
    btn.onclick = () => startSleepTimer(parseInt(btn.dataset.min));
  });
  const sleepCancel = document.getElementById('sleep-cancel-btn');
  if (sleepCancel) sleepCancel.onclick = () => { cancelSleepTimer(); showToast("Sleep Timer Cancelled"); };
}

// ===== Init =====
attachAudioEvents(playerA);
attachAudioEvents(playerB);

let togglePlay;
let playNext;
let playPrev;

document.addEventListener('DOMContentLoaded', () => {
  loadSettingsIntoState();
  initPasswordLock();
  displayedList = getActiveList();
  applySettingsToUI();
  renderTrendingGrid();
  bindProDspControls();
  setupContinueListening();

  const tvBtn = document.getElementById('tv-mode-toggle');
  if (tvBtn) {
    const storedPref = localStorage.getItem('booster_tvmode');
    const tvOn = storedPref === 'true' || (storedPref === null && detectTVEnvironment());
    document.body.classList.toggle('tv-mode', tvOn);
    tvBtn.classList.toggle('active', tvOn);
    tvBtn.setAttribute('aria-pressed', String(tvOn));
    if (storedPref === null && tvOn) showToast("Smart TV detected — enlarged interface enabled");
    tvBtn.onclick = () => {
      const isOn = document.body.classList.toggle('tv-mode');
      tvBtn.classList.toggle('active', isOn);
      tvBtn.setAttribute('aria-pressed', String(isOn));
      localStorage.setItem('booster_tvmode', isOn);
      showToast(isOn ? "TV Mode Enabled — Enlarged UI" : "TV Mode Disabled");
    };
  }

  const crossInputs = document.querySelectorAll('.crossfade-slider-input');
  const crossDisps = document.querySelectorAll('.crossfade-val-disp');
  crossInputs.forEach(input => {
    input.oninput = (e) => {
      crossfadeTime = parseInt(e.target.value);
      crossInputs.forEach(i => i.value = crossfadeTime);
      crossDisps.forEach(d => d.textContent = `${crossfadeTime}s`);
      saveSettings();
    };
  });

  const masterBar = document.getElementById('master-player-bar');
  const playerModal = document.getElementById('player-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const lyricsOverlay = document.getElementById('lyrics-fullscreen');
  const lyricsClose = document.getElementById('lyrics-fullscreen-close');

  if (masterBar && playerModal) {
    masterBar.onclick = (e) => {
      if (e.target.closest('button') || e.target.closest('input')) return;
      openModalAccessible(playerModal);
    };
  }
  if (modalClose && playerModal) modalClose.onclick = () => closeModalAccessible(playerModal);
  if (lyricsClose && lyricsOverlay) lyricsClose.onclick = () => closeModalAccessible(lyricsOverlay);

  [document.getElementById('lyrics-expand-btn'), document.getElementById('modal-lyrics-btn'), document.getElementById('np-lyrics-btn')].forEach(btn => {
    if (btn) btn.onclick = () => openLyricsFullscreen();
  });

  const modalSpeedBtn = document.getElementById('modal-speed-btn');
  if (modalSpeedBtn) {
    modalSpeedBtn.onclick = () => {
      const idx = SPEED_STEPS.indexOf(playbackSpeed);
      playbackSpeed = SPEED_STEPS[(idx + 1) % SPEED_STEPS.length];
      if (playbackSpeed === -1 || idx === -1) playbackSpeed = 1;
      playerA.playbackRate = playbackSpeed;
      playerB.playbackRate = playbackSpeed;
      modalSpeedBtn.textContent = `${playbackSpeed}x`;
      const speedSlider = document.getElementById('speed-slider');
      const speedDisp = document.getElementById('speed-val');
      if (speedSlider) speedSlider.value = playbackSpeed;
      if (speedDisp) speedDisp.textContent = `${playbackSpeed}x`;
      saveSettings();
      showToast(`Playback Speed: ${playbackSpeed}x`);
    };
  }

  let touchStartY = 0, touchStartX = 0;
  if (playerModal) {
    playerModal.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    playerModal.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchEndY - touchStartY > 80) closeModalAccessible(playerModal);
    }, { passive: true });
  }
  if (lyricsOverlay) {
    lyricsOverlay.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
    lyricsOverlay.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchEndY - touchStartY > 80) closeModalAccessible(lyricsOverlay);
    }, { passive: true });
  }

  if (masterBar) {
    masterBar.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    masterBar.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 60) { dx < 0 ? playNext() : playPrev(); }
    }, { passive: true });
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') { e.preventDefault(); document.getElementById('master-play-btn')?.click(); }
    else if (e.code === 'ArrowRight') { if (activeAudio.duration) activeAudio.currentTime = Math.min(activeAudio.currentTime + 5, activeAudio.duration); }
    else if (e.code === 'ArrowLeft') { activeAudio.currentTime = Math.max(activeAudio.currentTime - 5, 0); }
    else if (e.code === 'ArrowUp') { e.preventDefault(); globalVolume = Math.min(1, globalVolume + 0.05); activeAudio.volume = globalVolume; const vs = document.getElementById('master-volume'); if (vs) vs.value = globalVolume; saveSettings(); }
    else if (e.code === 'ArrowDown') { e.preventDefault(); globalVolume = Math.max(0, globalVolume - 0.05); activeAudio.volume = globalVolume; const vs = document.getElementById('master-volume'); if (vs) vs.value = globalVolume; saveSettings(); }
    else if (e.key === 'm' || e.key === 'M') { activeAudio.muted = !activeAudio.muted; showToast(activeAudio.muted ? "Muted" : "Unmuted"); }
    else if (e.key === 'l' || e.key === 'L') { const overlay = document.getElementById('lyrics-fullscreen'); overlay?.classList.contains('active') ? closeLyricsFullscreen() : openLyricsFullscreen(); }
    else if (e.key === 'Escape') {
      if (lyricsOverlay?.classList.contains('active')) closeLyricsFullscreen();
      else if (playerModal?.classList.contains('active')) closeModalAccessible(playerModal);
    }
  });

  function switchCategory(cat, btnEl) {
    const grid = document.getElementById('trending-grid');
    if (grid) grid.classList.add('animating');
    setTimeout(() => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');
      currentCategory = cat;
      const searchInput = document.getElementById('global-search');
      if (searchInput) searchInput.value = '';
      displayedList = getActiveList();
      currentSongIndex = 0;
      renderTrendingGrid();
      if (grid) grid.classList.remove('animating');
    }, 150);
  }

  const catBtns = [
    { id: 'btn-2026', cat: 'Trending' },
    { id: 'btn-90s', cat: '90s' },
    { id: 'btn-3d', cat: '3D Audio' },
    { id: 'btn-favorites', cat: 'Favorites' },
    { id: 'btn-all', cat: 'All' }
  ];
  catBtns.forEach(item => {
    const btn = document.getElementById(item.id);
    if (btn) btn.onclick = () => switchCategory(item.cat, btn);
  });

  const handleSeek = (e, container) => {
    if (!activeAudio.duration) return;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    activeAudio.currentTime = (clickX / rect.width) * activeAudio.duration;
  };
  const progressContainer = document.getElementById('progress-bar-container');
  const modalProgressContainer = document.getElementById('modal-progress-container');
  if (progressContainer) progressContainer.onclick = (e) => handleSeek(e, progressContainer);
  if (modalProgressContainer) modalProgressContainer.onclick = (e) => handleSeek(e, modalProgressContainer);

  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.oninput = debounce((e) => {
      const query = e.target.value.toLowerCase().trim();
      const fullList = getActiveList();
      displayedList = query ? fullList.filter(s =>
        (s.title && s.title.toLowerCase().includes(query)) ||
        (s.artist && s.artist.toLowerCase().includes(query))
      ) : fullList;
      currentSongIndex = 0;
      renderTrendingGrid();
    }, 180);
  }

  const volSlider = document.getElementById('master-volume');
  if (volSlider) {
    volSlider.oninput = (e) => {
      globalVolume = parseFloat(e.target.value);
      activeAudio.volume = globalVolume;
      saveSettings();
    };
  }

  const tabUpNext = document.getElementById('tab-upnext');
  const tabHistory = document.getElementById('tab-history');
  const tabLyrics = document.getElementById('tab-lyrics');
  const upnextCont = document.getElementById('upnext-container');
  const historyCont = document.getElementById('history-container');
  const lyricsCont = document.getElementById('lyrics-container');
  function activateQueueTab(target) {
    [tabUpNext, tabHistory, tabLyrics].forEach(t => t?.classList.remove('active'));
    [upnextCont, historyCont, lyricsCont].forEach(c => { if (c) c.style.display = 'none'; });
    target.tab?.classList.add('active');
    if (target.cont) target.cont.style.display = 'block';
  }
  if (tabUpNext) tabUpNext.onclick = () => activateQueueTab({ tab: tabUpNext, cont: upnextCont });
  if (tabHistory) tabHistory.onclick = () => activateQueueTab({ tab: tabHistory, cont: historyCont });
  if (tabLyrics) tabLyrics.onclick = () => activateQueueTab({ tab: tabLyrics, cont: lyricsCont });

  if (lyricsCont) {
    lyricsCont.addEventListener('scroll', () => { lastLyricsUserScroll = Date.now(); }, { passive: true });
  }
  const lyricsFsList = document.getElementById('lyrics-fullscreen-list');
  if (lyricsFsList) {
    lyricsFsList.addEventListener('scroll', () => { lastLyricsUserScroll = Date.now(); }, { passive: true });
  }

  function switchView(targetView) {
    document.querySelectorAll('.nav-item[data-target], .mobile-nav-item[data-target]').forEach(i => i.classList.remove('active'));
    document.querySelectorAll(`.nav-item[data-target="${targetView}"], .mobile-nav-item[data-target="${targetView}"]`).forEach(i => i.classList.add('active'));
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(targetView)?.classList.add('active');
  }

  document.querySelectorAll('.nav-item[data-target]').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.target));
  });
  document.querySelectorAll('.mobile-nav-item[data-target]').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.target));
  });

  enableRovingFocus(document.querySelector('.nav-routes'), '.nav-item', { horizontal: false, vertical: true });
  enableRovingFocus(document.querySelector('.category-filters'), '.filter-chip', { horizontal: true });
  enableRovingFocus(document.querySelector('.player-controls'), '.icon-btn', { horizontal: true });
  enableRovingFocus(document.querySelector('.modal-controls'), '.icon-btn', { horizontal: true });
  enableRovingFocus(document.querySelector('.mobile-tabbar'), '.mobile-nav-item', { horizontal: true });
  enableRovingFocus(document.querySelector('.tab-controls'), '.queue-tab', { horizontal: true });

  togglePlay = (forceState) => {
    ensureAudioEngine();
    if (!activeAudio.src) { loadAndPlaySong(null, true); return; }
    const shouldPlay = typeof forceState === 'boolean' ? forceState : activeAudio.paused;
    if (shouldPlay) { activeAudio.play(); updatePlaybackUI(true); }
    else { activeAudio.pause(); nextAudio.pause(); updatePlaybackUI(false); }
  };

  document.getElementById('master-play-btn').onclick = () => togglePlay();
  document.getElementById('modal-play-btn').onclick = () => togglePlay();

  playNext = () => { const nextSong = getNextSong(); if (nextSong) loadAndPlaySong(nextSong, true); };
  document.getElementById('next-btn').onclick = playNext;
  document.getElementById('modal-next-btn').onclick = playNext;

  playPrev = () => {
    const list = displayedList.length > 0 ? displayedList : getActiveList();
    if (list.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + list.length) % list.length;
    loadAndPlaySong(list[currentSongIndex], true);
  };
  document.getElementById('prev-btn').onclick = playPrev;
  document.getElementById('modal-prev-btn').onclick = playPrev;

  [document.getElementById('shuffle-btn'), document.getElementById('modal-shuffle-btn')].forEach(btn => {
    if (!btn) return;
    btn.onclick = () => {
      shuffleMode = !shuffleMode;
      syncShuffleRepeatUI();
      saveSettings();
      showToast(shuffleMode ? "Shuffle ON" : "Shuffle OFF");
    };
  });

  [document.getElementById('repeat-btn'), document.getElementById('modal-repeat-btn')].forEach(btn => {
    if (!btn) return;
    btn.onclick = () => {
      const order = ['all', 'one', 'none'];
      repeatMode = order[(order.indexOf(repeatMode) + 1) % order.length];
      syncShuffleRepeatUI();
      saveSettings();
      showToast(`Repeat: ${repeatMode}`);
    };
  });

  [document.getElementById('fav-btn'), document.getElementById('modal-fav-btn')].forEach(btn => {
    if (!btn) return;
    btn.onclick = () => {
      const list = displayedList.length > 0 ? displayedList : getActiveList();
      toggleFavorite(list[currentSongIndex]);
    };
  });

  window.addEventListener('beforeunload', persistPlaybackState);
});
