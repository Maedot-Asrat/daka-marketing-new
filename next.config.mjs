/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep old Laravel URLs working (and their SEO) after the switch.
  async redirects() {
    return [
      { source: "/alx", destination: "/work/alx-ethiopia", permanent: true },
      { source: "/newleaf", destination: "/work/new-leaf-fertility-center", permanent: true },
      { source: "/celavie", destination: "/work/celavie-chicken-and-burger", permanent: true },
      { source: "/tgh", destination: "/work/teklehaimanot-general-hospital", permanent: true },
      { source: "/gm_furniture", destination: "/work/gm-furniture", permanent: true },
      { source: "/blogspage", destination: "/blog", permanent: true },
      { source: "/blogs/:id/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/teams", destination: "/about#team", permanent: true },
      { source: "/gallery", destination: "/work", permanent: false },
    ];
  },
};
export default nextConfig;
