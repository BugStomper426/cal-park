import type { APIRoute } from 'astro';
import { eventItems } from '../data/events';

const staticRoutes = [
  '/',
  '/immediate-need/',
  '/grief-counseling/',
  '/services/',
  '/traditional-burial-options/',
  '/popular-cremation-options/',
  '/resting-places/',
  '/custom-memorials/',
  '/only-at-cpc/',
  '/veterans/',
  '/pre-planning/',
  '/gravefinder/',
  '/path-to-salvation-interactive/',
  '/faqs/',
  '/about/',
  '/virtual-tour/',
  '/contact/',
  '/events/',
  '/apply/',
  '/privacy/',
  '/locations-hours/',
  '/schedule-your-visit/',
  '/category/events/'
];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://mycalumetpark.com';
  const eventRoutes = eventItems.map((event) => `/${event.slug}/`);
  const urls = [...staticRoutes, ...eventRoutes]
    .map((route) => `<url><loc>${origin}${route}</loc></url>`)
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
