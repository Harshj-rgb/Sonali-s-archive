/* ═══════════════════════════════════════════════
   THE SONALI'S ARCHIVE — INTERACTIVE SCRIPTS
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── THEME TOGGLE ── */
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const html = document.documentElement;

  // Restore saved theme or default to light
  const savedTheme = localStorage.getItem('sonali-archive-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('sonali-archive-theme', next);
      updateThemeButton(next);
    });
  }

  function updateThemeButton(theme) {
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('svg');
    const label = themeBtn.querySelector('span');
    if (theme === 'dark') {
      if (icon) {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      }
      if (label) label.textContent = 'Appearance';
      themeBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      if (icon) {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
      }
      if (label) label.textContent = 'Appearance';
      themeBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }


  /* ── TABLE OF CONTENTS TOGGLE ── */
  const tocToggle = document.getElementById('tocToggle');
  const tocList = document.getElementById('tocList');

  if (tocToggle && tocList) {
    tocToggle.addEventListener('click', function () {
      const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        tocList.classList.add('collapsed');
        tocToggle.textContent = 'show';
        tocToggle.setAttribute('aria-expanded', 'false');
      } else {
        tocList.classList.remove('collapsed');
        tocToggle.textContent = 'hide';
        tocToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }


  /* ── ACTIVE TAB TRACKING (scroll spy) ── */
  const tabs = document.querySelectorAll('.mw-tab');
  const sections = [];

  tabs.forEach(function (tab) {
    const href = tab.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.getElementById(href.substring(1));
      if (target) {
        sections.push({ el: target, tab: tab });
      }
    }
  });

  function updateActiveTab() {
    const scrollY = window.scrollY + 100;
    let activeSection = null;

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].el.offsetTop <= scrollY) {
        activeSection = sections[i];
        break;
      }
    }

    tabs.forEach(function (t) { t.classList.remove('active'); });
    if (activeSection) {
      activeSection.tab.classList.add('active');
    } else if (tabs.length > 0) {
      tabs[0].classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab();


  /* ── REVEAL ON SCROLL ── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }


  /* ── MOOD TEXT ── */
  const moodEl = document.getElementById('moodText');
  if (moodEl) {
    const moods = [
      'Probably thinking about coffee ☕',
      'Quietly plotting something sweet 🫶',
      'Monsoon vibes 🌧️',
      'Sending silent orders to Harsh 📋',
      'Being effortlessly caring 💛',
      'Currently the main character ✨',
      'Evaluating a café atmosphere 👀',
      'Listening to a love song 🎵',
      'Threatening to leave (she won\'t) 😤',
      'Making someone feel lucky 🍀'
    ];
    const hour = new Date().getHours();
    const moodIndex = hour % moods.length;
    moodEl.textContent = moods[moodIndex];
  }


  /* ── LAST UPDATED DATE ── */
  const lastUpdatedEl = document.getElementById('lastUpdated');
  if (lastUpdatedEl) {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    lastUpdatedEl.textContent = now.toLocaleDateString('en-GB', options);
  }


  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without jumping
        history.replaceState(null, '', '#' + targetId);
      }
    });
  });

})();
