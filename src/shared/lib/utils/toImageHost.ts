import { isSvgUrl } from './isSvgUrl';

/**
 * API host → image host. Uploads come back from the API pointing at its own domain, while
 * `NEXT_PUBLIC_IMG_URL` is the one that serves them with caching and webp. Every image src the
 * backend hands us goes through here — `AppImage` does it for its own src, `<picture>` has to
 * call it per source.
 */
export const toImageHost = (source: string): string => {
  const apiHost = process.env.NEXT_PUBLIC_API_URL_BASE;
  const imageHost = process.env.NEXT_PUBLIC_IMG_URL;

  // Vectors stay on the API host — see isSvgUrl.
  if (isSvgUrl(source)) return source;

  if (!apiHost || !imageHost || !source.startsWith(apiHost)) return source;

  return `${imageHost}${source.slice(apiHost.length)}`;
};
