"use client";

import { useState } from "react";
import { showreel } from "@/lib/data";

/** Phone frame in the middle, clickable list of work on either side. */
export default function Showreel() {
  const [active, setActive] = useState(0);
  const [played, setPlayed] = useState(false);
  const left = showreel.slice(0, 4);
  const right = showreel.slice(4);

  const Item = ({ v, i }: { v: (typeof showreel)[number]; i: number }) => (
    <li>
      <button
        className={`reel__item ${active === i ? "is-active" : ""}`}
        onClick={() => { setActive(i); setPlayed(true); }}
        aria-pressed={active === i}
      >
        <span className="reel__type">{v.title}</span>
        <span className="reel__client">{v.client}</span>
        <span className="reel__bar" />
      </button>
    </li>
  );

  const v = showreel[active];
  return (
    <div className="reel">
      <ul className="reel__list">{left.map((x, i) => <Item key={x.id} v={x} i={i} />)}</ul>
      <div className="phone">
        <span className="phone__notch" />
        <iframe
          key={v.id + played}
          src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&playsinline=1${played ? "&autoplay=1" : ""}`}
          title={`${v.title} — ${v.client}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <ul className="reel__list">{right.map((x, i) => <Item key={x.id} v={x} i={i + 4} />)}</ul>
    </div>
  );
}
