import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { navigationItems } from "~/constants/navigation";
import { cn } from "~/lib/utils";

export function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePill, setActivePill] = useState({ left: 0, width: 0 });
  const [mobileActivePill, setMobileActivePill] = useState({
    top: 0,
    height: 0,
  });
  const [isRouteAnimating, setIsRouteAnimating] = useState(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const navLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const mobileLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const previousPathnameRef = useRef(pathname);

  const normalizedPathname = normalizePath(pathname);
  const activeHref =
    navigationItems.find((item) =>
      isNavigationItemActive(item.href, item.activePaths, normalizedPathname),
    )?.href ?? "/";

  const updateActivePill = useCallback(() => {
    const activeIndex = navigationItems.findIndex(
      (item) => item.href === activeHref,
    );
    const activeLink = navLinkRefs.current[activeIndex];

    if (!activeLink) {
      return;
    }

    setActivePill({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
    });
  }, [activeHref]);

  const updateMobileActivePill = useCallback(() => {
    const activeIndex = navigationItems.findIndex(
      (item) => item.href === activeHref,
    );
    const activeLink = mobileLinkRefs.current[activeIndex];

    if (!activeLink) {
      return;
    }

    setMobileActivePill({
      top: activeLink.offsetTop,
      height: activeLink.offsetHeight,
    });
  }, [activeHref]);

  const toggleMobileMenu = (open: boolean) => {
    setIsMobileMenuOpen(open);
  };

  useEffect(() => {
    const updateLayout = () => {
      updateActivePill();
      updateMobileActivePill();
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateActivePill, updateMobileActivePill]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(updateMobileActivePill);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isMobileMenuOpen, updateMobileActivePill]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;
    setIsRouteAnimating(true);

    const routeAnimationTimer = window.setTimeout(() => {
      setIsRouteAnimating(false);
    }, 520);

    return () => window.clearTimeout(routeAnimationTimer);
  }, [pathname]);

  const navClassName =
    activeHref === "/"
      ? "home-nav"
      : activeHref === "/cek-risiko" ||
          activeHref === "/ibu-hamil-tanpa-tb" ||
          activeHref === "/education"
        ? "home-nav risk-nav"
        : "home-nav section-nav";

  return (
    <>
      <button
        type="button"
        className={cn(
          "mobile-menu-button",
          activeHref === "/toss" && "toss-active",
          isMobileMenuOpen && "menu-open",
        )}
        aria-label="Buka menu navigasi"
        aria-expanded={isMobileMenuOpen}
        aria-controls="app-mobile-menu"
        onClick={() => toggleMobileMenu(true)}
      >
        <Menu aria-hidden="true" size={28} strokeWidth={3} />
      </button>

      <nav
        className={cn(navClassName, isRouteAnimating && "nav-route-changing")}
        aria-label="Navigasi utama"
        style={
          {
            "--active-left": `${activePill.left}px`,
            "--active-width": `${activePill.width}px`,
          } as CSSProperties
        }
      >
        {navigationItems.map((item, index) => (
          <Link
            key={item.href}
            ref={(element) => {
              navLinkRefs.current[index] = element;
            }}
            to={item.href as any}
            className={cn(
              "home-nav-link",
              item.href === activeHref && "active",
            )}
          >
            {item.label.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Link>
        ))}
      </nav>

      <div
        className={cn("mobile-menu-backdrop", isMobileMenuOpen && "visible")}
        onClick={() => toggleMobileMenu(false)}
        aria-hidden="true"
      />

      <aside
        id="app-mobile-menu"
        className={cn(
          "mobile-menu",
          isMobileMenuOpen && "open",
          isRouteAnimating && "route-changing",
        )}
        aria-label="Menu navigasi mobile"
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-menu-close"
          aria-label="Tutup menu navigasi"
          onClick={() => toggleMobileMenu(false)}
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
            <Link
              key={item.href}
              ref={(element) => {
                mobileLinkRefs.current[index] = element;
              }}
              to={item.href as any}
              className={cn(
                "mobile-menu-link",
                item.href === activeHref && "active",
              )}
              onClick={() => toggleMobileMenu(false)}
            >
              {item.label.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function isNavigationItemActive(
  href: string,
  activePaths: string[] | undefined,
  currentPath: string,
) {
  const paths = [href, ...(activePaths ?? [])].map(normalizePath);

  return paths.some(
    (path) => currentPath === path || currentPath.startsWith(`${path}/`),
  );
}
