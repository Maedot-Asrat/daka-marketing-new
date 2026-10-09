"use client";

import Link from "next/link";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import useColumnParallax from "@/components/useColumnParallax";
import type { Project } from "@/lib/data";

/**
 * Staggered two-column showcase (after baunfire.com): tall portrait thumbnails
 * with the label hanging off the image edge; the columns drift apart on scroll.
 */
export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const list = useRef<HTMLDivElement>(null);
  useColumnParallax(list);

  const columns = [projects.filter((_, i) => i % 2 === 0), projects.filter((_, i) => i % 2 === 1)];

  return (
    <div className="fw-list" ref={list}>
      {columns.map((col, c) => (
        <div key={c} className={`fw-col ${c === 1 ? "fw-col--offset" : ""}`}>
          {col.map((p) => (
            <Reveal key={p.slug} delay={c * 120}>
              <Link href={`/work/${p.slug}`} className="fw-card">
                <div className="fw-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" />
                </div>
                <div className="fw-card__label">
                  <h3 className="fw-card__title">{p.name}</h3>
                  <span className="fw-card__sector">{p.sector}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
