# eSputnik Integration

## Architecture

All eSputnik logic runs on the **backend** (Laravel). The frontend has no eSputnik code.

### Backend (Laravel)

- **Service:** `app/Services/ES/` — HTTP client with Basic Auth, payloads, contracts
- **Jobs:** `SendEsputnikEventJob`, `UpdateEsputnikContactJob`, `SyncEsputnikContactsBatchJob` — async via Redis queue
- **Config:** `app/Services/ES/config/es.php` — API credentials, event keys, field IDs
- **Queue:** Supervisor + Redis (docker container `queue.arber`)
- **Scheduler:** Docker container `laravel.scheduler` runs `schedule:run` every minute

### Event-driven funnels

| Event | Listener | Action |
|-------|----------|--------|
| `Registered` (Laravel) | `SubscribeContactOnRegisteredListener` | Subscribe contact, group `registered` |
| `Verified` (Laravel) | `SyncContactOnEmailVerifiedListener` | Update contact + send `email_confirmed` event |
| `PasswordResetRequested` | `SendPasswordResetEventListener` | Send `password_reset_requested` event |
| `OrderCreated` | `SendOrderConfirmedEventListener` | Update contact (group `customers`) + send `order_confirmed` event |
| `UserBonusAccrued` | `SendBonusAccruedEventListener` | Send `bonus_accrued` event |

### Scheduled commands

| Command | Schedule | Description |
|---------|----------|-------------|
| `esputnik:check-abandoned-checkouts` | Hourly | Carts with items, no order in 30 min |
| `esputnik:check-cart-price-drops` | Daily 10:00 | Product price < cart item price |
| `esputnik:check-wishlist-price-drops` | Daily 10:00 | Product price < wishlist price_at_add |
| `esputnik:birthday-bonus` | Daily 09:00 | Users with birthday today |
| `esputnik:bonus-expiring-soon` | Daily 10:00 | Bonuses expiring within 7 days |
| `esputnik:sync-contacts` | Sunday 03:00 | Batch sync all users (3000/request) |

## History

- **2026-02-26:** Initial implementation — frontend API routes + Redux middleware + client functions
- **2026-03-07:** Migrated all funnels to backend. Removed all frontend eSputnik code (API routes, middleware, client lib, hooks). Added backend listeners for registration, password reset, order confirmed, abandoned checkout.
