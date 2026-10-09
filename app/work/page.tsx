import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WorkCard from "@/components/WorkCard";
import Reveal from "@/components/Reveal";
import Showreel from "@/components/Showreel";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Work", description: "Selected projects by Daka Marketing — campaigns, production and digital strategy for brands in Ethiopia." };

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Selected work" title={<>Work that<br />moves people</>} intro="190+ campaigns and projects across 22 sectors. Here are a few we’re proud of." />
      <section className="section section--tight">
        <div className="container work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}><WorkCard project={p} index={i} /></Reveal>
          ))}
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="section-head"><h2 className="display section-title">Work in motion</h2></div>
          <Showreel />
        </div>
      </section>
    </>
  );
}
