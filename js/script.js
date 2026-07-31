document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const goTopBtn = document.getElementById('goTop');
  const pageLoader = document.getElementById('pageLoader');

  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 800);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (goTopBtn) {
      if (window.scrollY > 500) {
        goTopBtn.classList.add('visible');
      } else {
        goTopBtn.classList.remove('visible');
      }
    }
  });

  if (hamburger && navLinks) {
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    const setMenu = (open) => {
      hamburger.classList.toggle('active', open);
      navLinks.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
      document.documentElement.classList.toggle('no-scroll', open);
      if (window.lenis) {
        if (open) window.lenis.stop();
        else window.lenis.start();
      }
    };
    hamburger.addEventListener('click', () => {
      setMenu(!navLinks.classList.contains('active'));
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  if (goTopBtn) {
    goTopBtn.addEventListener('click', () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const classes = ['fade-in-up', 'fade-in-left', 'fade-in-right', 'scale-in', 'bounce-in'];
        classes.forEach(cls => {
          if (el.classList.contains(cls)) {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = '';
            el.classList.add(cls);
          }
        });
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  const counters = document.querySelectorAll('.count');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            return;
          }
          el.textContent = current;
          requestAnimationFrame(updateCounter);
        };
        updateCounter();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const errorEl = document.getElementById('contactError');
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const setError = (msg) => {
        errorEl.querySelector('span').textContent = msg;
        errorEl.style.display = 'flex';
      };
      if (!name) return setError('Please enter your full name.');
      if (!email) return setError('Please enter your email address.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please enter a valid email address.');
      if (!message) return setError('Please enter your message.');
      errorEl.style.display = 'none';
      window.location.href = '404.html';
    });
  }

  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#22c55e';
      input.value = '';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2500);
    });
  });

  const categoryBtns = document.querySelectorAll('.blog-category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

});
