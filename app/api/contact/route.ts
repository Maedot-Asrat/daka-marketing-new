import { NextResponse } from "next/server";

/**
 * Receives the contact form.
 * Set CONTACT_WEBHOOK_URL in .env.local to forward submissions anywhere that
 * accepts JSON (a Laravel endpoint, Zapier/Make, a Slack or Telegram webhook…).
 * Without it, submissions are only logged on the server.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot hit — pretend success

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  if (!name || !email || !message) return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.length > 5000) return NextResponse.json({ error: "Message is too long." }, { status: 400 });

  const servicesWanted = Object.entries(body).filter(([k]) => k.startsWith("service_")).map(([, v]) => v);
  const submission = {
    name, email, message,
    company: body.company || "",
    phone: body.phone || "",
    services: servicesWanted,
    receivedAt: new Date().toISOString(),
  };

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(submission) });
    if (!res.ok) return NextResponse.json({ error: "Couldn’t send right now — please call or email us." }, { status: 502 });
  } else {
    console.log("[contact] new submission", submission);
  }
  return NextResponse.json({ ok: true });
}
