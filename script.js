(function () {
  /**
   * CENTRAL EDITABLE CONTENT
   * Change letter text, timeline dates/captions, and music path here.
   * Do not invent real personal milestones — replace placeholders with your dates.
   */
  const CONTENT = {
    letter: "My Dearest Safi, My Love, My Forever Hero ❤️\n\nSab se pehle, thank you for becoming such a beautiful part of my life. Thank you for being my person, my happiness, and the one I pray to spend the rest of my life with. I pray that very soon Allah Pak blesses us with Nikah, and I get to call you my husband not just in my duas, but in every moment of my life. Aameen Summa Aameen. ❤️\n\nToday is your birthday, your special day, and honestly, I don't know how to make it as special as you deserve. I wish I could put all my love into a little gift and hand it over to you. Since I can't do that, here's a little piece of my heart, just for you.\n\nI love you, Safi. More than words could ever explain.\n\nYou are one of the most beautiful blessings Allah has given me. Sometimes I just sit and think about how lucky I am to have you in my life, and all I can say is Alhamdulillah. No matter how many times I thank Allah for you, it will never be enough.\n\nYou are my hero, my real-life superhero. Not because you have superpowers, but because of the person you are. The way you care for me, the way you show your love, your hard work, your responsibilities, the way you look after your parents, and how you try to manage everything with such sincerity. I admire all these little things about you. Your honesty, your kind heart, your efforts and your beautiful soul make me fall for you again and again. MashaAllah. ❤️\n\nI hope you know that I don't just love you; I respect you, admire you, and feel so proud of you. You are the man I want to stand beside, support, encourage, and love through every chapter of life. On your best days, your difficult days, your achievements and your struggles, I want to be the person who never stops choosing you.\n\nAnd Safi, I have so many little dreams with you. I want to celebrate your birthdays while sitting right beside you, wake up next to you, make your favourite food, annoy you with my endless calls, steal your attention, hold your hand, and make ordinary days feel special. I want to celebrate Eid with you, travel with you, make memories with you, and grow old with you.\n\nI pray that next year, when your birthday comes around, I get to celebrate it as your wife, with your Mama and Baba, all of us together. I don't want any of your happiness to be incomplete. I want to be part of your celebrations, your achievements, your little joys and every beautiful moment of your life.\n\nMy birthday duas for you:\n\nMay Allah bless you with endless success, happiness, good health, rizq, peace and barakah. May every sincere dream of yours come true. May Allah protect you from every difficulty, every evil eye and every sadness. May He always keep that beautiful smile on your face.\n\nAnd one special dua for us: May Allah keep us together in the most beautiful way. May our love grow stronger with every passing year. May we always find comfort in each other, understand each other, and never let anything come between us. May our relationship always be filled with loyalty, respect, patience and endless love.\n\nAnd if a third person ever becomes part of our little world, I pray it's our beautiful little family and our children. Aameen. 🥹❤️\n\nI don't know what the future holds, but I know what I pray for every day. I pray for you, for us, and for a lifetime where I get to love you as your wife.\n\nYou are my favourite person, my answered prayer in the making, my biggest admiration and the one who holds such a special place in my heart.\n\nI love you beyond these words, beyond this letter, and beyond what I could ever express.\n\nHappy Birthday, My Hero, My Love, My Safi.",
    milestones: [
      { icon: "🤝", date: "10 December 2025", caption: "Aapka first text aaya tha." },
      { icon: "💍", date: "20 December 2025", caption: "Tumne mujhe propose kiya." },
      { icon: "🎂", date: "16 March 2026", caption: "Mera birthday — best day with you." },
      { icon: "🌙", date: "20–21 March 2026", caption: "Best Eid together." },
      { icon: "♡", date: "27 May 2026", caption: "Eid-ul-Adha with you." },
      { icon: "📍", date: "29 August 2026", caption: "Pehli baar aap milne aaye — Rawalpindi." },
      { icon: "✨", date: "19 October 2026", caption: "Itni pareshani ke baad Lahore mein mile — best day." },
      { icon: "🎈", date: "Aapka Birthday", caption: "Aaj ka din mera favourite." },
    ],
  };

  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("navLinks");
  const menuBtn = document.getElementById("menuBtn");
  const musicBtn = document.getElementById("musicBtn");
  const song = document.getElementById("song");
  const openLetter = document.getElementById("openLetter");
  const closeLetter = document.getElementById("closeLetter");
  const letterModal = document.getElementById("letterModal");
  const letterBackdrop = document.getElementById("letterBackdrop");
  const letterSheet = document.getElementById("letterSheet");
  const sheetText = document.getElementById("sheetText");
  const polaroids = document.getElementById("polaroids");
  const timeline = document.getElementById("timeline");
  const blowBtn = document.getElementById("blowBtn");
  const wishReveal = document.getElementById("wishReveal");
  const candles = document.getElementById("candles");
  const wishSec = document.getElementById("wish");
  const petals = document.getElementById("petals");
  const fx = document.getElementById("fx");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbClose = document.getElementById("lbClose");

  const ctx = fx.getContext("2d");
  let particles = [];
  let animatingFx = false;

  function resizeFx() {
    fx.width = window.innerWidth;
    fx.height = window.innerHeight;
  }
  resizeFx();
  window.addEventListener("resize", resizeFx);

  // Nav
  window.addEventListener("scroll", () => {
    nav.classList.toggle("on", window.scrollY > 40);
    const sections = ["hero", "letter", "memories", "reasons", "story", "wish", "forever"];
    let current = "hero";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = id;
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href")?.slice(1);
      a.classList.toggle("active", href === current);
    });
  });

  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  // Music — autoplay on open, button to turn off/on
  let playing = false;
  let userStopped = false;

  function setMusicUI(on) {
    playing = on;
    musicBtn.classList.toggle("music-on", on);
    musicBtn.classList.toggle("music-off", !on);
    musicBtn.setAttribute("aria-pressed", on ? "true" : "false");
    musicBtn.setAttribute("aria-label", on ? "Turn music off" : "Turn music on");
  }

  async function startMusic() {
    if (userStopped) return false;
    try {
      song.muted = false;
      song.volume = 0.85;
      song.currentTime = song.currentTime || 0;
      await song.play();
      setMusicUI(true);
      return true;
    } catch (_) {
      return false;
    }
  }

  function stopMusic() {
    song.pause();
    setMusicUI(false);
  }

  // Try autoplay as soon as page loads
  startMusic().then((ok) => {
    if (ok) return;
    // Browsers often block autoplay — start on first tap/click anywhere
    const unlock = async () => {
      if (userStopped || playing) return;
      const started = await startMusic();
      if (started) {
        document.removeEventListener("pointerdown", unlock);
        document.removeEventListener("touchstart", unlock);
        document.removeEventListener("keydown", unlock);
      }
    };
    document.addEventListener("pointerdown", unlock, { passive: true });
    document.addEventListener("touchstart", unlock, { passive: true });
    document.addEventListener("keydown", unlock);
  });

  musicBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (playing) {
      userStopped = true;
      stopMusic();
    } else {
      userStopped = false;
      await startMusic();
    }
  });

  // Timeline from editable config
  CONTENT.milestones.forEach((m, i) => {
    const item = document.createElement("div");
    item.className = "t-item";
    item.style.transitionDelay = `${i * 0.12}s`;
    item.innerHTML = `
      <span class="t-dot"></span>
      <div>
        <h3><span class="t-icon">${m.icon || ""}</span>${m.date}</h3>
        <p>${m.caption}</p>
        ${m.editable ? '<span class="hint">Editable placeholder</span>' : ""}
      </div>`;
    timeline.appendChild(item);
  });

  const tItems = timeline.querySelectorAll(".t-item");
  const tObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        tObs.unobserve(e.target);
      });
    },
    { threshold: 0.25 }
  );
  tItems.forEach((el) => tObs.observe(el));

  // Letter open + fast typewriter — always fits exactly one page (no scroll)
  let typing = false;
  let typeTimer = null;
  function fitLetterToPage() {
    if (!sheetText || !letterSheet) return;
    sheetText.style.fontSize = "";
    sheetText.style.lineHeight = "1.18";
    let size = 11;
    sheetText.style.fontSize = size + "px";
    let guard = 80;
    while (sheetText.scrollHeight > sheetText.clientHeight && size > 6.5 && guard--) {
      size -= 0.15;
      sheetText.style.fontSize = size + "px";
    }
    // If still overflowing, tighten line-height a bit more
    if (sheetText.scrollHeight > sheetText.clientHeight) {
      sheetText.style.lineHeight = "1.12";
      guard = 40;
      while (sheetText.scrollHeight > sheetText.clientHeight && size > 6 && guard--) {
        size -= 0.1;
        sheetText.style.fontSize = size + "px";
      }
    }
  }
  function typeLetter() {
    if (typeTimer) clearTimeout(typeTimer);
    typing = true;
    sheetText.style.fontSize = "";
    sheetText.textContent = "";
    let i = 0;
    const text = CONTENT.letter;
    (function tick() {
      if (!typing) return;
      if (i >= text.length) {
        typing = false;
        fitLetterToPage();
        return;
      }
      const chunk = Math.min(28, text.length - i);
      sheetText.textContent += text.slice(i, i + chunk);
      i += chunk;
      typeTimer = setTimeout(tick, 2);
    })();
  }

  function openLetterModal() {
    letterModal.hidden = false;
    letterModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("letter-open");
    typeLetter();
    burstPetals(10);
  }

  function closeLetterModal() {
    letterModal.hidden = true;
    letterModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("letter-open");
    typing = false;
    if (typeTimer) clearTimeout(typeTimer);
  }
  window.addEventListener("resize", () => {
    if (!letterModal.hidden) fitLetterToPage();
  });

  openLetter.addEventListener("click", openLetterModal);
  closeLetter.addEventListener("click", closeLetterModal);
  letterBackdrop.addEventListener("click", closeLetterModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !letterModal.hidden) closeLetterModal();
  });

  // Memories: no fullscreen lightbox (same as journey polaroids)
  if (lbClose) lbClose.addEventListener("click", () => (lightbox.hidden = true));
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.hidden = true;
    });
  }

  // Reasons reveal
  const rCards = document.querySelectorAll(".r-card");
  const rio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = [...rCards].indexOf(e.target);
        setTimeout(() => e.target.classList.add("in"), i * 70);
        rio.unobserve(e.target);
      });
    },
    { threshold: 0.2 }
  );
  rCards.forEach((c) => rio.observe(c));

  // Reasons flip cards — height hugs text (no empty space when open)
  function fitFlippedCard(card) {
    const back = card.querySelector(".r-back");
    const p = back && back.querySelector("p");
    const rn = back && back.querySelector(".rn");
    if (!back || !p) return;
    const closedH = parseFloat(getComputedStyle(card).getPropertyValue("--closed-h")) || 168;
    const measure = document.createElement("div");
    measure.className = "r-back-measure";
    measure.style.setProperty("--measure-w", card.clientWidth + "px");
    const cs = getComputedStyle(p);
    measure.innerHTML =
      '<span class="rn" style="display:block;text-align:center;margin:0 0 0.15rem;font-size:' +
      (rn ? getComputedStyle(rn).fontSize : "0.65rem") +
      '">' +
      (rn ? rn.textContent : "") +
      "</span><p style=\"margin:0;font-size:" +
      cs.fontSize +
      ";line-height:" +
      cs.lineHeight +
      ";font-weight:" +
      cs.fontWeight +
      ";font-family:" +
      cs.fontFamily +
      '">' +
      p.textContent +
      "</p>";
    document.body.appendChild(measure);
    const need = Math.ceil(measure.scrollHeight + 4);
    measure.remove();
    const h = Math.max(closedH, need);
    card.style.height = h + "px";
    card.style.minHeight = h + "px";
  }
  function resetCardHeight(card) {
    card.style.height = "";
    card.style.minHeight = "";
  }
  rCards.forEach((card) => {
    const flip = () => {
      const open = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", open ? "true" : "false");
      if (open) {
        requestAnimationFrame(() => fitFlippedCard(card));
      } else {
        resetCardHeight(card);
      }
    };
    card.addEventListener("click", flip);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flip();
      }
    });
  });
  window.addEventListener("resize", () => {
    rCards.forEach((card) => {
      if (card.classList.contains("is-flipped")) fitFlippedCard(card);
    });
  });

  // Blow candles — real interaction
  blowBtn.addEventListener("click", () => {
    if (wishSec.classList.contains("blown")) return;
    wishSec.classList.add("blown");
    candles.classList.add("out");
    blowBtn.innerHTML = '<span class="wish-ico" aria-hidden="true">♡</span> Wish locked in';
    blowBtn.disabled = true;
    wishReveal.hidden = false;
    confettiBurst();
    burstPetals(24);
  });

  function confettiBurst() {
    const colors = ["#c9a66b", "#f4e8df", "#791f37", "#a64b5b", "#e8c98a"];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: fx.width / 2,
        y: fx.height * 0.55,
        vx: (Math.random() - 0.5) * 14,
        vy: -4 - Math.random() * 10,
        w: 4 + Math.random() * 6,
        h: 6 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.25,
        color: colors[(Math.random() * colors.length) | 0],
        life: 1,
      });
    }
    // soft smoke puffs
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: fx.width / 2 + (Math.random() - 0.5) * 80,
        y: fx.height * 0.42,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -0.6 - Math.random(),
        w: 18 + Math.random() * 24,
        h: 18 + Math.random() * 24,
        rot: 0,
        vr: 0,
        color: "rgba(200,200,200,0.18)",
        life: 1,
        smoke: true,
      });
    }
    if (!animatingFx) animateFx();
  }

  function animateFx() {
    animatingFx = true;
    ctx.clearRect(0, 0, fx.width, fx.height);
    particles = particles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.smoke ? 0.01 : 0.12;
      p.rot += p.vr;
      p.life -= p.smoke ? 0.008 : 0.01;
      if (p.life <= 0) return false;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      if (p.smoke) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
      return true;
    });
    if (particles.length) requestAnimationFrame(animateFx);
    else {
      animatingFx = false;
      ctx.clearRect(0, 0, fx.width, fx.height);
    }
  }

  // Petals
  function spawnPetal() {
    if (document.hidden) return;
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = 6 + Math.random() * 7 + "s";
    petals.appendChild(p);
    setTimeout(() => p.remove(), 14000);
  }
  function burstPetals(n) {
    for (let i = 0; i < n; i++) setTimeout(spawnPetal, i * 45);
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) setInterval(spawnPetal, 750);
})();
