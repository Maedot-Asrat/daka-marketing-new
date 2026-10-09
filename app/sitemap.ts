import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";
import { getBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const pages = ["", "/work", "/services", "/about", "/blog", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.6 })),
    ...blogs.map((b) => ({ url: `${site.url}/blog/${b.slug}`, priority: 0.5 })),
  ];
}
