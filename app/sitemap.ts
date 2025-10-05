import type { MetadataRoute } from 'next';
import { teams } from '@/lib/data/teams';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://site-web-de-ligue-sportive-test-1do.vercel.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/teams`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/schedule`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/standings`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/stats`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/live`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${baseUrl}/export`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const teamRoutes: MetadataRoute.Sitemap = teams.map((t) => ({
    url: `${baseUrl}/teams/${t.id}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...teamRoutes];
}
