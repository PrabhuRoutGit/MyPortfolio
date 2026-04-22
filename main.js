/* ============================
   PORTFOLIO JAVASCRIPT
   Priyam Prabhu Rout
============================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

document.querySelectorAll('.nav-links a, .nav-cta').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('open'));
});

// ---- Animated counter ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// ---- Intersection Observer ----
const observerOptions = { threshold: 0.15 };

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.disconnect();
    }
  });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// Skill bars
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      card.classList.add('visible');
      const fill = card.querySelector('.skill-fill');
      if (fill) {
        const width = fill.dataset.width;
        const delay = parseInt(card.dataset.delay || 0);
        setTimeout(() => {
          fill.style.width = width + '%';
        }, delay + 200);
      }
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// Generic reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Timeline cards reveal
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ${i * 0.15}s ease, transform 0.6s ${i * 0.15}s ease`;
  timelineObserver.observe(card);
});

// About section
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.about-card, .exp-badge').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.7s ${i * 0.15 + 0.1}s ease, transform 0.7s ${i * 0.15 + 0.1}s ease`;
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 50);
        });
      });
    }
  });
}, { threshold: 0.1 });

const aboutVisual = document.querySelector('.about-visual');
if (aboutVisual) aboutObserver.observe(aboutVisual);

// Gallery
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.gallery-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        item.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, i * 80 + 100);
      });
      galleryObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) galleryObserver.observe(galleryGrid);

// ---- Contact form ----
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
      formSuccess.style.display = 'block';
      form.reset();
      btn.textContent = 'Send Message →';
      btn.style.opacity = '1';
      btn.disabled = false;
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }, 1000);
  });
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
});

// ---- Parallax on hero orbs (subtle) ----
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ---- Smooth cursor effect (desktop) ----
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; width: 8px; height: 8px; border-radius: 50%;
    background: #C9A96E; pointer-events: none; z-index: 9999;
    transition: transform 0.1s ease; mix-blend-mode: difference;
  `;
  const cursorRing = document.createElement('div');
  cursorRing.style.cssText = `
    position: fixed; width: 32px; height: 32px; border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.5); pointer-events: none; z-index: 9998;
    transition: transform 0.2s ease, width 0.3s ease, height 0.3s ease;
  `;
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = `${mx - 4}px`;
    cursor.style.top = `${my - 4}px`;
  });

  const animRing = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = `${rx - 16}px`;
    cursorRing.style.top = `${ry - 16}px`;
    requestAnimationFrame(animRing);
  };
  animRing();

  document.querySelectorAll('a, button, .gallery-item, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '50px';
      cursorRing.style.height = '50px';
      cursorRing.style.borderColor = 'rgba(201,169,110,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '32px';
      cursorRing.style.height = '32px';
      cursorRing.style.borderColor = 'rgba(201,169,110,0.5)';
    });
  });
}

console.log('%cPriyam Prabhu Rout — HR Portfolio', 'color: #C9A96E; font-size: 14px; font-weight: bold;');
