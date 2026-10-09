"use client";

import { RefObject, useEffect } from "react";

/**
 * Drifts the first two children of `ref` in opposite directions while the
 * element scrolls past, so the left column leads on the way up and the right
 * column leads on the way down. Off on phones and for reduced motion.
 */
export default function useColumnParallax(ref: RefObject<HTMLElement | null>, strength = 140) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cols = Array.from(el.children).slice(0, 2) as HTMLElement[];
    const desktop = window.matchMedia("(min-width: 761px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches || reduced.matches) { cols.forEach((c) => (c.style.transform = "")); return; }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the element enters from below, +1 when it leaves at the top
      const progress = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (r.height / 2 + vh / 2)));
      const shift = Math.min(strength, vh * 0.14) * progress;
      cols[0].style.transform = `translate3d(0, ${(-shift).toFixed(1)}px, 0)`;
      cols[1]?.style.setProperty("transform", `translate3d(0, ${shift.toFixed(1)}px, 0)`);
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
  }, [ref, strength]);
}
