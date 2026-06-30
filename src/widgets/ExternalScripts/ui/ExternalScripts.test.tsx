import { render, screen } from '@testing-library/react';
import { cookieModalManager } from '@/features/CookieModal/lib/CookieModalManager';
import { ExternalScripts } from './ExternalScripts';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@/features/CookieModal/lib/CookieModalManager', () => ({
  cookieModalManager: { isCookiesAccepted: jest.fn(() => true) },
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ id, src }: { id?: string; src?: string }) => (
    <script data-testid={id} data-src={src} />
  ),
}));

const mockedConsent = cookieModalManager.isCookiesAccepted as jest.Mock;
const SITE_ID = 'es-site-123';
const ORIGINAL_FLAG = process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED;
const ORIGINAL_SITE = process.env.NEXT_PUBLIC_ESPUTNIK_SITE_ID;

describe('ExternalScripts — eSputnik injection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedConsent.mockReturnValue(true);
    process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED = 'true';
    process.env.NEXT_PUBLIC_ESPUTNIK_SITE_ID = SITE_ID;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED = ORIGINAL_FLAG;
    process.env.NEXT_PUBLIC_ESPUTNIK_SITE_ID = ORIGINAL_SITE;
  });

  it('injects the eS.js script with the env site id when consent + flag are on', () => {
    render(<ExternalScripts />);

    const script = screen.getByTestId('esputnik-webtracking');
    expect(script).toBeInTheDocument();
    expect(script.getAttribute('data-src')).toContain(SITE_ID);
  });

  it('does not inject eS.js when the kill-switch flag is off', () => {
    process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED = 'false';
    render(<ExternalScripts />);

    expect(screen.queryByTestId('esputnik-webtracking')).not.toBeInTheDocument();
  });

  it('does not inject eS.js when consent is denied', () => {
    mockedConsent.mockReturnValue(false);
    render(<ExternalScripts />);

    expect(screen.queryByTestId('esputnik-webtracking')).not.toBeInTheDocument();
  });

  it('does not inject eS.js when the site id env var is unset', () => {
    delete process.env.NEXT_PUBLIC_ESPUTNIK_SITE_ID;
    render(<ExternalScripts />);

    expect(screen.queryByTestId('esputnik-webtracking')).not.toBeInTheDocument();
  });

  it('still renders the GTM script', () => {
    render(<ExternalScripts />);

    expect(screen.getByTestId('gtm')).toBeInTheDocument();
  });
});
