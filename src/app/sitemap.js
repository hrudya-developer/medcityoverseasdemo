const SITE_URL = "https://medcityoverseas.com";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/destinations`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/universities`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}