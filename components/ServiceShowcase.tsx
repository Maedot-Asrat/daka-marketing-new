"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/lib/data";

/**
 * Pinned, scroll-driven services reel (after baunfire.com's services block).
 * The stage sticks while the section scrolls by one screen per service: a huge
 * outlined title drifts behind, a tilted image wipes in and the copy swaps.
 * On phones it falls back to a simple stacked list.
 */
export default function ServiceShowcase({ items }: { items: Service[] }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 901px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      const progress = Math.max(0, Math.min(0.9999, -r.top / scrollable));
      const step = progress * items.length;
      const i = Math.floor(step);
      setActive(i);
      stage.current?.style.setProperty("--local", (step - i).toFixed(4));
      stage.current?.style.setProperty("--progress", progress.toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  // jump to a service: scroll to the middle of its screen
  const goTo = (i: number) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (scrollable * (i + 0.5)) / items.length, behavior: "smooth" });
  };

  return (
    <section ref={section} className="sx" style={{ "--count": items.length } as React.CSSProperties}>
      <div ref={stage} className="sx__stage">
        <div className="sx__ghosts" aria-hidden="true">
          {items.map((s, i) => (
            <span key={s.slug} className={`display ${i === active ? "is-active" : ""}`}>{s.title}</span>
          ))}
        </div>
        <div className="container sx__inner">
          <header className="sx__head">
            <h2 className="display sx__heading">What we do</h2>
            <ol className="sx__nav">
              {items.map((s, i) => (
                <li key={s.slug}>
                  <button type="button" onClick={() => goTo(i)} className={i === active ? "is-active" : ""} aria-current={i === active}>
                    <span>{String(i + 1).padStart(2, "0")}</span>{s.title}
                  </button>
                </li>
              ))}
            </ol>
            <span className="sx__bar" aria-hidden="true"><span /></span>
            <Link href="/services" className="u-link sx__all">All services</Link>
          </header>

          <div className="sx__panels">
            {items.map((s, i) => (
              <article key={s.slug} className={`sx__panel ${i === active ? "is-active" : ""} ${i < active ? "is-past" : ""}`}>
                <div className="sx__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt="" loading="lazy" />
                </div>
                <div className="sx__copy">
                  <span className="sx__count">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                  <h3 className="display sx__title">{s.title}</h3>
                  <p className="sx__short">{s.short}</p>
                  <ul className="tags">{s.tags.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
                  <Link href={`/services#${s.slug}`} className="u-link sx__more">Explore this service →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
