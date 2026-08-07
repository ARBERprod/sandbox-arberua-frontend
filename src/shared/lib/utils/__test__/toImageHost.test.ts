import { toImageHost } from '@/shared/lib/utils/toImageHost';

// Read from the environment rather than hardcoded: the two hosts differ between local, test and
// production, and the helper is about the relation between them, not about their values.
const apiHost = process.env.NEXT_PUBLIC_API_URL_BASE as string;
const imgHost = process.env.NEXT_PUBLIC_IMG_URL as string;

describe('toImageHost', () => {
  it('Should move an API-hosted image to the image host', () => {
    expect(toImageHost(`${apiHost}/storage/collaborations/banner.jpg`))
      .toBe(`${imgHost}/storage/collaborations/banner.jpg`);
  });

  it('Should keep the path, the query and the extension untouched', () => {
    expect(toImageHost(`${apiHost}/storage/logo.png?v=2`)).toBe(`${imgHost}/storage/logo.png?v=2`);
  });

  // The image host is a raster resizer and answers 404 for a vector — see isSvgUrl.
  it('Should leave a vector on the API host', () => {
    const logo = `${apiHost}/storage/collaborations/logo.svg`;
    expect(toImageHost(logo)).toBe(logo);
  });

  it('Should leave a foreign host alone', () => {
    expect(toImageHost('https://cdn.example.com/banner.jpg')).toBe('https://cdn.example.com/banner.jpg');
  });

  it('Should leave a relative path alone', () => {
    expect(toImageHost('/images/banner.jpg')).toBe('/images/banner.jpg');
  });

  // Only the prefix is a host; the same string deeper in the URL is part of somebody else's path.
  it('Should not rewrite the API host found inside the path', () => {
    const proxied = `https://cdn.example.com/proxy/${apiHost}/banner.jpg`;
    expect(toImageHost(proxied)).toBe(proxied);
  });

  it('Should return an empty string as it is', () => {
    expect(toImageHost('')).toBe('');
  });
});
