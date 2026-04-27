/* ══════════════════════════════════════════
   WARAQ | ورق — Reader Page JS
   ══════════════════════════════════════════ */

'use strict';

/* ─── EPISODE TITLES ─── */
const epTitles = {
  38: 'الريح التي تسمّيني',
  37: 'خاتم الرمال',
  36: 'صوت تحت الجمر',
  35: 'وادي السبع أصداء',
  34: 'الظل الذي يسبقني',
  33: 'ليلة العروش المكسورة',
  32: 'دم الملوك',
  31: 'المدينة تحت الرمال',
  30: 'أسماء لا تُقال',
  29: 'جذور من نار',
  28: 'الخاتم الثالث',
  27: 'في عين العاصفة',
};

/* ─── CHAPTER DATA ─── */
const chapterData = {
  seriesTitle: 'ابن الصحراء',
  epNum: 38,
  epTitle: 'الريح التي تسمّيني',
  totalPages: 18,
  prevEp: 37,
  nextEp: null,
};

/* ─── STATE ─── */
let currentPage = 1;
const totalPages = chapterData.totalPages;
let mode = 'scroll';
let settingsOpen = false;
let commentsOpen = false;
let liked = false;
let bookmarked = false;
let hideTimer = null;
let lastScrollY = 0;
let barsVisible = true;

/* ─── UTILS ─── */
function toArabicNum(n) {
  return n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

/* ══════════════════════════════════════════
   PAGE SVG GENERATOR
   Generates 3 rotating panel layouts per page
   ══════════════════════════════════════════ */
function generatePageSVG(pageNum, total) {
  const bg  = `hsl(${20 + pageNum * 3},${15}%,${7 + (pageNum % 3)}%)`;
  const acc = '#FFD100';
  const txt = '#F5F0E8';
  const pageLabel = `<text x="400" y="1185" font-family="'Bebas Neue',sans-serif" font-size="18"
      fill="${acc}" opacity="0.4" text-anchor="middle" letter-spacing="3">${pageNum} / ${total}</text>`;

  const layouts = [
    /* ── Layout A: Full-bleed hero ── */
    () => `
      <rect width="800" height="1200" fill="${bg}"/>
      <defs>
        <radialGradient id="gA${pageNum}" cx="55%" cy="25%" r="55%">
          <stop offset="0%" stop-color="${acc}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
        <linearGradient id="fadeA${pageNum}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stop-color="transparent"/>
          <stop offset="100%" stop-color="${bg}"/>
        </linearGradient>
      </defs>
      <!-- sky panel -->
      <rect x="0" y="0" width="800" height="720" fill="hsl(${25+pageNum*4},20%,10%)"/>
      <rect x="0" y="0" width="800" height="720" fill="url(#gA${pageNum})"/>
      <!-- dunes -->
      <path d="M0 520 Q180 440 400 490 Q600 540 800 470 L800 720 L0 720Z" fill="hsl(35,28%,12%)"/>
      <path d="M0 580 Q150 530 360 555 Q560 580 800 530 L800 720 L0 720Z" fill="hsl(30,22%,9%)"/>
      <!-- figure -->
      <ellipse cx="400" cy="340" rx="30" ry="34" fill="${acc}" opacity="0.92"/>
      <path d="M362 376 Q400 358 438 376 L450 490 L350 490Z" fill="${acc}" opacity="0.85"/>
      <path d="M362 378 L326 455 L348 462 L368 398Z" fill="${acc}" opacity="0.75"/>
      <path d="M438 378 L474 455 L452 462 L432 398Z" fill="${acc}" opacity="0.75"/>
      <path d="M352 405 Q295 510 275 700 L415 672 Q365 548 378 405Z" fill="hsl(38,58%,30%)" opacity="0.8"/>
      <path d="M448 405 Q505 510 525 700 L385 672 Q420 548 422 405Z" fill="hsl(38,58%,30%)" opacity="0.8"/>
      <rect x="0" y="500" width="800" height="220" fill="url(#fadeA${pageNum})"/>
      <!-- dialogue box -->
      <rect x="40" y="740" width="720" height="110" rx="4"
        fill="rgba(0,0,0,0.72)" stroke="${acc}" stroke-width="1.5" stroke-opacity="0.35"/>
      <text x="60" y="784" font-family="serif" font-size="22" fill="${txt}" opacity="0.9">
        الريح لم تعد تحمل رمال...
      </text>
      <text x="60" y="818" font-family="serif" font-size="22" fill="${txt}" opacity="0.9">
        بل تحمل أسماء الموتى.
      </text>
      <!-- 3 small panels -->
      <rect x="40"  y="875" width="225" height="285" rx="3" fill="hsl(${22+pageNum*4},18%,11%)"/>
      <rect x="288" y="875" width="224" height="285" rx="3" fill="hsl(${28+pageNum*3},15%,9%)"/>
      <rect x="535" y="875" width="225" height="285" rx="3" fill="hsl(${32+pageNum*5},20%,12%)"/>
      <ellipse cx="152"  cy="980" rx="38" ry="42" fill="${acc}" opacity="0.75"/>
      <ellipse cx="400"  cy="1000" rx="34" ry="38" fill="hsl(${180+pageNum*10},50%,60%)" opacity="0.65"/>
      <ellipse cx="648"  cy="990" rx="36" ry="40" fill="${acc}" opacity="0.55"/>
      <!-- gutter lines -->
      <line x1="40" y1="863" x2="760" y2="863" stroke="${bg}" stroke-width="6"/>
      <line x1="275" y1="875" x2="275" y2="1160" stroke="${bg}" stroke-width="6"/>
      <line x1="523" y1="875" x2="523" y2="1160" stroke="${bg}" stroke-width="6"/>
      ${pageLabel}`,

    /* ── Layout B: 2×2 grid ── */
    () => `
      <rect width="800" height="1200" fill="${bg}"/>
      <defs>
        <linearGradient id="gB${pageNum}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${20+pageNum*7},25%,14%)"/>
          <stop offset="100%" stop-color="hsl(${30+pageNum*5},18%,8%)"/>
        </linearGradient>
      </defs>
      <!-- 4 panels -->
      <rect x="20" y="20"  width="372" height="570" rx="3" fill="url(#gB${pageNum})"/>
      <rect x="408" y="20" width="372" height="570" rx="3" fill="hsl(${25+pageNum*4},20%,10%)"/>
      <rect x="20" y="606" width="760" height="240" rx="3" fill="hsl(${30+pageNum*3},15%,9%)"/>
      <rect x="20" y="862" width="372" height="298" rx="3" fill="hsl(${35+pageNum*6},22%,11%)"/>
      <rect x="408" y="862" width="372" height="298" rx="3" fill="hsl(${20+pageNum*8},18%,10%)"/>
      <!-- Art -->
      <ellipse cx="206" cy="240" rx="${42+pageNum%10}" ry="${46+pageNum%8}" fill="${acc}" opacity="0.82"/>
      <path d="M164 286 Q206 268 248 286 L258 400 L154 400Z" fill="${acc}" opacity="0.72"/>
      <ellipse cx="594" cy="270" rx="48" ry="52" fill="hsl(200,60%,60%)" opacity="0.62"/>
      <!-- action lines top-right panel -->
      ${Array.from({length:10},(_,k)=>{
        const a=(k/10)*Math.PI; const cx=594,cy=270,r=100;
        return `<line x1="${cx+Math.cos(a)*20}" y1="${cy+Math.sin(a)*20}"
          x2="${cx+Math.cos(a)*r}" y2="${cy+Math.sin(a)*r}"
          stroke="${acc}" stroke-width="0.6" opacity="${0.04+k*0.018}"/>`;
      }).join('')}
      <!-- wide panel text -->
      <text x="400" y="688" font-family="serif" font-size="24"
        fill="${txt}" opacity="0.88" text-anchor="middle">— لا تخطو أبعد من هذا.</text>
      <!-- bottom panels -->
      ${Array.from({length:14},(_,k)=>{
        const x=20+(k*24); return `<line x1="${x}" y1="862" x2="${206}" y2="${1010}"
          stroke="${acc}" stroke-width="0.5" opacity="${0.03+k%4*0.012}"/>`;
      }).join('')}
      <ellipse cx="206" cy="1010" rx="38" ry="42" fill="${acc}" opacity="0.88"/>
      <ellipse cx="594" cy="990"  rx="36" ry="40" fill="hsl(280,50%,60%)" opacity="0.7"/>
      <!-- gutters -->
      <line x1="396" y1="20"  x2="396" y2="590"  stroke="${bg}" stroke-width="8"/>
      <line x1="20"  y1="594" x2="780" y2="594"  stroke="${bg}" stroke-width="8"/>
      <line x1="20"  y1="850" x2="780" y2="850"  stroke="${bg}" stroke-width="8"/>
      <line x1="396" y1="862" x2="396" y2="1160" stroke="${bg}" stroke-width="8"/>
      ${pageLabel}`,

    /* ── Layout C: large action + strip ── */
    () => `
      <rect width="800" height="1200" fill="${bg}"/>
      <defs>
        <radialGradient id="gC${pageNum}" cx="50%" cy="55%" r="58%">
          <stop offset="0%" stop-color="${acc}" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <!-- big action panel -->
      <rect x="20" y="20" width="760" height="760" rx="3" fill="hsl(${15+pageNum*6},20%,9%)"/>
      <rect x="20" y="20" width="760" height="760" fill="url(#gC${pageNum})"/>
      <!-- speed lines -->
      ${Array.from({length:22},(_,k)=>{
        const a=(k/22)*Math.PI*2; const cx=400,cy=400,r1=55,r2=375+(pageNum%5)*8;
        return `<line
          x1="${cx+Math.cos(a)*r1}" y1="${400+Math.sin(a)*r1}"
          x2="${cx+Math.cos(a)*r2}" y2="${400+Math.sin(a)*r2}"
          stroke="${acc}" stroke-width="${0.4+(k%4)*0.3}" opacity="${0.03+k%6*0.012}"/>`;
      }).join('')}
      <!-- central figure -->
      <ellipse cx="400" cy="305" rx="36" ry="40" fill="${acc}" opacity="0.95"/>
      <path d="M356 344 Q400 324 444 344 L458 510 L342 510Z" fill="${acc}" opacity="0.9"/>
      <path d="M356 346 L300 475 L330 485 L362 380Z" fill="${acc}" opacity="0.8"/>
      <path d="M444 346 L500 475 L470 485 L438 380Z" fill="${acc}" opacity="0.8"/>
      <!-- cape -->
      <path d="M345 400 Q285 520 262 750 L415 720 Q360 580 372 400Z" fill="hsl(38,58%,30%)" opacity="0.82"/>
      <path d="M455 400 Q515 520 538 750 L385 720 Q425 580 428 400Z" fill="hsl(38,58%,30%)" opacity="0.82"/>
      <!-- SFX watermark -->
      <text x="130" y="210" font-family="'Bebas Neue',sans-serif" font-size="100"
        fill="${acc}" opacity="0.08" transform="rotate(-12,130,210)">هجوم</text>
      <!-- 3 dialogue panels -->
      <rect x="20"  y="800" width="244" height="188" rx="3" fill="hsl(${22+pageNum*4},18%,11%)"/>
      <rect x="280" y="800" width="240" height="188" rx="3" fill="hsl(${28+pageNum*5},16%,10%)"/>
      <rect x="536" y="800" width="244" height="188" rx="3" fill="hsl(${18+pageNum*6},20%,9%)"/>
      <text x="142" y="868" font-family="serif" font-size="16"
        fill="${txt}" opacity="0.85" text-anchor="middle">أنا لن أتراجع!</text>
      <text x="400" y="876" font-family="serif" font-size="14"
        fill="${txt}" opacity="0.7" text-anchor="middle">إذن ستموت هنا.</text>
      <text x="658" y="872" font-family="serif" font-size="13"
        fill="${txt}" opacity="0.6" text-anchor="middle">لا... أنا أحميه.</text>
      <!-- face sketches in panels -->
      <ellipse cx="142" cy="926" rx="30" ry="34" fill="${acc}" opacity="0.6"/>
      <ellipse cx="400" cy="932" rx="28" ry="32" fill="hsl(200,50%,55%)" opacity="0.6"/>
      <ellipse cx="658" cy="930" rx="29" ry="33" fill="hsl(300,45%,55%)" opacity="0.6"/>
      <!-- bottom full-width panel -->
      <rect x="20" y="1006" width="760" height="154" rx="3" fill="hsl(${25+pageNum*3},15%,8%)"/>
      <text x="400" y="1078" font-family="serif" font-size="20"
        fill="${acc}" opacity="0.82" text-anchor="middle">لأول مرة في حياته... خاف.</text>
      <!-- gutter lines -->
      <line x1="20" y1="788" x2="780" y2="788" stroke="${bg}" stroke-width="8"/>
      <line x1="268" y1="800" x2="268" y2="988" stroke="${bg}" stroke-width="8"/>
      <line x1="524" y1="800" x2="524" y2="988" stroke="${bg}" stroke-width="8"/>
      <line x1="20" y1="994" x2="780" y2="994" stroke="${bg}" stroke-width="8"/>
      ${pageLabel}`,
  ];

  const svgContent = layouts[pageNum % 3]();
  return `<svg viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
}

/* ══════════════════════════════════════════
   EPISODE SELECTOR
   ══════════════════════════════════════════ */
function renderEpSelector() {
  const sel = document.getElementById('ep-selector');
  sel.innerHTML = '';
  for (let n = 38; n >= 1; n--) {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = `ف${toArabicNum(n)} — ${epTitles[n] || 'الفصل ' + toArabicNum(n)}`;
    if (n === chapterData.epNum) opt.selected = true;
    sel.appendChild(opt);
  }
  sel.addEventListener('change', function() {
    const n = parseInt(this.value);
    if (n !== chapterData.epNum) {
      alert(`في النسخة الحقيقية ستنتقل إلى الفصل ${toArabicNum(n)}`);
      this.value = chapterData.epNum;
    }
  });
}

/* ══════════════════════════════════════════
   SCROLL MODE
   ══════════════════════════════════════════ */
function renderScrollPages() {
  const container = document.getElementById('scroll-container');
  container.innerHTML = '';

  for (let p = 1; p <= totalPages; p++) {
    const wrap = document.createElement('div');
    wrap.className = 'page-img-wrap';
    wrap.dataset.page = p;
    wrap.innerHTML = generatePageSVG(p, totalPages);
    container.appendChild(wrap);
  }

  // End-of-chapter card
  const endCard = document.createElement('div');
  endCard.className = 'chapter-end-card show';
  endCard.innerHTML = `
    <div class="end-icon">◆</div>
    <div class="end-title">انتهى الفصل ${toArabicNum(chapterData.epNum)}</div>
    <div class="end-sub">${chapterData.epTitle}</div>
    <div class="end-actions">
      <a class="btn btn-outline btn-xl" href="series.html">العودة للقصة</a>
      <button class="btn btn-primary btn-xl" onclick="alert('الفصل التالي قريباً!')">الفصل القادم ◀</button>
    </div>`;
  container.appendChild(endCard);
}

function initScrollObserver() {
  const pill = document.getElementById('page-pill');
  let pillTimer = null;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && e.target.dataset.page) {
        currentPage = parseInt(e.target.dataset.page);
        updateProgress();

        // pill
        pill.textContent = `${toArabicNum(currentPage)} / ${toArabicNum(totalPages)}`;
        pill.classList.add('show');
        clearTimeout(pillTimer);
        pillTimer = setTimeout(() => pill.classList.remove('show'), 1600);
      }
    });
  }, { threshold: 0.35, rootMargin: '-5% 0px -45% 0px' });

  document.querySelectorAll('.page-img-wrap[data-page]').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════
   FLIP MODE
   ══════════════════════════════════════════ */
function renderFlipPages() {
  const stage = document.getElementById('flip-stage');
  stage.querySelectorAll('.flip-page').forEach(el => el.remove());

  for (let p = 1; p <= totalPages; p++) {
    const div = document.createElement('div');
    div.className = 'flip-page';
    div.dataset.page = p;
    div.innerHTML = generatePageSVG(p, totalPages);
    stage.appendChild(div);
  }
  showFlipPage(1);
}

function showFlipPage(pageNum) {
  currentPage = Math.max(1, Math.min(pageNum, totalPages));

  document.querySelectorAll('.flip-page').forEach(el => el.classList.remove('visible'));
  const target = document.querySelector(`.flip-page[data-page="${currentPage}"]`);
  if (target) target.classList.add('visible');

  // end card
  const endFlip = document.getElementById('end-card-flip');
  if (endFlip) endFlip.style.display = currentPage === totalPages ? 'flex' : 'none';

  // arrows
  const prevArrow = document.getElementById('prev-arrow'); // higher page (RTL "previous")
  const nextArrow = document.getElementById('next-arrow'); // lower page  (RTL "next")
  if (prevArrow) prevArrow.classList.toggle('disabled', currentPage >= totalPages);
  if (nextArrow) nextArrow.classList.toggle('disabled', currentPage <= 1);

  updateProgress();
}

// In RTL manga: right arrow goes to HIGHER page number, left arrow goes to LOWER
function flipPrev() { showFlipPage(currentPage + 1); } // right arrow → higher page
function flipNext() { showFlipPage(currentPage - 1); } // left arrow  → lower page

/* ══════════════════════════════════════════
   SHARED UI
   ══════════════════════════════════════════ */
function updateProgress() {
  const pct = (currentPage / totalPages) * 100;

  document.getElementById('progress-fill').style.width = pct + '%';

  const slider = document.getElementById('page-slider');
  slider.value = currentPage;
  slider.style.background =
    `linear-gradient(to left, var(--yellow) ${pct}%, var(--dark3) ${pct}%)`;

  document.getElementById('page-label').textContent =
    `${toArabicNum(currentPage)} / ${toArabicNum(totalPages)}`;
}

function onSliderChange(val) {
  currentPage = parseInt(val);
  if (mode === 'flip') {
    showFlipPage(currentPage);
  } else {
    const target = document.querySelector(`.page-img-wrap[data-page="${currentPage}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ─── MODE SWITCH ─── */
function setMode(m) {
  mode = m;
  const scrollView = document.getElementById('scroll-view');
  const flipView   = document.getElementById('flip-view');
  const pill       = document.getElementById('page-pill');
  const modeScroll = document.getElementById('mode-scroll');
  const modeFlip   = document.getElementById('mode-flip');

  modeScroll.classList.toggle('active', m === 'scroll');
  modeFlip.classList.toggle('active', m === 'flip');

  if (m === 'scroll') {
    scrollView.style.display = 'flex';
    flipView.classList.remove('active');
    pill.style.display = '';
    const target = document.querySelector(`.page-img-wrap[data-page="${currentPage}"]`);
    if (target) target.scrollIntoView();
  } else {
    scrollView.style.display = 'none';
    flipView.classList.add('active');
    pill.style.display = 'none';
    showFlipPage(currentPage);
  }

  // sync settings panel buttons
  document.querySelectorAll('.settings-opt-btn[data-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === m);
  });
}

/* ─── READING WIDTH ─── */
function setWidth(w) {
  const scrollView = document.getElementById('scroll-view');
  scrollView.className = `reader-scroll-view width-${w}`;
  document.querySelectorAll('.settings-opt-btn[data-width]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.width === w);
  });
}

/* ─── BARS AUTO-HIDE ─── */
function initBarsAutoHide() {
  const topBar  = document.getElementById('reader-top-bar');
  const botBar  = document.getElementById('reader-bottom-bar');
  const progBar = document.getElementById('reader-progress-bar');

  function showBars() {
    barsVisible = true;
    topBar.classList.remove('hidden');
    botBar.classList.remove('hidden');
    progBar.classList.remove('bar-hidden');
    if (mode === 'scroll') {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hideBars, 3200);
    }
  }
  function hideBars() {
    barsVisible = false;
    topBar.classList.add('hidden');
    botBar.classList.add('hidden');
    progBar.classList.add('bar-hidden');
  }

  window.addEventListener('scroll', () => {
    if (mode !== 'scroll') return;
    const dir = window.scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = window.scrollY;
    if (dir === 'down' && window.scrollY > 160) hideBars();
    else showBars();
  }, { passive: true });

  // Tap anywhere in flip mode to toggle bars
  document.getElementById('flip-view').addEventListener('click', e => {
    if (e.target.closest('.flip-arrow') || e.target.closest('.chapter-end-card')) return;
    barsVisible ? hideBars() : showBars();
  });

  // Initial auto-hide for scroll mode
  hideTimer = setTimeout(hideBars, 3200);
}

/* ─── KEYBOARD ─── */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { if (mode === 'flip') flipPrev(); }
    if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   { if (mode === 'flip') flipNext(); }
    if (e.key === 'f' || e.key === 'F') setMode(mode === 'flip' ? 'scroll' : 'flip');
    if (e.key === 'Escape') { closeSettings(); closeComments(); }
  });
}

/* ─── SETTINGS ─── */
function toggleSettings() {
  settingsOpen = !settingsOpen;
  document.getElementById('settings-panel').classList.toggle('open', settingsOpen);
  if (settingsOpen && commentsOpen) closeComments();
}
function closeSettings() {
  settingsOpen = false;
  document.getElementById('settings-panel').classList.remove('open');
}

/* ─── COMMENTS DRAWER ─── */
function toggleComments() {
  commentsOpen = !commentsOpen;
  document.getElementById('comments-drawer').classList.toggle('open', commentsOpen);
  document.getElementById('comments-toggle-btn').classList.toggle('active', commentsOpen);
  if (commentsOpen && settingsOpen) closeSettings();
}
function closeComments() {
  commentsOpen = false;
  document.getElementById('comments-drawer').classList.remove('open');
  document.getElementById('comments-toggle-btn').classList.remove('active');
}

function renderDrawerComments() {
  const list = document.getElementById('drawer-comments-list');
  const items = [
    { u: 'خالد',   c: '#00e5a0', t: 'منذ ساعة',    likes: 47,  text: 'نظرية: دانة هي نسل الملك الأول. كل الإشارات موجودة من الفصل ١٠! 🤯' },
    { u: 'أم.ق',   c: '#FFD100', t: 'منذ ٣ ساعات', likes: 142, text: 'الفصل الأخير كسر قلبي! ما توقعت إن سالم يعرف الحقيقة بهالطريقة 🔥' },
    { u: 'ريم_ق',  c: '#a78bfa', t: 'أمس',         likes: 89,  text: 'المشهد بين سالم والعجوز نور... الأفضل في القصة كلها بدون منافس.' },
    { u: 'سارة.ف', c: '#f472b6', t: 'منذ يومين',   likes: 34,  text: 'نورة العتيبي كاتبة استثنائية. أتمنى تترجم لغات ثانية!' },
    { u: 'م.ع',    c: '#38bdf8', t: 'منذ ٣ أيام',   likes: 21,  text: 'الرسم في هذا الفصل من الله. كيف ينقل ماجد الحجم والمسافة بهالطريقة؟' },
  ];
  list.innerHTML = items.map((c, i) => `
    <div class="drawer-comment-item">
      <div class="drawer-comment-avatar" style="background:${c.c}">${c.u[0]}</div>
      <div class="drawer-comment-body">
        <div class="drawer-comment-meta">
          <span class="drawer-comment-user">${c.u}</span>
          <span class="drawer-comment-time">${c.t}</span>
        </div>
        <div class="drawer-comment-text">${c.text}</div>
        <div class="drawer-comment-actions">
          <button class="drawer-comment-like" id="dlk-${i}" onclick="toggleDrawerLike(${i},${c.likes})">
            ♥ ${toArabicNum(c.likes)}
          </button>
          <button class="drawer-comment-like">↩ رد</button>
        </div>
      </div>
    </div>`).join('');
}

function toggleDrawerLike(idx, base) {
  const btn = document.getElementById(`dlk-${idx}`);
  if (!btn) return;
  const liked = btn.classList.toggle('liked');
  btn.textContent = `♥ ${toArabicNum(base + (liked ? 1 : 0))}`;
}

/* ─── LIKE / BOOKMARK ─── */
function toggleLike() {
  liked = !liked;
  document.getElementById('like-btn').classList.toggle('liked', liked);
}
function toggleBookmark() {
  bookmarked = !bookmarked;
  document.getElementById('bookmark-btn').classList.toggle('active', bookmarked);
}

/* ══════════════════════════════════════════
   INIT
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderEpSelector();
  renderScrollPages();
  renderFlipPages();
  renderDrawerComments();

  document.getElementById('page-slider').max = totalPages;
  updateProgress();

  initScrollObserver();
  initBarsAutoHide();
  initKeyboard();

  // Width buttons
  document.querySelectorAll('.settings-opt-btn[data-width]').forEach(btn => {
    btn.addEventListener('click', () => setWidth(btn.dataset.width));
  });

  // Settings mode buttons
  document.querySelectorAll('.settings-opt-btn[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  // Close settings on outside click
  document.addEventListener('click', e => {
    if (settingsOpen &&
        !e.target.closest('#settings-panel') &&
        !e.target.closest('#settings-btn')) {
      closeSettings();
    }
  });

  // Swipe support for flip mode (touch)
  let touchStartX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    if (mode !== 'flip') return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) flipPrev(); // swipe left → next page (RTL: higher num)
    else         flipNext(); // swipe right → prev page
  });

  // Init flip end card visibility
  document.getElementById('end-card-flip').style.display = 'none';
});