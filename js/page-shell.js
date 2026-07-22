// Shared navbar/footer/modal/cookie HTML injected into every page
// Each page just calls PageShell.init() after including this script
const PageShell = {
  activePage: '',
  init(activePage) {
    this.activePage = activePage || '';
    this._injectNavbar();
    this._injectModals();
    this._injectFooter();
  },
  _nav(href, label) {
    const active = this.activePage === label ? ' active' : '';
    return `<a href="${href}" class="nav-link${active}">${label}</a>`;
  },
  _mobileNav(href, label) {
    return `<a href="${href}" class="mobile-nav-link">${label}</a>`;
  },
  _injectNavbar() {
    const nav = document.getElementById('siteNavbar');
    if (!nav) return;
    nav.innerHTML = `
      <div class="ticker-bar" aria-label="Market ticker">
        <div class="container"><div class="ticker-inner">
          <span class="ticker-item">S&amp;P 500 <span class="ticker-up">▲ 5,387.42 +0.63%</span></span>
          <span class="ticker-item">NASDAQ <span class="ticker-up">▲ 17,094.35 +0.92%</span></span>
          <span class="ticker-item">DOW <span class="ticker-down">▼ 39,127.14 -0.11%</span></span>
          <span class="ticker-item">10Y Treasury <span class="ticker-up">▲ 4.42%</span></span>
          <span class="ticker-item">Gold <span class="ticker-up">▲ $2,345/oz +0.4%</span></span>
          <span class="ticker-item">WTI Crude <span class="ticker-down">▼ $78.12 -0.5%</span></span>
          <span class="ticker-item">S&amp;P 500 <span class="ticker-up">▲ 5,387.42 +0.63%</span></span>
          <span class="ticker-item">NASDAQ <span class="ticker-up">▲ 17,094.35 +0.92%</span></span>
          <span class="ticker-item">DOW <span class="ticker-down">▼ 39,127.14 -0.11%</span></span>
          <span class="ticker-item">Gold <span class="ticker-up">▲ $2,345/oz +0.4%</span></span>
        </div></div>
      </div>
      <div class="container">
        <div class="navbar-inner">
          <a href="index.html" class="navbar-logo" aria-label="NexPress Home">
            <div class="navbar-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="#fff"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 3h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2z"/></svg>
            </div>
            <span class="navbar-logo-text">Nex<span>Press</span></span>
          </a>
          <nav class="navbar-nav" aria-label="Primary">
            ${this._nav('index.html','Home')}
            ${this._nav('blog.html','Insights')}
            ${this._nav('industry.html','Industry')}
            ${this._nav('blog.html','Blog')}
            ${this._nav('about.html','About')}
            ${this._nav('contact.html','Contact')}
          </nav>
          <div class="navbar-actions">
            <button class="btn btn-primary btn-sm" data-cta>Get Insights</button>
          </div>
          <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        ${this._mobileNav('index.html','Home')}
        ${this._mobileNav('blog.html','Insights')}
        ${this._mobileNav('industry.html','Industry')}
        ${this._mobileNav('blog.html','Blog')}
        ${this._mobileNav('about.html','About')}
        ${this._mobileNav('contact.html','Contact')}
        <div class="mobile-menu-footer">
          <button class="btn btn-primary btn-sm" data-cta>Get Insights</button>
        </div>
      </div>`;
  },
  _injectModals() {
    const wrap = document.getElementById('siteModals');
    if (!wrap) return;
    wrap.innerHTML = `
      
      <div class="modal-overlay" id="ctaModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal">
          <button class="modal-close" id="modalClose" aria-label="Close modal">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div id="ctaFormView">
            <div class="modal-header">
              <div class="modal-eyebrow">NexPress Intelligence</div>
              <h2 class="modal-title" id="modalTitle">Get Exclusive Insights</h2>
              <p class="modal-desc" id="modalDesc">Join 45,000+ executives who rely on NexPress for premium research and business intelligence.</p>
            </div>
            <form class="modal-form" id="ctaForm" novalidate>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label" for="ctaName">Full Name *</label>
                  <input class="form-input" id="ctaName" name="name" type="text" placeholder="Jane Smith" required autocomplete="name">
                </div>
                <div class="form-group">
                  <label class="form-label" for="ctaEmail">Work Email *</label>
                  <input class="form-input" id="ctaEmail" name="email" type="email" placeholder="jane@company.com" required autocomplete="email">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="ctaCompany">Company</label>
                <input class="form-input" id="ctaCompany" name="company" type="text" placeholder="Company name" autocomplete="organization">
              </div>
              <div class="form-group">
                <label class="form-label" for="ctaMessage">What are you looking for?</label>
                <textarea class="form-input" id="ctaMessage" name="message" placeholder="Tell us about your needs…" rows="3"></textarea>
              </div>
              <div class="modal-actions">
                <label class="checkbox-wrap">
                  <input type="checkbox" id="ctaConsent" name="consent" required>
                  <span class="checkbox-label">I agree to the <a href="privacy-policy.html" target="_blank">Privacy Policy</a> and <a href="terms.html" target="_blank">Terms &amp; Conditions</a></span>
                </label>
                <button type="submit" class="btn btn-primary btn-lg" id="ctaSubmit" disabled style="width:100%;justify-content:center;">
                  Send Request
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <p style="font-size:var(--fs-xs);color:var(--c-ink-4);text-align:center;">No spam. Unsubscribe anytime.</p>
              </div>
            </form>
          </div>
          <div class="modal-success" id="ctaSuccess">
            <div class="modal-success-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h3 style="font-family:var(--ff-display);font-size:var(--fs-xl);font-weight:var(--fw-extrabold);color:var(--c-ink);margin-bottom:0.5rem;">You're In!</h3>
            <p style="font-size:var(--fs-sm);color:var(--c-ink-3);line-height:1.6;">Thank you! A team member will be in touch within 24 hours.</p>
          </div>
        </div>
      </div>`;
    // Notify other scripts that PageShell has injected modals
    try { document.dispatchEvent(new Event('pageshell:ready')); } catch (e) { /* ignore */ }
  },
  _injectFooter() {
    const footer = document.getElementById('siteFooter');
    if (!footer) return;
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="navbar-logo">
              <div class="navbar-logo-mark"><svg viewBox="0 0 24 24" fill="#fff"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 3h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2z"/></svg></div>
              <span class="navbar-logo-text" style="color:#E2E8F0">Nex<span>Press</span></span>
            </a>
            <p>Premium business intelligence and research insights for enterprise leaders navigating complex global markets.</p>
          </div>
          <div>
            <h3 class="footer-col-title">Company</h3>
            <nav class="footer-links">
              <a href="about.html" class="footer-link">About NexPress</a>
              <a href="blog.html" class="footer-link">Research</a>
              <a href="industry.html" class="footer-link">Industries</a>
              <a href="contact.html" class="footer-link">Contact Us</a>
            </nav>
          </div>
          <div>
            <h3 class="footer-col-title">Resources</h3>
            <nav class="footer-links">
              <a href="blog.html" class="footer-link">Insights</a>
              <a href="blog.html" class="footer-link">Blog</a>
              <a href="privacy-policy.html" class="footer-link">Privacy Policy</a>
              <a href="terms.html" class="footer-link">Terms &amp; Conditions</a>
              <a href="disclaimer.html" class="footer-link">Disclaimer</a>
              <a href="cookie-policy.html" class="footer-link">Cookie Policy</a>
            </nav>
          </div>
          <div>
            <h3 class="footer-col-title">Stay Informed</h3>
            <p class="footer-newsletter-desc">Weekly intelligence for enterprise leaders. Join 45,000+ subscribers.</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">&copy; 2026 NexPress Intelligence Inc. All rights reserved. | 1250 Connecticut Ave NW, Washington, DC 20036</p>
          <nav class="footer-legal">
            <a href="privacy-policy.html">Privacy</a>
            <a href="terms.html">Terms</a>
            <a href="disclaimer.html">Disclaimer</a>
            <a href="cookie-policy.html">Cookies</a>
          </nav>
        </div>
      </div>`;
  }
};
