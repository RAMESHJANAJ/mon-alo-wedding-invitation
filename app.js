// Bengali numerals mapper
const bn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

// Countdown timer to Wedding: 11 December 2026, 7:00 PM IST
function tick() {
  const target = new Date('2026-12-11T19:00:00+05:30');
  const t = Math.max(0, target - Date.now());
  const values = [
    Math.floor(t / 86400000),
    Math.floor(t / 3600000) % 24,
    Math.floor(t / 60000) % 60,
    Math.floor(t / 1000) % 60
  ];
  const labels = ['দিন', 'ঘণ্টা', 'মিনিট', 'সেকেন্ড'];
  const el = document.querySelector('#countdown');
  if (el) {
    el.innerHTML = values.map((v, i) => `<div><b>${bn(v)}</b><small>${labels[i]}</small></div>`).join('');
  }
}
tick();
setInterval(tick, 1000);

// Native Lightbox dialog handler
const dialog = document.querySelector('#lightbox');
if (dialog) {
  function attachGalleryHandlers() {
    document.querySelectorAll('[data-image]').forEach(b => {
      b.onclick = () => {
        const raw = b.dataset.image;
        const src = raw.startsWith('../') || raw.startsWith('images/')
          ? raw.replace(/^\.\.\//, '')
          : 'assets/' + raw;
        const img = dialog.querySelector('img');
        const cap = dialog.querySelector('p');
        if (img) {
          img.src = src;
          img.alt = b.dataset.caption || '';
        }
        if (cap) {
          cap.textContent = b.dataset.caption || '';
        }
        dialog.showModal();
      };
    });
  }
  attachGalleryHandlers();

  const closeBtn = dialog.querySelector('.close');
  if (closeBtn) {
    closeBtn.onclick = () => dialog.close();
  }
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });
}

// Add to Calendar (.ics download)
document.querySelectorAll('[data-calendar]').forEach(b => {
  b.onclick = () => {
    const wedding = b.dataset.calendar === 'wedding';
    const content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Manojit Anindita//Wedding//BN',
      'BEGIN:VEVENT',
      'UID:' + b.dataset.calendar + '-2026@manojit-anindita',
      'DTSTAMP:20261024T000000Z',
      'DTSTART:' + (wedding ? '20261211T133000Z' : '20261213T070000Z'),
      'SUMMARY:মনোজিৎ ও অনিন্দিতা — ' + (wedding ? 'শুভ বিবাহ' : 'বৌভাত'),
      'DESCRIPTION:পথনির্দেশ ' + (wedding ? 'https://maps.app.goo.gl/zK8g2A6VWdLi64nt5?g_st=aw' : 'https://www.google.com/maps/@22.0898332,87.2220828,53m/data=!3m1!1e3?authuser=0&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D'),
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = b.dataset.calendar + '.ics';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
});

// Background Music Player: "Khukumonir Be" (খুকুমণির বে)
// YouTube: https://youtu.be/rWcDu9vNQCs
const musicBtn = document.querySelector('#music');
let bgAudio = null;
let isMusicPlaying = false;

function initAudio() {
  if (!bgAudio) {
    bgAudio = new Audio('music/khukumonir-be.mp3');
    bgAudio.loop = true;
    bgAudio.preload = 'auto';

    bgAudio.addEventListener('ended', () => {
      isMusicPlaying = false;
      updateMusicButton();
    });

    bgAudio.addEventListener('pause', () => {
      isMusicPlaying = false;
      updateMusicButton();
    });

    bgAudio.addEventListener('play', () => {
      isMusicPlaying = true;
      updateMusicButton();
    });
  }
}

function updateMusicButton() {
  if (!musicBtn) return;
  musicBtn.setAttribute('aria-pressed', String(isMusicPlaying));
  const label = musicBtn.querySelector('.music-label') || musicBtn.querySelector('span');
  if (label) {
    label.textContent = isMusicPlaying ? 'সুর বন্ধ করুন' : 'সুর চালু করুন';
  }
  if (isMusicPlaying) {
    musicBtn.classList.add('playing');
    startFloatingNotes();
  } else {
    musicBtn.classList.remove('playing');
    stopFloatingNotes();
  }
}

let noteInterval = null;
function startFloatingNotes() {
  if (noteInterval) return;
  const symbols = ['♫', '♪', '♩', '♬'];
  noteInterval = setInterval(() => {
    if (!isMusicPlaying || !musicBtn) return;
    const rect = musicBtn.getBoundingClientRect();
    const note = document.createElement('span');
    note.className = 'floating-music-note';
    note.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const driftX = (Math.random() * 50 - 25) + 'px';
    const rot = (Math.random() * 50 - 25) + 'deg';
    note.style.setProperty('--drift-x', driftX);
    note.style.setProperty('--rot', rot);
    note.style.left = (rect.left + rect.width * 0.2 + Math.random() * (rect.width * 0.6)) + 'px';
    note.style.top = (rect.top - 5) + 'px';
    document.body.appendChild(note);
    note.addEventListener('animationend', () => note.remove());
  }, 1100);
}

function stopFloatingNotes() {
  if (noteInterval) {
    clearInterval(noteInterval);
    noteInterval = null;
  }
}

if (musicBtn) {
  musicBtn.title = 'খুকুমণির বে (Khukumonir Be) — সুর চালু / বন্ধ করুন';
  musicBtn.onclick = async () => {
    initAudio();
    try {
      if (isMusicPlaying) {
        bgAudio.pause();
      } else {
        await bgAudio.play();
      }
    } catch (err) {
      console.warn('Playback error:', err);
      const span = musicBtn.querySelector('span');
      if (span) span.textContent = 'সুর চালু করা যায়নি';
    }
  };
}

// Optional toggle for 6 personal couple photos
const toggleBtn = document.querySelector('#toggle-photos-btn');
const extraPhotos = document.querySelector('#extra-photos');
if (toggleBtn && extraPhotos) {
  toggleBtn.onclick = () => {
    const isHidden = extraPhotos.style.display === 'none';
    extraPhotos.style.display = isHidden ? 'grid' : 'none';
    toggleBtn.textContent = isHidden ? 'আমাদের অ্যালবাম সংক্ষেপ করুন ▴' : 'আমাদের অ্যালবাম (৬টি মুহূর্ত দেখুন) ▾';
    if (isHidden) {
      extraPhotos.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
}

// Active navigation highlight on scroll
const navSections = document.querySelectorAll('main > section[id]');
const navLinks = document.querySelectorAll('nav a');

function updateActiveNav() {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  let currentId = 'home';

  navSections.forEach(sec => {
    const top = sec.offsetTop - 140;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentId = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' + currentId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* =============================================================
   MOTION GRAPHICS: AUSPICIOUS BENGALI WEDDING PARTICLES & SPARKS
   - Floating Marigold (গাঁদা) & Rose (গোলাপ) Petals (শুভ পুষ্পবৃষ্টি)
   - Sacred Golden Stardust & Diya Sparkles (স্বর্ণরেণু)
   - Interactive Click/Touch Celebratory Sparkle Bursts
   ============================================================= */
(function initWeddingMotionGraphics() {
  const canvas = document.querySelector('#motion-canvas');
  if (!canvas) return;

  // Check reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Bengali wedding petal color palette (Primary Red & Gold Accent Palette)
  const PETAL_COLORS = [
    '#DBA836', // Mid-tone / Base Gold
    '#F5D973', // Light Gold Highlight
    '#B10B0D', // Primary Red (Lettering & Flourishes)
    '#7A0608', // Deep Red
    '#B8841B', // Deep Gold / Shadow
    'rgba(177, 11, 13, 0.85)' // Delicate Red Rose
  ];

  // 1. Petals (গাঁদা ও গোলাপের পাপড়ি)
  const PETAL_COUNT = width < 768 ? 14 : 22;
  const petals = [];

  function createPetal(initialY) {
    return {
      x: Math.random() * width,
      y: initialY !== undefined ? initialY : -20 - Math.random() * 50,
      size: 9 + Math.random() * 8,
      vy: 0.6 + Math.random() * 0.9,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.018 + Math.random() * 0.02,
      swayAmplitude: 0.7 + Math.random() * 0.9,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: 0.015 + Math.random() * 0.025,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: 0.45 + Math.random() * 0.35
    };
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(createPetal(Math.random() * height));
  }

  // 2. Golden Stardust Sparkles (স্বর্ণরেণু)
  const SPARKLE_COUNT = width < 768 ? 18 : 28;
  const sparkles = [];

  function createSparkle(initialY) {
    return {
      x: Math.random() * width,
      y: initialY !== undefined ? initialY : height + Math.random() * 40,
      radius: 1.2 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.25 - Math.random() * 0.45, // Gentle upward drift like diya warmth
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.035 + Math.random() * 0.045,
      baseOpacity: 0.3 + Math.random() * 0.45,
      color: Math.random() > 0.35 ? '#F5D973' : '#DBA836'
    };
  }

  for (let i = 0; i < SPARKLE_COUNT; i++) {
    sparkles.push(createSparkle(Math.random() * height));
  }

  // 3. Interactive Touch/Click Confetti Bursts
  const bursts = [];

  function spawnBurst(e) {
    const x = e.clientX;
    const y = e.clientY;
    if (x === undefined || y === undefined) return;

    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.5 + Math.random() * 2.8;
      bursts.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 2.5,
        life: 1.0,
        decay: 0.028 + Math.random() * 0.02,
        color: Math.random() > 0.4 ? '#F5D973' : '#B10B0D'
      });
    }
  }
  window.addEventListener('pointerdown', spawnBurst, { passive: true });

  // Draw organic petal shape
  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.scale(Math.cos(p.flip), 1); // 3D tumbling projection

    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.5, p.size * 0.9, p.size * 0.65, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.65, -p.size * 0.85, -p.size * 0.5, 0, -p.size);

    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.shadowColor = 'rgba(219, 168, 54, 0.25)';
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();
  }

  // Draw 4-point golden star sparkle
  function drawSparkle(s) {
    const currentAlpha = s.baseOpacity * (0.6 + 0.4 * Math.sin(s.pulse));
    if (currentAlpha <= 0.02) return;

    ctx.save();
    ctx.translate(s.x, s.y);
    const r = s.radius * (0.8 + 0.3 * Math.sin(s.pulse));

    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);

    ctx.fillStyle = s.color;
    ctx.globalAlpha = currentAlpha;
    ctx.shadowColor = '#F5D973';
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.restore();
  }

  // Main Render Loop
  let isRunning = true;
  let rafId = null;

  function render() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // 1. Update & Draw Stardust Sparkles
    for (let i = 0; i < sparkles.length; i++) {
      const s = sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.pulse += s.pulseSpeed;

      // Wrap around
      if (s.y < -15) {
        s.y = height + 15;
        s.x = Math.random() * width;
      }
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;

      drawSparkle(s);
    }

    // 2. Update & Draw Petals
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.sway += p.swaySpeed;
      p.x += Math.sin(p.sway) * p.swayAmplitude;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      // Wrap around
      if (p.y > height + 25) {
        p.y = -25;
        p.x = Math.random() * width;
      }
      if (p.x < -25) p.x = width + 25;
      if (p.x > width + 25) p.x = -25;

      drawPetal(p);
    }

    // 3. Update & Draw Click Bursts
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.94;
      b.vy *= 0.94;
      b.vy += 0.04; // Gentle gravity
      b.life -= b.decay;

      if (b.life <= 0) {
        bursts.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size * b.life, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.globalAlpha = b.life * 0.85;
      ctx.shadowColor = '#F5D973';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }

    rafId = requestAnimationFrame(render);
  }

  // Handle Tab Focus / Performance throttle
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
    } else {
      isRunning = true;
      rafId = requestAnimationFrame(render);
    }
  });

  rafId = requestAnimationFrame(render);
})();
