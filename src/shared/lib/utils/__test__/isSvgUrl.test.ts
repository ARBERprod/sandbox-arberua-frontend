import { isSvgUrl } from '@/shared/lib/utils/isSvgUrl';

describe('isSvgUrl', () => {
  it('Should detect a vector by its extension', () => {
    expect(isSvgUrl('https://api.arber.ua/storage/collaborations/logo.svg')).toBe(true);
  });

  it('Should detect a vector behind a query or a hash', () => {
    expect(isSvgUrl('/logo.svg?v=2')).toBe(true);
    expect(isSvgUrl('/logo.svg#icon')).toBe(true);
  });

  it('Should ignore the case of the extension', () => {
    expect(isSvgUrl('/logo.SVG')).toBe(true);
  });

  it('Should not take a raster upload for a vector', () => {
    expect(isSvgUrl('/storage/logo.png')).toBe(false);
  });

  // The word can sit anywhere in a path; only the extension decides how the file is served.
  it('Should not match the word inside the path', () => {
    expect(isSvgUrl('/storage/svg/logo.png')).toBe(false);
    expect(isSvgUrl('/storage/logo.svg.png')).toBe(false);
  });
});
