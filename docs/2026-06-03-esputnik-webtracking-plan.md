# eSputnik Web-Tracking — Implementation Plan

> **Status:** В работе · **Updated:** 2026-06-30
> **History:** 2026-06-03 На рассмотрении → 2026-06-30 На рассмотрении (ревью + переработка под `/orchestrate-plan`) → 2026-06-30 В работе
>
> **Note:** Step 2.3 (CategoryPage) stays deferred pending the backend `google_product_category` field (EXTERNAL_DEPENDENCY); external inputs site-id/tariff/feed-URL remain open.

Browser-side web-tracking (eS.js script + `eS('sendEvent', ...)` events) for on-site
recommendations and behavioral segments. This is a **new, separate layer** from the
backend transactional CRM integration (see `2026-02-26-esputnik-integration.md`).

## Why this is not already done

The 2026-03-07 migration moved **transactional event funnels** (order_confirmed,
checkout_abandoned, price drops, bonuses) to the Laravel backend and deleted the old
frontend eSputnik code. Those are server-to-server API events. Web-tracking is a
different mechanism: it runs in the browser, ties events to a tracking cookie, and is
the **only** way to power on-site recommendation blocks and view-based segments. It
cannot be done server-side. None of the 8 web-tracking events nor the product feed
were ever implemented.

## Source spec

- Script install: https://docs-ua.esputnik.com/docs/poluchenie-i-ustanovka-skripta-veb-trekinga-ua
- Feed import: https://docs-ua.esputnik.com/docs/import-tovarnogo-fidu-do-akauntu
- eSjs events: https://docs-ua.esputnik.com/docs/nalashtuvannya-web-tracking-metodom-vidpravlennya-podij-cherez-viklik-funkcij-esjs

### Corrections vs the original task doc

- Wishlist event key is **`AddToWishlist`**, not "WishList".
- Network events are labeled **`webevent`**, not `v1` (the task doc is outdated).
- `productKey` in every product event **must equal** `<g:id>` in the feed = the
  **parent** `product.id` (`DetailedProduct.id`). Make-or-break constraint. On the
  product page the id is already the parent; in **cart/order** events use the
  **`parent_id`** field the backend returns — verified present today:
  `CartResource.php:22-24` and `Frontend/V2/Order/OrderItemResource.php:14-16`
  (`parent_id = product.parent_id ?? product.id`). The frontend DTOs already surface
  it (`ICartItem.parent_id` `entities/Cart/model/types/types.ts:22`,
  `OrderProductDto.parent_id` `entities/Order/api/types.ts:22`,
  `DetailedProduct.parent_id` / `Product.parent_id` `entities/Product/model/types.ts:59/35`).
  Codebase convention is already `item.parent_id || item.id` — follow it.
- `StatusCart` requires a fresh **GUID** (UUID v4) on every cart change;
  `PurchasedItems` must reuse the **last** StatusCart GUID. The GUID must survive
  navigation to the success page **and** must not be overwritten by the post-order cart
  clear — see [GUID protocol](#guid-protocol).
- `CustomerData` does **not** create a contact in eSputnik — contact create/update is
  already handled by the backend (`UpdateEsputnikContactJob`,
  `app/Services/ES/Jobs/UpdateEsputnikContactJob.php`). No frontend work needed for
  contact creation.

## External prerequisites & blockers

These are **hard** gates. Frontend code can be written against the contract below, but
**QA and production are blocked** until the feed and the marketing inputs land.

### Backend product feed — BLOCKER (separate repo/ticket)

eSputnik accepts **only Google Merchant RSS 2.0 XML**, imported **by URL**, refreshed
daily or weekly. The existing `feed:generate-google-xml` (`/feed/xml`) **cannot be
reused**: its `<g:id> = {productId}-{size}` is per-size (`GoogleFeedBuilder.php:74`,
`item_group_id = product.article` `:97`) and the URL is consumed by Google Merchant.

The backend ships a **separate** eSputnik feed — ticket
`test-arberua-backend/laravel/docs/2026-06-03-esputnik-feed-backend-ticket.md`. The
design decisions are **locked** (section «Зафиксированные решения (ревью 2026-06-30)»)
and match this plan:

- New command `feed:generate-esputnik-xml` → `/feed/esputnik.xml`, scheduled daily.
- `<g:id> = parent product.id` (one `<item>` per parent) — equals our `productKey`.
- Includes **out-of-stock** products with `g:availability=out of stock`.
- Emits `<g:google_product_category>` (= category path) **and** `g:product_type`.
- `<g:new>` = `0/1`; `g:sale_price` on discount.

> ⚠️ **Status caveat:** the backend ticket's header is still **`На рассмотрении`** and
> the command is **not implemented**. Decisions are agreed; the work is not in flight.
> Action for backend: flip the ticket to **`В работе`** so the dependency is trackable.
> Until then the `<g:id>` contract is not frozen in code — a change there breaks every
> `productKey`.

### `categoryKey` ↔ `<g:google_product_category>` contract — must be defined before Step 2.3

`CategoryPage.categoryKey` must byte-match the feed's `<g:google_product_category>`,
or recommendations never resolve. The two strings are built by **different code**: the
backend resolves the path via `CategoryPathResolver`; the frontend `CatalogView` only
has `data.data.category` (`{id,title}`, `CatalogView.tsx:90`) and
`data.data.breadcrumbs` (`:155`). Independently reconstructing the path will diverge
(separator, locale, root inclusion).

**Decision:** the backend must expose the **same resolved string** it writes to
`<g:google_product_category>` on the category API response (a `google_product_category`
field on the catalog payload), and the frontend sends that verbatim as `categoryKey`.
The frontend must **not** rebuild the path from breadcrumbs. This is a backend
dependency on the same feed ticket — add it there. If BE cannot expose it in time,
Step 2.3 is **blocked**, not "best-effort matched".

### Marketing / account inputs (still open)

1. eSputnik site / tracking-script id (from the account) — needed to inject eS.js.
2. Tariff confirmed **Pro** (all 8 events + `g:sale_price`/`g:new` in feed)?
3. Public feed URL to register in eSputnik + refresh schedule (daily/weekly).

### Consent — RESOLVED

Web-tracking sets a tracking cookie and `CustomerData` ships email/phone from the
browser → under GDPR/ePrivacy it **must** be consent-gated. **Decision:** both eS.js
injection and every `sendEsEvent` call fire **only after** analytics consent.

The only synchronously-readable consent signal is the all-or-nothing cookie
`acceptedCookies` via `cookieModalManager.isCookiesAccepted()`
(`features/CookieModal/lib/CookieModalManager.ts`). There is **no** granular
"analytics" flag — the per-category switches in `CookieSettingsModal` are local
`useState` and are never persisted. So gating is all-or-nothing, which is acceptable.

> Tech-debt note (out of scope): existing GTM/GA4 load **un-gated** (`ExternalScripts`
> renders unconditionally in `_app.tsx:95`; `pushDataLayerEvent` has no consent check).
> Gating eSputnik but not GTM is inconsistent; the un-gated GTM is a separate possible
> compliance debt to address later.

## Frontend architecture

Mirror the existing `dataLayer.ts` pattern (`shared/lib/analytics/dataLayer.ts`, SSR
guard `if (typeof window !== 'undefined' && 'dataLayer' in window)`, lines 19-24). Reuse
existing infra rather than re-rolling it:

- **localStorage:** use the SSR-safe singleton `localStorageService`
  (`shared/lib/services/localStorage.service.ts`), **not** raw `localStorage`.
- **Consent:** `cookieModalManager.isCookiesAccepted()` (synchronous, works in React and
  in middleware).
- **Cart side-effects:** listener middleware (see `StatusCart` below), **not** reducers.

New files:

- `src/widgets/ExternalScripts/ui/ExternalScripts.tsx` — inject eS.js `<Script>`
  (mirror the GTM block, `strategy="lazyOnload"`). Gate on
  `cookieModalManager.isCookiesAccepted()`. Needs the site/tracking-script id (marketing
  input #1). Gate also behind the kill-switch flag (see [Rollback](#rollback--kill-switch)).
- `src/shared/lib/analytics/esputnik.ts` — `sendEsEvent(name, payload)` wrapper with
  **three guards in order**: SSR (`typeof window === 'undefined'` → no-op), `window.eS`
  presence, `cookieModalManager.isCookiesAccepted()`. Plus a typed payload builder per
  event. **All event params are stringified** (`String(price)`, `String(quantity)`,
  `String(isInStock)`) — eS.js expects strings; FE holds `number`/`boolean`. Fire-and-
  forget, never throws into the UI.
- `src/shared/lib/analytics/esputnikCartGuid.ts` — `nextCartGuid()` generates
  `crypto.randomUUID()` (guarded by `typeof window`/`typeof crypto.randomUUID`,
  secure-context only) and persists via `localStorageService`; `lastCartGuid()` reads it
  back for `PurchasedItems`. See [GUID protocol](#guid-protocol).
- `src/shared/types/global.d.ts` — add `eS?: (...args: unknown[]) => void` to `Window`
  (currently declares only `dataLayer` and `fbq`, lines 16-23).

## GUID protocol

The cart GUID binds a sequence of cart states to one purchase so eSputnik can attribute
recommendations. Rules:

- Every `StatusCart` calls `nextCartGuid()` → generate UUID v4, persist to
  `localStorageService`, send it with the event.
- `PurchasedItems` calls `lastCartGuid()` and sends that GUID. Checklist item:
  `StatusCart` last GUID **==** `PurchasedItems` GUID (verify in DevTools).

**Race to avoid:** placing an order clears the cart. If the post-order clear fires a
`StatusCart` with a *new* GUID, `lastCartGuid()` on the success page returns the
empty-cart GUID, and the purchase is bound to an empty basket. **Fix:** the order-submit
flow (where `begin_checkout` fires, `CartActions.tsx`) snapshots the current GUID into a
**separate** key (`esputnik/purchaseGuid`) at submit time; `PurchasedItems` reads that
snapshot, **not** the live `lastCartGuid()`. The post-order clear may still emit its own
`StatusCart` (empty cart, new GUID) without corrupting attribution. The snapshot key is
cleared after `PurchasedItems` fires.

## Event wiring

Reference for the steps below. Note: only `PurchasedItems` sits beside an existing GTM
call; the other 7 events are new call sites (5 have no GTM sibling at all).

| Event | Where | Trigger | Payload source |
|-------|-------|---------|----------------|
| `MainPage` | `views/MainView/ui/MainView/MainView.tsx` | `useEffect` on mount (no existing effect) | — |
| `ProductPage` | `views/ProductView/ui/ProductView/ProductView.tsx` (beside the `addProductToHistory` effect, `:27-29`) | `useEffect` on product load | `DetailedProduct`: `id`→productKey, `price.value`, `is_sale`→isInStock |
| `CategoryPage` | `views/CatalogView/ui/CatalogView/CatalogView.tsx` (beside the `view_item_list` effect, `:84-146`) | `useEffect` on category load | `categoryKey` = backend `google_product_category` field (see contract) |
| `AddToWishlist` | `features/wish-list/ToggleWishListButton/.../ToggleWishListButton.tsx` (`clickHandler` `:35-45`) | **add only** — fire on not-in-list→in-list transition derived from the returned `Product[]` | **parent** id (`parent_id ?? id`)→productKey, `price`; isInStock sourcing TBD (`Product` has no stock flag) |
| `StatusCart` | **new cart listener middleware** (see below) | every cart mutation | cart items → `productKey` = line `parent_id` (`CartResource`), `price`/`quantity`; new GUID via `nextCartGuid()` |
| `PurchasedItems` | `views/CheckoutSuccesView/ui/CheckoutSuccesView/CheckoutSuccessView.tsx` (in the existing `purchase` effect, `:39-147`) | `useEffect` | `OrderDto.products` → `productKey` = `parent_id` (`OrderItemResource`), `order_number`→OrderNumber, snapshot GUID |
| `CustomerData` | login + checkout (reuse `useAuth`, `entities/Session/lib/useAuth.ts`) | on login / checkout data entry | `User`: `user_id`→externalCustomerId, `email`, `first_name`, `phone`, `sex` |
| `NotFound` | `views/NotFoundView/ui/NotFoundView/NotFoundView.tsx` | `useEffect` on mount (no existing effect) | — |

**`StatusCart` is a listener middleware, not `extraReducers`.** Reducers must be pure;
an analytics call there is a framework violation. The codebase already has the pattern:
`entities/Cart/model/middleware/promocodeInvalidationListener.ts:15-36` keys off
`isAnyOf(addProductToCart, addManyProductsToCart, updateProduct, deleteProduct,
deleteCart .matchFulfilled)` and is registered in `makeStore.ts:9,54`
(`.prepend(...middleware)`). The new `statusCartListener` follows it exactly, reads cart
from `getState()`, and lives in the same dir (next to its `__tests__`).

**Notes for implementers:**

- `is_sale` means **in stock**, not "discounted" (`ProductResource.php:55`:
  `is_sale = (bool)(int)quantity`). The `ProductPage` mapping `is_sale → isInStock` is
  correct. `DetailedProduct` has **no** separate stock field — do not look for one.
- `StatusCart` is quantity-based and does not need `isInStock`. `AddToWishlist`'s
  `isInStock`: the `Product` type (`entities/Product/model/types.ts:33-46`) has no stock
  flag — derive from `skus` availability if eSputnik requires it, else omit. Resolve in
  Step 2.4, do not guess.
- **Session hydration:** the cart is hydrated from the session response
  (`cartSlice` ← `sessionFetch.matchFulfilled`), not only from mutations. `StatusCart`
  fires on mutations only, so a returning user with a pre-filled cart emits no
  `StatusCart` until the first change. **Accepted** — `StatusCart` semantically means "on
  change". State this explicitly; do not hook session hydration.
- Path quirk: the directory is `CheckoutSuccesView` (single `s`); the file/component is
  `CheckoutSuccessView` (double `s`). Keep this spelling in imports and `allowed_paths`.

## Implementation steps

Gate commands (project): `npm run lint` (next lint), `npm run lint:types` (tsc), tests
via `jest` (only `test:unit = jest --watch` exists → use `npx jest … --watchAll=false`).
⚠️ **Jest prerequisite:** export `NEXT_PUBLIC_*` before running, or jest collects 0
tests (invalid `images.domains` → next/jest aborts; see memory `jest-needs-env-vars`).

### Step 1.1: sendEsEvent wrapper + payload types + global.d.ts (eS)
<!-- plan-meta:
allowed_paths:
  - "src/shared/lib/analytics/esputnik.ts"
  - "src/shared/types/global.d.ts"
  - "src/shared/lib/analytics/**/*.test.ts"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_quick: "npx jest src/shared/lib/analytics --watchAll=false"
  test_full: "npx jest --watchAll=false"
skip: false
-->
`sendEsEvent(name, payload)` with guards in order: SSR → `window.eS` → consent
(`cookieModalManager.isCookiesAccepted()`) → kill-switch flag. Typed payload builder per
event; **stringify** all params (`price`/`quantity`/`isInStock`). Add `eS?` to `Window`.
Tests: guard matrix (SSR no-op, missing `window.eS` no-op, consent denied no-op, all-pass
calls `eS('sendEvent', …)`), and string-typing of params.

### Step 1.2: Cart GUID manager (esputnikCartGuid.ts)
<!-- plan-meta:
allowed_paths:
  - "src/shared/lib/analytics/esputnikCartGuid.ts"
  - "src/shared/lib/analytics/**/*.test.ts"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_quick: "npx jest src/shared/lib/analytics/esputnikCartGuid --watchAll=false"
  test_full: "npx jest --watchAll=false"
skip: false
-->
`nextCartGuid()` (generate `crypto.randomUUID()` guarded by `typeof window`/
`typeof crypto.randomUUID`, persist via `localStorageService`), `lastCartGuid()`,
`snapshotPurchaseGuid()` / `readPurchaseGuid()` / `clearPurchaseGuid()` for the
[GUID protocol](#guid-protocol). Tests: GUID changes per `nextCartGuid`, `lastCartGuid`
returns the last, snapshot survives a subsequent `nextCartGuid` (the race), SSR no-op.

### Step 1.3: eS.js injection in ExternalScripts (consent-gated + kill-switch)
<!-- plan-meta:
allowed_paths:
  - "src/widgets/ExternalScripts/**"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_full: "npx jest --watchAll=false"
skip: false
-->
Inject eS.js `<Script strategy="lazyOnload">` mirroring the GTM block, gated on
`cookieModalManager.isCookiesAccepted()` and the kill-switch flag. Site id from marketing
input #1 (env var). Blocked on inputs #1/#2.

### Step 2.1: MainPage + NotFound mount events
<!-- plan-meta:
allowed_paths:
  - "src/views/MainView/**"
  - "src/views/NotFoundView/**"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_full: "npx jest --watchAll=false"
skip: false
-->
On-mount `useEffect` → `sendEsEvent('MainPage')` / `sendEsEvent('NotFound')`. Neither
view has an existing effect — add one in the component body.

### Step 2.2: ProductPage event (ProductView)
<!-- plan-meta:
allowed_paths:
  - "src/views/ProductView/**"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_quick: "npx jest src/views/ProductView --watchAll=false"
  test_full: "npx jest --watchAll=false"
skip: false
-->
`useEffect` beside the existing `addProductToHistory` effect (`ProductView.tsx:27-29`).
Payload: `id`→productKey, `price.value`, `is_sale`→isInStock.

### Step 2.3: CategoryPage event (CatalogView) — DEFERRED (EXTERNAL_DEPENDENCY)
<!-- plan-meta:
allowed_paths:
  - "src/views/CatalogView/**"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_quick: "npx jest src/views/CatalogView --watchAll=false"
  test_full: "npx jest --watchAll=false"
skip: true
-->
> **Deferred 2026-06-30 (orchestrator run):** the backend `google_product_category`
> field is **absent** from the catalog API response — verified missing on `CatalogData`
> (`src/views/CatalogView/api/types.ts`), `Category`
> (`src/entities/Category/model/types.ts`), and `ResponseMeta`, with zero repo-wide
> matches. Breadcrumb reconstruction is forbidden (see contract). The typed `CategoryPage`
> payload already exists in `esputnik.ts`, ready to wire. **Unblock:** backend exposes
> `google_product_category` on the category API response, then flip `skip: false` and
> re-run `/orchestrate-plan`.
`useEffect` beside the `view_item_list` effect (`CatalogView.tsx:84-146`). `categoryKey`
= the backend `google_product_category` field on the catalog response (see contract). Do
**not** rebuild from breadcrumbs. Blocked until BE exposes the field.

### Step 2.4: AddToWishlist event (add-only discrimination)
<!-- plan-meta:
allowed_paths:
  - "src/features/wish-list/**"
  - "src/entities/WishList/**"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_quick: "npx jest src/features/wish-list src/entities/WishList --watchAll=false"
  test_full: "npx jest --watchAll=false"
skip: false
-->
The button is a **toggle** (`toggleProduct`, returns full `Product[]`). Fire only on the
not-in-list→in-list transition (compare list before vs the returned list). Payload:
`parent_id ?? id`→productKey, `price`; resolve `isInStock` sourcing (`Product` has no
stock flag — derive from `skus` or omit). Test: add fires once, remove fires nothing.

### Step 2.5: StatusCart via cart listener middleware
<!-- plan-meta:
allowed_paths:
  - "src/entities/Cart/model/middleware/**"
  - "src/shared/config/store/makeStore.ts"
  - "src/entities/Cart/**/*.test.ts"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_quick: "npx jest src/entities/Cart --watchAll=false"
  test_full: "npx jest --watchAll=false"
skip: false
-->
New `statusCartListener` middleware (pattern: `promocodeInvalidationListener.ts:15-36`),
registered in `makeStore.ts:54`. On any cart-mutation `matchFulfilled`: read cart from
`getState()`, `nextCartGuid()`, `sendEsEvent('StatusCart', { items: parent_id/price/
quantity, guid })`. Test: each mutation emits one event with a fresh GUID. Drive-by:
fix the pre-existing `.matchFulfilled`-vs-`.matchPending` copy-paste in `cartSlice.ts:105`
and `:118` in a **separate commit**.

### Step 2.6: PurchasedItems event (CheckoutSuccessView)
<!-- plan-meta:
allowed_paths:
  - "src/views/CheckoutSuccesView/**"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_quick: "npx jest src/views/CheckoutSuccesView --watchAll=false"
  test_full: "npx jest --watchAll=false"
skip: false
-->
Add `sendEsEvent('PurchasedItems', …)` inside the existing `purchase` effect
(`CheckoutSuccessView.tsx:39-147`). `productKey` = `parent_id` (`OrderItemResource`),
`order_number`→OrderNumber, GUID = `readPurchaseGuid()` snapshot (not live
`lastCartGuid()`), then `clearPurchaseGuid()`. The snapshot is written at order submit in
Step 2.5's sibling flow (`CartActions.tsx`, where `begin_checkout` fires).

### Step 2.7: CustomerData event (login + checkout)
<!-- plan-meta:
allowed_paths:
  - "src/features/auth/**"
  - "src/features/CheckoutForm/**"
gate_commands:
  lint: "npm run lint"
  type: "npm run lint:types"
  test_full: "npx jest --watchAll=false"
skip: false
-->
`sendEsEvent('CustomerData', { externalCustomerId: user_id, email, first_name, phone,
sex })` on login and on checkout data entry. Login call-sites: `features/auth/AuthByEmail`
(`AuthByEmailForm.tsx`) and `features/auth/AuthBySocials`; checkout: `CheckoutForm`. **Does
not** create a contact (backend owns that). Confirm the exact post-login hook point before
coding.

### Step 3.1: QA against eSputnik DevTools checklist
<!-- plan-meta:
skip: true
-->
Manual verification (see [Checklist](#checklist--verification)). Deferred from
orchestration: depends on the backend feed being registered in eSputnik **and** eS.js
installed (marketing inputs + backend feed shipped). Cannot run until those land.

### Step 4.1: Update status headers of both docs
<!-- plan-meta:
allowed_paths:
  - "docs/2026-06-03-esputnik-webtracking-plan.md"
gate_commands:
  lint: "npm run lint"
skip: false
-->
On completion, flip this plan's status header (`Status` + append `History`) and prompt
the backend owner to update the feed ticket header.

## Effort estimate

| Area | LOC (approx) |
|------|--------------|
| Script injection (`ExternalScripts.tsx`, consent + flag) | ~25 |
| `esputnik.ts` wrapper + typed/stringified payloads + guards | ~90 |
| Cart GUID manager (+ purchase-snapshot protocol) | ~50 |
| `statusCartListener` middleware + registration | ~60 |
| 7 remaining event-emit wirings (2 of which are new effects, wishlist add-only) | ~120–150 |
| Unit tests (guards, GUID race, wishlist discrimination, middleware) | ~120 |
| Global types | ~5 |
| **Frontend total** | **~470–500** |
| Backend feed + `google_product_category` field (separate repo/ticket) | ~40–80 |

Revised up from the original ~240–270: only `PurchasedItems` is genuinely "beside an
existing dataLayer call". `StatusCart` needs new middleware, the GUID protocol has a
race to handle, the wishlist needs add/remove discrimination, and 5 events are new call
sites. Roughly **1.5–2 focused dev-days** for the frontend, plus the backend feed ticket,
plus QA against the eSputnik DevTools checklist.

## Definition of done

- All steps 1.1–2.7 merged; unit tests green (guards, GUID race incl. post-purchase
  clear, wishlist add-only, middleware emits per mutation).
- `npm run lint` + `npm run lint:types` clean.
- Backend eSputnik feed live and registered in the account; eS.js installed and visible
  in DevTools.
- The DevTools [checklist](#checklist--verification) passes end-to-end.

## Rollback / kill-switch

eS.js is a third-party script; failures must be revertable without a redeploy. Gate both
eS.js injection (Step 1.3) and `sendEsEvent` (Step 1.1) behind a single env flag
(`NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED`). Flag off → no script, no events, zero UX
impact. All events are fire-and-forget and must never throw into the render path.

## Open questions for marketing / PM

External inputs only — see [External prerequisites](#external-prerequisites--blockers).
Resolved in this revision: `productKey`/`categoryKey` values and consent gating.

1. eSputnik site / tracking-script id (input #1).
2. Tariff confirmed **Pro** (input #2).
3. Public feed URL + refresh schedule (input #3).

## Checklist — verification

- [ ] Feed uploaded to the account (by URL), products match site data
- [ ] eS.js installed before `</body>`, gated on consent + flag
- [ ] All 8 events visible in DevTools → Network (labeled `webevent`)
- [ ] Event params typed correctly (price/quantity/availability as **strings**)
- [ ] GUID changes on every cart change, never null/false
- [ ] `StatusCart` last GUID == `PurchasedItems` GUID (via purchase snapshot, not the
  post-clear GUID)
- [ ] `AddToWishlist` fires on add only, never on remove
- [ ] `CustomerData` fires on all required pages
- [ ] On-site product `id` == feed `<g:id>` == event `productKey` (all = parent
  `product.id`; cart/order events send `parent_id`, not the variant `id`)
- [ ] `categoryKey` == feed `<g:google_product_category>` (from the backend field, not
  FE-reconstructed)

## Session Map

- [x] S1 (~300K) Steps 1.1, 1.2, 1.3, 2.1, 2.2 — done 2026-06-30 (2.3 deferred → EXTERNAL_DEPENDENCY)
- [x] S2 (~310K) Steps 2.4, 2.5, 2.6, 2.7, 4.1 — done 2026-06-30

## Progress Log

### S1.step-1.1 — 2026-06-30
**Completed steps:** 1.1
**Commits:** 8abedbd

### S1.step-1.2 — 2026-06-30
**Completed steps:** 1.2
**Commits:** 67b157e

### S1.step-1.3 — 2026-06-30
**Completed steps:** 1.3
**Commits:** 20a8973

### S1.step-2.1 — 2026-06-30
**Completed steps:** 2.1
**Commits:** 0189f7c

### S1.step-2.2 — 2026-06-30
**Completed steps:** 2.2
**Commits:** 18cd2e2

### S1.step-2.3 — DEFERRED 2026-06-30 (EXTERNAL_DEPENDENCY)
**Blocker:** `categoryKey` requires the backend `google_product_category` field on the
catalog API response; absent from `CatalogData`/`Category`/`ResponseMeta` (zero repo
matches). Breadcrumb reconstruction forbidden by plan. Typed `CategoryPage` payload
already exists in `esputnik.ts`. Marked `skip: true`; unblock when BE ships the field.

### S2.step-2.4 — 2026-06-30
**Completed steps:** 2.4
**Commits:** 62e58c3

### S2.step-2.5 — 2026-06-30
**Completed steps:** 2.5
**Commits:** e91b6ca

### S2.step-2.6 — 2026-06-30
**Completed steps:** 2.6
**Commits:** 1062257

### S2.step-2.7 — 2026-06-30
**Completed steps:** 2.7
**Commits:** e87b269

### S2.step-4.1 — 2026-06-30
**Completed steps:** 4.1
**Commits:** e6c59b2

**Note (orchestrator):** new eSputnik event types (`AddToWishlist`/`StatusCart`/`PurchasedItems`/`CustomerData`) were added to `EsEventPayloadMap` via TS module augmentation co-located in each step's in-scope file (esputnik.ts was outside S2 scope). Tech debt: consolidate them into `esputnik.ts` directly in a follow-up.

### Review — 2026-06-30 (/review2 branch)
**Commits:** 6d6c011
**Findings fixed (3):** `PurchasedItems` idempotency `useRef` latch (was double-firing on effect re-run); `stringifyEsParams` now skips `undefined` (no more `guid: "undefined"`); all 8 event types consolidated into `esputnik.ts` (scattered `declare module` blocks removed — resolves the tech-debt note above).
**Post-review correction (`dd0bef9`):** the eS.js URL `statics.esputnik.com/scripts/<siteId>.js` was **confirmed correct** against the account's real snippet, AND Step 1.3's injection was fixed to the official bootstrap — it now sets up the `window.eS` command-queue stub and calls `eS('init')` (the earlier `<Script src>`-only form would have loaded the script but never initialized tracking). siteId is the 4th snippet arg (e.g. `4B037AA4F4B248C297FD03FC25619BFB`), set via `NEXT_PUBLIC_ESPUTNIK_SITE_ID`. Env keys documented in `.env.example` (`680fe5d`), off by default.
**Gates:** lint 0, tsc 0 new errors (13 pre-existing in untouched test files), jest 518 passed / 3 pre-existing FiltersManager fails.

## Outcome (orchestrator run 2026-06-30)

10/11 steps shipped on `feature/esputnik-webtracking`; **Step 2.3 (CategoryPage) deferred** (EXTERNAL_DEPENDENCY — backend `google_product_category` field absent from the catalog API response). Entire layer is gated behind `NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED` + analytics consent, so it is **inert in production until that flag is set**. Remaining to fully ship: BE adds `google_product_category` to the catalog response (unblocks 2.3); confirm tariff Pro + feed URL; then set `NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED=true` + `NEXT_PUBLIC_ESPUTNIK_SITE_ID` in the prod build env and rebuild. eS.js URL and siteId confirmed against the account snippet.
