/**
 * CONFETTI PLAYGROUND — app.js
 * Implementación completa usando canvas-confetti (CDN)
 * con múltiples efectos, paletas personalizables y controles dinámicos.
 */

/* ============================================================
   1. CONFIGURACIÓN DEL CANVAS
   ============================================================ */
const myCanvas = document.getElementById('confetti-canvas');

const confettiInstance = confetti.create(myCanvas, {
  resize: true,
  useWorker: true,
});

/* ============================================================
   2. PALETAS DE COLOR
   ============================================================ */
const PALETTES = {
  default: ['#ff3c6e', '#3cf0c8', '#ffe040', '#9b5cff', '#ff8c42', '#4af3a1'],
  neon:    ['#ff00ff', '#00ffff', '#ff0099', '#00ff88', '#ff6600', '#cc00ff'],
  pastel:  ['#ffd6e0', '#c8e6c9', '#bbdefb', '#fff9c4', '#f8bbd0', '#d1c4e9'],
  gold:    ['#ffd700', '#ffb300', '#ff8f00', '#fff8e1', '#ffe57f', '#ffca28'],
  dark:    ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560', '#0f3460'],
};

let currentPalette = 'default';

/* ============================================================
   3. LEER CONTROLES DEL PANEL
   ============================================================ */
function getSettings() {
  return {
    particleCount: parseInt(document.getElementById('particleCount')?.value) || 150,
    spread:        parseInt(document.getElementById('spread')?.value)        || 70,
    gravity:       parseFloat(document.getElementById('gravity')?.value)     || 1,
    startVelocity: parseInt(document.getElementById('startVelocity')?.value) || 45,
    colors:        PALETTES[currentPalette],
  };
}

/* ============================================================
   4. EFECTOS PREDEFINIDOS
   ============================================================ */

/** Efecto 1: Clásico — burst desde arriba-centro */
function effectBasic() {
  const cfg = getSettings();
  confettiInstance({
    particleCount: cfg.particleCount,
    spread: cfg.spread,
    gravity: cfg.gravity,
    startVelocity: cfg.startVelocity,
    origin: { x: 0.5, y: 0.1 },
    colors: cfg.colors,
    ticks: 300,
  });
}

/** Efecto 2: Fuegos Artificiales — múltiples explosiones */
function effectFireworks() {
  const cfg = getSettings();
  const duration = 3000;
  const animEnd = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > animEnd) { clearInterval(interval); return; }

    confettiInstance({
      particleCount: Math.floor(cfg.particleCount / 6),
      spread: 360,
      gravity: cfg.gravity * 0.8,
      startVelocity: cfg.startVelocity * 0.7,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6,
      },
      colors: cfg.colors,
      shapes: ['circle', 'square'],
    });
  }, 220);
}

/** Efecto 3: Cañones Laterales — disparo desde izquierda y derecha */
function effectSides() {
  const cfg = getSettings();
  const count = Math.floor(cfg.particleCount / 2);

  // Lado izquierdo
  confettiInstance({
    particleCount: count,
    angle: 60,
    spread: cfg.spread,
    gravity: cfg.gravity,
    startVelocity: cfg.startVelocity,
    origin: { x: 0, y: 0.65 },
    colors: cfg.colors,
    ticks: 300,
  });

  // Lado derecho
  confettiInstance({
    particleCount: count,
    angle: 120,
    spread: cfg.spread,
    gravity: cfg.gravity,
    startVelocity: cfg.startVelocity,
    origin: { x: 1, y: 0.65 },
    colors: cfg.colors,
    ticks: 300,
  });
}

/** Efecto 4: Estrellas */
function effectStars() {
  const cfg = getSettings();
  const starColors = ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#9400D3', '#FF4500'];

  confettiInstance({
    particleCount: cfg.particleCount,
    spread: 360,
    gravity: cfg.gravity * 0.5,
    startVelocity: cfg.startVelocity,
    origin: { x: 0.5, y: 0.5 },
    colors: starColors,
    shapes: ['star'],
    scalar: 1.5,
    ticks: 400,
  });
}

/** Efecto 5: Nieve — caída continua y suave */
function effectSnow() {
  let count = 0;
  const maxCount = 600;
  const step = 5;

  const snowInterval = setInterval(() => {
    count += step;
    if (count >= maxCount) { clearInterval(snowInterval); return; }

    confettiInstance({
      particleCount: step,
      angle: 270,
      spread: 120,
      gravity: 0.3,
      startVelocity: 8,
      origin: { x: Math.random(), y: 0 },
      colors: ['#fff', '#ddefff', '#aaccff', '#e8f4fd'],
      shapes: ['circle'],
      scalar: 0.8,
      ticks: 500,
      drift: (Math.random() - 0.5) * 1.5,
    });
  }, 80);
}

/** Efecto 6: Realista — física avanzada */
function effectRealistic() {
  const cfg = getSettings();

  // Primera ola
  confettiInstance({
    particleCount: Math.floor(cfg.particleCount * 0.7),
    spread: 70,
    gravity: cfg.gravity,
    startVelocity: cfg.startVelocity,
    origin: { x: 0.5, y: 0.6 },
    colors: cfg.colors,
    ticks: 500,
    shapes: ['square', 'circle'],
    scalar: 1.1,
  });

  // Segunda ola con delay
  setTimeout(() => {
    confettiInstance({
      particleCount: Math.floor(cfg.particleCount * 0.4),
      spread: 120,
      gravity: cfg.gravity * 0.8,
      startVelocity: cfg.startVelocity * 1.2,
      origin: { x: 0.5, y: 0.55 },
      colors: cfg.colors,
      ticks: 600,
      shapes: ['square'],
      scalar: 0.9,
    });
  }, 350);
}

/* ============================================================
   5. EFECTO PERSONALIZADO (usa controles del panel)
   ============================================================ */
function effectCustom() {
  const cfg = getSettings();
  confettiInstance({
    particleCount: cfg.particleCount,
    spread:        cfg.spread,
    gravity:       cfg.gravity,
    startVelocity: cfg.startVelocity,
    origin:        { x: 0.5, y: 0.1 },
    colors:        cfg.colors,
    ticks:         400,
    shapes:        ['square', 'circle', 'star'],
  });
}

/* ============================================================
   6. EVENT LISTENERS — botones de efectos
   ============================================================ */
function attachEffect(id, fn) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.classList.add('firing');
    btn.addEventListener('animationend', () => btn.classList.remove('firing'), { once: true });
    fn();
  });
}

attachEffect('btn-basic',     effectBasic);
attachEffect('btn-fireworks', effectFireworks);
attachEffect('btn-sides',     effectSides);
attachEffect('btn-stars',     effectStars);
attachEffect('btn-snow',      effectSnow);
attachEffect('btn-realistic', effectRealistic);
attachEffect('btn-custom',    effectCustom);

/* ============================================================
   7. CONTROLES DE RANGO — actualización de valores en tiempo real
   ============================================================ */
const sliders = [
  { id: 'particleCount', display: 'count-val',    suffix: '' },
  { id: 'spread',        display: 'spread-val',   suffix: '' },
  { id: 'gravity',       display: 'gravity-val',  suffix: '' },
  { id: 'startVelocity', display: 'velocity-val', suffix: '' },
];

sliders.forEach(({ id, display, suffix }) => {
  const input = document.getElementById(id);
  const output = document.getElementById(display);
  if (!input || !output) return;

  input.addEventListener('input', () => {
    output.textContent = input.value + suffix;
  });
});

/* ============================================================
   8. PALETAS DE COLOR — selector
   ============================================================ */
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPalette = btn.dataset.palette;
  });
});

/* ============================================================
   9. ANIMACIÓN DE BIENVENIDA — se dispara al cargar la página
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    // Disparo de bienvenida desde los lados
    confettiInstance({
      particleCount: 80,
      angle: 55,
      spread: 60,
      startVelocity: 50,
      origin: { x: 0, y: 0.7 },
      colors: PALETTES.default,
      ticks: 250,
    });
    confettiInstance({
      particleCount: 80,
      angle: 125,
      spread: 60,
      startVelocity: 50,
      origin: { x: 1, y: 0.7 },
      colors: PALETTES.default,
      ticks: 250,
    });
  }, 800);
});

/* ============================================================
   10. EASTER EGG — doble clic en el título lanza fuegos artificiales
   ============================================================ */
document.querySelector('.title')?.addEventListener('dblclick', () => {
  effectFireworks();
});
