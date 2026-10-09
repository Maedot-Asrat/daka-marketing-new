import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceList from "@/components/ServiceList";
import Reveal from "@/components/Reveal";
import { approach, services } from "@/lib/data";

export const metadata: Metadata = { title: "Services", description: "Content marketing, cohesive digital presence, lead generation and marketing software in Ethiopia." };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Capabilities" title={<>Strategy.<br />Story. Results.</>} intro="Four disciplines, one goal: measurable growth for your brand." />
      <section className="section section--tight">
        <div className="container"><ServiceList items={services} openFirst /></div>
      </section>
      <section className="section section--alt">
        <div className="container split">
          <div>
            <p className="eyebrow">Process</p>
            <h2 className="display section-title">How every project runs</h2>
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
    </>
  );
}
