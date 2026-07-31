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
      const btn = contactForm.querySelector('.btn-primary');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 2500);
      }, 1500);
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
