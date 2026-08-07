import { screen } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import type { CollaborationDetails } from '@/entities/Collaboration';
import { CollaborationHeader } from './CollaborationHeader';

const apiHost = process.env.NEXT_PUBLIC_API_URL_BASE as string;
const imageHost = process.env.NEXT_PUBLIC_IMG_URL as string;

const makeCollaboration = (overrides: Partial<CollaborationDetails> = {}): CollaborationDetails => ({
  id: 'c-1',
  title: 'Partner',
  label: 'ARBER × Partner',
  url: '/collaboration/c-1',
  description: null,
  logo: null,
  banner_horizontal: null,
  banner_vertical: null,
  ...overrides,
});

const renderHeader = (overrides: Partial<CollaborationDetails> = {}) => {
  const { container } = renderComponent(
    <CollaborationHeader collaboration={makeCollaboration(overrides)} />,
  );
  return {
    container,
    banner: container.querySelector('picture img'),
    source: container.querySelector('picture source'),
    logo: container.querySelector<HTMLImageElement>('.logo'),
  };
};

describe('CollaborationHeader images', () => {
  // The API hands out its own host; only the image host serves these with caching and webp.
  it('moves the banner to the image host', () => {
    const { banner } = renderHeader({ banner_vertical: `${apiHost}/storage/vertical.jpg` });

    expect(banner).toHaveAttribute('src', `${imageHost}/storage/vertical.jpg`);
  });

  it('moves the desktop source of the banner to the image host', () => {
    const { source } = renderHeader({
      banner_vertical: `${apiHost}/storage/vertical.jpg`,
      banner_horizontal: `${apiHost}/storage/horizontal.jpg`,
    });

    expect(source).toHaveAttribute('srcSet', `${imageHost}/storage/horizontal.jpg`);
  });

  // Art direction is the reason <picture> stays instead of next/image: mobile has no image of its
  // own here and falls back to the desktop one.
  it('falls back to the horizontal banner when there is no vertical one', () => {
    const { banner, source } = renderHeader({ banner_horizontal: `${apiHost}/storage/horizontal.jpg` });

    expect(banner).toHaveAttribute('src', `${imageHost}/storage/horizontal.jpg`);
    expect(source).toHaveAttribute('srcSet', `${imageHost}/storage/horizontal.jpg`);
  });

  it('renders no picture at all when both banners are missing', () => {
    const { container } = renderHeader();

    expect(container.querySelector('picture')).toBeNull();
  });

  it('moves the logo to the image host', () => {
    const { logo } = renderHeader({ logo: `${apiHost}/storage/logo.png` });

    expect(decodeURIComponent(logo?.getAttribute('src') ?? '')).toContain(`${imageHost}/storage/logo.png`);
  });

  // Partners hand over vector logos, and those reach the browser only untouched: the image host
  // has none of them and the next/image optimizer rejects them — see isSvgUrl.
  it('serves an SVG logo straight from the API host', () => {
    const { logo } = renderHeader({ logo: `${apiHost}/storage/logo.svg` });

    expect(logo).toHaveAttribute('src', `${apiHost}/storage/logo.svg`);
  });

  // The title right next to it carries the same text; an alt would make a screen reader say it twice.
  it('leaves the logo out of the accessibility tree', () => {
    const { logo } = renderHeader({ logo: `${apiHost}/storage/logo.png` });

    expect(logo).toHaveAttribute('alt', '');
    expect(screen.getAllByText('Partner')).toHaveLength(1);
  });

  it('renders no logo when the collaboration has none', () => {
    const { logo } = renderHeader();

    expect(logo).toBeNull();
  });
});
