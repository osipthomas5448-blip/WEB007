/* ============================================================
   NexPress — Global JavaScript
   Handles: Navbar, Search, CTA Modal, Cookie Banner, FAQ, Reveals
   ============================================================ */

// ---- Navbar Scroll Effect ----
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---- Hamburger / Mobile Menu ----
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
})();

// ---- Active Nav Link ----
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(path)) link.classList.add('active');
  });
})();

// Search feature removed — overlay and handlers deleted

// ---- CTA Modal ----
(function () {
  function initCtaModal() {
    const overlay = document.getElementById('ctaModal');
    if (!overlay) return;
    const modal = overlay.querySelector('.modal');
    const closeBtn = document.getElementById('modalClose');
    const form = document.getElementById('ctaForm');
    const submitBtn = document.getElementById('ctaSubmit');
    const consentBox = document.getElementById('ctaConsent');
    const successView = document.getElementById('ctaSuccess');
    const formView = document.getElementById('ctaFormView');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    function openModal(title, desc) {
      if (title && modalTitle) modalTitle.textContent = title;
      if (desc && modalDesc) modalDesc.textContent = desc;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (formView) formView.style.display = '';
      if (successView) successView.style.display = 'none';
      if (form) form.reset();
      if (submitBtn) submitBtn.disabled = true;
    }
    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Open from any [data-cta] button (delegated)
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-cta]');
      if (btn) {
        e.preventDefault();
        const title = btn.dataset.ctaTitle || 'Get Exclusive Insights';
        const desc  = btn.dataset.ctaDesc  || 'Join thousands of executives and business leaders who receive our premium analysis.';
        openModal(title, desc);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Consent gate
    if (consentBox && submitBtn) {
      consentBox.addEventListener('change', () => {
        submitBtn.disabled = !consentBox.checked;
      });
    }

    // Form submit
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!consentBox || !consentBox.checked) return;
        if (formView) formView.style.display = 'none';
        if (successView) successView.style.display = 'block';
      });
    }
  }

  // If the modal already exists, init immediately; otherwise wait for pageshell to inject it
  if (document.getElementById('ctaModal')) {
    initCtaModal();
  } else {
    document.addEventListener('pageshell:ready', initCtaModal, { once: true });
  }
})();

// ---- FAQ Accordion ----
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ---- Scroll Reveal ----
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

(function () {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
})();

// ---- Footer & Strip Newsletter ----
(function () {
  // Handle both footer newsletter and top/bottom newsletter strips
  document.querySelectorAll('.footer-newsletter-form, .newsletter-strip-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      if (!input) return;
      // Simple client-side behaviour: clear input and show a temporary success state
      if (input.value.trim()) {
        input.value = '';
        if (btn) {
          const orig = btn.textContent;
          btn.textContent = '✓ Subscribed!';
          btn.disabled = true;
          setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
        }
      }
    });
  });
})();
