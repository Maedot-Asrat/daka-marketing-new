"use client";

import { useRef } from "react";
import FanWaves from "./FanWaves";
import ArrowButton from "./ArrowButton";
import { site } from "@/lib/data";

export default function Hero() {
  // The fan's 17 lines start where "DIGITAL" ends — the same way they leave
  // the last letter of "Daka" in the logo.
  const anchor = useRef<HTMLSpanElement>(null); // measured on the untransformed line wrapper

  return (
    <section className="hero on-dark" data-dark-header>
      <FanWaves anchorRef={anchor} bleed className="hero__fan" amplitude={18} />
      <div className="container hero__inner">
        <p className="eyebrow hero__badge" data-fan-top>
          <span className="dot" /> Number #1 Digital Marketing Company in Ethiopia
        </p>
        <h1 className="hero__title">
          <span className="hero__line"><span>We do</span></span>
          <span className="hero__line" ref={anchor}><span>Digital</span></span>
          <span className="hero__line"><span>Marketing</span></span>
        </h1>
        <div className="hero__foot">
          <p>For public and private companies — from the strategy to generating millions.</p>
          <div className="hero__actions">
            <ArrowButton href={`tel:${site.phone}`}>Call now</ArrowButton>
            <ArrowButton href="/work" variant="outline">See our work</ArrowButton>
          </div>
        </div>
      </div>
      <a href="#intro" className="hero__scroll" aria-label="Scroll down"><span className="hero__scroll-line"><span /></span><span className="hero__scroll-text">Scroll</span></a>
    </section>
  );
}
