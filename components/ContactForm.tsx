"use client";

import { useState } from "react";
import { services } from "@/lib/data";

/**
 * The brief, written as a sentence: visitors fill the blanks instead of a
 * stack of boxes. Field names match /api/contact.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [sentName, setSentName] = useState("");

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setSentName(String(data.name || "").trim().split(" ")[0]);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done">
        <span className="madlib__step">Message sent</span>
        <h3 className="display">Thank you{sentName ? `, ${sentName}` : ""}.</h3>
        <p>We’ve got your message and will get back to you shortly.</p>
        <button className="btn btn--outline" onClick={() => setStatus("idle")}>Send another</button>
      </div>
    );
  }

  return (
    <form className="madlib" onSubmit={onSubmit}>
      <div className="madlib__block">
        <span className="madlib__step">01 — About you</span>
        <p className="madlib__line">
          Hi Daka, my name is{" "}
          <input name="name" required autoComplete="name" placeholder="your name" size={9} aria-label="Your name" />{" "}
          and I work at{" "}
          <input name="company" autoComplete="organization" placeholder="company (optional)" size={18} aria-label="Company" />.
        </p>
      </div>

      <fieldset className="madlib__block">
        <legend className="madlib__step">02 — I’d love help with</legend>
        <div className="madlib__chips">
          {services.map((s, i) => (
            <label key={s.slug} className="madlib__chip">
              <input type="checkbox" name={`service_${s.slug}`} value={s.title} />
              <span><em>{String(i + 1).padStart(2, "0")}</em>{s.title}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="madlib__block">
        <span className="madlib__step">03 — How to reach you</span>
        <p className="madlib__line">
          You can reach me at{" "}
          <input name="email" type="email" required autoComplete="email" placeholder="email address" size={13} aria-label="Email" />{" "}
          or call{" "}
          <input name="phone" type="tel" autoComplete="tel" placeholder="phone (optional)" size={16} aria-label="Phone" />.
        </p>
      </div>

      <div className="madlib__block">
        <label className="madlib__step" htmlFor="madlib-message">04 — What you have in mind</label>
        <textarea id="madlib-message" name="message" rows={4} required placeholder="Tell us about your goals, your audience, a deadline…" />
      </div>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="madlib__foot">
        {status === "error" ? (
          <p className="form__error" role="alert">{error}</p>
        ) : (
          <p className="madlib__note">Company, phone and services are optional.</p>
        )}
        <button className="madlib__send" type="submit" disabled={status === "sending"}>
          <span>{status === "sending" ? "Sending…" : "Send"}</span>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </button>
      </div>
    </form>
  );
}
