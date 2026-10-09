"use client";

import Link from "next/link";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import useColumnParallax from "@/components/useColumnParallax";
import { Blog, formatDate } from "@/lib/blogs";

const LINES = 17;

/** Posts without a photo get a still of the Daka fan, one line picked out in the accent. */
function FanTile({ index }: { index: number }) {
  const lit = (index * 5 + 3) % LINES;
  return (
    <svg className="ins-card__fan" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: LINES }, (_, i) => {
        const y = 250 - (i / (LINES - 1)) * 210;
        return <path key={i} d={`M60 250 L360 ${y.toFixed(1)}`} className={i === lit ? "is-lit" : ""} />;
      })}
      <circle cx="60" cy="250" r="3.5" />
    </svg>
  );
}

/** "Latest insights" (after baunfire.com): two staggered columns that drift apart on scroll. */
export default function Insights({ blogs }: { blogs: Blog[] }) {
  const list = useRef<HTMLDivElement>(null);
  useColumnParallax(list, 110);

  const columns = [blogs.filter((_, i) => i % 2 === 0), blogs.filter((_, i) => i % 2 === 1)];

  return (
    <div className="ins-list" ref={list}>
      {columns.map((col, c) => (
        <div key={c} className={`ins-col ${c === 1 ? "ins-col--offset" : ""}`}>
          {col.map((b) => {
            const i = blogs.indexOf(b);
            return (
              <Reveal as="article" key={b.id} delay={c * 120}>
                <Link href={`/blog/${b.slug}`} className="ins-card">
                  <div className="ins-card__media">
                    {b.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.image} alt="" loading="lazy" />
                    ) : (
                      <FanTile index={i} />
                    )}
                    <span className="ins-card__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="ins-card__label">
                    <span className="ins-card__meta">{formatDate(b.date)}</span>
                    <h3 className="ins-card__title"><span>{b.heading}</span></h3>
                    <p className="ins-card__sum">{b.summary}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      ))}
    </div>
  );
}
