"use client";

import { useEffect, useState } from "react";
import FanWaves from "./FanWaves";
import { site } from "@/lib/data";

const addisTime = () =>
  new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Addis_Ababa", hour: "2-digit", minute: "2-digit" });

/** Dark side card on the contact page: direct lines, office and the time in Addis. */
export default function ContactCard() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(addisTime());
    const id = window.setInterval(() => setTime(addisTime()), 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <aside className="ccard on-dark">
      <FanWaves className="ccard__fan" amplitude={10} interactive={false} />
      <div className="ccard__clock">
        <span className="dot" />
        <span>{time ? <>It’s <strong>{time}</strong> in Addis Ababa</> : "Addis Ababa, Ethiopia"}</span>
      </div>
      <div className="ccard__rows">
        <div>
          <span className="ccard__label">Call</span>
          <a className="ccard__big" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
        </div>
        <div>
          <span className="ccard__label">Email</span>
          <a className="ccard__big" href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          <span className="ccard__label">Visit</span>
          <p>{site.office}</p>
        </div>
        <div>
          <span className="ccard__label">Follow</span>
          <ul className="ccard__socials">
            {site.socials.map((s) => <li key={s.label}><a className="u-link" href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
    </aside>
  );
}
