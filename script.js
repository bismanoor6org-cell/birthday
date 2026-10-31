(function () {
  /**
   * CENTRAL EDITABLE CONTENT
   * Change letter text, timeline dates/captions, and music path here.
   * Do not invent real personal milestones — replace placeholders with your dates.
   */
  const CONTENT = {
    letter: `My Dearest Safi,
Sab se pehle thank you — ke aap meri zindagi ka hissa bane, mera shohar bane.
Main dua karti hoon jaldi aap mujh se nikah kar lein. Aameen.
Aaj aapka birthday hai, aur aapki zindagi ka special din.
Mujhe nahi samajh aa raha ke main aapka din kaise special karoon, lekin ek chhoti si koshish ki hai.
I love you, Safi.
Aap is duniya ke behtareen insaan hain — mere liye Allah Pak ka diya behtareen tohfa hain.
Aur main Allah ka dil se shukar ada karti hoon ke Allah ne mujhe aapse nawaza. Alhamdulillah — jitna shukar ada kar loon, kam hai. Be-shak.
Aap mere liye hero hain — the way aap meri care karte ho, mujh se mohabbat karte ho, jaise mehnat karte ho, parents ka khayal rakhte ho, har kaam zimmedari se karte ho — aap mere superhero ho.
Jaise superhero har kaam karta hai, aap bilkul waisa hi ho — sachcha, imandaar, naik dil. MashaAllah.
Maine aaj tak kisi ko nahi kaha: mere liye aap mere husband aur mere superhero ho.
Aap mera sab kuch ho, aur main aapse behad mohabbat karti hoon.
Mera sab kuch tum ho — I love you sooo soo much.
Allah aapko bohot kamyabi de, bohot khushiyan de, bohot achhi sehat de, aur jab tak main zinda hoon mere sar par aapka saya salamat rakhe. Aameen.
Hamesha hum dono ko ek saath khush rakhe; hum dono mein mohabbat kabhi kam na ho, hamara darmiyan kabhi koi teesra na aaye. Aameen.
Agar koi teesra aaye to woh hamari aulaad ho. Aameen.
I love you, hero — samajh nahi aa raha kya likhoon… bas yeh ke tum mere ho, aur mere sajde ki pehli dua ho.
I love you Safi ❤️
Happy Birthday, Jan`,
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
      song.volume = 0.85;
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
    sheetText.style.lineHeight = "1.28";
    const base = parseFloat(getComputedStyle(sheetText).fontSize) || 14;
    let size = Math.max(base, 13);
    sheetText.style.fontSize = size + "px";
    let guard = 60;
    // Grow until almost fills the page (leave tiny bottom margin)
    while (
      sheetText.scrollHeight < sheetText.clientHeight * 0.94 &&
      size < 18 &&
      guard--
    ) {
      size += 0.2;
      sheetText.style.fontSize = size + "px";
    }
    guard = 60;
    // Shrink if anything overflows
    while (sheetText.scrollHeight > sheetText.clientHeight && size > 9 && guard--) {
      size -= 0.2;
      sheetText.style.fontSize = size + "px";
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
      const chunk = Math.min(6, text.length - i);
      sheetText.textContent += text.slice(i, i + chunk);
      i += chunk;
      typeTimer = setTimeout(tick, 6);
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
