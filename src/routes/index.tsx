import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
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

function Home() {
  const [activeHref, setActiveHref] = useState("#home");
  const [activePill, setActivePill] = useState({ left: 0, width: 0 });
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActivePill, setMobileActivePill] = useState({ top: 0, height: 0 });
  const [typedTitle, setTypedTitle] = useState(heroTitle);
  const navLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const mobileLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeHrefRef = useRef("#home");

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

      window.requestAnimationFrame(() => {
        updateActivePill(href);
        updateMobileActivePill(href);
      });
    },
    [updateActivePill, updateMobileActivePill],
  );

  const smoothScrollTo = (targetTop: number) => {
    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const duration = 850;
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
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  const getCurrentSectionHref = useCallback(() => {
    const scrollAnchor = window.scrollY + window.innerHeight * 0.48;
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

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    setActiveSection(href);
    setIsMobileMenuOpen(false);
    window.history.pushState(null, "", href);
    smoothScrollTo(target.getBoundingClientRect().top + window.scrollY);
  };

  return (
    <main className={isHeroVisible ? "home-page home-page-ready" : "home-page"}>
      <section id="home" className="home-hero" aria-label="Beranda TOSS TB">
        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Buka menu navigasi"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu aria-hidden="true" size={28} strokeWidth={3} />
        </button>

        <nav
          className="home-nav"
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
            isMobileMenuOpen
              ? "mobile-menu-backdrop visible"
              : "mobile-menu-backdrop"
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

      <section id="toss" className="single-page-section">
        <h2>TOSS</h2>
      </section>
      <section id="cek-risiko" className="single-page-section">
        <h2>Cek Kehamilan Resiko Tinggi</h2>
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
