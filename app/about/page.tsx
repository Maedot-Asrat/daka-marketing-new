import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import { approach, featuredIn, site, stats } from "@/lib/data";

export const metadata: Metadata = { title: "About", description: site.tagline };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Daka" title={<>Creative<br />strategists</>} intro={site.tagline} />
      <section className="section section--tight">
        <div className="container">
          <ul className="stats">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 80} className="stat">
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </Reveal>
            ))}
          </ul>
          <div className="featured">
            <span className="eyebrow">Featured in</span>
            <ul>
              {featuredIn.map((f) => (
                <li key={f.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.image} alt={f.name} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container split">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="display section-title">Goal. Idea. Execution.</h2>
          </div>
          <ol className="approach">
            {approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 100}>
                <span className="approach__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      {/* Team — hidden for now */}
      {/* <section className="section" id="team">
        <div className="container">
          <div className="section-head"><h2 className="display section-title">The team</h2></div>
          <Team />
        </div>
      </section> */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head"><h2 className="display section-title">Partners</h2></div>
          <Partners />
        </div>
      </section>
    </>
  );
}
