"use client";

import { RefObject, useEffect, useRef } from "react";

/**
 * The Daka fan, alive.
 *
 * Geometry is taken straight from the logo: 17 lines leave one shared origin
 * and end on a common vertical line. The first line is horizontal, the last is
 * at 45°, and the end points are evenly spaced *vertically* on that terminal
 * line (that's how the logo is drawn — the angles themselves get slightly
 * closer together towards the top, because tan() isn't linear).
 *
 * Each line is a string fixed at both ends; a travelling wave runs along it
 * and every line is phase-shifted from its neighbour, so the ripple rolls
 * across the whole fan. The pointer adds a soft local swell.
 */

const rgba = (c: string, a: number) => {
  const m = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return c;
  const h = m[1].length === 3 ? m[1].replace(/./g, "$&$&") : m[1];
  const n = parseInt(h, 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

type Pulse = { line: number; born: number; speed: number };

type Props = {
  /** Element whose bottom-right corner becomes the shared origin (like the
   *  end of "Daka" in the logo). If omitted the fan fills the right side. */
  anchorRef?: RefObject<HTMLElement | null>;
  /** Stretch the lines out to the right edge of the canvas (less a margin)
   *  instead of ending them on the logo's 45° terminal line. */
  bleed?: boolean;
  lines?: number;
  amplitude?: number; // px at the widest part of the wave
  className?: string;
  interactive?: boolean;
};

export default function FanWaves({ anchorRef, bleed = false, lines = 17, amplitude = 22, className, interactive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let ox = 0, oy = 0, ex = 0, span = 0;
    let color = "#2f3662", accent = "#ff5a36";
    let raf = 0, running = true, visible = true, hl = -1;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, energy: 0 };
    // small accent "signals" that travel outward along the lines
    const pulses: Pulse[] = [];
    let nextPulse = 1.6;
    const paths: Float32Array[] = Array.from({ length: lines }, () => new Float32Array(0));

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      color = cs.getPropertyValue("--fan").trim() || color;
      accent = cs.getPropertyValue("--accent").trim() || accent;
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const margin = Math.max(24, w * 0.05);
      ex = w - margin;
      const anchor = anchorRef?.current;
      if (anchor) {
        const a = anchor.getBoundingClientRect();
        const top = Math.max(96, h * 0.12); // keep clear of the header
        ox = a.right - rect.left + Math.max(10, w * 0.012);
        oy = a.bottom - rect.top - a.height * 0.06; // sit on the word's baseline
        span = Math.min(ex - ox, oy - top);
        if (span >= 120) {
          if (bleed) {
            ex = w - margin;   // run out to the right edge, keeping a margin
            span = Math.min(oy - top, (ex - ox) * 0.75); // up towards the header, never steeper than ~37°
          } else {
            ex = ox + span; // fan ends on its own vertical line, like the logo
          }
        } else {
          // Not enough room beside the word (phones): fan sits above the headline,
          // ending just above the element marked data-fan-top.
          const limit = anchor.closest("section")?.querySelector("[data-fan-top]") ?? anchor;
          oy = limit.getBoundingClientRect().top - rect.top - 18;
          span = Math.max(80, Math.min(ex - margin, oy - top));
          ox = ex - span;
          if (bleed) ex = w - margin;
        }
      } else {
        span = Math.min(w * 0.55, h - margin * 2.4);
        ox = ex - span;
        oy = h - margin * 1.2;
      }
      span = Math.max(span, 40);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      // ease pointer
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.energy *= 0.97;

      const maxAmp = Math.min(amplitude, span * 0.06);
      // lines fade in from the origin, where they crowd together
      const grad = ctx.createLinearGradient(ox, oy, ex, oy - span * 0.5);
      grad.addColorStop(0, rgba(color, 0.15));
      grad.addColorStop(0.35, rgba(color, 0.85));
      grad.addColorStop(1, rgba(color, 1));
      const steps = 90;
      const near = { idx: -1, d: Infinity };

      for (let i = 0; i < lines; i++) {
        // end point on the vertical terminal line, evenly spaced (logo geometry)
        const endY = oy - span * (i / (lines - 1)); // tan(45°) = 1
        const dx = ex - ox, dy = oy - endY;
        const L = Math.hypot(dx, dy);
        const ux = dx / L, uy = -dy / L;      // direction
        const nx = -uy, ny = ux;              // normal

        // intro: each line draws itself outward, staggered
        const intro = reduceMotion ? 1 : Math.min(1, Math.max(0, (t - 0.15 - i * 0.045) / 1.1));
        const eased = 1 - Math.pow(1 - intro, 3);
        if (eased <= 0) continue;
        const settle = reduceMotion ? 0 : Math.min(1, t / 2.2); // waves fade in after drawing

        ctx.beginPath();
        let minD = Infinity;
        const last = Math.floor(steps * eased);
        if (paths[i].length !== (steps + 1) * 2) paths[i] = new Float32Array((steps + 1) * 2);
        for (let s = 0; s <= last; s++) {
          const u = s / steps;                  // 0..1 along the line
          const env = Math.sin(Math.PI * u) * (0.35 + 0.65 * u); // fixed at both ends
          const phase = i * 0.42;
          let off =
            Math.sin(u * 9 - t * 2.1 + phase) * 0.75 +
            Math.sin(u * 4.3 + t * 1.3 + phase * 1.7) * 0.35;
          let px = ox + ux * L * u, py = oy + uy * L * u;

          if (interactive && pointer.x > -999) {
            const d = Math.hypot(px - pointer.x, py - pointer.y);
            if (d < minD) minD = d;
            const swell = Math.exp(-(d * d) / (2 * 110 * 110));
            off += swell * (1.4 + pointer.energy * 2.2) * Math.sin(u * 14 - t * 5 + phase);
          }

          const disp = off * env * maxAmp * settle;
          px += nx * disp; py += ny * disp;
          paths[i][s * 2] = px; paths[i][s * 2 + 1] = py;
          if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        if (minD < near.d) { near.d = minD; near.idx = i; }
        // the line closest to the pointer lights up in the accent colour
        const lit = i === hl;
        ctx.strokeStyle = lit ? accent : grad;
        ctx.lineWidth = Math.max(1, span / 520) * (lit ? 1.8 : 1);
        ctx.stroke();
      }
      hl = interactive && near.d < 28 ? near.idx : -1;

      // signals: a short bright tail running from the origin to the edge
      if (!reduceMotion && t > 2.4) {
        if (t > nextPulse) {
          pulses.push({ line: Math.floor(Math.random() * lines), born: t, speed: 0.28 + Math.random() * 0.18 });
          nextPulse = t + 0.9 + Math.random() * 1.4;
        }
        ctx.lineCap = "round";
        for (let k = pulses.length - 1; k >= 0; k--) {
          const p = pulses[k];
          const head = (t - p.born) * p.speed;
          if (head > 1.2) { pulses.splice(k, 1); continue; }
          const path = paths[p.line];
          const a = Math.max(0, Math.floor((head - 0.16) * steps)), b = Math.min(steps, Math.floor(head * steps));
          if (b - a < 2) continue;
          const tail = ctx.createLinearGradient(path[a * 2], path[a * 2 + 1], path[b * 2], path[b * 2 + 1]);
          tail.addColorStop(0, rgba(accent, 0));
          tail.addColorStop(1, accent);
          ctx.beginPath();
          for (let s = a; s <= b; s++) {
            if (s === a) ctx.moveTo(path[s * 2], path[s * 2 + 1]); else ctx.lineTo(path[s * 2], path[s * 2 + 1]);
          }
          ctx.strokeStyle = tail;
          ctx.lineWidth = Math.max(1.6, span / 300);
          ctx.stroke();
        }
        ctx.lineCap = "butt";
      }

      // origin dot, with a slow breathing halo
      const r0 = Math.max(2.5, span / 260);
      if (!reduceMotion) {
        const k = (t % 2.6) / 2.6;
        ctx.beginPath();
        ctx.strokeStyle = rgba(accent, 0.5 * (1 - k));
        ctx.lineWidth = 1;
        ctx.arc(ox, oy, r0 + k * r0 * 7, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.fillStyle = accent;
      ctx.arc(ox, oy, r0, 0, Math.PI * 2);
      ctx.fill();

      if (running && visible && !reduceMotion) raf = requestAnimationFrame(draw);
    };

    const loop = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };

    readColors();
    layout();
    loop();

    const ro = new ResizeObserver(() => { layout(); if (reduceMotion) loop(); });
    ro.observe(canvas);
    if (anchorRef?.current) ro.observe(anchorRef.current);

    const mo = new MutationObserver(() => { readColors(); if (reduceMotion) loop(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) loop();
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (pointer.tx > -999) pointer.energy = Math.min(1, pointer.energy + Math.hypot(x - pointer.tx, y - pointer.ty) / 400);
      else { pointer.x = x; pointer.y = y; }
      pointer.tx = x; pointer.ty = y;
    };
    const onLeave = () => { pointer.tx = pointer.ty = -9999; pointer.x = pointer.y = -9999; };
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    document.fonts?.ready.then(() => layout());

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect(); mo.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [anchorRef, bleed, lines, amplitude, interactive]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
