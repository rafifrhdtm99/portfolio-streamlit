/* =========================
   script.js — Portfolio JS
========================= */

// ==============================
// PRELOADER
// ==============================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    initAnimations();
  }, 1200);
});

// ==============================
// CUSTOM CURSOR
// ==============================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .portfolio-card, .glass-card, .filter-btn, .skill-pill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});

// ==============================
// PARTICLE CANVAS
// ==============================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '167, 139, 250' : '244, 114, 182'
  };
}

for (let i = 0; i < 80; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==============================
// NAVBAR SCROLL
// ==============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ==============================
// SCROLL REVEAL & ANIMATIONS
// ==============================
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Skill bars
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });

        // Counters
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Observe cards
  document.querySelectorAll('.glass-card, .timeline-item, .portfolio-item, .section-header').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Highlight cards stagger
  document.querySelectorAll('.highlight-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Timeline items stagger
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });

  // Portfolio items stagger
  document.querySelectorAll('.portfolio-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });

  // Hero stats counter — trigger on load
  setTimeout(() => {
    document.querySelectorAll('.stat-number').forEach(animateCounter);
  }, 1400);
}

// ==============================
// PORTFOLIO FILTER
// ==============================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach((item, i) => {
      const cats = item.dataset.category || '';
      const show = filter === 'all' || cats.includes(filter);
      item.classList.toggle('hidden', !show);
      if (show) {
        item.style.transitionDelay = `${i * 0.07}s`;
        setTimeout(() => item.classList.add('visible'), 50);
      }
    });
  });
});

// ==============================
// LIGHTBOX
// ==============================
function openLightbox(src) {
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <img id="lightboxImg" src="" alt="Portfolio Screenshot" />
      <button class="lightbox-close" id="lightboxClose">✕</button>
    `;
    document.body.appendChild(lightbox);
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  }
  document.getElementById('lightboxImg').src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Make screenshots clickable for lightbox
function bindScreenshots() {
  document.querySelectorAll('.port-screenshot-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
  });
}
bindScreenshots();

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==============================
// ADD SCREENSHOT TO PORTFOLIO
// ==============================
// This function can be called to dynamically add screenshots to portfolio cards
window.addScreenshotToPortfolio = function(cardId, imageSources, gridLayout = '') {
  const card = document.getElementById(cardId);
  if (!card) return;

  const portfolioCard = card.querySelector('.portfolio-card');
  if (!portfolioCard) return;

  // Remove existing screenshots if any
  const existing = portfolioCard.querySelector('.port-screenshots');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = `port-screenshots${gridLayout ? ' ' + gridLayout : ''}`;

  imageSources.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Portfolio Screenshot';
    img.className = 'port-screenshot-img';
    img.loading = 'lazy';
    container.appendChild(img);
  });

  // Insert before port-tags
  const tags = portfolioCard.querySelector('.port-tags');
  if (tags) portfolioCard.insertBefore(container, tags);
  else portfolioCard.appendChild(container);

  // Bind lightbox
  bindScreenshots();
};

// ==============================
// COLLAPSIBLE PORTFOLIO DETAILS
// ==============================
window.toggleCaseDetail = function(btn) {
  const card = btn.closest('.portfolio-card');
  const content = card.querySelector('.port-expandable-content');
  
  if (content.classList.contains('expanded')) {
    content.style.maxHeight = null;
    content.classList.remove('expanded');
    btn.innerHTML = `
      Lihat Detail Strategi Kampanye
      <svg class="expand-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    `;
  } else {
    // Collapse any other open details to keep layout neat
    document.querySelectorAll('.port-expandable-content.expanded').forEach(openContent => {
      openContent.style.maxHeight = null;
      openContent.classList.remove('expanded');
      const openBtn = openContent.closest('.portfolio-card').querySelector('.btn-expand-case');
      if (openBtn) {
        openBtn.innerHTML = `
          Lihat Detail Strategi Kampanye
          <svg class="expand-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        `;
      }
    });

    content.classList.add('expanded');
    content.style.maxHeight = content.scrollHeight + "px";
    btn.innerHTML = `
      Tutup Detail Strategi Kampanye
      <svg class="expand-arrow open" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
    `;
  }
};

