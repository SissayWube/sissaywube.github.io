/* ============================================
   SISSAY WUBE – PORTFOLIO JAVASCRIPT
   ERPNext-Inspired Theme Management & Interactions
   ============================================ */

// ── Typed Text Effect ──────────────────────
const typedRoles = [
  'Go Microservices Architect',
  'Senior Backend Engineer',
  'Multitenant SaaS & ERP Specialist',
  'Distributed Systems Engineer',
  'DevOps & Kubernetes Practitioner'
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
      setTimeout(typeLoop, 2200);
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

  setTimeout(typeLoop, isDeleting ? 40 : 80);
}

// ── Particle Canvas ────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let animFrameId;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function getThemeColors() {
  const isDark = (document.documentElement.getAttribute('data-theme') || 'light') === 'dark';
  return {
    isDark,
    particleColor: isDark ? '96, 165, 250' : '71, 85, 105',
    lineColor: isDark ? '59, 130, 246' : '27, 102, 201',
    lineBaseOpacity: isDark ? 0.16 : 0.08,
    particleAlphaMin: isDark ? 0.15 : 0.07,
    particleAlphaMax: isDark ? 0.40 : 0.22
  };
}

function createParticles() {
  if (!canvas) return;
  particles = [];
  const isMobile = window.innerWidth < 768;
  const count = Math.floor((canvas.width * canvas.height) / (isMobile ? 32000 : 22000));
  const colors = getThemeColors();

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * (colors.particleAlphaMax - colors.particleAlphaMin) + colors.particleAlphaMin,
      color: colors.particleColor
    });
  }
}

function drawParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const colors = getThemeColors();

  // Draw connecting lines
  const maxDist = 125;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * colors.lineBaseOpacity;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${colors.lineColor}, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw particle dots
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
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

// ── Theme Manager ──────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (document.body) {
    document.body.setAttribute('data-theme', theme);
  }
  localStorage.setItem('sw_theme', theme);

  // Update meta theme-color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#f4f5f7');
  }

  // Update theme-toggle title & aria
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    const isDark = theme === 'dark';
    toggleBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  // Re-seed particles with updated theme colors
  if (!prefersReducedMotion && canvas) {
    createParticles();
  }
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve existing preference or default to clean ERPNext light theme
  const currentTheme = localStorage.getItem('sw_theme') || 'light';
  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

// ── Navbar Scroll & Active Section ─────────
function handleNavScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 140;
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

// ── Intersection Observer for Scroll Reveal ─
function setupRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal, .timeline-item');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

// ── Hamburger Menu ─────────────────────────
function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// ── Animated Stats Counter ─────────────────
let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  const statValues = document.querySelectorAll('.stat-value[data-target]');
  statValues.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1400;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(eased * target);
      el.textContent = currentVal + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(step);
  });
}

// ── Smooth Scroll Offset ───────────────────
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 75;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ── Footer Year Automation ─────────────────
function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ── Analytics & Resume Download ────────────
function trackResumeDownload() {
  console.log('Resume downloaded at:', new Date().toISOString());
}

// ── DOM Initialization ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  updateFooterYear();
  setupRevealObserver();

  // Typed text initialization
  typedEl = document.getElementById('typed-text');
  if (typedEl) setTimeout(typeLoop, 500);

  // Background Canvas
  if (!prefersReducedMotion && canvas) {
    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animFrameId);
      resizeCanvas();
      createParticles();
      drawParticles();
    });
  }

  // Scroll events
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  setupHamburger();
  setupSmoothScroll();

  // Stats Intersection Observer
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) animateCounters();
      });
    }, { threshold: 0.2 });
    statsObserver.observe(heroSection);
  }
});

// Handle direct hash on load
window.addEventListener('load', () => {
  if (window.location.hash) {
    const el = document.querySelector(window.location.hash);
    if (el) {
      el.scrollIntoView();
      // Ensure element and its children become visible
      el.classList.add('visible');
      el.querySelectorAll('.reveal, .timeline-item').forEach(child => child.classList.add('visible'));
    }
  }
});
