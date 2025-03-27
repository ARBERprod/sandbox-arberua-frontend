const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const languages = ['uk', 'ru', 'en'];

function generateSitemapXml(pages) {
  const links = [];

  pages.forEach((page) => {
    const url = new URL(page.url);
    const path = url.pathname;

    if (path === '/') {
      // Handle homepage
      languages.forEach((lang) => {
        links.push({
          url: lang === 'uk' ? '/' : `/${lang}`,
          links: languages.map((l) => ({
            lang: l,
            url: l === 'uk' ? url.origin : `${url.origin}/${l}`,
          })),
        });
      });
    } else {
      // Handle other pages
      languages.forEach((lang) => {
        links.push({
          url: lang === 'uk' ? path : `/${lang}${path}`,
          links: languages.map((l) => ({
            lang: l,
            url: l === 'uk' ? `${url.origin}${path}` : `${url.origin}/${l}${path}`,
          })),
        });
      });
    }
  });

  const stream = new SitemapStream({ hostname: process.env.SITE_URL || 'https://arber.ua' });
  return streamToPromise(Readable.from(links).pipe(stream)).then((data) => data.toString());
}

module.exports = { generateSitemapXml };
