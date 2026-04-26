/* ══════════════════════════════════════════
   WARAQ | ورق — Series Page JS
   ══════════════════════════════════════════ */

'use strict';

/* ─── SERIES DATA (single series for demo) ─── */
const seriesData = {
  id: 0,
  title: 'ابن الصحراء',
  author: 'نورة العتيبي',
  artist: 'ماجد الحربي',
  genre: ['فانتازيا', 'مغامرة', 'أكشن'],
  genreKey: 'fantasy',
  status: 'ongoing', // ongoing | completed
  rating: 4.9,
  ratingCount: '١٢.٣K',
  views: '٢.١M',
  follows: '٨٥K',
  episodeCount: 38,
  desc: 'يتيم تربّته الرمال والنجوم، يكتشف أن في عروقه دم ملوك منسيّين. رحلة تتجاوز الحدود والخرافات في قلب صحراء لا ترحم، وعدوّ لا وجه له. حين تهبّ ريح الشمال بصوت لا يسمعه إلا هو، يدرك أن الصحراء لم تربّه — بل كانت تُعدّه.',
  descShort: 'يتيم تربّته الرمال والنجوم، يكتشف أن في عروقه دم ملوك منسيّين. رحلة تتجاوز الحدود والخرافات في قلب صحراء لا ترحم.',
  color: ['#1a0a00','#2d1600'],
  svgFill: '#FFD100',
  svgType: 'hero',
  lastUpdate: 'السبت',
  schedule: 'كل أسبوع'
};

/* ─── EPISODES ─── */
const episodes = Array.from({ length: 38 }, (_, i) => {
  const n = 38 - i;
  const progress = n === 38 ? 65 : n === 37 ? 100 : 0;
  return {
    num: n,
    title: episodeTitle(n),
    date: episodeDate(i),
    pages: 20 + Math.floor(Math.random() * 18),
    isNew: n >= 37,
    isLocked: false,
    progress
  };
});

function episodeTitle(n) {
  const titles = {
    38: 'الريح التي تسمّيني',
    37: 'خاتم الرمال',
    36: 'صوت تحت الجمر',
    35: 'وادي السبع أصداء',
    34: 'الظل الذي يسبقني',
    33: 'ليلة العروش المكسورة',
    32: 'دم الملوك',
    31: 'المدينة تحت الرمال',
    30: 'أسماء لا تُقال',
  };
  return titles[n] || `الفصل ${toArabicNum(n)} — طريق لا أعرفه`;
}

function episodeDate(i) {
  const dates = ['اليوم','أمس','منذ ٣ أيام','منذ أسبوع','منذ أسبوعين'];
  if (i < dates.length) return dates[i];
  const weeks = Math.floor(i / 1) + 1;
  return `منذ ${toArabicNum(weeks)} أسابيع`;
}

/* ─── CHARACTERS ─── */
const characters = [
  { name: 'سالم', role: 'البطل الرئيسي', color: '#FFD100', shape: 'hero' },
  { name: 'دانة', role: 'حارسة المعبد', color: '#f472b6', shape: 'heart' },
  { name: 'العجوز نور', role: 'المرشد الغامض', color: '#a78bfa', shape: 'moon' },
  { name: 'قيس', role: 'الخصم الأول', color: '#ff6b6b', shape: 'wing' },
  { name: 'شمسة', role: 'أميرة القبيلة', color: '#fbbf24', shape: 'pharaoh' },
  { name: 'الأسود', role: 'العدو الحقيقي', color: '#6b7280', shape: 'shadow' },
];

/* ─── COMMENTS ─── */
const comments = [
  { user: 'أم.ق', initials: 'أ', color: '#FFD100', ep: 'ف٣٨', time: 'منذ ساعة', text: 'الفصل الأخير كسر قلبي! ما توقعت إن سالم يعرف الحقيقة بهالطريقة. ماجد الحربي فنان بحق 🔥', likes: 142, liked: false },
  { user: 'ريم_ق', initials: 'ر', color: '#a78bfa', ep: 'ف٣٧', time: 'منذ ٣ ساعات', text: 'الفصل ٣٧ من أقوى فصول السيزن. المشهد بين سالم والعجوز نور... يا إلهي. القصة تعمّقت بشكل ما توقعته.', likes: 89, liked: false },
  { user: 'خالد', initials: 'خ', color: '#00e5a0', ep: 'ف٣٨', time: 'منذ ٥ ساعات', text: 'نظرية: دانة هي نسل الملك الأول. كل الإشارات موجودة من الفصل ١٠. إذا صح هذا راح تنفجر الأمور في الفصل القادم 🤯', likes: 256, liked: true },
  { user: 'سارة.ف', initials: 'س', color: '#f472b6', ep: 'ف٣٦', time: 'أمس', text: 'نورة العتيبي كاتبة استثنائية. القصة ما تشبه أي قصة عربية ثانية. أتمنى تترجم لغات ثانية عشان العالم يشوفها.', likes: 67, liked: false },
  { user: 'م.ع', initials: 'م', color: '#38bdf8', ep: 'ف٣٥', time: 'منذ يومين', text: 'الرسم في الفصل ٣٥ من الله. المشهد الأخير مع الخاتم والرمال — كيف ينقل ماجد الحجم والمسافة بالطريقة هذي؟', likes: 45, liked: false },
];

/* ─── RELATED SERIES ─── */
const related = [
  { title: 'بنت النيل', genre: 'تاريخي', rating: '٤.٩', color: ['#1a1000','#2d1c00'], svgFill: '#fbbf24', svgType: 'pharaoh' },
  { title: 'وادي الوحوش', genre: 'مغامرة', rating: '٤.٦', color: ['#0a1a00','#112200'], svgFill: '#84cc16', svgType: 'forest' },
  { title: 'الملاك الأخير', genre: 'أكشن', rating: '٤.٦', color: ['#1a0a0a','#2d0000'], svgFill: '#ff6b6b', svgType: 'wing' },
  { title: 'حارسة الجن', genre: 'خيال علمي', rating: '٤.٧', color: ['#001a0a','#003d1a'], svgFill: '#00e5a0', svgType: 'circle' },
  { title: 'الظل السابع', genre: 'رعب', rating: '٤.٤', color: ['#050505','#111111'], svgFill: '#6b7280', svgType: 'shadow' },
];

/* ─── UTILS ─── */
function toArabicNum(n) {
  return n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

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
    tech: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><rect x="50" y="40" width="60" height="80" fill="none" stroke="${fill}" stroke-width="1.5" opacity="0.7" rx="4"/><circle cx="65" cy="55" r="5" fill="${fill}" opacity="0.8"/><circle cx="80" cy="55" r="5" fill="${fill}" opacity="0.5"/><circle cx="95" cy="55" r="5" fill="${fill}" opacity="0.3"/></svg>`,
    pharaoh: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><polygon points="80,20 95,60 135,60 105,82 118,122 80,100 42,122 55,82 25,60 65,60" fill="${fill}" opacity="0.7"/><rect x="65" y="110" width="30" height="50" fill="${fill}" opacity="0.5"/></svg>`,
    forest: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><polygon points="80,20 110,80 50,80" fill="${fill}" opacity="0.6"/><polygon points="80,50 120,120 40,120" fill="${fill}" opacity="0.5"/><polygon points="80,80 125,160 35,160" fill="${fill}" opacity="0.4"/><rect x="72" y="160" width="16" height="40" fill="${fill}" opacity="0.5"/></svg>`
  };
  return svgs[type] || svgs.circle;
}

/* Wide SVG thumbnail for episode rows */
function svgThumb(type, fill, color) {
  const c0 = color[0];
  return `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="100" fill="${c0}"/>
    <ellipse cx="80" cy="50" rx="50" ry="40" fill="${fill}" opacity="0.15"/>
    <ellipse cx="80" cy="38" rx="12" ry="13" fill="${fill}" opacity="0.8"/>
    <path d="M62 62 Q80 54 98 62 L102 90 L58 90Z" fill="${fill}" opacity="0.7"/>
  </svg>`;
}

/* Star rating display */
function starRating(score) {
  const full = Math.floor(score);
  const half = score % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) html += '<span style="color:var(--yellow)">★</span>';
    else if (i === full && half) html += '<span style="color:var(--yellow)">½</span>';
    else html += '<span style="color:var(--dark3)">★</span>';
  }
  return html;
}

/* ══════════════════════════════════════════
   RENDER FUNCTIONS
   ══════════════════════════════════════════ */

function renderHero() {
  const s = seriesData;

  /* Background blurred art */
  document.getElementById('hero-bg-art').innerHTML = svgCover(s.svgType, s.svgFill, s.color);

  /* Cover */
  document.getElementById('cover-art').innerHTML = svgCover(s.svgType, s.svgFill, s.color);

  /* Genres */
  const genreEl = document.getElementById('series-genres');
  genreEl.innerHTML = s.genre.map(g => `<span class="series-genre-tag">${g}</span>`).join('');

  /* Title / author */
  document.getElementById('series-title').textContent = s.title;
  document.getElementById('series-author').innerHTML =
    `قصة: <strong>${s.author}</strong> &nbsp;|&nbsp; رسم: <strong>${s.artist}</strong>`;

  /* Status */
  const statusEl = document.getElementById('series-status');
  statusEl.className = `series-status ${s.status}`;
  statusEl.textContent = s.status === 'ongoing' ? 'مستمرة · يتجدد ' + s.schedule : 'مكتملة';

  /* Stats */
  document.getElementById('stat-rating').textContent = s.rating;
  document.getElementById('stat-rating-count').textContent = `(${s.ratingCount} تقييم)`;
  document.getElementById('stat-views').textContent = s.views;
  document.getElementById('stat-follows').textContent = s.follows;
  document.getElementById('stat-eps').textContent = toArabicNum(s.episodeCount);

  /* Description */
  const descEl = document.getElementById('series-desc');
  descEl.textContent = s.descShort;
  const toggleBtn = document.getElementById('desc-toggle');
  let expanded = false;
  toggleBtn.addEventListener('click', () => {
    expanded = !expanded;
    descEl.textContent = expanded ? s.desc : s.descShort;
    toggleBtn.textContent = expanded ? 'أقل ▲' : 'المزيد ▼';
  });

  /* Sticky bar */
  document.getElementById('sticky-cover').innerHTML = svgCover(s.svgType, s.svgFill, s.color);
  document.getElementById('sticky-title').textContent = s.title;
}

/* ── EPISODES ── */
let showingEps = 12;
let sortAsc = false;

function renderEpisodes() {
  const sorted = sortAsc ? [...episodes].reverse() : episodes;
  const visible = sorted.slice(0, showingEps);
  const list = document.getElementById('episodes-list');
  list.innerHTML = '';

  visible.forEach(ep => {
    const row = document.createElement('div');
    row.className = 'episode-row' + (ep.isNew ? ' new-ep' : '');
    row.innerHTML = `
      <div class="ep-thumb">
        ${svgThumb(seriesData.svgType, seriesData.svgFill, seriesData.color)}
        <div class="ep-thumb-overlay"></div>
        <div class="ep-num-badge">ف${toArabicNum(ep.num)}</div>
      </div>
      <div class="ep-info">
        <div class="ep-title-row">
          <span class="ep-row-title">${ep.title}</span>
          ${ep.isNew ? '<span class="ep-new-badge">جديد</span>' : ''}
        </div>
        <div class="ep-row-meta">
          <span>${ep.date}</span>
          <span class="sep">·</span>
          <span>${toArabicNum(ep.pages)} صفحة</span>
        </div>
        ${ep.progress > 0 && ep.progress < 100 ? `
          <div class="ep-progress">
            <div class="ep-progress-fill" style="width:${ep.progress}%"></div>
          </div>` : ''}
      </div>
      <div class="ep-actions">
        <button class="ep-read-btn ${ep.isLocked ? 'locked' : ''}"
          onclick="window.location.href='reader.html'">
          ${ep.progress > 0 && ep.progress < 100 ? 'أكمل القراءة' : ep.progress === 100 ? 'إعادة القراءة' : 'اقرأ الآن'}
        </button>
      </div>`;
    list.appendChild(row);
  });

  /* Load more */
  const loadBtn = document.getElementById('load-more-btn');
  if (showingEps >= episodes.length) {
    loadBtn.style.display = 'none';
  } else {
    loadBtn.style.display = 'block';
    loadBtn.textContent = `عرض المزيد (${toArabicNum(episodes.length - showingEps)} فصل متبقٍّ)`;
  }

  document.getElementById('episodes-count').textContent =
    `${toArabicNum(episodes.length)} فصل`;
}

function sortEpisodes(btn, asc) {
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  sortAsc = asc;
  renderEpisodes();
}

function loadMoreEpisodes() {
  showingEps = Math.min(showingEps + 12, episodes.length);
  renderEpisodes();
}

/* ── CHARACTERS ── */
function renderCharacters() {
  const grid = document.getElementById('characters-grid');
  grid.innerHTML = '';
  characters.forEach(c => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <div class="character-art">${svgCover(c.shape, c.color, ['#1a1a1a','#222'])}</div>
      <div class="character-info">
        <div class="character-name">${c.name}</div>
        <div class="character-role">${c.role}</div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ── COMMENTS ── */
function renderComments() {
  const list = document.getElementById('comments-list');
  list.innerHTML = '';
  comments.forEach((c, ci) => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
      <div class="comment-item-avatar" style="background:${c.color}">${c.initials}</div>
      <div class="comment-body">
        <div class="comment-meta">
          <span class="comment-user">${c.user}</span>
          <span class="comment-ep">${c.ep}</span>
          <span class="comment-time">${c.time}</span>
        </div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-actions">
          <button class="comment-action-btn ${c.liked ? 'liked' : ''}" id="like-btn-${ci}" onclick="toggleLike(${ci})">
            ♥ ${toArabicNum(c.liked ? c.likes : c.likes)}
          </button>
          <button class="comment-action-btn">↩ رد</button>
          <button class="comment-action-btn">⋯</button>
        </div>
      </div>`;
    list.appendChild(item);
  });

  document.getElementById('comments-count').textContent =
    `${toArabicNum(comments.length * 14)} تعليق`;
}

function toggleLike(idx) {
  comments[idx].liked = !comments[idx].liked;
  comments[idx].likes += comments[idx].liked ? 1 : -1;
  renderComments();
}

/* ── RELATED ── */
function renderRelated() {
  const grid = document.getElementById('related-grid');
  grid.innerHTML = '';
  related.forEach(r => {
    const card = document.createElement('div');
    card.className = 'comic-card';
    card.onclick = () => location.reload();
    card.innerHTML = `
      <div class="comic-card-thumb">
        <div class="comic-thumb-art">${svgCover(r.svgType, r.svgFill, r.color)}</div>
      </div>
      <div class="comic-card-title">${r.title}</div>
      <div class="comic-card-meta">
        <span class="comic-rating">★ ${r.rating}</span>
        <span>${r.genre}</span>
      </div>`;
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════
   TABS
   ══════════════════════════════════════════ */
function switchTab(tabId) {
  document.querySelectorAll('.series-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  document.querySelector(`.series-tab[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(`panel-${tabId}`).classList.add('active');
}

/* ══════════════════════════════════════════
   STICKY BAR
   ══════════════════════════════════════════ */
function initStickyBar() {
  const bar = document.getElementById('sticky-bar');
  const hero = document.querySelector('.series-hero');
  const observer = new IntersectionObserver(entries => {
    bar.classList.toggle('visible', !entries[0].isIntersecting);
  }, { threshold: 0.1 });
  observer.observe(hero);
}

/* ══════════════════════════════════════════
   MOBILE NAV (shared with main)
   ══════════════════════════════════════════ */
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
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ══════════════════════════════════════════
   FOLLOW TOGGLE
   ══════════════════════════════════════════ */
let following = false;
function toggleFollow() {
  following = !following;
  const btn = document.getElementById('follow-btn');
  btn.textContent = following ? '✓ تتابعها' : '+ متابعة';
  btn.style.background = following ? 'var(--dark3)' : '';
  btn.style.color = following ? 'var(--yellow)' : '';
  btn.style.borderColor = following ? 'var(--yellow)' : '';
}

/* ══════════════════════════════════════════
   INIT
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderEpisodes();
  renderCharacters();
  renderComments();
  renderRelated();
  initStickyBar();
  initMobileNav();
});