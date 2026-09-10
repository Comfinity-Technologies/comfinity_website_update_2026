import type { MetadataRoute } from "next";

const routes = [
  "",
  "/products",
  "/solutions",
  "/works",
  "/labs",
  "/partners",
  "/careers",
  "/community",
  "/about/magazine",
  "/about/story",
  "/about/mission",
  "/about/divisions",
  "/about/leadership",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://comfinity.com${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
