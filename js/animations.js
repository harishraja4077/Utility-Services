(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var isDesktop = window.matchMedia('(min-width: 1024px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var lenis = null;
  if (!reduceMotion) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  var goTop = document.getElementById('goTop');
  if (goTop) {
    goTop.addEventListener('click', function (e) {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    });
  }

  var hero = document.getElementById('hero');
  if (!reduceMotion && hero) {
    var heroTl = gsap.timeline({ delay: 0.95, defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.6 }, 0)
      .from('.hero-text .word', { y: 70, rotateX: -45, opacity: 0, duration: 0.85, stagger: 0.09 }, 0.1)
      .from('.hero-sub', { y: 30, opacity: 0, duration: 0.7 }, 0.55)
      .from('.hero-buttons > *', { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.7)
      .from('.hero-stat', { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.82)
      .from('.hero-image-wrapper', { y: 50, opacity: 0, scale: 0.92, duration: 1 }, 0.3)
      .from('.hero-float-card', { y: -18, opacity: 0, duration: 0.5, stagger: 0.12 }, 0.9)
      .from('.hero-scroll', { opacity: 0, duration: 0.6 }, 1.1);

    gsap.to('.hero-content', {
      y: -60,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  function revealEach(els, opts) {
    gsap.utils.toArray(els).forEach(function (el, i) {
      gsap.fromTo(el, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
  }

  if (!reduceMotion) {
    revealEach('[data-reveal]');
    revealEach('.bento-card');
    revealEach('.stat-card');
    revealEach('.flip-card');

    gsap.utils.toArray('[data-stagger]').forEach(function (group) {
      gsap.fromTo(group.children, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: group, start: 'top 80%', once: true }
      });
    });

    var progressLine = document.querySelector('.timeline-progress');
    if (progressLine) {
      gsap.to(progressLine, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-rail',
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: 0.5
        }
      });
    }

    gsap.utils.toArray('.t-step').forEach(function (step, i) {
      var fromX = i % 2 ? 70 : -70;
      gsap.fromTo(step, { opacity: 0, x: fromX }, {
        opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 82%', once: true }
      });
    });
  }

  var mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', function () {
    var track = document.querySelector('.hscroll-inner');
    if (!track) return;

    var getScrollAmount = function () { return track.scrollWidth - window.innerWidth; };

    var tween = gsap.to(track, {
      x: function () { return -getScrollAmount(); },
      ease: 'none',
      scrollTrigger: {
        trigger: '.hscroll-section',
        start: 'top top',
        end: function () { return '+=' + getScrollAmount(); },
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    return function () {
      tween.scrollTrigger.kill();
      tween.kill();
    };
  });

  if (canHover) {
    document.querySelectorAll('.spotlight').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    var ctaSpot = document.querySelector('.cta-spot');
    if (ctaSpot) {
      ctaSpot.addEventListener('mousemove', function (e) {
        var r = ctaSpot.getBoundingClientRect();
        ctaSpot.style.setProperty('--cx', (e.clientX - r.left) + 'px');
        ctaSpot.style.setProperty('--cy', (e.clientY - r.top) + 'px');
      });
    }
  }

  if (canHover && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  if (isDesktop.matches) {
    gsap.to('.hero-image-wrapper', {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
})();
