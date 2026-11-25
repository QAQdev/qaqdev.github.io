/**
 * Site interactive modules (zero dependencies):
 * - Theme switcher (light / dark with localStorage + system preference)
 * - Mobile navigation drawer
 * - Publication figure slideshows
 * - Full-screen image lightbox
 * - Automatic >2-line author list clamping & expand/collapse
 * - Live GitHub star counts with sessionStorage caching
 */
(function () {
  'use strict';

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileNav();
    initSlideshows();
    initLightbox();
    initAuthorClamp();
    initGitHubStars();
    initEmailCopy();
    initSmoothScroll();
  });

  /* 1. Theme Switcher */
  function initTheme() {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    var root = document.documentElement;
    var sunIcon = toggle.querySelector('.theme-icon-sun');
    var moonIcon = toggle.querySelector('.theme-icon-moon');

    function getTheme() {
      return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function applyTheme(theme, persist) {
      root.setAttribute('data-theme', theme);
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      if (sunIcon) sunIcon.style.display = isDark ? 'inline-block' : 'none';
      if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'inline-block';

      if (persist) {
        try {
          localStorage.setItem('site-theme', theme);
        } catch (e) {}
      }
    }

    applyTheme(getTheme(), false);

    toggle.addEventListener('click', function () {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
    });

    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onSystemChange = function (e) {
        try {
          if (!localStorage.getItem('site-theme')) {
            applyTheme(e.matches ? 'dark' : 'light', false);
          }
        } catch (err) {}
      };
      if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    }
  }

  /* 2. Mobile Navigation Drawer */
  function initMobileNav() {
    var btn = document.getElementById('menu-toggle');
    var drawer = document.getElementById('mobile-nav');
    if (!btn || !drawer) return;

    function setOpen(open) {
      drawer.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function () {
      setOpen(!drawer.classList.contains('is-open'));
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) setOpen(false);
    });
  }

  /* 3. Publication Slideshows */
  function initSlideshows() {
    document.querySelectorAll('[data-slideshow]').forEach(function (container) {
      var slides = Array.prototype.slice.call(container.querySelectorAll('.slide-item'));
      if (slides.length <= 1) return;

      var dots = Array.prototype.slice.call(container.querySelectorAll('.slide-dot'));
      var prevBtn = container.querySelector('.slide-prev');
      var nextBtn = container.querySelector('.slide-next');
      var counter = container.querySelector('.slide-counter');
      var current = 0;
      var timer = null;

      function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
          slide.classList.toggle('is-active', i === current);
        });
        dots.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === current);
          dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        });
        if (counter) {
          counter.textContent = current + 1 + ' / ' + slides.length;
        }
      }

      function stop() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      function start() {
        stop();
        if (prefersReducedMotion) return;
        timer = setInterval(function () {
          show(current + 1);
        }, 5500);
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          show(current - 1);
          start();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          show(current + 1);
          start();
        });
      }

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function (e) {
          e.stopPropagation();
          show(i);
          start();
        });
      });

      container.addEventListener('mouseenter', stop);
      container.addEventListener('mouseleave', start);
      show(0);
      start();
    });
  }

  /* 4. Lightbox Viewer */
  function initLightbox() {
    var modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    var modalImg = modal.querySelector('.lightbox-img');
    var modalCaption = modal.querySelector('.lightbox-caption');
    var closeBtn = modal.querySelector('.lightbox-close');
    var prevBtn = modal.querySelector('.lightbox-prev');
    var nextBtn = modal.querySelector('.lightbox-next');

    var items = [];
    var index = 0;
    var lastFocused = null;

    function render() {
      var item = items[index];
      if (!item) return;
      modalImg.src = item.src;
      modalImg.alt = item.alt;
      modalCaption.textContent = item.caption;
      var multi = items.length > 1;
      prevBtn.style.display = multi ? 'flex' : 'none';
      nextBtn.style.display = multi ? 'flex' : 'none';
    }

    function open(groupContainer) {
      var imgs = Array.prototype.slice.call(groupContainer.querySelectorAll('img[data-zoomable]'));
      if (!imgs.length) return;

      var activeIndex = imgs.findIndex(function (img) {
        var slide = img.closest('.slide-item');
        return slide ? slide.classList.contains('is-active') : true;
      });
      if (activeIndex < 0) activeIndex = 0;

      items = imgs.map(function (img) {
        return {
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt') || '',
          caption: img.getAttribute('data-caption') || img.getAttribute('alt') || ''
        };
      });
      index = activeIndex;
      lastFocused = document.activeElement;
      render();
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    document.querySelectorAll('[data-lightbox-group]').forEach(function (group) {
      var stage = group.querySelector('.pub-media__stage');
      var zoomBtn = group.querySelector('.media-zoom');
      if (stage) {
        stage.addEventListener('click', function () {
          open(group);
        });
      }
      if (zoomBtn) {
        zoomBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          open(group);
        });
      }
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      index = (index - 1 + items.length) % items.length;
      render();
    });
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      index = (index + 1) % items.length;
      render();
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft' && items.length > 1) {
        index = (index - 1 + items.length) % items.length;
        render();
      }
      if (e.key === 'ArrowRight' && items.length > 1) {
        index = (index + 1) % items.length;
        render();
      }
    });
  }

  /* 5. Automatic >2-Line Author List Clamping */
  function initAuthorClamp() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('[data-author-clamp]'));
    if (!blocks.length) return;

    function measure(block) {
      var text = block.querySelector('.pub-authors__text');
      if (!text) return;
      var wasExpanded = block.classList.contains('is-expanded');
      if (wasExpanded) block.classList.remove('is-expanded');

      var overflows = text.scrollHeight > text.clientHeight + 2;
      block.classList.toggle('is-collapsible', overflows);

      if (wasExpanded && overflows) {
        block.classList.add('is-expanded');
      }
    }

    function measureAll() {
      blocks.forEach(measure);
    }

    blocks.forEach(function (block) {
      var btn = block.querySelector('.authors-toggle');
      var total = block.getAttribute('data-author-count') || '';
      if (!btn) return;

      btn.addEventListener('click', function () {
        var expanded = block.classList.toggle('is-expanded');
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        btn.textContent = expanded ? 'Show fewer' : 'Show all ' + total + ' authors';
      });
    });

    measureAll();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAll);
    }

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureAll, 120);
    });
  }

  /* 6. Live GitHub Stars with Session Cache */
  function initGitHubStars() {
    var badges = Array.prototype.slice.call(document.querySelectorAll('[data-github-stars]'));
    if (!badges.length || !window.fetch) return;

    var CACHE_TTL_MS = 15 * 60 * 1000;
    var repoMap = {};

    badges.forEach(function (el) {
      var repo = el.getAttribute('data-github-stars');
      if (!repo) return;
      if (!repoMap[repo]) repoMap[repo] = [];
      repoMap[repo].push(el);
    });

    function formatStars(count) {
      if (count >= 1000) {
        return (count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
      }
      return String(count);
    }

    function renderRepo(repo, valueText, titleText) {
      if (!valueText) return;
      (repoMap[repo] || []).forEach(function (el) {
        var countNode = el.querySelector('.pill-stars__count');
        if (countNode) countNode.textContent = valueText;
        el.setAttribute('title', titleText || valueText + ' GitHub stars');
        el.classList.add('is-loaded');
      });
    }

    function saveCache(cacheKey, valueText, titleText) {
      try {
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({ value: valueText, title: titleText, ts: Date.now() })
        );
      } catch (e) {}
    }

    function fetchFromGitHubApi(repo, cacheKey) {
      return fetch('https://api.github.com/repos/' + repo, {
        headers: { Accept: 'application/vnd.github+json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('GitHub API ' + res.status);
          return res.json();
        })
        .then(function (data) {
          if (data && typeof data.stargazers_count === 'number') {
            var formatted = formatStars(data.stargazers_count);
            var title = data.stargazers_count.toLocaleString() + ' GitHub stars';
            renderRepo(repo, formatted, title);
            saveCache(cacheKey, formatted, title);
          }
        });
    }

    Object.keys(repoMap).forEach(function (repo) {
      var cacheKey = 'gh-stars:' + repo;
      try {
        var raw = sessionStorage.getItem(cacheKey);
        if (raw) {
          var cached = JSON.parse(raw);
          if (cached && cached.value && Date.now() - cached.ts < CACHE_TTL_MS) {
            renderRepo(repo, cached.value, cached.title);
            return;
          }
        }
      } catch (e) {}

      /* Primary: Shields.io JSON endpoint (avoids unauthenticated GitHub 403 rate limits) */
      fetch('https://img.shields.io/github/stars/' + repo + '.json')
        .then(function (res) {
          if (!res.ok) throw new Error('Shields ' + res.status);
          return res.json();
        })
        .then(function (data) {
          if (data && data.value && data.value !== 'repo not found' && data.value !== 'inaccessible') {
            var title = data.value + ' GitHub stars';
            renderRepo(repo, data.value, title);
            saveCache(cacheKey, data.value, title);
            return;
          }
          return fetchFromGitHubApi(repo, cacheKey);
        })
        .catch(function () {
          return fetchFromGitHubApi(repo, cacheKey).catch(function () {
            /* Gracefully stay hidden if offline */
          });
        });
    });
  }

  /* 7. Copy Email on Click (keeps native mailto: while giving instant fallback) */
  function initEmailCopy() {
    document.querySelectorAll('[data-copy-email]').forEach(function (link) {
      var email = link.getAttribute('data-copy-email');
      var handle = link.querySelector('.social-handle');
      var label = link.querySelector('span:not(.social-handle)');
      var origHandle = handle ? handle.textContent : '';
      var origLabel = label ? label.textContent : '';
      var resetTimer = null;

      link.addEventListener('click', function () {
        if (!email) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).catch(function () {});
        }
        var handleVisible = handle && window.getComputedStyle(handle).display !== 'none';
        link.classList.add('is-copied');
        if (handleVisible) {
          handle.textContent = 'Copied ✓';
        } else if (label) {
          label.textContent = 'Copied ✓';
        }
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          link.classList.remove('is-copied');
          if (handle) handle.textContent = origHandle;
          if (label) label.textContent = origLabel;
        }, 2000);
      });
    });
  }

  /* 8. Smooth Same-Page Anchor Scrolling */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        if (history.replaceState) {
          history.replaceState(null, '', '#' + id);
        }
      });
    });
  }
})();
