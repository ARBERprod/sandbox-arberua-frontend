import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://87ed0613852556c18d2a18a9da8b789a@o4507701073739776.ingest.de.sentry.io/4507701077672016',
  tracesSampleRate: 1.0,
  enabled: false, // Temporarily disabled
});
