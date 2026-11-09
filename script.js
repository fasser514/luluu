/* ========== القلوب المتطايرة ========== */
const heartEmojis = ['❤️','💕','💖','💗','💘'];
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
  heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7500);
}
setInterval(createHeart, 300);

/* ==========================================
   🎵 الأغنية — تشغيل تلقائي + استكمال بين الصفحات
   ========================================== */
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const MUSIC_TIME_KEY = 'bgMusicTime';

// استرجاع الوقت المحفوظ (لو المستخدم كان في صفحة تانية)
if (music) {
  const savedTime = localStorage.getItem(MUSIC_TIME_KEY);
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }
  music.volume = 0.4;

  // حفظ الوقت كل نص ثانية عشان نكمل من نفس المكان
  music.addEventListener('timeupdate', () => {
    localStorage.setItem(MUSIC_TIME_KEY, music.currentTime);
  });

  // محاولة التشغيل التلقائي فوراً
  function tryAutoPlay() {
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (musicBtn) musicBtn.textContent = '⏸️';
      }).catch(() => {
        // المتصفح رفض — نستنى أول تفاعل
        waitForInteraction();
      });
    }
  }

  // لو المتصفح رفض، نستنى أول لمسة أو ضغطة أو حركة
  function waitForInteraction() {
    const events = ['click', 'touchstart', 'keydown', 'mousemove', 'scroll'];
    const startOnInteraction = () => {
      music.play().then(() => {
        if (musicBtn) musicBtn.textContent = '⏸️';
      }).catch(() => {});
      events.forEach(ev => document.removeEventListener(ev, startOnInteraction));
    };
    events.forEach(ev => document.addEventListener(ev, startOnInteraction, { once: true, passive: true }));
  }

  tryAutoPlay();

  // زرار التحكم
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (music.paused) {
        music.play();
        musicBtn.textContent = '⏸️';
      } else {
        music.pause();
        musicBtn.textContent = '🎵';
      }
    });
  }
}

/* ========== فحص الباسوورد ========== */
const passwordInput = document.getElementById('passwordInput');
if (passwordInput) {
  passwordInput.focus();
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
}

function checkPassword() {
  const input = document.getElementById('passwordInput');
  if (!input) return;
  const entered = input.value.trim();
  const correct = '3182025';

  if (entered === correct) {
    window.location.href = 'message.html';
  } else {
    input.style.borderColor = '#ff0000';
    input.value = '';
    input.placeholder = 'كلمة السر غلط... جربي تاني 💔';
    setTimeout(() => {
      input.style.borderColor = '#ff6b9d';
      input.placeholder = 'كلمة السر...';
    }, 2000);
  }
}