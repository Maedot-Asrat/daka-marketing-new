"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import FanWaves from "./FanWaves";
import { nav, site } from "@/lib/data";

/**
 * Minimal bar (after baunfire.com): logo, "Let's talk" and a round menu
 * button. The button opens a full-screen navigation page that grows out of it.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const [overDark, setOverDark] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
      // switch to the dark palette while the bar sits over a dark section (the home hero)
      const mid = (document.querySelector(".header")?.getBoundingClientRect().bottom ?? 0) / 2;
      setOverDark(Array.from(document.querySelectorAll("[data-dark-header]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      }));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    // the menu grows out of the button, wherever it sits
    const b = burger.current?.getBoundingClientRect();
    if (b && menu.current) {
      menu.current.style.setProperty("--mx", `${b.left + b.width / 2}px`);
      menu.current.style.setProperty("--my", `${b.top + b.height / 2}px`);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); burger.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [{ label: "Home", href: "/" }, ...nav];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""} ${open ? "is-menu-open" : ""} ${open || overDark ? "on-dark" : ""}`}>
        <div className="container header__inner">
          <Link href="/" className="header__logo" aria-label="Daka Marketing home">
            <Logo />
          </Link>
          <div className="header__actions">
            <ThemeToggle />
            <Link href="/contact" className="header__talk">Let’s talk</Link>
            <button
              ref={burger}
              className={`burger ${open ? "is-open" : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" ref={menu} className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open} role="dialog" aria-label="Site navigation">
        {open && <FanWaves className="menu__fan" amplitude={14} interactive={false} />}
        <div className="container menu__inner">
          <nav className="menu__nav" aria-label="Main">
            {links.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "is-active" : ""}
                style={{ transitionDelay: open ? `${260 + i * 60}ms` : "0ms" }}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                <span className="menu__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="menu__label">{item.label}</span>
              </Link>
            ))}
          </nav>
          <aside className="menu__side" style={{ transitionDelay: open ? "520ms" : "0ms" }}>
            <div>
              <p className="menu__eyebrow">Get in touch</p>
              <a href={`tel:${site.phone}`} tabIndex={open ? 0 : -1}>{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>{site.email}</a>
            </div>
            <div>
              <p className="menu__eyebrow">Office</p>
              <p>{site.office}</p>
            </div>
            <div>
              <p className="menu__eyebrow">Follow</p>
              <div className="menu__socials">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>{s.label}</a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
