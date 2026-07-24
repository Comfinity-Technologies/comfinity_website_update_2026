import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about/story",
  "/about/mission",
  "/about/divisions",
  "/about/leadership",
  "/solutions",
  "/labs",
  "/partners",
  "/careers",
  "/community",
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
