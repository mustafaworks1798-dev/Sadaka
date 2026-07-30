let currentLang = 'ar';
let deferredPrompt = null;
let prayerTimesData = null;
let nextPrayerObj = null;

const supportedLangs = ['ar', 'en', 'fr', 'es', 'de', 'ru', 'tr', 'id'];

const translations = {
    ar: {
        prayerTitle: "مواقيت الصلاة",
        qiblaTitle: "اتجاه القبلة",
        hadithTitle: "حديث اليوم النبوي",
        adhkarHeaderTitle: "الأذكار والأدعية",
        settingsTitle: "الإعدادات والتنبيهات",
        notifText: "تفعيل إشعارات الصلاة والأذكار مع الأذان",
        nextPrayer: "الصلاة القادمة:",
        installText: "تثبيت تطبيق Sadaka على هاتفك لسهولة الوصول",
        installBtn: "تثبيت",
        shareText: "تطبيق Sadaka الصدقة الجارية - مواقيت الصلاة، الأذكار، والقبلة: ",
        tabs: { morning: "الصباح", evening: "المساء", sleep: "النوم", wakeup: "الاستيقاظ", travel: "السفر", mosque: "المسجد", food: "الطعام" },
        prayers: { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" }
    },
    en: {
        prayerTitle: "Prayer Times",
        qiblaTitle: "Qibla Direction",
        hadithTitle: "Daily Hadith",
        adhkarHeaderTitle: "Adhkar & Supplications",
        settingsTitle: "Settings & Notifications",
        notifText: "Enable Prayer & Adhkar Notifications with Adhan",
        nextPrayer: "Next prayer:",
        installText: "Install Sadaka app on your phone",
        installBtn: "Install",
        shareText: "Sadaka App - Prayer times, Adhkar and Qibla: ",
        tabs: { morning: "Morning", evening: "Evening", sleep: "Sleep", wakeup: "Waking", travel: "Travel", mosque: "Mosque", food: "Food" },
        prayers: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" }
    },
    fr: {
        prayerTitle: "Horaires des prières", qiblaTitle: "Direction de la Qibla", hadithTitle: "Hadith du jour", adhkarHeaderTitle: "Invocations", settingsTitle: "Paramètres", notifText: "Activer les notifications", nextPrayer: "Prochaine prière:", installText: "Installer l'application Sadaka", installBtn: "Installer", shareText: "Application Sadaka: ",
        tabs: { morning: "Matin", evening: "Soir", sleep: "Sommeil", wakeup: "Réveil", travel: "Voyage", mosque: "Mosquée", food: "Nourriture" },
        prayers: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" }
    },
    es: {
        prayerTitle: "Horarios de oración", qiblaTitle: "Dirección de la Qibla", hadithTitle: "Hadiz del día", adhkarHeaderTitle: "Adhkar", settingsTitle: "Ajustes", notifText: "Activar notificaciones", nextPrayer: "Próxima oración:", installText: "Instalar la aplicación Sadaka", installBtn: "Instalar", shareText: "App Sadaka: ",
        tabs: { morning: "Mañana", evening: "Tarde", sleep: "Dormir", wakeup: "Despertar", travel: "Viaje", mosque: "Mezquita", food: "Comida" },
        prayers: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" }
    },
    de: {
        prayerTitle: "Gebetszeiten", qiblaTitle: "Qibla-Richtung", hadithTitle: "Hadith des Tages", adhkarHeaderTitle: "Adhkar", settingsTitle: "Einstellungen", notifText: "Benachrichtigungen aktivieren", nextPrayer: "Nächstes Gebet:", installText: "Sadaka App installieren", installBtn: "Installieren", shareText: "Sadaka App: ",
        tabs: { morning: "Morgen", evening: "Abend", sleep: "Schlaf", wakeup: "Aufwachen", travel: "Reise", mosque: "Moschee", food: "Essen" },
        prayers: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" }
    },
    ru: {
        prayerTitle: "Время намаза", qiblaTitle: "Направление Киблы", hadithTitle: "Хадис дня", adhkarHeaderTitle: "Азкары", settingsTitle: "Настройки", notifText: "Включить уведомления", nextPrayer: "Следующая молитва:", installText: "Установить приложение Sadaka", installBtn: "Установить", shareText: "Приложение Sadaka: ",
        tabs: { morning: "Утро", evening: "Вечер", sleep: "Сон", wakeup: "Пробуждение", travel: "Путешествие", mosque: "Мечеть", food: "Еда" },
        prayers: { Fajr: "Фаджр", Dhuhr: "Зухр", Asr: "Аср", Maghrib: "Магриб", Isha: "Иша" }
    },
    tr: {
        prayerTitle: "Namaz Vakitleri", qiblaTitle: "Kıble Yönü", hadithTitle: "Günün Hadisi", adhkarHeaderTitle: "Zikirler", settingsTitle: "Ayarlar", notifText: "Bildirimleri Etkinleştir", nextPrayer: "Sonraki vakit:", installText: "Sadaka uygulamasını yükle", installBtn: "Yükle", shareText: "Sadaka Uygulaması: ",
        tabs: { morning: "Sabah", evening: "Akşam", sleep: "Uyku", wakeup: "Uyanma", travel: "Yolculuk", mosque: "Cami", food: "Yemek" },
        prayers: { Fajr: "İmsak", Dhuhr: "Öğle", Asr: "İkindi", Maghrib: "Akşam", Isha: "Yatsı" }
    },
    id: {
        prayerTitle: "Jadwal Sholat", qiblaTitle: "Arah Kiblat", hadithTitle: "Hadits Harian", adhkarHeaderTitle: "Dzikir & Doa", settingsTitle: "Pengaturan", notifText: "Aktifkan Notifikasi", nextPrayer: "Sholat berikutnya:", installText: "Instal aplikasi Sadaka", installBtn: "Instal", shareText: "Aplikasi Sadaka: ",
        tabs: { morning: "Pagi", evening: "Petang", sleep: "Tidur", wakeup: "Bangun", travel: "Bepergian", mosque: "Masjid", food: "Makanan" },
        prayers: { Fajr: "Subuh", Dhuhr: "Dzuhur", Asr: "Ashar", Maghrib: "Maghrib", Isha: "Isya" }
    }
};

// Register Service Worker (required for installability + offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered:', reg.scope))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguageAndFirstOpen();
    initPWA();
    fetchLocationAndPrayers();
    initCompass();
    loadDailyHadith();
    loadAdhkar('morning');
    setupEventListeners();
    initNotificationsOnStartup();
});

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('sadaka_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('sadaka_theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// Language Initialization (First open detection + fallback to English)
function initLanguageAndFirstOpen() {
    const savedLang = localStorage.getItem('sadaka_lang');
    if (savedLang) {
        currentLang = savedLang;
    } else {
        const browserLang = navigator.language ? navigator.language.slice(0, 2) : 'ar';
        if (supportedLangs.includes(browserLang)) {
            currentLang = browserLang;
        } else {
            currentLang = 'en'; // fallback if not supported
        }
        localStorage.setItem('sadaka_lang', currentLang);
    }

    const langSelect = document.getElementById('langSelect');
    langSelect.value = currentLang;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    updateStaticTexts();

    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('sadaka_lang', currentLang);
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        updateStaticTexts();
        loadDailyHadith();
        loadAdhkar(document.querySelector('.tab-btn.active').dataset.category);
        if (prayerTimesData) renderPrayerTimes(prayerTimesData);
    });
}

function updateStaticTexts() {
    const t = translations[currentLang] || translations['en'];
    document.getElementById('prayerTitle').innerText = t.prayerTitle;
    document.getElementById('qiblaTitle').innerText = t.qiblaTitle;
    document.getElementById('hadithTitle').innerText = t.hadithTitle;
    document.getElementById('adhkarHeaderTitle').innerText = t.adhkarHeaderTitle;
    document.getElementById('settingsTitle').innerText = t.settingsTitle;
    document.getElementById('notifSettingText').innerText = t.notifText;
    document.getElementById('nextPrayerLabel').innerText = t.nextPrayer;
    document.getElementById('installText').innerText = t.installText;
    document.getElementById('installBtn').innerText = t.installBtn;

    Object.keys(t.tabs).forEach(key => {
        const btn = document.querySelector(`.tab-btn[data-category="${key}"]`);
        if (btn) btn.innerText = t.tabs[key];
    });
}

// PWA Install Prompt
function initPWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('installBanner').classList.remove('hidden');
    });

    document.getElementById('installBtn').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                document.getElementById('installBanner').classList.add('hidden');
            }
            deferredPrompt = null;
        }
    });
}

// Geolocation & Prayer Times
let userLat = 21.3891;
let userLon = 39.8579;

function fetchLocationAndPrayers() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLat = position.coords.latitude;
            userLon = position.coords.longitude;
            calculateQibla(userLat, userLon);
            fetchPrayerTimes(userLat, userLon);
        }, () => {
            fetchPrayerTimes(userLat, userLon);
            calculateQibla(userLat, userLon);
            document.getElementById('locationName').innerText = "مكة المكرمة (الافتراضي)";
        });
    }
}

async function fetchPrayerTimes(lat, lon) {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`);
        const data = await response.json();
        prayerTimesData = data.data.timings;
        renderPrayerTimes(prayerTimesData);
        document.getElementById('locationName').innerText = `${data.data.meta.timezone}`;
        startCountdownEngine(prayerTimesData);
    } catch (error) {
        console.error("Error fetching prayer times:", error);
    }
}

function renderPrayerTimes(times) {
    const grid = document.getElementById('prayerTimesGrid');
    const activePrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    grid.innerHTML = '';

    activePrayers.forEach(prayer => {
        const timeStr = times[prayer];
        const t = translations[currentLang] || translations['en'];
        const translatedName = t.prayers[prayer] || prayer;
        const card = document.createElement('div');
        card.className = `prayer-card ${nextPrayerObj && nextPrayerObj.name === prayer ? 'active' : ''}`;
        card.innerHTML = `
            <div>${translatedName}</div>
            <div class="time">${timeStr}</div>
        `;
        grid.appendChild(card);
    });
}

// Countdown Engine & Next Prayer logic
function startCountdownEngine(times) {
    const activePrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    setInterval(() => {
        const now = new Date();
        let currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        
        let found = false;
        for (let prayer of activePrayers) {
            const [pHour, pMin] = times[prayer].split(':').map(Number);
            let pSeconds = pHour * 3600 + pMin * 60;
            
            if (pSeconds > currentSeconds) {
                let diff = pSeconds - currentSeconds;
                nextPrayerObj = { name: prayer, diff: diff };
                found = true;
                break;
            }
        }
        
        if (!found) {
            // If all prayers passed today, next is Fajr tomorrow
            const [pHour, pMin] = times['Fajr'].split(':').map(Number);
            let pSeconds = pHour * 3600 + pMin * 60;
            let diff = (24 * 3600 - currentSeconds) + pSeconds;
            nextPrayerObj = { name: 'Fajr', diff: diff };
        }

        updateCountdownDisplay();
    }, 1000);
}

function updateCountdownDisplay() {
    if (!nextPrayerObj) return;
    const t = translations[currentLang] || translations['en'];
    const translatedName = t.prayers[nextPrayerObj.name] || nextPrayerObj.name;
    
    document.getElementById('nextPrayerName').innerText = translatedName;
    
    let diff = nextPrayerObj.diff;
    let hours = Math.floor(diff / 3600);
    let minutes = Math.floor((diff % 3600) / 60);
    let seconds = diff % 60;
    
    const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('countdownTimer').innerText = formatted;
    
    if (diff <= 0) {
        triggerAdhanSoundAndNotification(translatedName);
    }
}

// Qibla Direction & Device Orientation (Fixed to update with location/device)
function calculateQibla(lat, lon) {
    const kaabaLat = 21.4225 * Math.PI / 180;
    const kaabaLon = 39.8262 * Math.PI / 180;
    const userLatRad = lat * Math.PI / 180;
    const userLonRad = lon * Math.PI / 180;

    const y = Math.sin(kaabaLon - userLonRad);
    const x = Math.cos(userLatRad) * Math.tan(kaabaLat) - Math.sin(userLatRad) * Math.cos(kaabaLon - userLonRad);
    let qibla = Math.atan2(y, x) * 180 / Math.PI;
    qibla = (qibla + 360) % 360;

    window.qiblaAngle = qibla;
    document.getElementById('qiblaText').innerText = `اتجاه القبلة: ${qibla.toFixed(1)}° من الشمال`;
}

function initCompass() {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            let compass = event.alpha; // compass direction
            if (event.webkitCompassHeading) {
                compass = event.webkitCompassHeading; // iOS support
            }
            if (compass !== null && window.qiblaAngle !== undefined) {
                let rotation = window.qiblaAngle - compass;
                document.getElementById('compassArrow').style.transform = `rotate(${rotation}deg)`;
            }
        }, true);
    }
}

// Load Hadith with fix for JSON format and errors
async function loadDailyHadith() {
    try {
        const response = await fetch('hediths.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const hadiths = data.hadiths || [];
        
        if (hadiths.length > 0) {
            const dayIndex = new Date().getDate() % hadiths.length;
            const hadith = hadiths[dayIndex];
            
            const contentObj = hadith.text || {};
            const refObj = hadith.narrator || {};
            
            const content = contentObj[currentLang] || contentObj['ar'] || Object.values(contentObj)[0] || "لا يوجد نص متاح";
            const ref = refObj[currentLang] || refObj['ar'] || Object.values(refObj)[0] || "";

            document.getElementById('hadithContent').innerText = content;
            document.getElementById('hadithReference').innerText = `- ${ref}`;
        }
    } catch (error) {
        console.error("Hadith loading error:", error);
        document.getElementById('hadithContent').innerText = "عذراً، تعذر جلب الأحاديث النبوية. تأكد من وجود ملف hediths.json بشكل صحيح.";
        document.getElementById('hadithReference').innerText = "";
    }
}

// Load Adhkar with redesigned modern cards
async function loadAdhkar(category) {
    try {
        const response = await fetch('adhkar.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const adhkarListContainer = document.getElementById('adhkarList');
        adhkarListContainer.innerHTML = '';

        const filtered = data.adhkar.filter(item => item.category === category);

        if (filtered.length === 0) {
            adhkarListContainer.innerHTML = `<p style="text-align:center; color: var(--text-muted);">لا توجد أذكار مضافة لهذا القسم بعد.</p>`;
            return;
        }

        filtered.forEach(item => {
            const contentObj = item.content || {};
            const refObj = item.reference || {};
            
            const content = contentObj[currentLang] || contentObj['ar'] || Object.values(contentObj)[0] || "";
            const ref = refObj[currentLang] || refObj['ar'] || Object.values(refObj)[0] || "";

            const div = document.createElement('div');
            div.className = 'dhikr-card';
            div.innerHTML = `
                <div class="dhikr-text">${content}</div>
                <div class="dhikr-bottom">
                    <span class="counter-badge">التكرار: ${item.repeat || 1}</span>
                    <span>${ref}</span>
                </div>
            `;
            adhkarListContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading adhkar:", error);
        document.getElementById('adhkarList').innerHTML = `<p style="text-align:center; color: var(--text-muted);">تعذر تحميل الأذكار. تأكد من ملف adhkar.json.</p>`;
    }
}

// Event Listeners & Share Button & Notifications Setup
function setupEventListeners() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabs.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadAdhkar(e.target.dataset.category);
        });
    });

    // Share Button ("مشاركة الاجر والصدقة")
    document.getElementById('shareBtn').addEventListener('click', async () => {
        const t = translations[currentLang] || translations['en'];
        const shareData = {
            title: 'Sadaka App',
            text: t.shareText,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("تم نسخ رابط موقع الصدقة الجارية بنجاح! جزاك الله خيراً.");
            }
        } catch (err) {
            console.log("Error sharing:", err);
        }
    });

    // Notifications Toggle
    const notifToggle = document.getElementById('notifToggle');
    notifToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            Notification.requestPermission().then(permission => {
                if (permission !== 'granted') {
                    e.target.checked = false;
                    localStorage.setItem('sadaka_notif', 'false');
                    alert("تم رفض إذن الإشعارات من المتصفح.");
                } else {
                    localStorage.setItem('sadaka_notif', 'true');
                }
            });
        } else {
            localStorage.setItem('sadaka_notif', 'false');
        }
    });
}

// Auto prompt notifications on startup
function initNotificationsOnStartup() {
    const notifToggle = document.getElementById('notifToggle');
    const savedNotif = localStorage.getItem('sadaka_notif');

    if (savedNotif === 'true') {
        notifToggle.checked = true;
    } else if (savedNotif === 'false') {
        notifToggle.checked = false;
    } else {
        // First time asking automatically
        if ("Notification" in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    notifToggle.checked = true;
                    localStorage.setItem('sadaka_notif', 'true');
                } else {
                    notifToggle.checked = false;
                    localStorage.setItem('sadaka_notif', 'false');
                }
            });
        }
    }
}

// Built-in Adhan sound simulation using Web Audio API + Push Notification
function triggerAdhanSoundAndNotification(prayerName) {
    if (localStorage.getItem('sadaka_notif') === 'true') {
        if (Notification.permission === 'granted') {
            new Notification("حان الآن وقت الصلاة", {
                body: `حين أذن لصلاة ${prayerName}. حي على الصلاة حي على الفلاح.`,
                icon: "icon.png"
            });
        }
        playAdhanTone();
    }
}

function playAdhanTone() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note simulation for Adhan beep/tone
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
        console.log("Audio Context not allowed without interaction yet.");
    }
}


