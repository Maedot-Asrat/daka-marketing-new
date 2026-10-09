import Link from "next/link";
import { Blog, formatDate } from "@/lib/blogs";

export default function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="blog-card">
      <div className="blog-card__media">
        {blog.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={blog.image} alt="" loading="lazy" />
        ) : (
          <span className="blog-card__ph" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <span className="blog-card__date">{formatDate(blog.date)}</span>
      <h3 className="blog-card__title">{blog.heading}</h3>
      <p className="blog-card__sum">{blog.summary}</p>
      <span className="blog-card__more">Read article →</span>
    </Link>
  );
}
