"use client";

import { useEffect, useRef } from "react";

/** Fades/slides children in when they scroll into view. */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: {
  children: React.ReactNode; as?: React.ElementType; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}
