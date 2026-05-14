# План інтеграції з 1С: API промокодів (Frontend)

**Дата:** 2026-05-13
**Статус:** v2 — переписано під контракт фронта v3 (`2026-05-13-promocode-frontend-contract.md`). Реліз синхронний з backend.

**Джерело правди:**
- **Контракт API:** [`2026-05-13-promocode-frontend-contract.md`](./2026-05-13-promocode-frontend-contract.md) (v3) — shape запитів/відповідей, error codes, UX-flow. Будь-яка зміна shape/code/HTTP-кода — синхронна правка контракту і цього плану.
- **Backend-план:** [`2026-04-30-promocode-1c-integration-plan.md`](./2026-04-30-promocode-1c-integration-plan.md).

**Базові рішення (зафіксовано):**
- 1С — єдина точка правди. Frontend нічого не кешує і не валідовує локально (окрім `required + max:64`).
- **Тільки авторизовані користувачі** з заповненим телефоном.
- **Бонуси і промокод одночасно НЕ працюють.** Контракт §5.5: бек **автоматично** обнуляє `cart.bonuses_deducted` при `apply-promocode`; фронт читає `cart` з відповіді і (опціонально) показує тост про скасування. Preventive-disable UI бонусів — **не цей PR** (див. §8 нижче).
- **Старий typo-ендпоінт `/cart-se/aply-promocode`** залишається як deprecated-alias на беку до окремого PR. Фронт мігрує на `/cart-se/apply-promocode` у цьому релізі.
- **Auth — cookie-stateful Sanctum** (той самий канал, що для решти cart-мутацій). Bearer-токен не використовується — деталі і обґрунтування у §5.
- **One-Click checkout** — промокод не підтримується (немає UX для applied-state у швидкому потоці).

---

## 1. Що змінюється для користувача

Єдиний екран — checkout (`CheckoutView` → `widgets/Checkout/ui/CheckoutCart/CheckoutCart.tsx`). Окремої cart-page немає, у `CartDrawer` промокод не відображається — лишається як зараз.

### 1.1 PromoCodeForm на чекауті

- Поле вводу + кнопка «Застосувати» — лишається.
- **Empty state.** Поле порожнє, помилок немає.
- **Applied state.** Видно `code`, `discount %`, суму знижки в грн, кнопку «Видалити». Поле вводу прибрано (повертається після remove).
- **Error state — validation.** Текст помилки (i18n за `error.code`) під полем. Поле не очищається, кнопка знову активна. Категорія `validation` у §2.7.
- **Error state — CTA.** Замість поля вводу — блок «Заповніть телефон у профілі» + лінка на `/profile`. Тільки для `PROMOCODE_USER_PHONE_MISSING` / `PROMOCODE_CLIENT_NOT_FOUND`.
- **Error state — service warning.** Banner «Сервіс промокодів тимчасово недоступний» (для 503). Поле вводу залишається активним, юзер може повторити вручну (контракт §5.1 п.6 — кнопку не блокуємо).

### 1.2 Інвалідація після зміни кошика

Контракт §5.2: будь-яка `add/update/delete` cart-мутація може повернути `cart.promocode = null`. Фронт:
- Завжди оновлює UI промокоду з останнього `cart`-респонсу — **локального стейту «applied»» не тримаємо** (зараз тримається в `useState` `PromoCodeForm.tsx:21` — приберемо).
- Якщо `promocode` був і зник — неблокуючий toast «Кошик змінено, додайте промокод повторно» (4–5 сек).

### 1.3 Bonus auto-reset toast (опційно — за наявності поля)

Контракт §5.5: якщо до apply було `cart.bonuses_deducted > 0`, а після — `0` → додатковий toast «Списання бонусів скасовано: бонуси та промокод не діють одночасно».

**Поточний фронт не використовує `cart.bonuses_deducted`.** У цьому PR:
- Якщо поле буде у `CartResource` (бек уже додав) — порівнюємо `prev > 0 && next === 0` у RTKQ-listener і показуємо toast.
- Якщо поля немає — пункт відкладено разом із bonus UI (див. §8).

### 1.4 Checkout submit

Контракт §5.4: жодних додаткових дій. Бек при створенні замовлення може повернути 422 з `PROMOCODE_ALREADY_USED` / `PROMOCODE_EXPIRED` / `PROMOCODE_NO_ELIGIBLE_ITEMS` (race між пристроями). Фронт:
- На `POST /api/v2/orders` (`checkoutApi.checkout`) додає обробку `error.code` цих трьох значень.
- Показує `error.message` в існуючому error-каналі форми чекауту, оновлює cart-стейт (refetch), повертає користувача на крок огляду кошика.
- **Жодного спеціального опрацювання `checkout-started`** (старий план описував refetch на `markCheckoutStarted` — контракт цього не вимагає, прибираємо).

---

## 2. Контракт API (коротка витяжка)

Повний контракт — у `2026-05-13-promocode-frontend-contract.md`. Тут лише дельти, які впливають на код фронта.

### 2.1 Endpoints

| URL | Метод | Auth |
|-----|-------|------|
| `POST /api/v2/cart-se/apply-promocode` | POST | Sanctum (cookie-stateful — див. §5) |
| `DELETE /api/v2/cart-se/remove-promocode` | DELETE | Sanctum (cookie-stateful) |
| `POST /api/v2/cart-se/aply-promocode` (deprecated) | POST | Sanctum | — старий typo-ендпоінт, alias до окремого PR. Фронт ним не користується. |

### 2.2 Request

```json
POST /apply-promocode
{ "code": "SALE15" }
```

**Увага:** поле тіла — `code`, не `promocode` (як у поточному фронт-коді `promoCodeApi.ts:10`). Перейменувати.

### 2.3 Success response (apply)

```json
{
  "success": true,
  "data": {
    "promocode": {
      "code": "SALE15",
      "discount": 15,
      "period_from": "2026-04-09T00:00:00",
      "period_to": "2026-04-11T00:00:00",
      "applied_at": "2026-05-13T10:22:31+03:00"
    },
    "cart": { /* CartResource — див. 2.5 */ }
  }
}
```

### 2.4 Success response (remove)

```json
{ "success": true, "data": { "cart": { /* CartResource без promocode */ } } }
```

### 2.5 CartResource — нові поля (контракт §4)

```ts
type CartData = {
  // існуючі поля
  total: number;            // копійки (вже з промокодом і бонусами)
  items: ICartItem[];
  // нові
  promocode: PromocodeMeta | null;
  // bonuses_deducted: number — за наявності, читаємо тільки для toast (§1.3)
};

type PromocodeMeta = {
  code: string;
  discount: number;            // %
  period_to: string;           // ISO 8601 без TZ, Europe/Kyiv
  total_discount: number;      // копійки
};

type ICartItem = {
  // існуючі поля
  promocode_discount: number | null; // копійки, частка знижки на позицію
};
```

Інваріант (контракт §4): `Σ items[].promocode_discount === promocode.total_discount`. Перевіряти не треба — це баг бека, не фронта.

### 2.6 Error response

```json
{
  "success": false,
  "error": { "code": "PROMOCODE_EXPIRED", "message": "…" }
}
```

`message` локалізований беком, але фронт **не парсить**. Рішення приймається за `error.code`. Локалі — власні (i18n-ключі §4.2).

### 2.7 Error codes → UI поведінка

Список з контракту §3 (Code dictionary). Категоризація для UI:

| `error.code` | HTTP | Категорія | Де відображати |
|--------------|------|-----------|----------------|
| `PROMOCODE_CODE_REQUIRED` | 422 | validation | під полем |
| `PROMOCODE_CART_EMPTY` | 422 | validation | під полем |
| `PROMOCODE_USER_PHONE_MISSING` | 422 | cta | замість поля, лінка на `/profile` |
| `PROMOCODE_CLIENT_NOT_FOUND` | 422 | cta | замість поля, лінка на `/profile` |
| `PROMOCODE_NOT_FOUND` | 422 | validation | під полем |
| `PROMOCODE_NOT_FOR_WEB` | 422 | validation | під полем |
| `PROMOCODE_ALREADY_USED` | 422 | validation | під полем |
| `PROMOCODE_EXPIRED` | 422 | validation | під полем |
| `PROMOCODE_NO_ELIGIBLE_ITEMS` | 422 | validation | під полем |
| `PROMOCODE_SERVICE_UNAVAILABLE` | 503 | service-warning | banner |
| (HTTP 401) | 401 | auth | login modal |
| (HTTP 5xx/network) | 5xx | service-warning | banner |

**Невідомі `error.code`** (forward-compat): рендеримо як `validation` з fallback-текстом «Не вдалося застосувати промокод», у `console.error` пишемо повний об'єкт. Sentry в проекті немає — окремої аналітики не заводимо.

---

## 3. Архітектура стану

### 3.1 Redux

`CartData` (`entities/Cart/model/types/types.ts`) розширюється полями з §2.5:
- `promocode: PromocodeMeta | null`
- `promocode_discount: number | null` у `ICartItem`

`CartSchema` (`entities/Cart/model/types/cartSchema.ts`) не змінюється — `cartData` і так містить ці поля.

Окремий слайс для промокоду **не вводимо**. Стан «applied / not applied» виводиться селектором `cartSelectors.getPromocode` (новий) з `cartData.promocode`.

### 3.2 Мертвий код на видалення

- `widgets/Checkout/model/slices/checkoutSlice.ts:7,17-19` — поле `promoCode` + редюсер `setPromoCode`.
- `widgets/Checkout/model/selectors/checkoutSelectors.ts:4,8` — селектор `getPromoCode`.
- `widgets/Checkout/ui/Checkout/Checkout.tsx:31` — використання селектора (nowhere-used значення).

Перевірити, чи зчитує його ще щось — і виносити одним коммітом.

### 3.3 Локальний стейт у `PromoCodeForm`

`useState<string | null>('isPromoCode')` (`PromoCodeForm.tsx:21`) **видаляється** — стан «applied» бере з селектора `cartSelectors.getPromocode`. Це закриває розрив §1.2: після інвалідації бекендом UI оновлюється сам.

---

## 4. RTK Query — конкретні зміни

### 4.1 `features/PromoCodeForm/api/promoCodeApi.ts`

Поточний код:
```ts
promoCode: build.mutation<void, { promocode: string }>({
  query: ({ promocode }) => ({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/aply-promocode`,
    body: { promocode },
  }),
}),
```

Нова форма (один endpoints-файл, дві мутації):
```ts
applyPromocode: build.mutation<ApplyPromocodeResponse, { code: string }>({
  query: ({ code }) => ({
    method: 'POST',
    url: `${API_V2}/cart-se/apply-promocode`,
    body: { code },
  }),
  // НЕ використовуємо transformResponse: meta + data.cart обидва потрібні.
}),
removePromocode: build.mutation<RemovePromocodeResponse, void>({
  query: () => ({ method: 'DELETE', url: `${API_V2}/cart-se/remove-promocode` }),
}),
```

Типи:
```ts
type ApplyPromocodeResponse = {
  success: true;
  data: { promocode: PromocodeMeta; cart: CartData };
};
type RemovePromocodeResponse = {
  success: true;
  data: { cart: CartData };
};
```

### 4.2 Синхронізація `cartSlice` з відповідями apply/remove

Існуючий `cartSlice` оновлюється з cart-мутацій (`extraReducers` або middleware — перевірити поточний механізм). Додаємо реакцію на `applyPromocode.matchFulfilled` і `removePromocode.matchFulfilled` → заміщення `cartData` повністю.

**Жодного `fetchSession()` після apply/remove** (зараз `PromoCodeForm.tsx:40` робить це). Cart-відповідь повна, додатковий запит зайвий. Зекономимо ~200ms.

### 4.3 Inline-toast «корзина змінена, промо знято»

RTKQ-listener middleware (новий файл `entities/Cart/model/middleware/promocodeInvalidationListener.ts`):
- Слухає `matchFulfilled` всіх cart-мутацій (`addProductToCart`, `addManyProductsToCart`, `updateProduct`, `deleteProduct`, `deleteCart`).
- Порівнює `prev cart.promocode != null && action.payload.promocode === null` → диспатчить toast-action.

Якщо в проекті немає toast-інфраструктури — заводимо мінімальну (огляд при імплементації: чи є `react-toastify` / `sonner` / власний контейнер; якщо ні — додаємо найлегший варіант). Це окремий sub-task в оцінці §12 (етап 5).

### 4.4 `transformResponse` для cart-мутацій

Зараз (`cartApi.ts:11-62`): `transformResponse: (response) => response.data` — приймає `SuccessApiResponse<CartData>`, віддає `CartData`. Контракт §5.2 каже, що ті ж самі мутації тепер можуть повертати оновлений `cart.promocode = null`. Якщо новий `CartResource` теж приходить як `{ success, data: CartData }` — transform не змінюється, лише `CartData` тип розширюється. **Перевірити це з backend** перед стартом (§9).

### 4.5 Тип-гард помилок

`shared/types/api.ts:27-44` — існуючий `ValidationError` з `data.errors[key]: string[]`. Він **не підходить** для нового shape `{ success: false, error: { code, message } }`. Додаємо:

```ts
// shared/types/api.ts
export type BusinessError<TCode extends string = string> = {
  status: number;
  data: { success: false; error: { code: TCode; message: string } };
};
```

```ts
// shared/types/type-guards.ts
export function isBusinessError(error: unknown): error is BusinessError {
  return (
    typeof error === 'object' && error !== null
    && 'data' in error && typeof (error as any).data === 'object'
    && (error as any).data?.success === false
    && typeof (error as any).data?.error?.code === 'string'
  );
}
```

`isValidationError` для промо-ендпоінтів **не застосовується** — нова форма помилки інша. Поточний `catch` у `PromoCodeForm.tsx:41-48` переписується під `isBusinessError`.

---

## 5. Авторизація — cookie-stateful Sanctum (вирішено)

**Контракт §1/§2.1 неточний:** формулювання `Authorization: Bearer <Sanctum-token>` прескриптивне і неправильне для основної маси користувачів. Реальна поведінка бекенда — Sanctum приймає **обидва канали** (session cookie зі stateful-домену **або** bearer), і регулярний email-логін цього бекенда токен **не видає взагалі**.

**Що показує код бекенда (підтверджено читанням репо):**
- `apply-promocode` / `remove-promocode` обгорнуті в `auth:sanctum` (`app/Core/Http/Routing/Routes/Frontend/CoreRouteRegistrar.php:157`). За дизайном Sanctum цей middleware приймає session cookie або bearer — на вибір клієнта.
- `EnsureFrontendRequestsAreStateful` стоїть у глобальній групі `api` (`app/Core/Http/Kernel.php:73`). Усі v2-ендпоінти готові ловити фронт як stateful клієнта.
- `config/cors.php`: `supports_credentials: true`, `paths: ['v2/*', …]` — куки/CSRF з фронта проходять.
- `UserSignInAction.php:21` робить `auth('web')->attempt(...)` — сесійний guard. Контролер повертає голий `SuccessResponse` (`UserSignInController.php:22`) → payload `{ success: true, code: 200 }`, **без `access_token`**.
- `SessionTokenHandler::createSessionToken()` (`$user->createToken(...)`) викликається **тільки з `OAuthProvider`** — це Google. Регулярний email-логін, sign-up, forgotten/reset — Sanctum-токен на видають.

**Висновок:**
- Фронт використовує **той самий канал, що для існуючих cart-мутацій**: `credentials: 'include'` + `X-XSRF-TOKEN` (вже в `baseQuery.ts:27-41`). Жодних правок auth-шару під цей PR.
- §9.1 знімається з блокерів. Решта пунктів §9 (CartResource shape, `bonuses_deducted`, HTTP-status для unknown code) — лишаються.
- Sub-task «зберігати `access_token` у `signIn` + `Authorization: Bearer` у baseQuery» — **викидається з цього PR**. Запровадження bearer-каналу для email-логіну потребує правок бекенда (`UserSignInAction` має видавати токен, аналогічно sign-up/forgotten), що поза скоупом промо-інтеграції.

**Окремий тех-борг фронта (не в цьому PR):**
- Тест `AuthByEmailForm.test.tsx:19-21` мокає `signIn`-відповідь з полем `access_token`. Це не відповідає реальному shape бекенда (`SuccessResponse` повертає лише `{success, code}`). Мок треба привести у відповідність — окрема задача поза цим PR.

**Операційна вимога деплою (нагадування, не цей PR):**
- Домен фронта мусить бути в `SANCTUM_STATEFUL_DOMAINS` у `.env` бекенда. Дефолт у `config/sanctum.php` обмежений `localhost*`. Це вже виконано в інфрі (інакше поточні cart-мутації не працювали б) — тут зазначаємо лише для повноти чек-листа.

---

## 6. i18n

### 6.1 Namespace

Існуючі промо-ключі живуть у `checkout-page` (`public/locales/uk/checkout-page.json:4` — `checkout.enter-promo-code`). Розширюємо цей же namespace під ключем `promocode.*`:

```
checkout-page:promocode.input.label
checkout-page:promocode.input.placeholder
checkout-page:promocode.input.apply_button
checkout-page:promocode.applied.code_prefix
checkout-page:promocode.applied.discount_label
checkout-page:promocode.applied.remove_button
checkout-page:promocode.toast.cart_changed
checkout-page:promocode.toast.bonus_reset
checkout-page:promocode.banner.service_unavailable
checkout-page:promocode.cta.phone_missing
checkout-page:promocode.cta.phone_missing_button
checkout-page:promocode.cta.client_not_found
checkout-page:promocode.error.PROMOCODE_CODE_REQUIRED
checkout-page:promocode.error.PROMOCODE_CART_EMPTY
checkout-page:promocode.error.PROMOCODE_NOT_FOUND
checkout-page:promocode.error.PROMOCODE_NOT_FOR_WEB
checkout-page:promocode.error.PROMOCODE_ALREADY_USED
checkout-page:promocode.error.PROMOCODE_EXPIRED
checkout-page:promocode.error.PROMOCODE_NO_ELIGIBLE_ITEMS
checkout-page:promocode.error.unknown
```

Файли: `public/locales/{uk,ru,en}/checkout-page.json` — оновити три локалі (контракт описує uk/ru, але `en` теж існує — додати).

### 6.2 Маппінг `error.code` → ключ

Усі промокодні коди централізовані в `entities/Cart/model/types/promocodeCodes.ts` (`PROMOCODE_VALIDATION_CODES`, `PROMOCODE_CTA_CODES`, `PROMOCODE_SERVICE_CODES`, `PROMOCODE_CHECKOUT_RACE_CODES` + predicates). Утиліта `entities/Cart/lib/getPromocodeErrorKey.ts` повертає типизований `PromocodeErrorI18nKey`:

```ts
export const getPromocodeErrorKey = (code: string | null | undefined): PromocodeErrorI18nKey =>
  (code && isPromocodeValidationCode(code))
    ? `checkout-page:promocode.error.${code}`
    : 'checkout-page:promocode.error.unknown';
```

CTA / banner коди (`PROMOCODE_USER_PHONE_MISSING`, `PROMOCODE_CLIENT_NOT_FOUND`, `PROMOCODE_SERVICE_UNAVAILABLE`) обробляються окремими гілками рендеру через `categorizePromocodeError` (повертає `{ kind: 'validation' | 'cta' | 'service', code }` — для невідомих бізнес-кодів `kind: 'validation', code: null`, що активує forward-compat `console.error` у формі).

---

## 7. Acceptance-сценарії

1. **Happy path.** Авторизований юзер з phone у профілі, кошик 1000 грн. Apply `SALE15` → response 200 з `data.promocode.discount=15`, `data.cart.promocode.total_discount=15000`, `data.cart.total=85000` (копійки). UI: applied-state, бейдж «−150 грн», поле вводу прибране, кнопка «Видалити».
2. **Remove.** Той самий юзер тисне «Видалити» → DELETE 200, `cart.promocode = null`. UI повертається в empty-state, `cart.total = 100000`.
3. **Зміна кошика після apply.** Юзер apply → змінює quantity товару (`cart-se/{itemId}/edit-quantity`). Response має `cart.promocode = null`. UI оновлюється з cart-respose (без додаткових запитів), показується toast «Кошик змінено, додайте промокод повторно».
4. **Already used.** Юзер apply → 422 `{ error.code: PROMOCODE_ALREADY_USED }` → під полем «Ви вже використовували цей промокод». Поле вводу лишається активним.
5. **Already used на checkout (race).** Юзер apply на ноуті, оформив на телефоні. На ноуті тискає «Оформити» → `POST /api/v2/orders` повертає 422 з `error.code = PROMOCODE_ALREADY_USED`. Фронт показує `error.message`, скидає cart-стейт (refetch session / cart) і повертає юзера на крок огляду кошика.
6. **Expired.** Apply після `period_to` → 422 `PROMOCODE_EXPIRED` → під полем «Термін дії промокоду минув».
7. **Phone missing.** Юзер без phone тисне apply → 422 `PROMOCODE_USER_PHONE_MISSING` → замість поля CTA «Заповніть телефон у профілі» + кнопка «Перейти в профіль» → `/profile`.
8. **Client not found.** Apply → 422 `PROMOCODE_CLIENT_NOT_FOUND` → той самий CTA-блок (формулювання інше: «Профіль не знайдено в системі лояльності»).
9. **1С недоступний.** Apply → 503 `PROMOCODE_SERVICE_UNAVAILABLE` → banner «Сервіс промокодів тимчасово недоступний». Поле вводу активне, юзер може повторити.
10. **Unknown error.code.** Бек повернув новий код, якого фронт не знає → fallback «Не вдалося застосувати промокод», `console.error` з payload.
11. **401.** Sanctum-сесія прострочена → `baseQueryWithReauth` обробляє 419 (CSRF), якщо 401 — глобальний login-modal-flow (як в інших захищених запитах).
12. **Bonus auto-reset toast** (якщо поле `bonuses_deducted` уже в `CartResource`). Юзер з `bonuses_deducted=500` тисне apply → response має `bonuses_deducted=0` → крім бейджа промокоду, тост «Списання бонусів скасовано: бонуси та промокод не діють одночасно». Якщо поля немає — сценарій недоступний (виноситься).

---

## 8. Out of scope

- **Bonus toggle UI / bonus mutex.** Контракт §5.5 описує бек-механіку. На фронті зараз немає bonus-slider/toggle взагалі (`grep "bonus" widgets/Checkout` → пусто). Цей PR **читає** `cart.bonuses_deducted` для тоста (§1.3, якщо поле є), але **не будує** bonus UI. Окрема задача «Bonus deduction UI + mutex з промо».
- **Preview-ендпоінт промокоду.** Контракт §8: не передбачено.
- **Countdown до `period_to`.** Контракт §6: «орієнтир, не блокування». У MVP не показуємо — додатковий UI без бізнес-цінності в цьому релізі.
- **Видалення `cart-se/aply-promocode` typo-аліасу.** Робиться окремим PR після підтвердження міграції (контракт §2.3, §8).

---

## 9. Координація з backend (передумови старту)

Перед тим, як починати імплементацію, синхронізуватися з backend по:

1. ~~**Auth-канал на `apply-promocode` / `remove-promocode`.**~~ **Вирішено** — cookie-stateful Sanctum (див. §5). Фронт нічого не міняє в auth-шарі, sub-task викинуто.
2. **`CartResource` shape для `add/update/delete/truncate` мутацій.** Контракт §5.2 каже «можуть повернути `cart.promocode = null`». Підтвердити, що `cartApi` отримує той самий розширений `CartData` з полем `promocode`. **Блокер старту.**
3. **`bonuses_deducted` у `CartResource`** — чи додано? Якщо так — буде працювати тост §1.3. Якщо ні — виноситься з цього PR.
4. **HTTP-status для unknown `error.code`** — 422 чи 500? Контракт фіксує тільки відомі. Якщо бек повертає 500 на невідомі — фронт-fallback працює, але треба узгодити.
5. **Контракт-патч.** §1, §2.1, §2.2 контракту переписати з `Authorization: Bearer <Sanctum-token>` на `Sanctum auth (session cookie зі stateful-домену або bearer)` — поточне формулювання прескриптивне і неточне для основного флоу. Окремий мінорний PR на доку, не блокер.
6. **Smoke на staging.** Перед мерджем фронт через свій клієнт викликає реальний backend з реальним 1С: сценарії 1, 2, 3, 9 з §7. Інші — мокаються.

---

## 10. Зачищення legacy

Перевірений раніше grep `aply-promocode` показав лише 1 використання у фронт-коді (`promoCodeApi.ts:9`). При переписуванні API-клієнта (§4.1) URL змінюється — старий шлях більше нікуди не використовується на фронті. Бек залишає alias для безпеки (контракт §2.3).

Інших legacy-shape залишків немає:
- `CartData` без поля `promocode` зараз — нічого мігрувати, додаємо як нове поле.
- `SessionDto.data.cart` теж без `promocode` — буде розширено разом із `CartData`.
- Жодного localStorage cart-кешу, який треба bumpити, у проекті немає (cart — Redux + session response, без локального персистенту).

Окремий пункт прибирання — `checkoutSlice.promoCode` + `setPromoCode` + `getPromoCode` (див. §3.2). Можна одним коммітом.

---

## 11. Тести

**Unit / component (Jest + RTL):**
- `PromoCodeForm`:
  - empty → apply disabled (validation на `code.trim().length === 0`).
  - typed → apply enabled.
  - applied state (selector повертає `promocode != null`) → видно бейдж + кнопка remove.
  - error states за категоріями (validation / cta / service-warning) — рендериться правильна гілка.
- `getPromocodeErrorKey` — відомі / невідомі коди.
- Listener middleware (§4.3) — `prev.promocode != null && next.promocode === null` → toast-action; зворотний бік — no-op.
- `isBusinessError` type-guard — позитив/негатив.

**Integration (MSW):**
- 11 acceptance-сценаріїв §7 під MSW-стабом для `apply-promocode`, `remove-promocode`, `edit-quantity`, `POST /orders`. Сценарій №12 — за наявності `bonuses_deducted` у мокі.

**E2E:** в проекті Playwright не налаштований (CLAUDE.md фіксує стек Jest+RTL+MSW+Storybook). Налаштування Playwright — окрема задача, **не входить** у цей PR. Замість e2e — ручний прохід сценаріїв 1, 2, 3, 9 на staging перед мерджем (див. §9.6).

---

## 12. Сумарна оцінка

| Етап | Час | Залежності |
|------|-----|-----|
| 0 — Координація з backend (§9 п. 2–4) | 0.25 год | блокер |
| 1 — Типи: `PromocodeMeta`, `CartData` розширення, `BusinessError`, `isBusinessError` | 1 год | §9.2 |
| 2 — `promoCodeApi`: переписати mutation, додати remove, нові типи відповіді | 1 год | §1 |
| 3 — `cartSlice` + RTKQ integration: оновлення `cartData` з apply/remove responses | 1 год | §1 |
| 4 — `PromoCodeForm` UI: empty / applied / error-validation / error-cta / error-service / loading | 2 год | §2 |
| 5 — Toast infrastructure (якщо немає) + listener middleware §4.3 | 1.5 год | §3 |
| 6 — Bonus auto-reset toast §1.3 (умовно — якщо поле `bonuses_deducted` присутнє) | 0.5 год | §9.3 |
| 7 — Checkout-error path §1.4 (3 коди в `error.code` на `POST /orders`) | 1 год | §1 |
| 8 — i18n: ключі + ru/uk/en | 0.5 год | UX-копірайтинг |
| 9 — Видалення мертвого `checkoutSlice.promoCode` + сусідніх селекторів | 0.25 год | — |
| 10 — Tests (unit + integration MSW) | 2 год | §1–7 |
| **Разом** | **~11 год** | |

Оцінка консервативна — закладено час на узгодження копірайту і smoke на staging.

Auth sub-task (зберігання `access_token` у `signIn` + `Authorization: Bearer` у `baseQuery`) **виключено** — див. §5: бекенд email-логіну токен не видає, `auth:sanctum` ловить існуючу сесійну куку, поточний `baseQuery` із `credentials: 'include'` + `X-XSRF-TOKEN` вже працює.

---

## 13. Послідовність комітів (рекомендована)

1. `feat(types): extend CartData with promocode meta` (§1 етап).
2. `feat(api): add BusinessError shape + isBusinessError guard` (§1 етап).
3. `feat(promo): rewrite promoCodeApi for new contract` (§2 етап).
4. `feat(cart): sync cartSlice from apply/remove responses + listener for implicit invalidation` (§3+5 етап).
5. `feat(ui): rewrite PromoCodeForm with applied/error/cta/service states` (§4 етап).
6. `feat(i18n): promocode keys in uk/ru/en` (§8 етап).
7. `feat(checkout): handle promocode error codes on order create` (§7 етап).
8. `chore: remove dead checkoutSlice.promoCode` (§9 етап).

---

## Session Map

- [x] S1 (~260K) Steps 0-4 — done 2026-05-13
- [x] S2 (~200K) Steps 5-9 — done 2026-05-14
- [ ] S3 (~150K) Step 10 — **current**

## Progress Log

### S1 — 2026-05-13
**Completed steps:** 0, 1, 2, 3, 4
**Commits:** 4766c81, d78597f, 60eaea1, 001968d

**Deviations from plan:**
- §2.3 / §2.4 / §4.1 response shape — план показывает вложенное `{ promocode, cart }`, реальный бэк (`CartController::toResponse()`) отвечает плоско: `data: { quantity, totals, items, total, promocode | null }`. Реализация ушла по факту: `applyPromocode`/`removePromocode` имеют тип `<CartData, ...>` (через `transformResponse`), как и остальные cart-мутации.
- `PromocodeMeta` — только `{code, discount, period_to, total_discount}`. Поля `period_from` и `applied_at` из примера §2.3 бэком не возвращаются.
- §1.3 (Bonus auto-reset toast) — подтверждён OUT. В cart-response нет `bonuses_deducted`. Бэк хранит `bonus_deduction` (singular) только на Order/OrderItem. `ApplyPromocodeAction.php:50` зануляет `bonus_deduction` внутри транзакции, но наружу это поле не экспонирует.
- §4.1 FSD-инверсия. План кладёт `promoCodeApi` в `features/PromoCodeForm`, но §4.2 требует `extraReducers` в `cartSlice` (`entities/Cart`), что невозможно без impedance-mismatch (entities ← features запрещено в FSD). Мутации `applyPromocode`/`removePromocode` перенесены в `entities/Cart/api/cartApi.ts` (одна API-family, один тип `CartData`). Файл `features/PromoCodeForm/api/promoCodeApi.ts` удалён.
- В matchers `cartSlice` для `applyPromocode.matchRejected` / `removePromocode.matchRejected` не выставляется `isError = true` (только `isFetching = false`). Промокод-ошибка — это user-input issue формы, а не cart-data error; иначе `CheckoutCart`/`CartDrawer` показывали бы ErrorMessage из-за валидной 422-ответки.

**Tech debt / open questions:**
- i18n-ключи `checkout-page:promocode.*` в `PromoCodeForm.tsx` сейчас работают через `t(..., { defaultValue: '...' })`. JSON-entries в `public/locales/{uk,ru,en}/checkout-page.json` добавляются в Step 8 (S2).
- Шаг 6 (S2) — пропустить (см. §1.3 deviation выше).
- План тело (§2.3, §2.4, §4.1 примеры) остаётся с неактуальным shape `{promocode, cart}`. Тело плана по правилам skill-а не правится. Контракт-документ `docs/2026-05-13-promocode-frontend-contract.md` тоже неточен — отдельный фикс, не блокер.
- `AuthByEmailForm.test.tsx:19-21` мокает `signIn` с `access_token`, чего бэк не возвращает (см. §5 плана). Не блокер S2, но висит как тех-долг фронта.

**Files touched, not reviewed:**
- (нет — все правки сделаны после полного чтения файлов)

**Next prompt:**
> Продолжаем работу по `/Users/novikov/PhpstormProjects/test/test-arber/ukraine/test-arberua-frontend/docs/2026-05-13-promocode-1c-integration-frontend-plan.md`. Сессия S2 (Steps 5-9, бюджет ~200K).
>
> Перенесённые из S1 решения:
> - **Step 6 (Bonus auto-reset toast) — пропустить.** Подтверждено в Step 0 S1: в cart-response нет `bonuses_deducted`. Бэк (`CartResource`/`CartController::toResponse`) поле не экспонирует.
> - **Response shape — плоский** (`data: { quantity, totals, items, total, promocode | null }`), без вложенного `cart`. Игнорировать примеры §2.3/§2.4 плана, опираться на фактическую реализацию `cartApi`.
>
> Артефакты S1, на которые опираться в S2:
> - Toast-инфраструктура есть: `react-toastify` через `src/providers/NotificationProvider/NotificationsProvider.tsx`. Хук `useNotification` и helper `getNotify` в `src/shared/ui/Notification/useNotification.tsx`. Доп. библиотеки не ставить.
> - `applyPromocode`/`removePromocode` живут в `src/entities/Cart/api/cartApi.ts` (FSD-инверсия). Селектор `cartSelectors.getPromocode`. Тип `PromocodeMeta` экспортирован из `@/entities/Cart`.
> - `BusinessError<TCode>` + `isBusinessError` в `src/shared/types/api.ts` и `src/shared/types/type-guards.ts`. Использовать в Step 7 для парсинга checkout-race ошибок.
> - Утилита `src/features/PromoCodeForm/lib/getPromocodeErrorKey.ts` уже есть. В Step 8 i18n-ключи `checkout-page:promocode.*` нужно фактически добавить в JSON (сейчас работают через `defaultValue` fallback в `PromoCodeForm.tsx`).
> - HTTP-status для error.code: 422 (PromocodeValidationException), 503 (PromocodeServiceUnavailableException). Бэк — `Handler.php` + `PromocodeException.php`.
>
> Шаги S2:
> 1. **Step 5 [Medium]**: Listener middleware `src/entities/Cart/model/middleware/promocodeInvalidationListener.ts`. Слушает `matchFulfilled` cart-мутаций (`addProductToCart`, `addManyProductsToCart`, `updateProduct`, `deleteProduct`, `deleteCart`). Сравнивает prev `cart.promocode != null` && next === null → диспатчит toast через `getNotify` с ключом `checkout-page:promocode.toast.cart_changed`. Подключить через `createListenerMiddleware` в StoreProvider (`src/app/providers/StoreProvider/config/store.ts` — найти точное место). Подсмотреть в существующих listener-middleware, если есть.
> 2. **Step 6 — ПРОПУСТИТЬ** (см. carry-over).
> 3. **Step 7 [Medium]**: Найти error-канал `POST /api/v2/orders` (вероятно `features/CheckoutForm/lib/useCheckout.ts` — есть `isValidationError`-обработка). Добавить ветку `isBusinessError(e)` для `code ∈ {PROMOCODE_ALREADY_USED, PROMOCODE_EXPIRED, PROMOCODE_NO_ELIGIBLE_ITEMS}` → отрендерить `e.data.error.message` в существующем form-error канале + дёрнуть `refetchSession` для обновления cart-state. Возврат на крок огляду кошика (вероятно — пользователь сам, форма просто покажет ошибку и не переведёт на success).
> 4. **Step 8 [Light]**: Добавить ключи в `public/locales/{uk,ru,en}/checkout-page.json` по списку плана §6.1. Используемые `defaultValue` в `PromoCodeForm.tsx` — образец украинских строк. Русский и английский — перевести.
> 5. **Step 9 [Light]**: Удалить мёртвый код. Сначала проверь: `grep -rn 'promoCode\|setPromoCode\|getPromoCode' src/widgets/Checkout` — план §3.2 указывает `checkoutSlice.ts:7,17-19`, `checkoutSelectors.ts:4,8`, `Checkout.tsx:31`. Убедись что нет других потребителей. Одним коммитом.
>
> Начни с `TaskCreate` по этому списку (4 task — Step 6 не создавать). Потом приступай к Step 5.

### S2 — 2026-05-14
**Completed steps:** 5, 7, 8, 9 (Step 6 пропущен — подтверждено в S1: бэк не экспонирует `bonuses_deducted`)
**Commits:** 4f99535, 1416ff4, 28700d1, fab90c2

**Deviations from plan:**
- **Step 7 / §1.4 / §7.5.** План фразой «повертає користувача на крок огляду кошика» подразумевал переход на шаг просмотра корзины. В реальном SPA это один экран (`CheckoutView` → `Checkout`), отдельного «шага огляду» нет. Реализация: при `isBusinessError` с PROMOCODE_*-кодом пользователь остаётся на форме чекаута, видит `getNotify({ type: 'error', content: e.data.error.message })`, диспатчится `refetchSession()` для обновления `cartData`. Никаких редиректов.
- **Step 8 / §6.1.** Два ключа из списка плана не добавлены: `promocode.applied.code_prefix` (не используется в `PromoCodeForm.tsx` — applied-state рендерит код без префикса) и `promocode.toast.bonus_reset` (заблокирован отсутствием `bonuses_deducted` в cart-response, см. carry-over из S1). По правилу CLAUDE.md «не закладываемся под гипотетические требования». Если бэк добавит `bonuses_deducted` или дизайн потребует префикс — ключи добавятся точечно вместе с потребителями.
- **Step 5 / §4.3.** Listener middleware зарегистрирован через `createListenerMiddleware` как singleton на уровне модуля и подключён `.prepend(listener.middleware)` в `makeStore` — тот же паттерн, что `rtkApi.middleware`. Внутренний `effect` гардит SSR (`if (typeof window === 'undefined') return`), так как `getNotify` тянет `react-toastify`. Слушает 5 матчеров (add/addMany/update/delete/deleteCart), apply/remove исключены сознательно.

**Tech debt / open questions:**
- **Step 10 (S3)** — тесты ещё не написаны. План §11: unit (PromoCodeForm states, `getPromocodeErrorKey`, listener middleware `prev→next` логика, `isBusinessError` type-guard) + integration MSW (acceptance-сценарии §7, исключая №12 — bonus toast выкинут).
- `AuthByEmailForm.test.tsx:19-21` мок `signIn` с `access_token` — переходит из S1, не блокер S2/S3, отдельная задача.
- Тело плана (§2.3/§2.4/§4.1 примеры shape `{promocode, cart}`) и контракт-документ `2026-05-13-promocode-frontend-contract.md` остаются с устаревшим вложенным shape. Тело не правится по правилам skill-а; контракт — отдельный мелкий PR. Реализация ушла по факту (плоский `data: CartData`).
- В `useCheckout.submitCheckoutForm` для PROMOCODE_*-ошибок не пробрасывается `throw getCheckoutFormErrors(e)` — у бизнес-ошибки нет field-level errors. Если ux потребует подсветить конкретное поле — потребуется ручной маппинг через `setServerErrors`, сейчас канал — только toast.

**Files touched, not reviewed:**
- (нет — все правки сделаны после полного чтения файлов)

**Next prompt:**
> Продолжаем работу по `/Users/novikov/PhpstormProjects/test/test-arber/ukraine/test-arberua-frontend/docs/2026-05-13-promocode-1c-integration-frontend-plan.md`. Сессия S3 (Step 10, бюджет ~150K). Финальная сессия — после неё план закрыт.
>
> Артефакты S1+S2, на которые опираться в тестах:
> - **Endpoints/cartApi** (`src/entities/Cart/api/cartApi.ts`): `applyPromocode` (POST `/cart-se/apply-promocode`, body `{code}`), `removePromocode` (DELETE `/cart-se/remove-promocode`). Все cart-мутации возвращают плоский `CartData` через `transformResponse`.
> - **Selector**: `cartSelectors.getPromocode` → `state.cart.cartData?.promocode ?? null`.
> - **Type-guard**: `isBusinessError<TCode>(error)` из `@/shared/types/type-guards` — проверяет `data.success === false && data.error.{code,message}`.
> - **Централизованные коды** (`src/entities/Cart/model/types/promocodeCodes.ts`): `PROMOCODE_VALIDATION_CODES`, `PROMOCODE_CTA_CODES`, `PROMOCODE_SERVICE_CODES`, `PROMOCODE_CHECKOUT_RACE_CODES` + predicates `isPromocode*Code`. Все потребители (`getPromocodeErrorKey`, `categorizePromocodeError`, `useCheckout`) импортируют отсюда — единственный источник правды.
> - **Утилита**: `getPromocodeErrorKey(code)` из `@/entities/Cart` — известные validation-коды → `checkout-page:promocode.error.{CODE}`, остальные → `checkout-page:promocode.error.unknown`. Возвращаемый тип — `PromocodeErrorI18nKey` (template literal union), совместим со strict-typing i18next 22.
> - **Категоризатор**: `categorizePromocodeError(error)` из `@/features/PromoCodeForm/lib/categorizePromocodeError` — возвращает `{kind: 'validation', code: PromocodeValidationCode|null} | {kind: 'cta', code: PromocodeCtaCode} | {kind: 'service'}`. Для неизвестных бизнес-кодов → `{kind: 'validation', code: null}` (форма логирует `console.error`). Для не-business ошибок → `{kind: 'service'}`.
> - **Listener middleware** (`src/entities/Cart/model/middleware/promocodeInvalidationListener.ts`): матчеры `addProductToCart`, `addManyProductsToCart`, `updateProduct`, `deleteProduct`, `deleteCart` → если `prev.promocode != null && next.promocode === null` → `getNotify({type:'info', content: i18next.t('checkout-page:promocode.toast.cart_changed')}).notify()`. SSR-гард внутри effect.
> - **CheckoutForm flow**: `useCheckout.submitCheckoutForm` — `try checkout().unwrap()` → `catch`: ветка `isBusinessError(e) && isPromocodeCheckoutRaceCode(code)` → локализованный toast (`t(getPromocodeErrorKey(code), { defaultValue: e.data.error.message })`) + `await dispatch(refetchSession()).unwrap().catch(noop)` + **throw e** (форма видит провал). `isValidationError` → `throw getCheckoutFormErrors(e)`. Все остальные ошибки тоже пробрасываются (no silent swallow). После успешного checkout — `deleteCart` в собственном try/catch (best-effort cleanup, не откатывает успешный заказ).
> - **Локали**: `public/locales/{uk,ru,en}/checkout-page.json` содержат полный набор `promocode.*` ключей. `defaultValue` fallbacks в `PromoCodeForm.tsx` / listener сняты — i18n catalog обязателен.
> - **i18n для тестов**: `src/shared/lib/test/i18nForTest.ts` + `src/shared/lib/test/renderComponent.tsx` — существующая инфраструктура.
> - **MSW**: проверить наличие в `package.json` и существующих handlers (если есть). Если нет — план §11 предполагает MSW есть, но в проекте RTL+Jest+Storybook (см. CLAUDE.md). Если MSW не настроен — оценить scope: либо настройка как часть S3, либо тесты только на mock-fetch.
>
> Шаги S3:
> 1. **Step 10.1 [Light]** — unit: `getPromocodeErrorKey` (known/unknown), `isBusinessError` (positive/negative cases).
> 2. **Step 10.2 [Medium]** — unit `PromoCodeForm`: empty → apply disabled; typed → enabled; applied state (selector → badge+remove); error.validation/cta/service ветки рендеринга.
> 3. **Step 10.3 [Medium]** — unit listener middleware: prev `promocode != null` && next `=== null` → диспатч toast (через мок `getNotify`); обратный кейс — no-op; apply/remove не триггерят.
> 4. **Step 10.4 [Heavy] (опционально, если MSW настроен)** — integration: 11 acceptance-сценариев §7 (без #12). Если MSW не в проекте — оценить настройку или сократить scope до unit-уровня.
>
> **Step 0 S3**: первым делом `ls src/__mocks__ src/shared/lib/test` и `grep -rn "msw\|setupServer" src --include="*.ts" --include="*.tsx" | head` — определить, есть ли MSW в проекте. От этого зависит scope Step 10.4.
>
> Начни с `TaskCreate` по списку (4 подшага). Step 10.4 пометить как зависящий от Step 0 S3.
