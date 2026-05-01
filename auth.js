/* ══════════════════════════════════════════
   WARAQ | ورق — Auth Page JS
   ══════════════════════════════════════════ */

'use strict';

/* ─── TAB SWITCHING ─── */
let currentTab = 'login';

function switchTab(tab) {
  currentTab = tab;

  // Update tab buttons
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');

  // Show/hide forms
  ['login','register','forgot','success'].forEach(f => {
    const el = document.getElementById(`form-${f}`);
    if (el) el.classList.toggle('hidden', f !== tab);
  });

  // Update page title
  document.title = tab === 'login'
    ? 'تسجيل الدخول | ورق WARAQ'
    : 'إنشاء حساب | ورق WARAQ';
}

function showForgot() {
  ['login','register','forgot','success'].forEach(f => {
    document.getElementById(`form-${f}`)?.classList.add('hidden');
  });
  document.getElementById('form-forgot').classList.remove('hidden');
}

function showSuccess(title, sub) {
  ['login','register','forgot'].forEach(f => {
    document.getElementById(`form-${f}`)?.classList.add('hidden');
  });
  document.getElementById('success-title').textContent = title;
  document.getElementById('success-sub').textContent   = sub;
  document.getElementById('form-success').classList.remove('hidden');
}


/* ─── VALIDATION HELPERS ─── */
function setError(id, msg) {
  const input = document.getElementById(id);
  const err   = document.getElementById(`${id}-err`);
  if (input) input.classList.add('error');
  if (err)   err.textContent = msg;
}

function clearFieldError(id) {
  const input = document.getElementById(id);
  const err   = document.getElementById(`${id}-err`);
  if (input) { input.classList.remove('error'); input.classList.remove('success'); }
  if (err)   err.textContent = '';
}

function setSuccess(id) {
  const input = document.getElementById(id);
  if (input) { input.classList.remove('error'); input.classList.add('success'); }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(pw) {
  return pw.length >= 8;
}


/* ─── PASSWORD STRENGTH ─── */
function updateStrength(pw) {
  const bar   = document.getElementById('strength-bar');
  const fill  = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');

  if (!pw) {
    bar.classList.remove('show');
    label.classList.remove('show');
    return;
  }

  bar.classList.add('show');
  label.classList.add('show');

  let score = 0;
  if (pw.length >= 8)              score++;
  if (pw.length >= 12)             score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;

  const levels = [
    { pct: '20%', color: '#ff4d4d', text: 'ضعيفة جداً' },
    { pct: '40%', color: '#ff8c42', text: 'ضعيفة' },
    { pct: '60%', color: '#ffd100', text: 'متوسطة' },
    { pct: '80%', color: '#84cc16', text: 'جيدة' },
    { pct:'100%', color: '#00e5a0', text: 'قوية جداً ✓' },
  ];

  const lvl = levels[Math.min(score, 4)];
  fill.style.width      = lvl.pct;
  fill.style.background = lvl.color;
  label.textContent     = lvl.text;
  label.style.color     = lvl.color;
}


/* ─── USERNAME CHECK (simulated) ─── */
let usernameTimer = null;
const takenNames  = ['ورق', 'admin', 'waraq', 'مدير', 'سالم', 'دانة'];

function checkUsername(val) {
  const hint = document.getElementById('reg-username-hint');
  const err  = document.getElementById('reg-username-err');
  clearTimeout(usernameTimer);

  if (!val || val.length < 3) {
    hint.textContent = '';
    return;
  }

  hint.textContent = 'جاري التحقق...';
  hint.style.color = 'var(--gray)';

  usernameTimer = setTimeout(() => {
    if (takenNames.includes(val.toLowerCase())) {
      err.textContent  = 'هذا الاسم محجوز، جرّب اسماً آخر';
      hint.textContent = '';
      document.getElementById('reg-username').classList.add('error');
    } else {
      hint.textContent = '✓ الاسم متاح';
      hint.style.color = '#00e5a0';
      document.getElementById('reg-username').classList.add('success');
    }
  }, 600);
}


/* ─── TOGGLE PASSWORD VISIBILITY ─── */
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.style.color = isText ? '' : 'var(--yellow)';
}


/* ─── SOCIAL AUTH ─── */
function handleSocial(provider) {
  const btn = event.currentTarget;
  btn.style.opacity = '0.6';
  btn.style.pointerEvents = 'none';

  setTimeout(() => {
    btn.style.opacity = '';
    btn.style.pointerEvents = '';
    showSuccess(
      `تم الربط مع ${provider} ✓`,
      'في النسخة الحقيقية سيتم تحويلك لإتمام الدخول. تم إعادتك للنسخة التجريبية.'
    );
  }, 1200);
}


/* ─── SUBMIT: LOGIN ─── */
function submitLogin() {
  let valid = true;

  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;

  clearFieldError('login-email');
  clearFieldError('login-password');

  if (!email) {
    setError('login-email', 'البريد الإلكتروني مطلوب'); valid = false;
  } else if (!validateEmail(email)) {
    setError('login-email', 'صيغة البريد غير صحيحة'); valid = false;
  }

  if (!pass) {
    setError('login-password', 'كلمة المرور مطلوبة'); valid = false;
  } else if (!validatePassword(pass)) {
    setError('login-password', 'كلمة المرور قصيرة جداً'); valid = false;
  }

  if (!valid) return;

  // Simulate loading
  const btn = document.getElementById('login-btn');
  btn.classList.add('loading');
  btn.querySelector('span').style.opacity = '0';

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.querySelector('span').style.opacity = '';
    showSuccess(
      'مرحباً بعودتك! 👋',
      'تم تسجيل دخولك بنجاح. سيتم تحويلك للصفحة الرئيسية.'
    );
    setTimeout(() => window.location.href = 'index.html', 2000);
  }, 1500);
}


/* ─── SUBMIT: REGISTER ─── */
function submitRegister() {
  let valid = true;

  const username = document.getElementById('reg-username').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const pass     = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const terms    = document.getElementById('terms-check').checked;

  ['reg-username','reg-email','reg-password','reg-confirm'].forEach(clearFieldError);
  document.getElementById('terms-err').textContent = '';

  if (!username || username.length < 3) {
    setError('reg-username', 'الاسم يجب أن يكون ٣ أحرف على الأقل'); valid = false;
  }
  if (!email) {
    setError('reg-email', 'البريد الإلكتروني مطلوب'); valid = false;
  } else if (!validateEmail(email)) {
    setError('reg-email', 'صيغة البريد غير صحيحة'); valid = false;
  }
  if (!pass) {
    setError('reg-password', 'كلمة المرور مطلوبة'); valid = false;
  } else if (!validatePassword(pass)) {
    setError('reg-password', 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل'); valid = false;
  }
  if (pass && confirm !== pass) {
    setError('reg-confirm', 'كلمتا المرور غير متطابقتين'); valid = false;
  }
  if (!terms) {
    document.getElementById('terms-err').textContent = 'يجب الموافقة على الشروط للمتابعة';
    valid = false;
  }

  if (!valid) return;

  const btn = document.getElementById('register-btn');
  btn.classList.add('loading');
  btn.querySelector('span').style.opacity = '0';

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.querySelector('span').style.opacity = '';
    showSuccess(
      'أهلاً بك في ورق! ✨',
      `تم إنشاء حسابك بنجاح يا ${username}. تحقق من بريدك لتفعيل الحساب.`
    );
  }, 1600);
}


/* ─── SUBMIT: FORGOT PASSWORD ─── */
function submitForgot() {
  const email = document.getElementById('forgot-email').value.trim();
  const err   = document.getElementById('forgot-email-err');
  err.textContent = '';

  if (!email) {
    err.textContent = 'البريد الإلكتروني مطلوب'; return;
  }
  if (!validateEmail(email)) {
    err.textContent = 'صيغة البريد غير صحيحة'; return;
  }

  showSuccess(
    'تم إرسال الرابط 📧',
    `تحقق من بريدك ${email}. الرابط صالح لمدة ٣٠ دقيقة.`
  );
}


/* ─── KEYBOARD SUPPORT ─── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (currentTab === 'login')    submitLogin();
  if (currentTab === 'register') submitRegister();
});