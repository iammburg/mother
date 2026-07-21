import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "T O S S", href: "#toss" },
  { label: "Cek Kehamilan\nResiko Tinggi", href: "#cek-risiko" },
  { label: "Informasi\nKehamilan", href: "#informasi-kehamilan" },
  { label: "Ibu Hamil\nTanpa TB", href: "#ibu-hamil-tanpa-tb" },
  { label: "Deteksi Dini TB", href: "#deteksi-dini-tb" },
  { label: "Education", href: "#education" },
  { label: "Quiz", href: "#quiz" },
];

const heroTitle = "Ibu hamil bebas TBC";

const tossCards = [
  "Merupakan Kampanye untuk Temukan Tuberkolosis, Obati Sampai Sembuh TBC di Indonesia.",
  "Kampanye untuk menemukan, mendiagnosis, mengobati, dan menyembuhkan pasien TBC serta menghentikan penularan TBC di masyarakat.",
  "TOSS TBC menargetkan 90% penurunan insiden TBC dan 95% penurunan kematian TBC pada tahun 2030.",
];

const riskCheckCards = [
  {
    title: "Pemeriksaan Mandiri",
    image: "/assets/images/pemeriksaan_mandiri.avif",
  },
  {
    title: "Pemeriksaan Resiko",
    image: "/assets/images/pemeriksaan_resiko.avif",
  },
];

type TossAutoGlowState = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  targetX: number;
  targetY: number;
  targetScale: number;
  targetOpacity: number;
  nextTargetAt: number;
  speed: number;
};

const initialTossGlowStates: TossAutoGlowState[] = [
  { x: 12, y: 16, scale: 1, opacity: 0.64, targetX: 72, targetY: 34, targetScale: 1.12, targetOpacity: 0.8, nextTargetAt: 0, speed: 0.011 },
  { x: 82, y: 12, scale: 0.92, opacity: 0.6, targetX: 24, targetY: 62, targetScale: 1.18, targetOpacity: 0.76, nextTargetAt: 0, speed: 0.009 },
  { x: 48, y: 72, scale: 1.12, opacity: 0.58, targetX: 88, targetY: 84, targetScale: 0.96, targetOpacity: 0.72, nextTargetAt: 0, speed: 0.01 },
  { x: 8, y: 84, scale: 0.9, opacity: 0.62, targetX: 64, targetY: 22, targetScale: 1.08, targetOpacity: 0.78, nextTargetAt: 0, speed: 0.012 },
  { x: 88, y: 68, scale: 1.04, opacity: 0.56, targetX: 34, targetY: 8, targetScale: 1.16, targetOpacity: 0.74, nextTargetAt: 0, speed: 0.0095 },
];

function Home() {
  const [activeHref, setActiveHref] = useState("#home");
  const [activePill, setActivePill] = useState({ left: 0, width: 0 });
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTossPointerActive, setIsTossPointerActive] = useState(false);
  const [mobileActivePill, setMobileActivePill] = useState({ top: 0, height: 0 });
  const [typedTitle, setTypedTitle] = useState(heroTitle);
  const navLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const mobileLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const tossAutoGlowRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tossSectionRef = useRef<HTMLElement | null>(null);
  const isTossPointerActiveRef = useRef(false);
  const tossAutoGlowStatesRef = useRef<TossAutoGlowState[]>(
    initialTossGlowStates.map((state) => ({ ...state })),
  );
  const tossAutoGlowAnimationFrameRef = useRef<number | null>(null);
  const activeHrefRef = useRef("#home");
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  const updateActivePill = useCallback((href: string) => {
    const activeIndex = navigationItems.findIndex((item) => item.href === href);
    const activeLink = navLinkRefs.current[activeIndex];

    if (!activeLink) {
      return;
    }

    setActivePill({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
    });
  }, []);

  const updateMobileActivePill = useCallback((href: string) => {
    const activeIndex = navigationItems.findIndex((item) => item.href === href);
    const activeLink = mobileLinkRefs.current[activeIndex];

    if (!activeLink) {
      return;
    }

    setMobileActivePill({
      top: activeLink.offsetTop,
      height: activeLink.offsetHeight,
    });
  }, []);

  const setActiveSection = useCallback(
    (href: string) => {
      activeHrefRef.current = href;
      setActiveHref((currentHref) => (currentHref === href ? currentHref : href));
      updateActivePill(href);
      updateMobileActivePill(href);

      window.requestAnimationFrame(() => {
        updateActivePill(href);
        updateMobileActivePill(href);
      });
    },
    [updateActivePill, updateMobileActivePill],
  );

  const smoothScrollTo = (targetTop: number, targetHref?: string) => {
    if (scrollAnimationFrameRef.current) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
    }

    isProgrammaticScrollRef.current = true;
    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const isMobileViewport = window.matchMedia("(max-width: 900px)").matches;
    const maxDuration = isMobileViewport ? 560 : 760;
    const duration = Math.min(maxDuration, Math.max(320, Math.abs(distance) * 0.42));
    let startTime: number | null = null;

    const easeInOutCubic = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const animateScroll = (currentTime: number) => {
      startTime ??= currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, startTop + distance * easeInOutCubic(progress));

      if (progress < 1) {
        scrollAnimationFrameRef.current =
          window.requestAnimationFrame(animateScroll);
        return;
      }

      window.scrollTo(0, targetTop);
      scrollAnimationFrameRef.current = null;
      isProgrammaticScrollRef.current = false;
      setActiveSection(targetHref ?? getCurrentSectionHref());
    };

    scrollAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
  };

  const getCurrentSectionHref = useCallback(() => {
    const scrollAnchor = window.scrollY + window.innerHeight * 0.1;
    let currentHref = "#home";

    navigationItems.forEach((item) => {
      const section = document.querySelector<HTMLElement>(item.href);

      if (section && section.offsetTop <= scrollAnchor) {
        currentHref = item.href;
      }
    });

    return currentHref;
  }, []);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIsHeroVisible(true);
    }, 120);

    let typingTimer: number | undefined;
    const typingStartTimer = window.setTimeout(() => {
      let characterIndex = heroTitle.length;
      let isDeleting = true;

      const runTypingLoop = () => {
        if (isDeleting) {
          characterIndex -= 1;
          setTypedTitle(heroTitle.slice(0, characterIndex));

          if (characterIndex <= 0) {
            isDeleting = false;
            typingTimer = window.setTimeout(runTypingLoop, 450);
            return;
          }

          typingTimer = window.setTimeout(runTypingLoop, 52);
          return;
        }

        characterIndex += 1;
        setTypedTitle(heroTitle.slice(0, characterIndex));

        if (characterIndex >= heroTitle.length) {
          isDeleting = true;
          typingTimer = window.setTimeout(runTypingLoop, 1800);
          return;
        }

        typingTimer = window.setTimeout(runTypingLoop, 92);
      };

      runTypingLoop();
    }, 2300);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(typingStartTimer);

      if (typingTimer) {
        window.clearTimeout(typingTimer);
      }
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.classList.toggle("mobile-menu-open", isMobileMenuOpen);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updateActiveHref = () => {
      const hash = window.location.hash;
      const hashTarget = hash
        ? document.querySelector<HTMLElement>(hash)
        : null;

      setActiveSection(hashTarget ? hash : getCurrentSectionHref());
    };
    let scrollFrame: number | undefined;

    const updateActiveHrefFromScroll = () => {
      if (isProgrammaticScrollRef.current) {
        return;
      }

      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = undefined;
        setActiveSection(getCurrentSectionHref());
      });
    };

    const updateLayoutOnResize = () => {
      updateActivePill(activeHrefRef.current);
      updateMobileActivePill(activeHrefRef.current);
      updateActiveHrefFromScroll();
    };

    updateActiveHref();
    updateActiveHrefFromScroll();
    window.addEventListener("hashchange", updateActiveHref);
    window.addEventListener("scroll", updateActiveHrefFromScroll, {
      passive: true,
    });
    window.addEventListener("resize", updateLayoutOnResize);

    return () => {
      window.removeEventListener("hashchange", updateActiveHref);
      window.removeEventListener("scroll", updateActiveHrefFromScroll);
      window.removeEventListener("resize", updateLayoutOnResize);

      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
    };
  }, [
    getCurrentSectionHref,
    setActiveSection,
    updateActivePill,
    updateMobileActivePill,
  ]);

  useEffect(() => {
    updateActivePill(activeHref);
    updateMobileActivePill(activeHref);
  }, [activeHref, updateActivePill, updateMobileActivePill]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      updateMobileActivePill(activeHref);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeHref, isMobileMenuOpen, updateMobileActivePill]);

  useEffect(() => {
    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const chooseNewGlowTarget = (glow: TossAutoGlowState, now: number) => {
      glow.targetX = randomBetween(-12, 112);
      glow.targetY = randomBetween(-8, 108);
      glow.targetScale = randomBetween(0.92, 1.28);
      glow.targetOpacity = randomBetween(0.68, 0.88);
      glow.nextTargetAt = now + randomBetween(3200, 6200);
    };

    const animateAutoGlows = (now: number) => {
      tossAutoGlowStatesRef.current.forEach((glow, index) => {
        if (now >= glow.nextTargetAt) {
          chooseNewGlowTarget(glow, now);
        }

        glow.x += (glow.targetX - glow.x) * glow.speed;
        glow.y += (glow.targetY - glow.y) * glow.speed;
        glow.scale += (glow.targetScale - glow.scale) * glow.speed;
        glow.opacity += (glow.targetOpacity - glow.opacity) * glow.speed;

        const glowElement = tossAutoGlowRefs.current[index];

        if (!glowElement) {
          return;
        }

        glowElement.style.left = `${glow.x.toFixed(2)}%`;
        glowElement.style.top = `${glow.y.toFixed(2)}%`;
        glowElement.style.opacity = glow.opacity.toFixed(3);
        glowElement.style.transform = `translate3d(-50%, -50%, 0) scale(${glow.scale.toFixed(3)})`;
      });

      tossAutoGlowAnimationFrameRef.current =
        window.requestAnimationFrame(animateAutoGlows);
    };

    tossAutoGlowStatesRef.current.forEach((glow, index) => {
      chooseNewGlowTarget(glow, performance.now() + index * 240);
    });
    tossAutoGlowAnimationFrameRef.current =
      window.requestAnimationFrame(animateAutoGlows);

    return () => {
      if (tossAutoGlowAnimationFrameRef.current) {
        window.cancelAnimationFrame(tossAutoGlowAnimationFrameRef.current);
      }
    };
  }, []);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    const sectionTop = target instanceof HTMLElement
      ? target.offsetTop
      : target.getBoundingClientRect().top + window.scrollY;
    const isMobileViewport = window.matchMedia("(max-width: 900px)").matches;
    const mobileSectionCorrection =
      isMobileViewport && href !== "#home"
        ? Math.min(18, Math.max(0, window.innerHeight * 0.025))
        : 0;
    const maxScrollTop =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetTop = Math.min(
      sectionTop + mobileSectionCorrection,
      maxScrollTop,
    );

    setIsMobileMenuOpen(false);
    document.body.classList.remove("mobile-menu-open");
    window.history.pushState(null, "", href);
    setActiveSection(href);
    smoothScrollTo(targetTop, href);
  };

  const handleTossPointerMove = (event: PointerEvent<HTMLElement>) => {
    const section = tossSectionRef.current;

    if (!section) {
      return;
    }

    if (event.pointerType !== "touch" && !isTossPointerActiveRef.current) {
      isTossPointerActiveRef.current = true;
      setIsTossPointerActive(true);
    }

    const bounds = section.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;

    section.style.setProperty("--toss-pointer-x", `${pointerX.toFixed(2)}%`);
    section.style.setProperty("--toss-pointer-y", `${pointerY.toFixed(2)}%`);
  };

  const handleTossPointerLeave = () => {
    const section = tossSectionRef.current;

    if (!section) {
      return;
    }

    isTossPointerActiveRef.current = false;
    setIsTossPointerActive(false);
  };

  const navClassName =
    activeHref === "#home"
      ? "home-nav"
      : activeHref === "#cek-risiko"
        ? "home-nav risk-nav"
        : "home-nav section-nav";

  return (
    <main className={isHeroVisible ? "home-page home-page-ready" : "home-page"}>
      <button
        type="button"
        className={
          activeHref === "#toss"
            ? "mobile-menu-button toss-active"
            : "mobile-menu-button"
        }
        aria-label="Buka menu navigasi"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu aria-hidden="true" size={28} strokeWidth={3} />
      </button>

      <nav
        className={navClassName}
        aria-label="Navigasi utama"
        style={
          {
            "--active-left": `${activePill.left}px`,
            "--active-width": `${activePill.width}px`,
          } as CSSProperties
        }
      >
        {navigationItems.map((item, index) => (
          <a
            key={item.href}
            ref={(element) => {
              navLinkRefs.current[index] = element;
            }}
            href={item.href}
            className={
              item.href === activeHref ? "home-nav-link active" : "home-nav-link"
            }
            onClick={(event) => handleNavigation(event, item.href)}
          >
            {item.label.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </a>
        ))}
      </nav>

      <div
        className={
          isMobileMenuOpen ? "mobile-menu-backdrop visible" : "mobile-menu-backdrop"
        }
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-menu"
        className={isMobileMenuOpen ? "mobile-menu open" : "mobile-menu"}
        aria-label="Menu navigasi mobile"
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-menu-close"
          aria-label="Tutup menu navigasi"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <ArrowRight aria-hidden="true" size={28} strokeWidth={3} />
        </button>

        <nav
          className="mobile-menu-nav"
          aria-label="Navigasi mobile"
          style={
            {
              "--mobile-active-top": `${mobileActivePill.top}px`,
              "--mobile-active-height": `${mobileActivePill.height}px`,
            } as CSSProperties
          }
        >
          {navigationItems.map((item, index) => (
            <a
              key={item.href}
              ref={(element) => {
                mobileLinkRefs.current[index] = element;
              }}
              href={item.href}
              className={
                item.href === activeHref
                  ? "mobile-menu-link active"
                  : "mobile-menu-link"
              }
              onClick={(event) => handleNavigation(event, item.href)}
            >
              {item.label.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </a>
          ))}
        </nav>
      </aside>

      <section id="home" className="home-hero" aria-label="Beranda TOSS TB">
        <div className="home-copy">
          <h1 className="home-title" aria-label={heroTitle}>
            <span className="home-title-text" aria-hidden="true">
              {typedTitle}
            </span>
            <span className="typing-caret" aria-hidden="true" />
          </h1>
          <p className="home-subtitle">Bayi sehat tanpa TBC</p>
          <strong className="home-tagline">
            TOSS TB : Temukan, Obati, Sampai tuntas
          </strong>
        </div>
      </section>

      <section
        id="toss"
        ref={tossSectionRef}
        className={
          isTossPointerActive
            ? "toss-section toss-pointer-active"
            : "toss-section"
        }
        aria-labelledby="toss-title"
        onPointerMove={handleTossPointerMove}
        onPointerLeave={handleTossPointerLeave}
      >
        <div className="toss-glow-layer" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((glowNumber, index) => (
            <span
              key={glowNumber}
              ref={(element) => {
                tossAutoGlowRefs.current[index] = element;
              }}
              className={`toss-auto-glow toss-auto-glow-${glowNumber}`}
            />
          ))}
          <span className="toss-cursor-glow" />
        </div>

        <div className="toss-content">
          <h2 id="toss-title">Apa itu TOSS TBC ?</h2>

          <div className="toss-logo-shell" aria-hidden="true">
            <img
              src="/assets/images/toss_tbc_icon.avif"
              alt=""
              className="toss-logo"
            />
          </div>

          <div className="toss-card-grid">
            {tossCards.map((card) => (
              <article className="toss-card" key={card}>
                <p>{card}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="cek-risiko"
        className="risk-check-section"
        aria-labelledby="risk-check-title"
      >
        <h2 id="risk-check-title" className="sr-only">
          Cek Kehamilan Resiko Tinggi
        </h2>
        <div className="risk-check-grid">
          {riskCheckCards.map((card) => (
            <article className="risk-check-card" key={card.title}>
              <div className="risk-check-image-frame">
                <img src={card.image} alt="" className="risk-check-image" />
              </div>
              <h3>{card.title}</h3>
            </article>
          ))}
        </div>
      </section>
      <section id="informasi-kehamilan" className="single-page-section">
        <h2>Informasi Kehamilan</h2>
      </section>
      <section id="ibu-hamil-tanpa-tb" className="single-page-section">
        <h2>Ibu Hamil Tanpa TB</h2>
      </section>
      <section id="deteksi-dini-tb" className="single-page-section">
        <h2>Deteksi Dini TB</h2>
      </section>
      <section id="education" className="single-page-section">
        <h2>Education</h2>
      </section>
      <section id="quiz" className="single-page-section">
        <h2>Quiz</h2>
      </section>
    </main>
  );
}
