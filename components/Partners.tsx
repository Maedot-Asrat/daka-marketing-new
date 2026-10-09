"use client";

import { useMemo, useState } from "react";
import { partners } from "@/lib/data";

const tabs = [
  { key: "all", label: "All" },
  { key: "private", label: "Private clients" },
  { key: "ngo", label: "Gov & NGO" },
  { key: "international", label: "International" },
] as const;

type Key = (typeof tabs)[number]["key"];

export default function Partners() {
  const [tab, setTab] = useState<Key>("all");
  const [count, setCount] = useState(18);

  const list = useMemo(() => {
    if (tab !== "all") return partners[tab];
    // interleave the categories like the original site
    const out: string[] = [];
    const max = Math.max(partners.private.length, partners.ngo.length, partners.international.length);
    for (let i = 0; i < max; i++) {
      if (partners.international[i]) out.push(partners.international[i]);
      if (partners.private[i]) out.push(partners.private[i]);
      if (partners.ngo[i]) out.push(partners.ngo[i]);
    }
    return out;
  }, [tab]);

  return (
    <div className="partners">
      <div className="partners__tabs" role="tablist" aria-label="Partner categories">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={`chip ${tab === t.key ? "is-active" : ""}`}
            onClick={() => { setTab(t.key); setCount(18); }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="partners__grid">
        {list.slice(0, count).map((src, i) => (
          <li key={src + i} className="partners__logo" style={{ animationDelay: `${(i % 18) * 25}ms` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Partner logo" loading="lazy" />
          </li>
        ))}
      </ul>
      {count < list.length && (
        <div className="center">
          <button className="btn btn--outline" onClick={() => setCount((c) => c + 18)}>Show more</button>
        </div>
      )}
    </div>
  );
}
