/* =========================

   script.js â€” Portfolio JS

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

      color: Math.random() > 0.5 ? '250, 204, 21' : '167, 139, 250'

    };

  }



  for (let i = 0; i < 35; i++) particles.push(createParticle());



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

      btn.innerText = 'Message Sent! âœ…';

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


// ========== PORTFOLIO MODAL + CAROUSEL ==========
(function() {
  const galleryData = {
    autoglaze: {
      title: 'Autoglaze — Meta Ads Multi-Campaign Management',
      subtitle: 'Full-funnel Meta Ads: Awareness, Traffic, Conversion',
      caption: 'Geser atau klik panah untuk melihat bukti kampanye',
      images: [
        { src: 'images/Screenshot 2026-07-11 202432.png', caption: 'Campaign Overview' },
        { src: 'images/Screenshot 2026-07-11 202532.png', caption: 'Campaign Performance' },
        { src: 'images/Screenshot 2026-07-11 202744.png', caption: 'Audience & Targeting' },
        { src: 'images/Screenshot 2026-07-11 202827.png', caption: 'Ad Creative & Placement' },
        { src: 'images/Screenshot 2026-07-11 202849.png', caption: 'Budget & Bid Strategy' },
        { src: 'images/Screenshot 2026-07-11 202905.png', caption: 'Kinclong Modal 150rb — CPL Rp2.439' },
        { src: 'images/Screenshot 2026-07-11 203725.png', caption: 'Data Comparison: Februari vs Maret' },
        { src: 'images/Screenshot 2026-07-11 203905.png', caption: 'Mudik Jauh — ROAS 10.12x' },
      ]
    }
  };
  const modal = document.getElementById('portfolioModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalCaption = document.getElementById('modalCaption');
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const modalClose = document.getElementById('modalClose');
  let currentSlide = 0;
  let totalSlides = 0;

  function openModal(galleryKey) {
    var data = galleryData[galleryKey];
    if (!data || data.images.length === 0) {
      modalTitle.textContent = data ? data.title : 'Detail';
      modalSubtitle.textContent = data ? data.subtitle : '';
      carouselTrack.innerHTML = '<div style="padding:40px;text-align:center;color:var(--white-dim);font-size:0.9rem;">Screenshot belum tersedia.</div>';
      carouselDots.innerHTML = '';
      modalCaption.textContent = '';
      carouselPrev.style.display = 'none';
      carouselNext.style.display = 'none';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      return;
    }
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalCaption.textContent = data.caption;
    carouselTrack.innerHTML = data.images.map(function(img) {
      return '<div class="portfolio-carousel-slide"><img src="' + img.src + '" alt="' + img.caption + '" loading="lazy" /></div>';
    }).join('');
    totalSlides = data.images.length;
    currentSlide = 0;
    carouselDots.innerHTML = data.images.map(function(_, i) {
      return '<button class="portfolio-carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join('');
    carouselPrev.style.display = '';
    carouselNext.style.display = '';
    updateCarousel();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateCarousel();
  }

  function updateCarousel() {
    carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    var dots = carouselDots.querySelectorAll('.portfolio-carousel-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentSlide);
    }
  }

  if (carouselPrev) carouselPrev.addEventListener('click', function() { goToSlide(currentSlide - 1); });
  if (carouselNext) carouselNext.addEventListener('click', function() { goToSlide(currentSlide + 1); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });

  if (carouselDots) carouselDots.addEventListener('click', function(e) {
    var dot = e.target.closest('.portfolio-carousel-dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
  });

  // Swipe support
  var dragStartX = 0;
  var isDragging = false;
  if (carouselTrack) {
    carouselTrack.addEventListener('pointerdown', function(e) {
      isDragging = true;
      dragStartX = e.clientX;
      carouselTrack.setPointerCapture(e.pointerId);
      carouselTrack.style.transition = 'none';
    });
    carouselTrack.addEventListener('pointermove', function(e) {
      if (!isDragging) return;
      var diff = e.clientX - dragStartX;
      var offset = -(currentSlide * 100) + (diff / carouselTrack.offsetWidth * 100);
      carouselTrack.style.transform = 'translateX(' + offset + '%)';
    });
    carouselTrack.addEventListener('pointerup', function(e) {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.style.transition = '';
      var diff = e.clientX - dragStartX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff < 0 ? currentSlide + 1 : currentSlide - 1);
      } else {
        updateCarousel();
      }
    });
  }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  // Bind detail buttons
  var detailBtns = document.querySelectorAll('.portfolio-detail-btn[data-gallery]');
  for (var i = 0; i < detailBtns.length; i++) {
    detailBtns[i].addEventListener('click', function() { openModal(this.dataset.gallery); });
  }
})();


// ========== PORTFOLIO MODAL + CAROUSEL ==========
(function() {
  const galleryData = {
    autoglaze: {
      title: 'Autoglaze — Meta Ads Multi-Campaign Management',
      subtitle: 'Full-funnel Meta Ads: Awareness, Traffic, Conversion',
      caption: 'Geser atau klik panah untuk melihat bukti kampanye',
      images: [
        { src: 'images/Screenshot 2026-07-11 202432.png', caption: 'Campaign Overview' },
        { src: 'images/Screenshot 2026-07-11 202532.png', caption: 'Campaign Performance' },
        { src: 'images/Screenshot 2026-07-11 202744.png', caption: 'Audience & Targeting' },
        { src: 'images/Screenshot 2026-07-11 202827.png', caption: 'Ad Creative & Placement' },
        { src: 'images/Screenshot 2026-07-11 202849.png', caption: 'Budget & Bid Strategy' },
        { src: 'images/Screenshot 2026-07-11 202905.png', caption: 'Kinclong Modal 150rb — CPL Rp2.439' },
        { src: 'images/Screenshot 2026-07-11 203725.png', caption: 'Data Comparison: Februari vs Maret' },
        { src: 'images/Screenshot 2026-07-11 203905.png', caption: 'Mudik Jauh — ROAS 10.12x' },
      ]
    }
  };
  const modal = document.getElementById('portfolioModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalCaption = document.getElementById('modalCaption');
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const modalClose = document.getElementById('modalClose');
  let currentSlide = 0;
  let totalSlides = 0;

  function openModal(galleryKey) {
    var data = galleryData[galleryKey];
    if (!data || data.images.length === 0) {
      modalTitle.textContent = data ? data.title : 'Detail';
      modalSubtitle.textContent = data ? data.subtitle : '';
      carouselTrack.innerHTML = '<div style="padding:40px;text-align:center;color:var(--white-dim);font-size:0.9rem;">Screenshot belum tersedia.</div>';
      carouselDots.innerHTML = '';
      modalCaption.textContent = '';
      carouselPrev.style.display = 'none';
      carouselNext.style.display = 'none';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      return;
    }
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalCaption.textContent = data.caption;
    carouselTrack.innerHTML = data.images.map(function(img) {
      return '<div class="portfolio-carousel-slide"><img src="' + img.src + '" alt="' + img.caption + '" loading="lazy" /></div>';
    }).join('');
    totalSlides = data.images.length;
    currentSlide = 0;
    carouselDots.innerHTML = data.images.map(function(_, i) {
      return '<button class="portfolio-carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join('');
    carouselPrev.style.display = '';
    carouselNext.style.display = '';
    updateCarousel();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateCarousel();
  }

  function updateCarousel() {
    carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    var dots = carouselDots.querySelectorAll('.portfolio-carousel-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentSlide);
    }
  }

  if (carouselPrev) carouselPrev.addEventListener('click', function() { goToSlide(currentSlide - 1); });
  if (carouselNext) carouselNext.addEventListener('click', function() { goToSlide(currentSlide + 1); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });

  if (carouselDots) carouselDots.addEventListener('click', function(e) {
    var dot = e.target.closest('.portfolio-carousel-dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
  });

  // Swipe support
  var dragStartX = 0;
  var isDragging = false;
  if (carouselTrack) {
    carouselTrack.addEventListener('pointerdown', function(e) {
      isDragging = true;
      dragStartX = e.clientX;
      carouselTrack.setPointerCapture(e.pointerId);
      carouselTrack.style.transition = 'none';
    });
    carouselTrack.addEventListener('pointermove', function(e) {
      if (!isDragging) return;
      var diff = e.clientX - dragStartX;
      var offset = -(currentSlide * 100) + (diff / carouselTrack.offsetWidth * 100);
      carouselTrack.style.transform = 'translateX(' + offset + '%)';
    });
    carouselTrack.addEventListener('pointerup', function(e) {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.style.transition = '';
      var diff = e.clientX - dragStartX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff < 0 ? currentSlide + 1 : currentSlide - 1);
      } else {
        updateCarousel();
      }
    });
  }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  // Bind detail buttons
  var detailBtns = document.querySelectorAll('.portfolio-detail-btn[data-gallery]');
  for (var i = 0; i < detailBtns.length; i++) {
    detailBtns[i].addEventListener('click', function() { openModal(this.dataset.gallery); });
  }
})();


// ========== PORTFOLIO MODAL + CAROUSEL ==========
(function() {
  const galleryData = {
    autoglaze: {
      title: 'Autoglaze — Meta Ads Multi-Campaign Management',
      subtitle: 'Full-funnel Meta Ads: Awareness, Traffic, Conversion',
      caption: 'Geser atau klik panah untuk melihat bukti kampanye',
      images: [
        { src: 'images/Screenshot 2026-07-11 202432.png', caption: 'Campaign Overview' },
        { src: 'images/Screenshot 2026-07-11 202532.png', caption: 'Campaign Performance' },
        { src: 'images/Screenshot 2026-07-11 202744.png', caption: 'Audience & Targeting' },
        { src: 'images/Screenshot 2026-07-11 202827.png', caption: 'Ad Creative & Placement' },
        { src: 'images/Screenshot 2026-07-11 202849.png', caption: 'Budget & Bid Strategy' },
        { src: 'images/Screenshot 2026-07-11 202905.png', caption: 'Kinclong Modal 150rb — CPL Rp2.439' },
        { src: 'images/Screenshot 2026-07-11 203725.png', caption: 'Data Comparison: Februari vs Maret' },
        { src: 'images/Screenshot 2026-07-11 203905.png', caption: 'Mudik Jauh — ROAS 10.12x' },
      ]
    }
  };
  const modal = document.getElementById('portfolioModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalCaption = document.getElementById('modalCaption');
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const modalClose = document.getElementById('modalClose');
  let currentSlide = 0;
  let totalSlides = 0;

  function openModal(galleryKey) {
    var data = galleryData[galleryKey];
    if (!data || data.images.length === 0) {
      modalTitle.textContent = data ? data.title : 'Detail';
      modalSubtitle.textContent = data ? data.subtitle : '';
      carouselTrack.innerHTML = '<div style="padding:40px;text-align:center;color:var(--white-dim);font-size:0.9rem;">Screenshot belum tersedia.</div>';
      carouselDots.innerHTML = '';
      modalCaption.textContent = '';
      carouselPrev.style.display = 'none';
      carouselNext.style.display = 'none';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      return;
    }
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalCaption.textContent = data.caption;
    carouselTrack.innerHTML = data.images.map(function(img) {
      return '<div class="portfolio-carousel-slide"><img src="' + img.src + '" alt="' + img.caption + '" loading="lazy" /></div>';
    }).join('');
    totalSlides = data.images.length;
    currentSlide = 0;
    carouselDots.innerHTML = data.images.map(function(_, i) {
      return '<button class="portfolio-carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join('');
    carouselPrev.style.display = '';
    carouselNext.style.display = '';
    updateCarousel();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateCarousel();
  }

  function updateCarousel() {
    carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    var dots = carouselDots.querySelectorAll('.portfolio-carousel-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentSlide);
    }
  }

  if (carouselPrev) carouselPrev.addEventListener('click', function() { goToSlide(currentSlide - 1); });
  if (carouselNext) carouselNext.addEventListener('click', function() { goToSlide(currentSlide + 1); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });

  if (carouselDots) carouselDots.addEventListener('click', function(e) {
    var dot = e.target.closest('.portfolio-carousel-dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
  });

  // Swipe support
  var dragStartX = 0;
  var isDragging = false;
  if (carouselTrack) {
    carouselTrack.addEventListener('pointerdown', function(e) {
      isDragging = true;
      dragStartX = e.clientX;
      carouselTrack.setPointerCapture(e.pointerId);
      carouselTrack.style.transition = 'none';
    });
    carouselTrack.addEventListener('pointermove', function(e) {
      if (!isDragging) return;
      var diff = e.clientX - dragStartX;
      var offset = -(currentSlide * 100) + (diff / carouselTrack.offsetWidth * 100);
      carouselTrack.style.transform = 'translateX(' + offset + '%)';
    });
    carouselTrack.addEventListener('pointerup', function(e) {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.style.transition = '';
      var diff = e.clientX - dragStartX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff < 0 ? currentSlide + 1 : currentSlide - 1);
      } else {
        updateCarousel();
      }
    });
  }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  // Bind detail buttons
  var detailBtns = document.querySelectorAll('.portfolio-detail-btn[data-gallery]');
  for (var i = 0; i < detailBtns.length; i++) {
    detailBtns[i].addEventListener('click', function() { openModal(this.dataset.gallery); });
  }
})();


// ========== PORTFOLIO MODAL + CAROUSEL ==========
(function() {
  const galleryData = {
    autoglaze: {
      title: 'Autoglaze — Meta Ads Multi-Campaign Management',
      subtitle: 'Full-funnel Meta Ads: Awareness, Traffic, Conversion',
      caption: 'Geser atau klik panah untuk melihat bukti kampanye',
      images: [
        { src: 'images/Screenshot 2026-07-11 202432.png', caption: 'Campaign Overview' },
        { src: 'images/Screenshot 2026-07-11 202532.png', caption: 'Campaign Performance' },
        { src: 'images/Screenshot 2026-07-11 202744.png', caption: 'Audience & Targeting' },
        { src: 'images/Screenshot 2026-07-11 202827.png', caption: 'Ad Creative & Placement' },
        { src: 'images/Screenshot 2026-07-11 202849.png', caption: 'Budget & Bid Strategy' },
        { src: 'images/Screenshot 2026-07-11 202905.png', caption: 'Kinclong Modal 150rb — CPL Rp2.439' },
        { src: 'images/Screenshot 2026-07-11 203725.png', caption: 'Data Comparison: Februari vs Maret' },
        { src: 'images/Screenshot 2026-07-11 203905.png', caption: 'Mudik Jauh — ROAS 10.12x' },
      ]
    }
  };
  const modal = document.getElementById('portfolioModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalCaption = document.getElementById('modalCaption');
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const modalClose = document.getElementById('modalClose');
  let currentSlide = 0;
  let totalSlides = 0;

  function openModal(galleryKey) {
    var data = galleryData[galleryKey];
    if (!data || data.images.length === 0) {
      modalTitle.textContent = data ? data.title : 'Detail';
      modalSubtitle.textContent = data ? data.subtitle : '';
      carouselTrack.innerHTML = '<div style="padding:40px;text-align:center;color:var(--white-dim);font-size:0.9rem;">Screenshot belum tersedia.</div>';
      carouselDots.innerHTML = '';
      modalCaption.textContent = '';
      carouselPrev.style.display = 'none';
      carouselNext.style.display = 'none';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      return;
    }
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalCaption.textContent = data.caption;
    carouselTrack.innerHTML = data.images.map(function(img) {
      return '<div class="portfolio-carousel-slide"><img src="' + img.src + '" alt="' + img.caption + '" loading="lazy" /></div>';
    }).join('');
    totalSlides = data.images.length;
    currentSlide = 0;
    carouselDots.innerHTML = data.images.map(function(_, i) {
      return '<button class="portfolio-carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join('');
    carouselPrev.style.display = '';
    carouselNext.style.display = '';
    updateCarousel();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateCarousel();
  }

  function updateCarousel() {
    carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    var dots = carouselDots.querySelectorAll('.portfolio-carousel-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentSlide);
    }
  }

  if (carouselPrev) carouselPrev.addEventListener('click', function() { goToSlide(currentSlide - 1); });
  if (carouselNext) carouselNext.addEventListener('click', function() { goToSlide(currentSlide + 1); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });

  if (carouselDots) carouselDots.addEventListener('click', function(e) {
    var dot = e.target.closest('.portfolio-carousel-dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
  });

  // Swipe support
  var dragStartX = 0;
  var isDragging = false;
  if (carouselTrack) {
    carouselTrack.addEventListener('pointerdown', function(e) {
      isDragging = true;
      dragStartX = e.clientX;
      carouselTrack.setPointerCapture(e.pointerId);
      carouselTrack.style.transition = 'none';
    });
    carouselTrack.addEventListener('pointermove', function(e) {
      if (!isDragging) return;
      var diff = e.clientX - dragStartX;
      var offset = -(currentSlide * 100) + (diff / carouselTrack.offsetWidth * 100);
      carouselTrack.style.transform = 'translateX(' + offset + '%)';
    });
    carouselTrack.addEventListener('pointerup', function(e) {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.style.transition = '';
      var diff = e.clientX - dragStartX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff < 0 ? currentSlide + 1 : currentSlide - 1);
      } else {
        updateCarousel();
      }
    });
  }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  // Bind detail buttons
  var detailBtns = document.querySelectorAll('.portfolio-detail-btn[data-gallery]');
  for (var i = 0; i < detailBtns.length; i++) {
    detailBtns[i].addEventListener('click', function() { openModal(this.dataset.gallery); });
  }
})();

// ==============================
// REPORT MODAL + CAROUSEL
// ==============================
const REPORTS = {
  autoglaze: [
    { src: "images/Screenshot 2026-07-11 202432.png", caption: "Campaign bundling product yang mengarahkan langsung ke link produk Shopee. Dari hasil iklan ini mendapatkan penjualan ±1.500.000, ROAS yang didapat 10x." },
    { src: "images/Screenshot 2026-07-11 202532.png", caption: "Campaign Awareness layanan detailing mobil menjangkau biaya per hasil termurah dengan mendapatkan jangkauan 170rb++." },
    { src: "images/Screenshot 2026-07-11 202744.png", caption: "Campaign PPF/pelindung bodi mobil dengan value 20-40 juta, mendapatkan 121 pesan ke sales dan closing 4 customer." },
    { src: "images/Screenshot 2026-07-11 202827.png", caption: "Campaign layanan membership value 900 rb - 1,8 juta, mendapatkan 266 pesan ke sales dan closing sekitar 30 juta." },
    { src: "images/Screenshot 2026-07-11 202849.png", caption: "Campaign membership dengan value 900 rb mendapatkan 65 leads prospek, dengan closing 39 customer." },
    { src: "images/Screenshot 2026-07-11 202905.png", caption: "Campaign Awareness Kemitraan dengan value 100 juta++, menjangkau lebih dari 500rb++ orang dan closing 1 customer." }
  ]
};

(function () {
  const modal = document.getElementById('reportModal');
  const track = document.getElementById('reportTrack');
  const caption = document.getElementById('reportCaption');
  const dots = document.getElementById('reportDots');
  const prevBtn = document.getElementById('reportPrev');
  const nextBtn = document.getElementById('reportNext');
  if (!modal || !track) return;

  let slides = [];
  let index = 0;

  function render(reportKey) {
    slides = REPORTS[reportKey] || [];
    index = 0;
    track.innerHTML = '';
    dots.innerHTML = '';
    slides.forEach((sl, i) => {
      const slide = document.createElement('div');
      slide.className = 'report-slide';
      const fig = document.createElement('figure');
      fig.className = 'report-slide__fig' + (sl.blur ? ' blur-pii' : '');
      const img = document.createElement('img');
      img.src = sl.src;
      img.alt = 'Screenshot laporan ' + (i + 1);
      img.loading = 'lazy';
      fig.appendChild(img);
      slide.appendChild(fig);
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'report-dot';
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => go(i));
      dots.appendChild(dot);
    });
    update();
  }

  function update() {
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    caption.textContent = slides[index].caption;
    Array.from(dots.children).forEach((d, i) =>
      d.classList.toggle('active', i === index)
    );
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = index === slides.length - 1 ? 'hidden' : 'visible';
  }

  function go(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    update();
  }

  function open(reportKey) {
    render(reportKey);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-report]').forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.report));
  });
  modal.querySelectorAll('[data-close]').forEach(el =>
    el.addEventListener('click', close)
  );
  prevBtn.addEventListener('click', () => go(index - 1));
  nextBtn.addEventListener('click', () => go(index + 1));

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') go(index + 1);
    else if (e.key === 'ArrowLeft') go(index - 1);
  });

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
