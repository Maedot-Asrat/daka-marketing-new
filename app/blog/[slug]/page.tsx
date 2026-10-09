import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getBlog, getBlogs } from "@/lib/blogs";

type Params = Promise<{ slug: string }>;
export const revalidate = 600;

export async function generateStaticParams() {
  return (await getBlogs()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const b = await getBlog((await params).slug);
  return b ? { title: b.heading, description: b.summary } : {};
}

export default async function BlogPost({ params }: { params: Params }) {
  const b = await getBlog((await params).slug);
  if (!b) notFound();
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(b.body);
  return (
    <article className="post">
      <header className="container post__head">
        <Link href="/blog" className="u-link">← All articles</Link>
        <p className="eyebrow">{formatDate(b.date)}</p>
        <h1 className="display post__title">{b.heading}</h1>
        <p className="post__lede">{b.summary}</p>
      </header>
      {b.image && (
        <div className="container post__img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.image} alt="" />
        </div>
      )}
      {/* Body comes from your own CMS (trusted). */}
      {isHtml ? (
        <div className="container prose" dangerouslySetInnerHTML={{ __html: b.body }} />
      ) : (
        <div className="container prose">{b.body.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}</div>
      )}
    </article>
  );
}
