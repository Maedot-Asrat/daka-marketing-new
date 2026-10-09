import { partners } from "@/lib/data";

/** Infinite logo strip — pure CSS, pauses on hover. */
export default function LogoMarquee() {
  const row = [...partners.international, ...partners.private.slice(0, 14)];
  return (
    <div className="marquee" aria-label="Some of our clients">
      <div className="marquee__track">
        {[...row, ...row].map((src, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= row.length}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={i < row.length ? "Client logo" : ""} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}
