# eSputnik Integration

## Architecture

### Server-side (Next.js API Routes)

eSputnik API uses Basic HTTP Auth with an API key. All requests go through Next.js API routes to keep the key server-side.

**Routes:**
- `POST /api/esputnik/subscribe` — Subscribe contact (registration, double opt-in)
- `POST /api/esputnik/contacts` — Add/update contacts (bulk, confirmed status)
- `POST /api/esputnik/event` — Send custom events (trigger scenarios)

### Client-side

- `src/shared/lib/esputnik/esputnikClient.ts` — High-level functions for each business scenario
- `src/shared/lib/esputnik/esputnikMiddleware.ts` — Redux middleware for automatic event tracking
- `src/shared/lib/esputnik/useCheckoutAbandoned.ts` — Hook for checkout abandonment detection

## Environment Variables

```env
ESPUTNIK_API_KEY=<your-api-key>       # Server-only (no NEXT_PUBLIC_ prefix)
ESPUTNIK_API_URL=https://esputnik.com/api
```

## Custom Field IDs

**IMPORTANT:** Field IDs in `src/shared/lib/esputnik/constants.ts` are set to `0` (placeholder).
These must be updated with actual IDs from the eSputnik admin panel after the marketing team configures them:

- `EXTERNAL_ID` — User ID in our system
- `LANG` — User language
- `SOURCE` — Registration source (site/app)
- `REGISTRATION_AT` — Registration date
- `BIRTHDAY` — Date of birth
- `BONUS_BALANCE` — Current bonus points
- `BONUS_EXPIRE_AT` — Bonus expiration date
- `EMAIL_CONFIRMED_AT` — Email confirmation date

## Implemented Funnels

### Frontend-triggered (automatic)

| Funnel | Method | Trigger |
|--------|--------|---------|
| 4.1 Registration | Subscribe contact | RTK middleware on `signUp` success |
| 4.4 Password reset | Custom event | RTK middleware on `forgetPassword` success |
| 4.5 Order confirmed | Custom event + contacts update | `CheckoutSuccessView` useEffect |
| 4.6 Checkout abandoned | Custom event | `beforeunload` on checkout page |

### Available client functions (call manually when needed)

| Function | Event Key | Use Case |
|----------|-----------|----------|
| `esputnikEmailConfirmed()` | `email_confirmed` | After email verification |
| `esputnikCartPriceDrop()` | `cart_price_drop` | Price drop for cart item |
| `esputnikWishlistPriceDrop()` | `wishlist_price_drop` | Price drop for wishlist item |
| `esputnikBonusAccrued()` | `bonus_accrued` | Bonus points added |
| `esputnikBirthdayBonusAccrued()` | `birthday_bonus_accrued` | Birthday bonus |
| `esputnikBonusExpiringSoon()` | `bonus_expiring_soon` | Bonus about to expire |

### Backend-only funnels (not implemented here)

These should be implemented on the backend (api.arber.ua):

- **4.7 Cart price drop** — Requires price monitoring cron job
- **4.8 Wishlist price drop** — Requires price monitoring cron job
- **4.10 Birthday bonus** — Triggered by birthday field or cron
- **4.11 Bonus expiring** — Triggered 7 days before `bonus_expire_at`

## File Structure

```
src/
├── shared/lib/esputnik/
│   ├── types.ts                    # TypeScript types
│   ├── constants.ts                # Field IDs, event keys, groups
│   ├── esputnikClient.ts           # Client-side service functions
│   ├── esputnikClient.test.ts      # Tests (8 tests)
│   ├── esputnikMiddleware.ts       # Redux middleware
│   ├── esputnikMiddleware.test.ts  # Tests (3 tests)
│   ├── useCheckoutAbandoned.ts     # Checkout abandonment hook
│   └── index.ts                    # Barrel export
├── pages/api/esputnik/
│   ├── subscribe.ts                # Subscribe contact proxy
│   ├── contacts.ts                 # Add/update contacts proxy
│   └── event.ts                    # Send event proxy
```

## Modified Files

- `src/shared/config/store/makeStore.ts` — Added esputnikMiddleware
- `src/views/CheckoutSuccesView/.../CheckoutSuccessView.tsx` — Added order_confirmed event
- `src/views/CheckoutView/.../CheckoutView.tsx` — Added checkout abandonment tracking
- `.env.example` — Added ESPUTNIK_API_KEY and ESPUTNIK_API_URL

## Testing

```bash
npx jest --testPathPattern="esputnik" --forceExit
```

11 tests total (8 client + 3 middleware).
