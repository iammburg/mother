import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import { useState } from "react";

import { navigationItems } from "~/constants/navigation";
import { cn } from "~/lib/utils";

export function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (open: boolean) => {
    setIsMobileMenuOpen(open);
    document.body.classList.toggle("mobile-menu-open", open);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="mobile-menu-button"
        aria-label="Buka menu navigasi"
        aria-expanded={isMobileMenuOpen}
        aria-controls="app-mobile-menu"
        onClick={() => toggleMobileMenu(true)}
      >
        <Menu aria-hidden="true" size={28} strokeWidth={3} />
      </button>

      {/* Desktop navbar — static (non-sticky) for subpages */}
      <nav
        className="home-nav risk-nav subpage-nav"
        aria-label="Navigasi utama"
      >
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href.startsWith("#") ? "/" : (item.href as any)}
            hash={
              item.href.startsWith("#")
                ? (item.href.slice(1) as any)
                : undefined
            }
            className="home-nav-link"
          >
            {item.label.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Link>
        ))}
      </nav>

      {/* Mobile menu backdrop */}
      <div
        className={cn(
          "mobile-menu-backdrop",
          isMobileMenuOpen && "visible",
        )}
        onClick={() => toggleMobileMenu(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <aside
        id="app-mobile-menu"
        className={cn("mobile-menu", isMobileMenuOpen && "open")}
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

        <nav className="mobile-menu-nav" aria-label="Navigasi mobile">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href.startsWith("#") ? "/" : (item.href as any)}
              hash={
                item.href.startsWith("#")
                  ? (item.href.slice(1) as any)
                  : undefined
              }
              className="mobile-menu-link"
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