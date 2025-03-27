const { generateSitemapXml } = require('./sitemap-config');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://arber.ua',
  generateRobotsTxt: true,
  exclude: ['/404', '/500', '/logout', '/change-password'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://arber.ua/server-sitemap.xml',
    ],
  },
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: [],
  }),
  xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"',
  additionalPaths: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V2}/sitemap`);

      if (!response.ok) {
        console.error('API response not OK:', await response.text());
        return [];
      }

      const { data } = await response.json();

      const {
        products = [], categories = [], blog_categories = [], blog_posts = [],
      } = data;

      const preparedSitemaps = [...products, ...categories, ...blog_categories, ...blog_posts];

      const siteUrl = 'https://arber.ua';

      const sitemaps = preparedSitemaps.map(({ url }) => {
        const languages = ['uk', 'ru', 'en'];
        const alternateRefs = languages.map((lang) => ({
          rel: 'alternate',
          hreflang: lang,
          href: lang === 'uk'
            ? siteUrl
            : `${siteUrl}/${lang}`,
        }));
        return {
          loc: url,
          changefreq: 'daily',
          priority: 0.7,
          lastmod: new Date().toISOString(),
          alternateRefs,
        };
      });

      return sitemaps;
    } catch (error) {
      console.error('Error fetching sitemap:', error);
      return [];
    }
  },
  sitemapSize: 7000,
  generateIndexSitemap: false,
  outDir: 'public',
  sitemapXml: generateSitemapXml,
};
