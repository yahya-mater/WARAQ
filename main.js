/* ══════════════════════════════════════════
   WARAQ | ورق — Main JavaScript
   ══════════════════════════════════════════ */

'use strict';

/* ─── DATA ─── */
const comics = [
  {
    title: 'ابن الصحراء',
    author: 'رسم: ماجد الحربي | قصة: نورة العتيبي',
    genre: 'فانتازيا · مغامرة',
    genreKey: 'fantasy',
    desc: 'يتيم تربّته الرمال والنجوم، يكتشف أن في عروقه دم ملوك منسيّين. رحلة تتجاوز الحدود والخرافات في قلب صحراء لا ترحم، وعدوّ لا وجه له.',
    badge: 'رائج', badgeClass: 'hot', rating: '4.9', episodes: 38,
    color: ['#1a0a00','#2d1600'], svgFill: '#FFD100', svgType: 'hero'
  },
  {
    title: 'أسرار المدينة',
    author: 'رسم وقصة: شيماء القاضي',
    genre: 'غموض · مغامرة',
    genreKey: 'mystery',
    desc: 'في أعماق مدينة تحت الأرض توقّف فيها الزمن، تحاول المحققة جبر كشف سرّ اختفاء مدينة كاملة قبل أن تتكرر المأساة.',
    badge: 'مميّز', badgeClass: '', rating: '4.8', episodes: 52,
    color: ['#0f0f1a','#1a1a2e'], svgFill: '#a78bfa', svgType: 'city'
  },
  {
    title: 'حارسة الجن',
    author: 'رسم: أحمد زكريا | قصة: لمى الشمري',
    genre: 'خيال علمي · أكشن',
    genreKey: 'scifi',
    desc: 'في عالم يُكبّل فيه الجن بشرائح رقمية، تقاتل حارسة الطائفة الأخيرة لاستعادة ذاكرة شعبها — ولو كلّفها كل شيء.',
    badge: 'جديد', badgeClass: 'new', rating: '4.7', episodes: 12,
    color: ['#001a0a','#003d1a'], svgFill: '#00e5a0', svgType: 'circle'
  },
  {
    title: 'الملاك الأخير',
    author: 'رسم وقصة: كريم منصور',
    genre: 'أكشن · خيال',
    genreKey: 'action',
    desc: 'آخر الملائكة المحاربين يهبط إلى أرض خرّبها الفساد. معركة لا تنتهي بين الخير المُتعب والشر الذي لا يعرف الكلل.',
    badge: 'رائج', badgeClass: 'hot', rating: '4.6', episodes: 65,
    color: ['#1a0a0a','#2d0000'], svgFill: '#ff6b6b', svgType: 'wing'
  },
  {
    title: 'قلب من حجر',
    author: 'رسم: هالة نور | قصة: رنا الطاهر',
    genre: 'رومانسية · دراما',
    genreKey: 'romance',
    desc: 'بين طالبة نحت تعشق الصخر ومعماري يبني جدراناً حول قلبه — حب ينمو في صمت المراسم ويتشكّل مثل الطين.',
    badge: '', badgeClass: '', rating: '4.5', episodes: 29,
    color: ['#1a0010','#2d0020'], svgFill: '#f472b6', svgType: 'heart'
  },
  {
    title: 'ليلى والقمرين',
    author: 'رسم: سلمى إبراهيم | قصة: داليا فريد',
    genre: 'درامية · خيال',
    genreKey: 'drama',
    desc: 'فتاة تولد بين قمرين تتجاذبها قوتان لا تعرف لأيهما تنتمي. قصة هوية وانتماء في مجتمع يطلب منك أن تختار.',
    badge: 'جديد', badgeClass: 'new', rating: '4.8', episodes: 8,
    color: ['#0a001a','#150030'], svgFill: '#c084fc', svgType: 'moon'
  },
  {
    title: 'الظل السابع',
    author: 'رسم وقصة: يوسف الحداد',
    genre: 'رعب · غموض',
    genreKey: 'horror',
    desc: 'سبعة أشخاص في مبنى مهجور يكتشفون أن ظلالهم تتصرف بإرادة مستقلة. من هو الحقيقي؟ ومن هو الظل؟',
    badge: '', badgeClass: '', rating: '4.4', episodes: 20,
    color: ['#050505','#111111'], svgFill: '#6b7280', svgType: 'shadow'
  },
  {
    title: 'ثورة الآلات',
    author: 'رسم وقصة: طارق العمري',
    genre: 'خيال علمي · أكشن',
    genreKey: 'scifi',
    desc: 'في عام 2090، الآلات لا تنام ولا تتعب. البشر الأخيرون يتحصّنون خلف جدران الذاكرة القديمة — ذاكرة ما كانوا يوماً.',
    badge: '', badgeClass: '', rating: '4.3', episodes: 33,
    color: ['#001015','#002030'], svgFill: '#38bdf8', svgType: 'tech'
  },
  {
    title: 'بنت النيل',
    author: 'رسم: مريم الجوهري | قصة: إيمان سعد',
    genre: 'تاريخي · مغامرة',
    genreKey: 'fantasy',
    desc: 'كاهنة معبد آمون تكشف مؤامرة تهدد عرش مصر. تتسلح بالمعرفة وحدها في عصر يرى المرأة ديكوراً لا سلاحاً.',
    badge: 'مميّز', badgeClass: '', rating: '4.9', episodes: 44,
    color: ['#1a1000','#2d1c00'], svgFill: '#fbbf24', svgType: 'pharaoh'
  },
  {
    title: 'وادي الوحوش',
    author: 'رسم وقصة: سامر المالكي',
    genre: 'مغامرة · فانتازيا',
    genreKey: 'action',
    desc: 'وادٍ لا تنتهي حدوده، مسكون بمخلوقات تأكل الأحلام. صبي فقد ذاكرته يجد أن جميع الوحوش تعرفه باسمه.',
    badge: '', badgeClass: '', rating: '4.6', episodes: 27,
    color: ['#0a1a00','#112200'], svgFill: '#84cc16', svgType: 'forest'
  }
];


/* ─── SVG COVER GENERATOR ─── */
function svgCover(type, fill, color) {
  const c0 = color[0];
  const svgs = {
    hero: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><ellipse cx="80" cy="70" rx="60" ry="60" fill="${fill}" opacity="0.2"/><ellipse cx="80" cy="55" rx="16" ry="18" fill="${fill}" opacity="0.9"/><path d="M55 100 Q80 88 105 100 L110 160 L50 160 Z" fill="${fill}" opacity="0.8"/><path d="M55 100 L38 140 L55 144 L66 110Z" fill="${fill}" opacity="0.7"/><path d="M105 100 L122 140 L105 144 L94 110Z" fill="${fill}" opacity="0.7"/></svg>`,
    city: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><rect x="10" y="100" width="12" height="113" fill="${fill}" opacity="0.15"/><rect x="28" y="80" width="18" height="133" fill="${fill}" opacity="0.2"/><rect x="52" y="95" width="15" height="118" fill="${fill}" opacity="0.15"/><rect x="73" y="65" width="22" height="148" fill="${fill}" opacity="0.25"/><rect x="101" y="85" width="17" height="128" fill="${fill}" opacity="0.18"/><rect x="124" y="70" width="22" height="143" fill="${fill}" opacity="0.2"/><circle cx="130" cy="30" r="16" fill="${fill}" opacity="0.85"/><circle cx="138" cy="24" r="12" fill="${c0}"/></svg>`,
    circle: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><circle cx="80" cy="100" r="55" fill="none" stroke="${fill}" stroke-width="1.5" opacity="0.5"/><circle cx="80" cy="100" r="35" fill="none" stroke="${fill}" stroke-width="1" opacity="0.3"/><circle cx="80" cy="100" r="15" fill="${fill}" opacity="0.4"/><line x1="80" y1="0" x2="80" y2="213" stroke="${fill}" stroke-width="0.5" opacity="0.2"/><line x1="0" y1="100" x2="160" y2="100" stroke="${fill}" stroke-width="0.5" opacity="0.2"/></svg>`,
    wing: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><path d="M80 70 Q20 90 10 150 Q40 130 80 140 Q120 130 150 150 Q140 90 80 70Z" fill="${fill}" opacity="0.6"/><path d="M80 70 Q20 60 5 30 Q30 80 80 90Z" fill="${fill}" opacity="0.4"/><path d="M80 70 Q140 60 155 30 Q130 80 80 90Z" fill="${fill}" opacity="0.4"/><ellipse cx="80" cy="110" rx="12" ry="14" fill="${fill}" opacity="0.9"/></svg>`,
    heart: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><path d="M80 120 Q30 90 30 60 Q30 30 55 30 Q70 30 80 45 Q90 30 105 30 Q130 30 130 60 Q130 90 80 120Z" fill="${fill}" opacity="0.7"/></svg>`,
    moon: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><circle cx="60" cy="80" r="40" fill="${fill}" opacity="0.8"/><circle cx="85" cy="70" r="35" fill="${c0}"/><circle cx="110" cy="90" r="30" fill="${fill}" opacity="0.5"/><circle cx="125" cy="82" r="26" fill="${c0}"/></svg>`,
    shadow: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><ellipse cx="80" cy="80" rx="30" ry="34" fill="${fill}" opacity="0.5"/><ellipse cx="80" cy="80" rx="20" ry="22" fill="${fill}" opacity="0.8"/><path d="M60 110 Q80 100 100 110 L95 160 L65 160Z" fill="${fill}" opacity="0.5"/><ellipse cx="110" cy="100" rx="20" ry="22" fill="${fill}" opacity="0.2"/></svg>`,
    tech: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><rect x="50" y="40" width="60" height="80" fill="none" stroke="${fill}" stroke-width="1.5" opacity="0.7" rx="4"/><line x1="50" y1="65" x2="110" y2="65" stroke="${fill}" stroke-width="0.5" opacity="0.4"/><line x1="50" y1="85" x2="110" y2="85" stroke="${fill}" stroke-width="0.5" opacity="0.4"/><circle cx="65" cy="55" r="5" fill="${fill}" opacity="0.8"/><circle cx="80" cy="55" r="5" fill="${fill}" opacity="0.5"/><circle cx="95" cy="55" r="5" fill="${fill}" opacity="0.3"/><line x1="80" y1="120" x2="80" y2="150" stroke="${fill}" stroke-width="1.5" opacity="0.5"/><rect x="60" y="150" width="40" height="8" fill="${fill}" opacity="0.4" rx="2"/></svg>`,
    pharaoh: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><polygon points="80,20 95,60 135,60 105,82 118,122 80,100 42,122 55,82 25,60 65,60" fill="${fill}" opacity="0.7"/><rect x="65" y="110" width="30" height="50" fill="${fill}" opacity="0.5"/><rect x="55" y="155" width="50" height="10" fill="${fill}" opacity="0.4" rx="2"/></svg>`,
    forest: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><polygon points="80,20 110,80 50,80" fill="${fill}" opacity="0.6"/><polygon points="80,50 120,120 40,120" fill="${fill}" opacity="0.5"/><polygon points="80,80 125,160 35,160" fill="${fill}" opacity="0.4"/><rect x="72" y="160" width="16" height="40" fill="${fill}" opacity="0.5"/></svg>`
  };
  return svgs[type] || svgs.circle;
}


/* ─── UTILS ─── */
function toArabicNum(n) {
  return n.toString().replace(/\d/g, d => '0123456789'[d]);
}


/* ─── COMICS GRID ─── */
let currentFilter = 'all';

function renderComics(filter) {
  currentFilter = filter;
  const grid = document.getElementById('comics-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? comics
    : comics.filter(c => c.genreKey === filter);

  filtered.forEach((c, localIdx) => {
    const globalIdx = comics.indexOf(c);
    const card = document.createElement('div');
    card.className = 'comic-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `افتح ${c.title}`);
    card.onclick = () => window.location.href = 'series.html';
    card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') openModal(globalIdx); };
    card.innerHTML = `
      <div class="comic-card-thumb">
        <div class="comic-thumb-art">${svgCover(c.svgType, c.svgFill, c.color)}</div>
        ${c.badge ? `<span class="comic-badge ${c.badgeClass}">${c.badge}</span>` : ''}
      </div>
      <div class="comic-card-title">${c.title}</div>
      <div class="comic-card-meta">
        <span class="comic-rating">★ ${c.rating}</span>
        <span>${c.episodes} فصل</span>
      </div>`;
    grid.appendChild(card);
  });

  // Re-observe new cards
  grid.querySelectorAll('.comic-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.04}s`;
    el.classList.add('reveal');
    setTimeout(() => revealObserver.observe(el), 10);
  });
}

function filterGenre(btn, genre) {
  document.querySelectorAll('.genre-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderComics(genre);
}


/* ─── SCHEDULE ─── */
const days = ['الجمعة','السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس'];
const todayIdx = 1; // Saturday

function renderSchedule() {
  const grid = document.getElementById('schedule-grid');
  if (!grid) return;

  days.forEach((day, di) => {
    const col = document.createElement('div');
    col.className = 'schedule-day';

    const nameEl = document.createElement('div');
    nameEl.className = 'schedule-day-name' + (di === todayIdx ? ' today' : '');
    nameEl.textContent = day;
    col.appendChild(nameEl);

    comics.filter((_, i) => i % 7 === di).slice(0, 3).forEach(c => {
      const origIdx = comics.indexOf(c);
      const mini = document.createElement('div');
      mini.className = 'schedule-comic-mini';
      mini.onclick = () => openModal(origIdx);
      mini.innerHTML = `
        <div class="s-art">${svgCover(c.svgType, c.svgFill, c.color)}</div>
        <div class="s-title">${c.title}</div>`;
      col.appendChild(mini);
    });

    grid.appendChild(col);
  });
}


/* ─── MODAL ─── */
function openModal(idx) {
  const c = comics[idx];
  const overlay = document.getElementById('modal-overlay');

  document.getElementById('modal-cover').innerHTML = `
    <button class="modal-close" onclick="closeModal()" aria-label="إغلاق">✕</button>
    <div style="width:100%;height:100%">${svgCover(c.svgType, c.svgFill, c.color)}</div>`;
  document.getElementById('modal-genre').textContent = c.genre;
  document.getElementById('modal-title').textContent = c.title;
  document.getElementById('modal-author').textContent = c.author;
  document.getElementById('modal-desc').textContent = c.desc;

  const eps = document.getElementById('modal-episodes');
  eps.innerHTML = `<h4>الفصول (${toArabicNum(c.episodes)})</h4>`;
  const shown = Math.min(c.episodes, 5);
  for (let i = 1; i <= shown; i++) {
    const isNew = i >= shown - 1;
    eps.innerHTML += `
      <div class="episode-item" role="button" tabindex="0">
        <span class="ep-title">الفصل ${toArabicNum(i)}</span>
        <span class="ep-meta">
          ${isNew ? '<span class="ep-new">جديد</span>' : ''}
          منذ ${toArabicNum(i)} أسابيع
        </span>
      </div>`;
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

// Close modal with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


/* ─── MOBILE NAV ─── */
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}


/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target); // observe once
    }
  });
}, { threshold: 0.08 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}


/* ─── NAV SHADOW ON SCROLL ─── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,0.4)'
      : 'none';
  }, { passive: true });
}


/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderComics('all');
  renderSchedule();
  initMobileNav();
  initNavScroll();

  // Observe static reveal elements first, then dynamic ones after render
  setTimeout(initReveal, 80);
});