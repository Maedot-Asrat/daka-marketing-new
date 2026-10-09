import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ContactCard from "@/components/ContactCard";
import { site } from "@/lib/data";

export const metadata: Metadata = { title: "Contact", description: "Request a service from Daka Marketing, Addis Ababa." };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let’s build<br />something</>} intro="Tell us about your goals and we’ll come back with ideas worth exploring." />
      <section className="section section--tight">
        <div className="container contact">
          <ContactForm />
          <ContactCard />
        </div>
      </section>
      <section className="section section--tight">
        <div className="container map">
          <iframe src={site.mapEmbed} title="Daka Marketing office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </section>
    </>
  );
}
