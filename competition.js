/* ══════════════════════════════════════════
   WARAQ | ورق — Competition Page JS
   ══════════════════════════════════════════ */

'use strict';

/* ─── BRANCH SELECTION ─── */
let selectedBranch = '';

function selectBranch(el) {
  document.querySelectorAll('.comp-branch-opt').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedBranch = el.dataset.val;
  document.getElementById('cf-branch').value = selectedBranch;
  document.getElementById('cf-branch-err').textContent = '';
}

/* ─── WORD COUNT ─── */
document.addEventListener('DOMContentLoaded', () => {
  const synopsis = document.getElementById('cf-synopsis');
  const wc = document.getElementById('cf-wc');
  if (synopsis) {
    synopsis.addEventListener('input', () => {
      const words = synopsis.value.trim().split(/\s+/).filter(w => w).length;
      wc.textContent = `${toArabicNum(words)} كلمة`;
      wc.style.color = words > 200 ? '#ff6b6b' : words >= 50 ? '#00e5a0' : 'var(--gray)';
    });
  }
});

/* ─── UTILS ─── */
function toArabicNum(n) {
  return n.toString().replace(/\d/g, d => '0123456789'[d]);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setInputError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.style.borderColor = '#ff6b6b';
}

function clearInputError(id) {
  const el = document.getElementById(id);
  if (el) el.style.borderColor = '';
}

/* ─── FORM SUBMISSION ─── */
function submitCompForm(e) {
  e.preventDefault();
  let valid = true;

  const name       = document.getElementById('cf-name').value.trim();
  const email      = document.getElementById('cf-email').value.trim();
  const university = document.getElementById('cf-university').value.trim();
  const country    = document.getElementById('cf-country').value.trim();
  const title      = document.getElementById('cf-title').value.trim();
  const synopsis   = document.getElementById('cf-synopsis').value.trim();
  const original   = document.getElementById('cf-original').checked;
  const terms      = document.getElementById('cf-terms').checked;

  // Clear previous errors
  ['cf-name','cf-email','cf-university','cf-country','cf-title','cf-synopsis'].forEach(clearInputError);
  document.getElementById('cf-branch-err').textContent = '';

  if (!name)              { setInputError('cf-name', true); valid = false; }
  if (!email || !validateEmail(email)) { setInputError('cf-email', true); valid = false; }
  if (!university)        { setInputError('cf-university', true); valid = false; }
  if (!country)           { setInputError('cf-country', true); valid = false; }
  if (!selectedBranch)    { document.getElementById('cf-branch-err').textContent = 'يرجى اختيار فرع المشاركة'; valid = false; }
  if (!title)             { setInputError('cf-title', true); valid = false; }

  const wordCount = synopsis.trim().split(/\s+/).filter(w => w).length;
  if (!synopsis || wordCount < 50) { setInputError('cf-synopsis', true); valid = false; }

  if (!original || !terms) { valid = false; }

  if (!valid) {
    // Scroll to first error
    document.querySelector('.comp-input[style*="border-color"]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Loading state
  const btn = document.getElementById('comp-submit-btn');
  btn.classList.add('loading');
  btn.querySelector('span').style.opacity = '0';

  setTimeout(() => {
    document.getElementById('comp-form').style.display = 'none';
    document.getElementById('comp-form-success').classList.remove('hidden');
    // Scroll to success
    document.getElementById('comp-form-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1500);
}

/* ─── MOBILE NAV ─── */
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');
  if (!hamburger || !drawer) return;
  hamburger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ─── SMOOTH SCROLL ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
}

/* ─── NAV ACTIVE SECTION ─── */
function initNavHighlight() {
  const sections = ['about','branches','prizes','evaluation','conditions','timeline','apply'];
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--yellow)' : '';
    });
  }, { passive: true });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initReveal();
  initSmoothScroll();
  initNavHighlight();
});