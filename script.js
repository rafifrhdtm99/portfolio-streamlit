/* =========================
   script.js — Portfolio JS
   ========================= */

// ==============================
// PRELOADER
// ==============================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
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

if (cursor && cursorFollower) {
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
}

// ==============================
// PARTICLE CANVAS
// ==============================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
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
}

// ==============================
// NAVBAR SCROLL
// ==============================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveNav();
  });
}

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
const navCta = document.getElementById('navCta');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    
    // Add overlay
    if (!document.querySelector('.nav-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      overlay.id = 'navOverlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
    document.getElementById('navOverlay').classList.toggle('active');
  });
}

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    document.getElementById('navOverlay')?.classList.remove('active');
  });
});

// ==============================
// HERO REVEAL ANIMATIONS
// ==============================
function initAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-word, .reveal-fade').forEach(el => {
    observer.observe(el);
  });
}

// ==============================
// PORTFOLIO FILTERING
// ==============================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ==============================
// CONTACT FORM (Simple Mock)
// ==============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = 'Message Sent! ✅';
      btn.style.background = '#22c55e';
      contactForm.reset();
      
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}
