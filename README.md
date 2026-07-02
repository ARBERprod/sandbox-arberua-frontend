This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## eSputnik Web-Tracking

Browser web-tracking (eS.js `eS('sendEvent', …)`) lives in `src/shared/lib/analytics/esputnik.ts` and is injected by `src/widgets/ExternalScripts`. Gated behind `NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED` + analytics consent. Implementation plan: `docs/2026-06-03-esputnik-webtracking-plan.md`.

Official eSputnik documentation:

- [eS.js event sending — web tracking (EN)](https://docs.esputnik.com/docs/setting-up-web-tracking-by-sending-events-via-javascript-requests)
- [eS.js event sending — web tracking (UA)](https://docs-ua.esputnik.com/docs/nalashtuvannya-web-tracking-metodom-vidpravlennya-podij-cherez-viklik-funkcij-esjs)
- [Passing recommendations via the JavaScript API (`getRecommendations`)](https://docs.esputnik.com/docs/passing-recommendations-using-the-javascript-api)
- [Events and behaviour tracking](https://docs.esputnik.com/docs/events-and-behavior-tracking)
- [Script install / web-tracking snippet (UA)](https://docs-ua.esputnik.com/docs/poluchenie-i-ustanovka-skripta-veb-trekinga-ua)
- [Product feed import by URL (UA)](https://docs-ua.esputnik.com/docs/import-tovarnogo-fidu-do-akauntu)

> Note: event data must be nested under the event-name key, e.g. `eS('sendEvent', 'ProductPage', { ProductPage: { productKey, price, isInStock } })` — see the EN/UA event docs above.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
