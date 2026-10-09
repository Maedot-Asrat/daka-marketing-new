import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { getBlogs } from "@/lib/blogs";

export const metadata: Metadata = { title: "Blog", description: "Ideas on digital marketing, content and growth in Ethiopia from the Daka team." };
export const revalidate = 600;

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <>
      <PageHero eyebrow="Journal" title={<>Notes from<br />the studio</>} />
      <section className="section section--tight">
        <div className="container blog-grid">
          {blogs.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 100}><BlogCard blog={b} index={i} /></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
