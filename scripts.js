// ============================================================
//  Jon Steger Portfolio – scripts.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger Menu ─────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ── Scroll-based nav transparency ──────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(5, 13, 26, 0.97)';
      } else {
        nav.style.background = 'rgba(5, 13, 26, 0.88)';
      }
    }, { passive: true });
  }

  // ── Active nav link (index page) ───────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const observerOptions = { rootMargin: '-40% 0px -55% 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
  }

  // ── Fade-in on scroll ──────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = i * 80;
      fadeObserver.observe(el);
    });

    // Also immediately reveal anything already in the viewport on load
    setTimeout(() => {
      fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }, 100);
  }

  // ── Contact form handler ────────────────────────────────────
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message sent ✓';
      btn.style.background = 'linear-gradient(90deg, #0a7a3a, #00d48a)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  // ── Typewriter effect for hero role ────────────────────────
  const typeEl = document.querySelector('.typewriter');
  if (typeEl) {
    const words = ['DevOps Engineer', 'Cloud Architect', 'CI/CD Specialist', 'SRE Practitioner', 'Platform Engineer'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const word = words[wordIdx];
      typeEl.textContent = deleting
        ? word.substring(0, charIdx--)
        : word.substring(0, charIdx++);

      let delay = deleting ? 60 : 100;

      if (!deleting && charIdx > word.length) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIdx < 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        charIdx = 0;
        delay = 400;
      }

      setTimeout(type, delay);
    }
    type();
  }

  // ── Smooth scroll for all anchor links ─────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Skill tag hover ripple ──────────────────────────────────
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-3px) scale(1.04)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });

});
