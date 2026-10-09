import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import WorkCard from "@/components/WorkCard";
import Partners from "@/components/Partners";
import ServiceShowcase from "@/components/ServiceShowcase";
import Showreel from "@/components/Showreel";
import Team from "@/components/Team";
import Insights from "@/components/Insights";
import ArrowButton from "@/components/ArrowButton";
import { approach, featuredIn, projects, services, site, stats } from "@/lib/data";
import { getBlogs } from "@/lib/blogs";

export default async function Home() {
  const blogs = (await getBlogs()).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Intro statement */}
      <section id="intro" className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="statement">{site.tagline}</h2>
          </Reveal>
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
          <ul className="stats">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 80} className="stat">
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured work — same cards as the /work page */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2 className="display section-title">Featured work</h2>
            <ArrowButton href="/work" variant="outline">All projects</ArrowButton>
          </div>
          <div className="work-grid">
            {projects.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120}><WorkCard project={p} index={i} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section section--alt">
        <div className="container split">
          <div>
            <p className="eyebrow">How we work</p>
            <h2 className="display section-title">A simple approach</h2>
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

      {/* Services */}
      <ServiceShowcase items={services} />

      {/* Showreel */}
      {/* <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <h2 className="display section-title">Work in motion</h2>
            <p className="section-lede">Tap a project to play it.</p>
          </div>
          <Showreel />
        </div>
      </section> */}

      {/* Partners */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="display section-title">Partners</h2>
            <p className="section-lede">70+ clients across private, government, NGO and international organisations.</p>
          </div>
          <Partners />
        </div>
      </section>

      {/* Team */}
      {/* <section className="section section--alt" id="team">
        <div className="container">
          <div className="section-head">
            <h2 className="display section-title">The team behind Daka</h2>
            <ArrowButton href="/about" variant="outline">About us</ArrowButton>
          </div>
          <Team />
        </div>
      </section> */}

      {/* Blog */}
      <section className="section">
        <div className="container">
          <Reveal className="fw-head">
            <h2 className="display section-title">Latest insights</h2>
            <p className="section-lede">Our thoughts on brands, content and growth.</p>
          </Reveal>
          <Insights blogs={blogs} />
          <div className="fw-more">
            <ArrowButton href="/blog" variant="outline">View more insights</ArrowButton>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2 className="display section-title">Our office at the center of Addis</h2>
            <Link href="/contact" className="u-link">{site.office}</Link>
          </div>
          <div className="map">
            <iframe src={site.mapEmbed} title="Daka Marketing office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </section>
    </>
  );
}
