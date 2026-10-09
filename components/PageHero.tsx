import FanWaves from "./FanWaves";

/** Inner-page hero: oversized title with a small live fan in the corner. */
export default function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <section className="page-hero">
      <FanWaves className="page-hero__fan" amplitude={10} />
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display page-hero__title">{title}</h1>
        {intro && <p className="page-hero__intro">{intro}</p>}
      </div>
    </section>
  );
}
