import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pkbooks.example";
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/#store`, lastModified: new Date() },
    { url: `${baseUrl}/#printing`, lastModified: new Date() },
    { url: `${baseUrl}/#admin`, lastModified: new Date() }
  ];
}
