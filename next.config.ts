import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    // Legacy URLs from the previous PHP site that are linked from press and search results.
    return [
      ...["ntv", "rtvi", "russia24", "vesti24"].map((slug) => ({
        source: `/${slug}`,
        destination: "/media",
        permanent: true,
      })),
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
