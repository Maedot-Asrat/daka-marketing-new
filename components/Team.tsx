"use client";

import { useEffect, useState } from "react";
import { team } from "@/lib/data";

/** Team cards: photo, muted video preview on hover, full video in a dialog. */
export default function Team() {
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <ul className="team">
        {team.map((m, i) => (
          <li key={m.name}>
            <button
              className="team__card"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => setOpen(i)}
              aria-label={`Watch ${m.name}'s intro`}
            >
              <span className="team__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.photo} alt={m.name} loading="lazy" />
                {hover === i && (
                  <iframe
                    className="team__preview"
                    src={`https://www.youtube-nocookie.com/embed/${m.video}?autoplay=1&mute=1&loop=1&playlist=${m.video}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                    title=""
                    allow="autoplay"
                    tabIndex={-1}
                  />
                )}
                <span className="team__play" aria-hidden="true">▶</span>
              </span>
              <span className="team__name">{m.name}</span>
              <span className="team__role">{m.role}</span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={team[open].name} onClick={() => setOpen(null)}>
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <div className="modal__video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${team[open].video}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={team[open].name}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="modal__meta">
              <h3>{team[open].name}</h3>
              <p>{team[open].role}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
