/* ============================================
   SISSAY WUBE – PORTFOLIO JS
   Typed text, particle canvas, scroll effects
   ============================================ */

// ── Typed Text Effect ──────────────────────
const typedRoles = [
  'Backend Engineer',
  'Go Expert',
  'Microservices Architect',
  'Full-Stack Developer',
  'DevOps Practitioner',
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typedEl;

function typeLoop() {
  if (!typedEl) return;
  const current = typedRoles[roleIdx];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % typedRoles.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 55 : 90);
}

// ── Particle Canvas ────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrameId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const isMobile = window.innerWidth < 768;
  const count = Math.floor((canvas.width * canvas.height) / (isMobile ? 28000 : 18000));
  const theme = document.body.getAttribute('data-theme') || 'dark';

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      color: theme === 'light' ? (Math.random() > 0.5 ? '255,107,0' : '230,96,0') : (Math.random() > 0.5 ? '255,107,0' : '255,133,51'),
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connection lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const opacity = (1 - dist / 140) * 0.15;
        ctx.beginPath();
        const lineTheme = document.body.getAttribute('data-theme') === 'light' ? '255,107,0' : '255,133,51';
        ctx.strokeStyle = `rgba(${lineTheme},${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw particles
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;
    if (p.y < -10) p.y = canvas.height + 10;
    if (p.y > canvas.height + 10) p.y = -10;
  });

  animFrameId = requestAnimationFrame(drawParticles);
}

// ── NAV Scroll Effect ──────────────────────
function handleNavScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link tracking
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ── Scroll Reveal ──────────────────────────
function handleReveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });

  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, idx) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      setTimeout(() => item.classList.add('visible'), idx * 80);
    }
  });

  // Project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      card.classList.add('visible');
    }
  });
}

// ── Hamburger Menu ─────────────────────────
function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// ── Counter Animation ──────────────────────
function animateCounters() {
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  statValues.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (eased * target).toFixed(1).replace('.0', '') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// ── Smooth Scroll for Nav Links ────────────
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ── Cursor Glow Effect ─────────────────────
function setupCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ── Theme Toggle ───────────────────────────
function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');

  toggleBtn.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const nextTheme = current === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', nextTheme);

    // Recreate particles to update color scheme based on theme
    createParticles();
  });
}

// ── Footer Year Automation ─────────────────
function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ── Years of Experience Automation ─────────
function updateYearsOfExperience() {
  const yearsEl = document.getElementById('years-exp');
  if (yearsEl) {
    const careerStart = new Date(2020, 1); // Feb 2020
    const now = new Date();
    const years = Math.floor((now - careerStart) / (365.25 * 24 * 60 * 60 * 1000));
    yearsEl.textContent = years;
  }
}

// ── Init ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateFooterYear();
  updateYearsOfExperience();

  // Typed effect
  typedEl = document.getElementById('typed-text');
  setTimeout(typeLoop, 600);

  // Canvas
  resizeCanvas();
  createParticles();
  drawParticles();

  // Scroll events
  window.addEventListener('scroll', () => {
    handleNavScroll();
    handleReveal();
  }, { passive: true });

  // Initial trigger
  handleNavScroll();
  handleReveal();

  // Mobile menu
  setupHamburger();

  // Theme Toggler
  setupThemeToggle();

  // Smooth scroll
  setupSmoothScroll();

  // Cursor glow (desktop only)
  if (window.innerWidth > 900) setupCursorGlow();

  // Resize
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrameId);
    resizeCanvas();
    createParticles();
    drawParticles();
  });

  // Stats counter trigger on section visible
  const heroSection = document.getElementById('hero');
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounters();
    });
  }, { threshold: 0.3 });
  if (heroSection) statsObserver.observe(heroSection);
});
