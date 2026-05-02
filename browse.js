/* ══════════════════════════════════════════
   WARAQ | ورق — Browse Page JS
   ══════════════════════════════════════════ */

'use strict';

/* ─── SHARED DATA (same as main.js) ─── */
const comics = [
  { title:'ابن الصحراء',    author:'نورة العتيبي / ماجد الحربي',   genre:'فانتازيا · مغامرة',   genreKey:'fantasy', desc:'يتيم تربّته الرمال والنجوم، يكتشف أن في عروقه دم ملوك منسيّين.',                                          badge:'رائج',  badgeClass:'hot',      rating:4.9, episodes:38, color:['#1a0a00','#2d1600'], svgFill:'#FFD100', svgType:'hero'    },
  { title:'أسرار المدينة',  author:'شيماء القاضي',                  genre:'غموض · مغامرة',       genreKey:'mystery', desc:'في أعماق مدينة تحت الأرض توقّف فيها الزمن، تحاول المحققة جبر كشف سرّ اختفاء مدينة كاملة.',                badge:'مميّز', badgeClass:'featured', rating:4.8, episodes:52, color:['#0f0f1a','#1a1a2e'], svgFill:'#a78bfa', svgType:'city'    },
  { title:'حارسة الجن',     author:'أحمد زكريا / لمى الشمري',       genre:'خيال علمي · أكشن',    genreKey:'scifi',   desc:'في عالم يُكبّل فيه الجن بشرائح رقمية، تقاتل حارسة الطائفة الأخيرة.',                                      badge:'جديد',  badgeClass:'new',      rating:4.7, episodes:12, color:['#001a0a','#003d1a'], svgFill:'#00e5a0', svgType:'circle'  },
  { title:'الملاك الأخير',  author:'كريم منصور',                     genre:'أكشن · خيال',         genreKey:'action',  desc:'آخر الملائكة المحاربين يهبط إلى أرض خرّبها الفساد.',                                                      badge:'رائج',  badgeClass:'hot',      rating:4.6, episodes:65, color:['#1a0a0a','#2d0000'], svgFill:'#ff6b6b', svgType:'wing'    },
  { title:'قلب من حجر',     author:'هالة نور / رنا الطاهر',          genre:'رومانسية · دراما',     genreKey:'romance', desc:'بين طالبة نحت تعشق الصخر ومعماري يبني جدراناً حول قلبه.',                                                  badge:'',      badgeClass:'',         rating:4.5, episodes:29, color:['#1a0010','#2d0020'], svgFill:'#f472b6', svgType:'heart'   },
  { title:'ليلى والقمرين',  author:'سلمى إبراهيم / داليا فريد',      genre:'درامية · خيال',        genreKey:'drama',   desc:'فتاة تولد بين قمرين تتجاذبها قوتان لا تعرف لأيهما تنتمي.',                                                  badge:'جديد',  badgeClass:'new',      rating:4.8, episodes:8,  color:['#0a001a','#150030'], svgFill:'#c084fc', svgType:'moon'    },
  { title:'الظل السابع',    author:'يوسف الحداد',                     genre:'رعب · غموض',           genreKey:'horror',  desc:'سبعة أشخاص في مبنى مهجور يكتشفون أن ظلالهم تتصرف بإرادة مستقلة.',                                          badge:'',      badgeClass:'',         rating:4.4, episodes:20, color:['#050505','#111111'], svgFill:'#6b7280', svgType:'shadow'  },
  { title:'ثورة الآلات',    author:'طارق العمري',                     genre:'خيال علمي · أكشن',    genreKey:'scifi',   desc:'في عام 2090، الآلات لا تنام ولا تتعب.',                                                                   badge:'',      badgeClass:'',         rating:4.3, episodes:33, color:['#001015','#002030'], svgFill:'#38bdf8', svgType:'tech'    },
  { title:'بنت النيل',      author:'مريم الجوهري / إيمان سعد',       genre:'تاريخي · مغامرة',     genreKey:'fantasy', desc:'كاهنة معبد آمون تكشف مؤامرة تهدد عرش مصر.',                                                               badge:'مميّز', badgeClass:'featured', rating:4.9, episodes:44, color:['#1a1000','#2d1c00'], svgFill:'#fbbf24', svgType:'pharaoh' },
  { title:'وادي الوحوش',    author:'سامر المالكي',                    genre:'مغامرة · فانتازيا',   genreKey:'action',  desc:'وادٍ لا تنتهي حدوده، مسكون بمخلوقات تأكل الأحلام.',                                                       badge:'',      badgeClass:'',         rating:4.6, episodes:27, color:['#0a1a00','#112200'], svgFill:'#84cc16', svgType:'forest'  },
  { title:'نهر الروح',      author:'دينا خالد',                       genre:'رومانسية · خيال',     genreKey:'romance', desc:'رسّامة تكتشف أن لوحاتها تفتح نوافذ على أرواح الموتى.',                                                    badge:'جديد',  badgeClass:'new',      rating:4.7, episodes:15, color:['#001a1a','#003030'], svgFill:'#67e8f9', svgType:'circle'  },
  { title:'صانع العروش',    author:'فيصل الراشد',                     genre:'فانتازيا · تاريخي',   genreKey:'fantasy', desc:'حداد موهوب يصنع سلاحاً تتوق إليه جميع ممالك الأرض — ولا يريد أحدٌ أن يعيش من يعرف سرّه.',               badge:'',      badgeClass:'',         rating:4.5, episodes:41, color:['#1a0800','#2d1400'], svgFill:'#fb923c', svgType:'wing'    },
  { title:'بين النجوم',     author:'لينا مصطفى',                     genre:'خيال علمي · رومانسية', genreKey:'scifi',  desc:'طاقم مركبة فضائية يحمل آخر بذور الحياة على الأرض — ورسالة لا يجب أن تصل.',                               badge:'',      badgeClass:'',         rating:4.2, episodes:19, color:['#000a1a','#001530'], svgFill:'#818cf8', svgType:'tech'    },
  { title:'ابنة الريح',     author:'آمال السيد',                      genre:'درامية · مغامرة',     genreKey:'drama',   desc:'صحفية تلاحق قصة مختفٍ فتجد نفسها في قلب مؤامرة تمتد لعقود.',                                              badge:'رائج',  badgeClass:'hot',      rating:4.6, episodes:31, color:['#0a0a1a','#141428'], svgFill:'#e879f9', svgType:'moon'    },
  { title:'حكاية الجبل',    author:'عمر الفارسي',                     genre:'رعب · فانتازيا',      genreKey:'horror',  desc:'قرية محاصرة بجبل يحكي حكايات لمن يجرؤ على الاستماع — وكل حكاية تنتهي بالموت.',                             badge:'',      badgeClass:'',         rating:4.3, episodes:24, color:['#0a0500','#150a00'], svgFill:'#a3e635', svgType:'forest'  },
];

/* ─── SVG COVER ─── */
function svgCover(type, fill, color) {
  const c0 = color[0];
  const svgs = {
    hero:    `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><ellipse cx="80" cy="70" rx="60" ry="60" fill="${fill}" opacity="0.2"/><ellipse cx="80" cy="55" rx="16" ry="18" fill="${fill}" opacity="0.9"/><path d="M55 100 Q80 88 105 100 L110 160 L50 160 Z" fill="${fill}" opacity="0.8"/><path d="M55 100 L38 140 L55 144 L66 110Z" fill="${fill}" opacity="0.7"/><path d="M105 100 L122 140 L105 144 L94 110Z" fill="${fill}" opacity="0.7"/></svg>`,
    city:    `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><rect x="10" y="100" width="12" height="113" fill="${fill}" opacity="0.15"/><rect x="28" y="80" width="18" height="133" fill="${fill}" opacity="0.2"/><rect x="52" y="95" width="15" height="118" fill="${fill}" opacity="0.15"/><rect x="73" y="65" width="22" height="148" fill="${fill}" opacity="0.25"/><rect x="101" y="85" width="17" height="128" fill="${fill}" opacity="0.18"/><rect x="124" y="70" width="22" height="143" fill="${fill}" opacity="0.2"/><circle cx="130" cy="30" r="16" fill="${fill}" opacity="0.85"/><circle cx="138" cy="24" r="12" fill="${c0}"/></svg>`,
    circle:  `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><circle cx="80" cy="100" r="55" fill="none" stroke="${fill}" stroke-width="1.5" opacity="0.5"/><circle cx="80" cy="100" r="35" fill="none" stroke="${fill}" stroke-width="1" opacity="0.3"/><circle cx="80" cy="100" r="15" fill="${fill}" opacity="0.4"/><line x1="80" y1="0" x2="80" y2="213" stroke="${fill}" stroke-width="0.5" opacity="0.2"/><line x1="0" y1="100" x2="160" y2="100" stroke="${fill}" stroke-width="0.5" opacity="0.2"/></svg>`,
    wing:    `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><path d="M80 70 Q20 90 10 150 Q40 130 80 140 Q120 130 150 150 Q140 90 80 70Z" fill="${fill}" opacity="0.6"/><path d="M80 70 Q20 60 5 30 Q30 80 80 90Z" fill="${fill}" opacity="0.4"/><path d="M80 70 Q140 60 155 30 Q130 80 80 90Z" fill="${fill}" opacity="0.4"/><ellipse cx="80" cy="110" rx="12" ry="14" fill="${fill}" opacity="0.9"/></svg>`,
    heart:   `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><path d="M80 120 Q30 90 30 60 Q30 30 55 30 Q70 30 80 45 Q90 30 105 30 Q130 30 130 60 Q130 90 80 120Z" fill="${fill}" opacity="0.7"/></svg>`,
    moon:    `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><circle cx="60" cy="80" r="40" fill="${fill}" opacity="0.8"/><circle cx="85" cy="70" r="35" fill="${c0}"/><circle cx="110" cy="90" r="30" fill="${fill}" opacity="0.5"/><circle cx="125" cy="82" r="26" fill="${c0}"/></svg>`,
    shadow:  `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><ellipse cx="80" cy="80" rx="30" ry="34" fill="${fill}" opacity="0.5"/><ellipse cx="80" cy="80" rx="20" ry="22" fill="${fill}" opacity="0.8"/><path d="M60 110 Q80 100 100 110 L95 160 L65 160Z" fill="${fill}" opacity="0.5"/></svg>`,
    tech:    `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><rect x="50" y="40" width="60" height="80" fill="none" stroke="${fill}" stroke-width="1.5" opacity="0.7" rx="4"/><circle cx="65" cy="55" r="5" fill="${fill}" opacity="0.8"/><circle cx="80" cy="55" r="5" fill="${fill}" opacity="0.5"/><circle cx="95" cy="55" r="5" fill="${fill}" opacity="0.3"/></svg>`,
    pharaoh: `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><polygon points="80,20 95,60 135,60 105,82 118,122 80,100 42,122 55,82 25,60 65,60" fill="${fill}" opacity="0.7"/><rect x="65" y="110" width="30" height="50" fill="${fill}" opacity="0.5"/></svg>`,
    forest:  `<svg viewBox="0 0 160 213" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="213" fill="${c0}"/><polygon points="80,20 110,80 50,80" fill="${fill}" opacity="0.6"/><polygon points="80,50 120,120 40,120" fill="${fill}" opacity="0.5"/><polygon points="80,80 125,160 35,160" fill="${fill}" opacity="0.4"/><rect x="72" y="160" width="16" height="40" fill="${fill}" opacity="0.5"/></svg>`,
  };
  return svgs[type] || svgs.circle;
}

function toArabicNum(n) {
  return n.toString().replace(/\d/g, d => '0123456789'[d]);
}

/* ══════════════════════════════════════════
   STATE
   ══════════════════════════════════════════ */
let state = {
  query:    '',
  genre:    'all',
  sort:     'popular',   // popular | newest | rating | episodes
  status:   'all',       // all | ongoing | completed
  view:     'grid',      // grid | list
  page:     1,
  perPage:  10,
};

const activeFilters = new Set(); // tracks which filter chips to show

/* ══════════════════════════════════════════
   FILTER + SEARCH LOGIC
   ══════════════════════════════════════════ */
function getFiltered() {
  let result = [...comics];

  // search
  if (state.query.trim()) {
    const q = state.query.trim().toLowerCase();
    result = result.filter(c =>
      c.title.includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.genre.includes(q)
    );
  }

  // genre
  if (state.genre !== 'all') {
    result = result.filter(c => c.genreKey === state.genre);
  }

  // status (random assignment for demo)
  if (state.status !== 'all') {
    result = result.filter((c, i) =>
      state.status === 'ongoing' ? i % 3 !== 0 : i % 3 === 0
    );
  }

  // sort
  switch (state.sort) {
    case 'popular':  result.sort((a,b) => b.episodes - a.episodes); break;
    case 'newest':   result.sort((a,b) => a.episodes - b.episodes); break;
    case 'rating':   result.sort((a,b) => b.rating - a.rating);     break;
    case 'episodes': result.sort((a,b) => b.episodes - a.episodes); break;
  }

  return result;
}

function getPage(all) {
  return all.slice(0, state.page * state.perPage);
}

/* ══════════════════════════════════════════
   RENDER
   ══════════════════════════════════════════ */
function render() {
  const all     = getFiltered();
  const visible = getPage(all);
  const container = document.getElementById('results-container');
  const countEl   = document.getElementById('results-count');
  const emptyEl   = document.getElementById('empty-state');
  const loadBtn   = document.getElementById('load-more-btn');

  countEl.innerHTML = `عرض <strong>${toArabicNum(visible.length)}</strong> من أصل <strong>${toArabicNum(all.length)}</strong> قصة`;

  if (all.length === 0) {
    container.innerHTML = '';
    emptyEl.classList.add('show');
    loadBtn.style.display = 'none';
    return;
  }
  emptyEl.classList.remove('show');

  container.className = state.view === 'grid' ? 'browse-grid' : 'browse-list';
  container.innerHTML = visible.map((c, i) =>
    state.view === 'grid' ? renderGridCard(c, i) : renderListItem(c, i)
  ).join('');

  loadBtn.style.display = visible.length < all.length ? 'block' : 'none';
  loadBtn.textContent = `عرض المزيد (${toArabicNum(all.length - visible.length)} قصة متبقية)`;

  updateActiveFiltersBar();
}

function renderGridCard(c, i) {
  return `
    <div class="comic-card" onclick="window.location.href='series.html'" style="animation-delay:${i*0.03}s">
      <div class="comic-card-thumb">
        <div class="comic-thumb-art">${svgCover(c.svgType, c.svgFill, c.color)}</div>
        ${c.badge ? `<span class="comic-badge ${c.badgeClass}">${c.badge}</span>` : ''}
      </div>
      <div class="comic-card-title">${c.title}</div>
      <div class="comic-card-meta">
        <span class="comic-rating">★ ${c.rating}</span>
        <span>${toArabicNum(c.episodes)} فصل</span>
      </div>
    </div>`;
}

function renderListItem(c, i) {
  const badgeHtml = c.badge
    ? `<span class="list-badge ${c.badgeClass}">${c.badge}</span>` : '';
  return `
    <div class="list-item" onclick="window.location.href='series.html'">
      <div class="list-thumb">${svgCover(c.svgType, c.svgFill, c.color)}</div>
      <div class="list-info">
        <div class="list-title">${c.title}</div>
        <div class="list-author">${c.author}</div>
        <div class="list-genres">
          ${c.genre.split('·').map(g=>`<span class="list-genre-tag">${g.trim()}</span>`).join('')}
        </div>
        <div class="list-desc">${c.desc}</div>
      </div>
      <div class="list-meta">
        <span class="list-rating">★ ${c.rating}</span>
        <span class="list-eps">${toArabicNum(c.episodes)} فصل</span>
        ${badgeHtml}
      </div>
    </div>`;
}

/* ══════════════════════════════════════════
   ACTIVE FILTERS CHIPS
   ══════════════════════════════════════════ */
const genreLabels = { fantasy:'فانتازيا', action:'أكشن', romance:'رومانسية', mystery:'غموض', scifi:'خيال علمي', drama:'درامية', horror:'رعب' };
const sortLabels  = { popular:'الأكثر قراءة', newest:'الأحدث', rating:'الأعلى تقييماً', episodes:'الأطول' };
const statusLabels = { ongoing:'مستمرة', completed:'مكتملة' };

function updateActiveFiltersBar() {
  const bar = document.getElementById('active-filters');
  const chips = [];

  if (state.genre !== 'all')
    chips.push({ key:'genre',  label: genreLabels[state.genre] });
  if (state.sort !== 'popular')
    chips.push({ key:'sort',   label: sortLabels[state.sort] });
  if (state.status !== 'all')
    chips.push({ key:'status', label: statusLabels[state.status] });
  if (state.query.trim())
    chips.push({ key:'query',  label: `"${state.query.trim()}"` });

  bar.innerHTML = chips.map(ch => `
    <span class="filter-chip" onclick="clearFilter('${ch.key}')">
      ${ch.label} <span class="filter-chip-x">×</span>
    </span>`).join('');

  if (chips.length > 1) {
    bar.innerHTML += `<button class="clear-all-btn" onclick="clearAllFilters()">مسح الكل</button>`;
  }
}

function clearFilter(key) {
  if (key === 'genre')  { state.genre = 'all';       setGenreActive('all'); }
  if (key === 'sort')   { state.sort  = 'popular';   document.getElementById('sort-select').value = 'popular'; }
  if (key === 'status') { state.status = 'all';      document.getElementById('status-select').value = 'all'; }
  if (key === 'query')  { state.query = '';           document.getElementById('browse-search').value = ''; updateSearchClear(); }
  state.page = 1; render();
}

function clearAllFilters() {
  state.genre = 'all'; state.sort = 'popular'; state.status = 'all'; state.query = '';
  state.page = 1;
  setGenreActive('all');
  document.getElementById('sort-select').value = 'popular';
  document.getElementById('status-select').value = 'all';
  document.getElementById('browse-search').value = '';
  updateSearchClear();
  render();
}

/* ══════════════════════════════════════════
   GENRE TABS
   ══════════════════════════════════════════ */
function setGenre(genre, btn) {
  state.genre = genre; state.page = 1;
  setGenreActive(genre);
  render();
}

function setGenreActive(genre) {
  document.querySelectorAll('.filter-btn[data-genre]').forEach(b => {
    b.classList.toggle('active', b.dataset.genre === genre);
  });
}

/* ══════════════════════════════════════════
   SORT & STATUS
   ══════════════════════════════════════════ */
function setSort(val) { state.sort = val; state.page = 1; render(); }
function setStatus(val) { state.status = val; state.page = 1; render(); }

/* ══════════════════════════════════════════
   VIEW TOGGLE
   ══════════════════════════════════════════ */
function setView(v) {
  state.view = v;
  document.getElementById('view-grid-btn').classList.toggle('active', v === 'grid');
  document.getElementById('view-list-btn').classList.toggle('active', v === 'list');
  render();
}

/* ══════════════════════════════════════════
   SEARCH
   ══════════════════════════════════════════ */
let searchTimer = null;
function onSearchInput(val) {
  state.query = val; state.page = 1;
  updateSearchClear();
  updateSuggestions(val);
  clearTimeout(searchTimer);
  searchTimer = setTimeout(render, 200);
}

function updateSearchClear() {
  document.getElementById('search-clear').classList.toggle('show', state.query.length > 0);
}

function clearSearch() {
  state.query = '';
  document.getElementById('browse-search').value = '';
  updateSearchClear();
  hideSuggestions();
  state.page = 1; render();
}

function updateSuggestions(q) {
  const box = document.getElementById('search-suggestions');
  if (!q.trim()) { hideSuggestions(); return; }

  const matches = comics.filter(c =>
    c.title.includes(q) || c.author.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 5);

  if (!matches.length) { hideSuggestions(); return; }

  box.innerHTML = matches.map(c => `
    <div class="suggestion-item" onclick="selectSuggestion('${c.title}')">
      <div class="suggestion-thumb">${svgCover(c.svgType, c.svgFill, c.color)}</div>
      <div class="suggestion-info">
        <div class="suggestion-title">${highlight(c.title, q)}</div>
        <div class="suggestion-meta">${c.genre} · ${toArabicNum(c.episodes)} فصل</div>
      </div>
    </div>`).join('');
  box.classList.add('show');
}

function highlight(text, q) {
  if (!q) return text;
  return text.replace(new RegExp(`(${q})`, 'gi'),
    `<span class="suggestion-match">$1</span>`);
}

function selectSuggestion(title) {
  document.getElementById('browse-search').value = title;
  state.query = title; state.page = 1;
  updateSearchClear();
  hideSuggestions();
  render();
}

function hideSuggestions() {
  document.getElementById('search-suggestions').classList.remove('show');
}

/* ══════════════════════════════════════════
   LOAD MORE
   ══════════════════════════════════════════ */
function loadMore() {
  state.page++;
  render();
  // smooth scroll hint
  document.getElementById('results-container').lastElementChild
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ══════════════════════════════════════════
   MOBILE NAV
   ══════════════════════════════════════════ */
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

/* ══════════════════════════════════════════
   INIT
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  render();
  initMobileNav();

  // Close suggestions on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.browse-search-wrap')) hideSuggestions();
  });

  // Read URL param ?genre=xxx
  const params = new URLSearchParams(location.search);
  if (params.get('genre')) {
    state.genre = params.get('genre');
    setGenreActive(state.genre);
    render();
  }
});