// Blog posts on the old site came from the Laravel database.
// Set BLOG_API_URL in .env.local to a JSON endpoint that returns an array of
// { id, slug, heading, summary, body, header_photo, created_at } and the site
// will use it (revalidated every 10 minutes). See README for the Laravel route.
// Without it, the sample posts below are shown so the pages are never empty.

export type Blog = {
  id: number | string;
  slug: string;
  heading: string;
  summary: string;
  body: string; // HTML or plain text
  image: string | null;
  date: string;
};

const SAMPLE: Blog[] = [
  {
    id: 1,
    slug: "why-your-brand-needs-a-daily-story",
    heading: "Why your brand needs a daily story",
    summary: "Brands that show up once and disappear get forgotten. Here is how to think about content as a series instead of a post.",
    body:
      "<p>Most businesses treat content as a checklist: a post on Monday, another on Thursday. Audiences don’t experience brands that way. They experience a character that either keeps showing up with something worth watching, or doesn’t.</p><p>Thinking in series changes the questions you ask. Instead of “what do we post today?”, you ask “what is the ongoing plot, and who are the recurring characters?” That shift is what turns a feed into something people follow.</p>",
    image: null,
    date: "2026-09-01",
  },
  {
    id: 2,
    slug: "what-a-lead-actually-is",
    heading: "What a lead actually is",
    summary: "Every buyer passes through a stage between hearing about you and choosing you. That stage is where leads live.",
    body:
      "<p>A lead is not a like, a view or a follower. A lead is a person who has shown intent and given you a way to continue the conversation.</p><p>Designing for leads means designing each stage of the funnel on purpose — the hook that earns attention, the offer that earns contact details, and the follow-up that earns the sale.</p>",
    image: null,
    date: "2026-08-15",
  },
  {
    id: 3,
    slug: "software-with-marketing-logic",
    heading: "Software built with marketing logic first",
    summary: "A website or CRM is a marketing tool before it is a technical one. Building it that way changes everything.",
    body:
      "<p>When software is planned around features, it tends to grow sideways. When it is planned around the customer journey, every screen has a job: capture, nurture, convert or retain.</p><p>That is the lens we bring to websites, CRMs and automation — technology that serves the strategy, not the other way around.</p>",
    image: null,
    date: "2026-07-30",
  },
];

type ApiBlog = {
  id: number | string;
  slug: string;
  heading: string;
  summary: string;
  body?: string;
  content?: string;
  header_photo?: string | null;
  created_at?: string;
};

export async function getBlogs(): Promise<Blog[]> {
  const url = process.env.BLOG_API_URL;
  if (!url) return SAMPLE;
  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(String(res.status));
    const data: ApiBlog[] = await res.json();
    const storage = process.env.BLOG_STORAGE_URL ?? "https://daka-marketing.com/storage";
    return data.map((b) => ({
      id: b.id,
      slug: b.slug,
      heading: b.heading,
      summary: b.summary,
      body: b.body ?? b.content ?? "",
      image: b.header_photo ? `${storage}/${b.header_photo}` : null,
      date: b.created_at ?? "",
    }));
  } catch (e) {
    console.error("Blog API failed, using sample posts", e);
    return SAMPLE;
  }
}

export async function getBlog(slug: string) {
  const all = await getBlogs();
  return all.find((b) => b.slug === slug) ?? null;
}

export const formatDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";
