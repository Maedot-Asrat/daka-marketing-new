import Link from "next/link";
import Logo from "./Logo";
import FanWaves from "./FanWaves";
import { nav, services, site } from "@/lib/data";
import ArrowButton from "./ArrowButton";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer__cta">
        <FanWaves className="footer__fan" amplitude={14} />
        <div className="container">
          <p className="eyebrow">Have a project in mind?</p>
          <h2 className="footer__big">
            <span>Digitalize</span>
            <span>with us</span>
          </h2>
          <div className="footer__cta-actions">
            <ArrowButton href="/contact" variant="light">Request a service</ArrowButton>
            <ArrowButton href={`mailto:${site.email}`} variant="ghost-light">{site.email}</ArrowButton>
          </div>
        </div>
      </section>

      <div className="container footer__grid">
        <div className="footer__brand">
          <Link href="/" aria-label="Daka Marketing home"><Logo className="logo--footer" /></Link>
          <p>{site.tagline}</p>
        </div>
        <div>
          <h3 className="footer__title">Explore</h3>
          <ul>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="u-link">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="footer__title">Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services#${s.slug}`} className="u-link">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="footer__title">Visit</h3>
          <ul>
            <li>{site.office}</li>
            <li><a className="u-link" href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
            <li><a className="u-link" href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
          <ul className="footer__socials">
            {site.socials.map((s) => (
              <li key={s.label}><a className="u-link" href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} Daka Marketing. All rights reserved.</span>
        <span>Addis Ababa, Ethiopia</span>
      </div>
    </footer>
  );
}
