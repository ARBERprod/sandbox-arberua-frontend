# ТЗ: eSputnik Backend Integration (Laravel)

## Контекст

На фронтенде (Next.js) уже реализована интеграция с eSputnik для:
- Реєстрації (subscribe contact) — автоматично при sign-up
- Скидання пароля (custom event) — автоматично при forgotten
- Підтвердження замовлення (custom event + contacts update) — на сторінці checkout-success
- Покинутий чекаут (custom event) — beforeunload на сторінці checkout

**На бекенді потрібно реалізувати** воронки, які вимагають серверної логіки: моніторинг цін, бонусна система, підтвердження email, день народження.

---

## Автентифікація eSputnik API

- **Метод:** Basic HTTP Auth
- **Username:** будь-яке значення (наприклад `api`)
- **Password:** API-ключ з панелі eSputnik
- **Base URL:** `https://esputnik.com/api`

```php
// Приклад для Laravel HTTP client
Http::withBasicAuth('api', config('services.esputnik.api_key'))
    ->post('https://esputnik.com/api/v3/event', $payload);
```

**Конфігурація** (`config/services.php`):
```php
'esputnik' => [
    'api_key' => env('ESPUTNIK_API_KEY'),
    'api_url' => env('ESPUTNIK_API_URL', 'https://esputnik.com/api'),
],
```

---

## Загальний стандарт кастомних полів

Перед початком роботи — узгодити з маркетингом ID полів в eSputnik:

| Поле | Опис | Тип значення |
|------|------|-------------|
| `external_id` | ID користувача в нашій системі | string |
| `lang` | Мова користувача | `uk` / `ru` / `en` |
| `source` | Джерело | `site` / `app` |
| `registration_at` | Дата реєстрації | ISO 8601 datetime |
| `birthday` | Дата народження | ISO 8601 date |
| `bonus_balance` | Баланс бонусів | string (число) |
| `bonus_expire_at` | Дата згорання бонусів | ISO 8601 datetime |
| `email_confirmed_at` | Дата підтвердження email | ISO 8601 datetime |

Зберігати ID полів у конфігурації:
```php
// config/services.php → 'esputnik'
'field_ids' => [
    'external_id'        => env('ESPUTNIK_FIELD_EXTERNAL_ID'),
    'lang'               => env('ESPUTNIK_FIELD_LANG'),
    'source'             => env('ESPUTNIK_FIELD_SOURCE'),
    'registration_at'    => env('ESPUTNIK_FIELD_REGISTRATION_AT'),
    'birthday'           => env('ESPUTNIK_FIELD_BIRTHDAY'),
    'bonus_balance'      => env('ESPUTNIK_FIELD_BONUS_BALANCE'),
    'bonus_expire_at'    => env('ESPUTNIK_FIELD_BONUS_EXPIRE_AT'),
    'email_confirmed_at' => env('ESPUTNIK_FIELD_EMAIL_CONFIRMED_AT'),
],
```

---

## Рекомендована архітектура

### Service class

```
app/Services/Esputnik/
├── EsputnikService.php          # HTTP-клієнт до eSputnik API
├── EsputnikContactService.php   # Subscribe + Add/Update contacts
└── EsputnikEventService.php     # Custom events
```

### Jobs (для async виконання)

```
app/Jobs/Esputnik/
├── SendEsputnikEventJob.php
├── UpdateEsputnikContactJob.php
└── SubscribeEsputnikContactJob.php
```

Всі eSputnik-запити повинні виконуватись через **queue jobs** щоб не блокувати основний request.

---

## Воронка 1: Підтвердження email

### Тригер
Коли користувач підтверджує email (клік по посиланню у листі).

### Що робити

**Крок 1:** Оновити контакт — `POST /api/v1/contacts`

```json
{
  "contacts": [{
    "channels": [
      { "type": "email", "value": "user@email.com" }
    ],
    "fields": [
      { "id": FIELD_EMAIL_CONFIRMED_AT, "value": "2026-02-26T12:00:00Z" }
    ]
  }],
  "dedupeOn": "email",
  "customFieldsIDs": [FIELD_EMAIL_CONFIRMED_AT],
  "groupNames": ["email_confirmed"]
}
```

**Крок 2:** Відправити event — `POST /api/v3/event`

```json
{
  "eventKey": "email_confirmed",
  "email": "user@email.com",
  "externalCustomerId": "12345",
  "eventDate": "2026-02-26T12:00:00Z"
}
```

### Де викликати

У контролері/listener де обробляється email verification. Наприклад:
```php
// EventServiceProvider або listener на Verified event
Event::listen(Verified::class, function (Verified $event) {
    dispatch(new UpdateEsputnikContactJob($event->user, ['email_confirmed']));
    dispatch(new SendEsputnikEventJob('email_confirmed', $event->user));
});
```

---

## Воронка 2: Зниження ціни у кошику (cart_price_drop)

### Тригер
Ціна товару, який лежить у кошику користувача, знизилась.

### Потрібна інфраструктура

**Таблиця (якщо немає):** `cart_items` повинна зберігати `product_id` та `price_at_add` (ціна на момент додавання).

Або: зберігати знімок цін при останньому перерахунку.

### Artisan Command / Scheduled Job

```
php artisan esputnik:check-cart-price-drops
```

**Логіка:**
1. Вибрати всі кошики де є товари (`cart_items JOIN products`)
2. Для кожного товару порівняти поточну ціну з ціною на момент додавання
3. Якщо ціна знизилась — відправити event

**Розклад:** Раз на добу (або при оновленні цін).

```php
// app/Console/Kernel.php
$schedule->command('esputnik:check-cart-price-drops')->dailyAt('10:00');
```

### Event payload — `POST /api/v3/event`

```json
{
  "eventKey": "cart_price_drop",
  "email": "user@email.com",
  "externalCustomerId": "12345",
  "eventData": {
    "sku": "product-variant-id",
    "product_name": "Сорочка Classic Fit",
    "old_price": "2500",
    "new_price": "1990",
    "discount_percent": "20",
    "product_url": "https://arber.ua/product/sorochka-classic-fit",
    "image_url": "https://cdn.arber.ua/images/product.jpg"
  },
  "eventDate": "2026-02-26T10:00:00Z"
}
```

### Розрахунок discount_percent

```php
$discountPercent = round((($oldPrice - $newPrice) / $oldPrice) * 100);
```

---

## Воронка 3: Зниження ціни у вішлисті (wishlist_price_drop)

### Тригер
Ціна товару з вішліста користувача знизилась.

### Artisan Command

```
php artisan esputnik:check-wishlist-price-drops
```

**Логіка:**
1. Вибрати всі wishlists з товарами (`wishlists JOIN products`)
2. Потрібно зберігати ціну на момент додавання у вішліст (поле `price_at_add` в pivot-таблиці), або порівнювати з попереднім запуском
3. Якщо `product.price < price_at_add` — відправити event
4. Оновити `price_at_add` після відправки (щоб не слати повторно)

**Розклад:** Раз на добу.

```php
$schedule->command('esputnik:check-wishlist-price-drops')->dailyAt('10:00');
```

### Event payload — `POST /api/v3/event`

```json
{
  "eventKey": "wishlist_price_drop",
  "email": "user@email.com",
  "externalCustomerId": "12345",
  "eventData": {
    "sku": "product-variant-id",
    "product_name": "Піджак Slim Fit",
    "old_price": "5500",
    "new_price": "3990",
    "discount_percent": "27",
    "product_url": "https://arber.ua/product/pidzhak-slim-fit",
    "image_url": "https://cdn.arber.ua/images/product.jpg"
  },
  "eventDate": "2026-02-26T10:00:00Z"
}
```

---

## Воронка 4: Нарахування бонусів (bonus_accrued)

### Тригер
Користувачу нараховані бонуси (за покупку, акцію, промо тощо).

### Де викликати
У сервісі/job де відбувається нарахування бонусів. Після успішного нарахування:

```php
// BonusService.php або відповідний listener
public function accrueBonus(User $user, float $amount, string $reason, ?Carbon $expireAt = null): void
{
    // ... існуюча логіка нарахування ...

    // Відправити в eSputnik
    dispatch(new SendEsputnikEventJob('bonus_accrued', $user, [
        'bonus_amount'  => (string) $amount,
        'bonus_balance' => (string) $user->fresh()->bonus_balance,
        'reason'        => $reason,
        'expire_at'     => $expireAt?->toISOString() ?? '',
    ]));

    // Оновити поле bonus_balance в eSputnik
    dispatch(new UpdateEsputnikContactJob($user, [], [
        config('services.esputnik.field_ids.bonus_balance') => (string) $user->bonus_balance,
    ]));
}
```

### Event payload — `POST /api/v3/event`

```json
{
  "eventKey": "bonus_accrued",
  "email": "user@email.com",
  "externalCustomerId": "12345",
  "eventData": {
    "bonus_amount": "150",
    "bonus_balance": "850",
    "reason": "purchase",
    "expire_at": "2026-06-26T00:00:00Z"
  },
  "eventDate": "2026-02-26T12:00:00Z"
}
```

---

## Воронка 5: День народження — нарахування бонусів (birthday_bonus_accrued)

### Тригер
Настав день народження користувача — нарахувати бонуси.

### Artisan Command

```
php artisan esputnik:birthday-bonus
```

**Логіка:**
1. Вибрати користувачів де `birthday` = сьогодні (день+місяць):
   ```php
   User::whereRaw("DATE_FORMAT(birthday, '%m-%d') = ?", [now()->format('m-d')])
       ->whereNotNull('email')
       ->chunk(100, function ($users) { ... });
   ```
2. Нарахувати бонуси (сума визначається бізнес-правилами)
3. Відправити event

**Розклад:** Щодня о 09:00.

```php
$schedule->command('esputnik:birthday-bonus')->dailyAt('09:00');
```

### Event payload — `POST /api/v3/event`

```json
{
  "eventKey": "birthday_bonus_accrued",
  "email": "user@email.com",
  "externalCustomerId": "12345",
  "eventData": {
    "bonus_amount": "500",
    "bonus_balance": "1350",
    "expire_at": "2026-04-26T00:00:00Z"
  },
  "eventDate": "2026-02-26T09:00:00Z"
}
```

### Також оновити контакт — `POST /api/v1/contacts`

Оновити `bonus_balance` в eSputnik:

```json
{
  "contacts": [{
    "channels": [{ "type": "email", "value": "user@email.com" }],
    "fields": [
      { "id": FIELD_BONUS_BALANCE, "value": "1350" }
    ]
  }],
  "dedupeOn": "email",
  "customFieldsIDs": [FIELD_BONUS_BALANCE]
}
```

---

## Воронка 6: Бонуси згорають (bonus_expiring_soon)

### Тригер
За 7 днів до дати згорання бонусів.

### Передумова
Потрібна таблиця або поле, що зберігає дату згорання бонусів. Варіанти:
- Поле `bonus_expire_at` в таблиці `users`
- Окрема таблиця `bonus_transactions` з полем `expires_at`

### Artisan Command

```
php artisan esputnik:bonus-expiring-soon
```

**Логіка:**
1. Вибрати користувачів де бонуси згорають через 7 днів:
   ```php
   // Варіант з полем в users:
   User::whereDate('bonus_expire_at', now()->addDays(7)->toDateString())
       ->where('bonus_balance', '>', 0)
       ->whereNotNull('email')
       ->chunk(100, function ($users) { ... });

   // Варіант з таблицею транзакцій:
   BonusTransaction::where('type', 'earn')
       ->whereDate('expires_at', now()->addDays(7)->toDateString())
       ->where('remaining_amount', '>', 0)
       ->with('user')
       ->chunk(100, function ($transactions) { ... });
   ```
2. Відправити event для кожного

**Розклад:** Щодня о 10:00.

```php
$schedule->command('esputnik:bonus-expiring-soon')->dailyAt('10:00');
```

### Event payload — `POST /api/v3/event`

```json
{
  "eventKey": "bonus_expiring_soon",
  "email": "user@email.com",
  "externalCustomerId": "12345",
  "eventData": {
    "bonus_balance_to_expire": "300",
    "expire_at": "2026-03-05T00:00:00Z",
    "days_left": "7"
  },
  "eventDate": "2026-02-26T10:00:00Z"
}
```

### Також оновити контакт

Оновити `bonus_expire_at` в eSputnik:

```json
{
  "contacts": [{
    "channels": [{ "type": "email", "value": "user@email.com" }],
    "fields": [
      { "id": FIELD_BONUS_EXPIRE_AT, "value": "2026-03-05T00:00:00Z" },
      { "id": FIELD_BONUS_BALANCE, "value": "300" }
    ]
  }],
  "dedupeOn": "email",
  "customFieldsIDs": [FIELD_BONUS_EXPIRE_AT, FIELD_BONUS_BALANCE]
}
```

---

## Синхронізація контактів (додатково, рекомендовано)

### Регулярна синхронізація всіх контактів

```
php artisan esputnik:sync-contacts
```

**Логіка:** Масовий експорт всіх користувачів у eSputnik через `POST /api/v1/contacts` (до 3000 контактів за запит).

**Розклад:** Раз на тиждень у неділю вночі.

```php
$schedule->command('esputnik:sync-contacts')->weeklyOn(0, '03:00');
```

**Для кожного контакту передавати:**
- email, phone
- firstName, lastName
- external_id (user.id)
- lang
- birthday
- bonus_balance
- bonus_expire_at
- source = "site"

---

## Підсумкова таблиця Artisan Commands

| Команда | Розклад | Опис |
|---------|---------|------|
| `esputnik:check-cart-price-drops` | Щодня 10:00 | Перевірка зниження цін у кошиках |
| `esputnik:check-wishlist-price-drops` | Щодня 10:00 | Перевірка зниження цін у вішлістах |
| `esputnik:birthday-bonus` | Щодня 09:00 | Нарахування бонусів на ДН |
| `esputnik:bonus-expiring-soon` | Щодня 10:00 | Повідомлення про згорання бонусів |
| `esputnik:sync-contacts` | Неділя 03:00 | Повна синхронізація контактів |

---

## Обмеження eSputnik API

- **Rate limit:** 200 запитів/секунду
- **Event payload:** max 20 KB
- **Contacts batch:** max 3000 контактів за запит
- **Idempotency:** повторний event протягом 1 хвилини = 409 Conflict
- **Неактивні ключі** автоматично вимикаються через 90 днів

---

## Потрібно від маркетингу перед початком

1. API-ключ eSputnik (створити в Settings → API)
2. ID всіх кастомних полів (external_id, lang, source, registration_at, birthday, bonus_balance, bonus_expire_at, email_confirmed_at)
3. Бізнес-правила: скільки бонусів нараховувати на ДН
4. Підтвердити імена груп: `registered`, `email_confirmed`, `customers`
5. Підтвердити імена подій (eventKey): `email_confirmed`, `cart_price_drop`, `wishlist_price_drop`, `bonus_accrued`, `birthday_bonus_accrued`, `bonus_expiring_soon`

---

## Потрібні зміни в БД (якщо відсутні)

1. **`wishlists` pivot:** додати `price_at_add DECIMAL(10,2)` — ціна на момент додавання
2. **`cart_items`:** додати `price_at_add DECIMAL(10,2)` — ціна на момент додавання (якщо ще немає)
3. **`users`:** переконатись що є `bonus_expire_at TIMESTAMP NULL` (або реалізувати через `bonus_transactions.expires_at`)
