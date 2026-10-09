"use client";

import { useState } from "react";
import type { Service } from "@/lib/data";

/** Numbered, expanding service rows (Baunfire-style capabilities list). */
export default function ServiceList({ items, openFirst = false }: { items: Service[]; openFirst?: boolean }) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null);
  return (
    <ol className="svc">
      {items.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.slug} id={s.slug} className={`svc__row ${isOpen ? "is-open" : ""}`}>
            <button className="svc__head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className="svc__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="svc__title">{s.title}</span>
              <span className="svc__short">{s.short}</span>
              <span className="svc__plus" aria-hidden="true" />
            </button>
            <div className="svc__body">
              <div className="svc__body-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.title} loading="lazy" />
                <div>
                  <p>{s.body}</p>
                  <ul className="tags">{s.tags.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
