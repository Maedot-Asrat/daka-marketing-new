import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowButton from "@/components/ArrowButton";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="case">
      <header className="container case__head">
        <Link href="/work" className="u-link case__back">← All work</Link>
        <p className="eyebrow">{p.sector}</p>
        <h1 className="display case__title">{p.name}</h1>
        <div className="case__info">
          <div><span className="eyebrow">Client</span><p>{p.name}</p></div>
          <div><span className="eyebrow">Sector</span><p>{p.sector}</p></div>
          <div><span className="eyebrow">Services</span><p>{p.tags.join(", ")}</p></div>
        </div>
      </header>
      <Reveal className="container case__hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} />
      </Reveal>
      <section className="container case__body">
        <h2 className="display">The work</h2>
        <p className="statement statement--sm">{p.summary}</p>
      </section>
      {p.video && (
        <section className="container case__video">
          <div className="video-frame">
            <iframe src={`https://www.youtube-nocookie.com/embed/${p.video}?rel=0&modestbranding=1`} title={p.name} allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
          </div>
        </section>
      )}
      <Link href={`/work/${next.slug}`} className="case__next">
        <span className="eyebrow">Next project</span>
        <span className="display">{next.name} →</span>
      </Link>
      <div className="container center case__cta">
        <ArrowButton href="/contact">Start a project like this</ArrowButton>
      </div>
    </article>
  );
}
