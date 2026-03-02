import type {
  EsputnikSubscribePayload,
  EsputnikUpdateContactPayload,
  EsputnikEventPayload,
  EsputnikOrderItem,
  EsputnikCartItem,
} from './types';
import { ESPUTNIK_API_ROUTES, ESPUTNIK_EVENTS, ESPUTNIK_GROUPS } from './constants';

async function postToRoute<T>(route: string, payload: T): Promise<void> {
  try {
    await fetch(route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // eSputnik events are fire-and-forget; failures should not affect UX
  }
}

// 4.1 Registration — Subscribe contact
export function esputnikSubscribeOnRegistration(params: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  externalId?: string;
  lang?: string;
  birthday?: string;
}): void {
  const payload: EsputnikSubscribePayload = {
    email: params.email,
    phone: params.phone,
    firstName: params.firstName,
    lastName: params.lastName,
    externalId: params.externalId,
    lang: params.lang || 'uk',
    source: 'site',
    registrationAt: new Date().toISOString(),
    birthday: params.birthday,
    groups: [ESPUTNIK_GROUPS.REGISTERED],
    formType: 'registration',
  };

  postToRoute(ESPUTNIK_API_ROUTES.SUBSCRIBE, payload);
}

// 4.2 Email confirmed — Update contact
export function esputnikEmailConfirmed(params: {
  email: string;
  externalId?: string;
}): void {
  const updatePayload: EsputnikUpdateContactPayload = {
    email: params.email,
    externalId: params.externalId,
    groupNames: [ESPUTNIK_GROUPS.EMAIL_CONFIRMED],
  };

  postToRoute(ESPUTNIK_API_ROUTES.CONTACTS, updatePayload);

  const eventPayload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.EMAIL_CONFIRMED,
    email: params.email,
    externalCustomerId: params.externalId,
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, eventPayload);
}

// 4.4 Password reset requested — Custom event
export function esputnikPasswordResetRequested(params: {
  email: string;
}): void {
  const payload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.PASSWORD_RESET_REQUESTED,
    email: params.email,
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, payload);
}

// 4.5 Order confirmed — Custom event + update contact
export function esputnikOrderConfirmed(params: {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;
  orderId: string;
  orderNumber: number;
  orderDate: string;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  deliveryMethod: string;
  items: EsputnikOrderItem[];
}): void {
  const contactPayload: EsputnikUpdateContactPayload = {
    email: params.email,
    phone: params.phone,
    firstName: params.firstName,
    lastName: params.lastName,
    externalId: params.externalId,
    groupNames: [ESPUTNIK_GROUPS.CUSTOMERS],
  };

  postToRoute(ESPUTNIK_API_ROUTES.CONTACTS, contactPayload);

  const eventPayload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.ORDER_CONFIRMED,
    email: params.email,
    externalCustomerId: params.externalId,
    eventData: {
      order_id: params.orderId,
      order_number: String(params.orderNumber),
      order_date: params.orderDate,
      total_amount: String(params.totalAmount),
      currency: params.currency,
      payment_method: params.paymentMethod,
      delivery_method: params.deliveryMethod,
      items: JSON.stringify(params.items),
    },
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, eventPayload);
}

// 4.6 Checkout abandoned — Custom event
export function esputnikCheckoutAbandoned(params: {
  email: string;
  externalId?: string;
  cartTotal: number;
  currency: string;
  items: EsputnikCartItem[];
  lastActivityAt?: string;
}): void {
  const payload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.CHECKOUT_ABANDONED,
    email: params.email,
    externalCustomerId: params.externalId,
    eventData: {
      cart_url: typeof window !== 'undefined' ? `${window.location.origin}/checkout` : '',
      cart_total: String(params.cartTotal),
      currency: params.currency,
      items: JSON.stringify(params.items),
      last_activity_at: params.lastActivityAt || new Date().toISOString(),
    },
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, payload);
}

// 4.7 Cart price drop — Custom event
export function esputnikCartPriceDrop(params: {
  email: string;
  externalId?: string;
  sku: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  discountPercent: number;
  productUrl: string;
  imageUrl?: string;
}): void {
  const payload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.CART_PRICE_DROP,
    email: params.email,
    externalCustomerId: params.externalId,
    eventData: {
      sku: params.sku,
      product_name: params.productName,
      old_price: String(params.oldPrice),
      new_price: String(params.newPrice),
      discount_percent: String(params.discountPercent),
      product_url: params.productUrl,
      ...(params.imageUrl && { image_url: params.imageUrl }),
    },
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, payload);
}

// 4.8 Wishlist price drop — Custom event
export function esputnikWishlistPriceDrop(params: {
  email: string;
  externalId?: string;
  sku: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  discountPercent: number;
  productUrl: string;
  imageUrl?: string;
}): void {
  const payload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.WISHLIST_PRICE_DROP,
    email: params.email,
    externalCustomerId: params.externalId,
    eventData: {
      sku: params.sku,
      product_name: params.productName,
      old_price: String(params.oldPrice),
      new_price: String(params.newPrice),
      discount_percent: String(params.discountPercent),
      product_url: params.productUrl,
      ...(params.imageUrl && { image_url: params.imageUrl }),
    },
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, payload);
}

// 4.9 Bonus accrued — Custom event
export function esputnikBonusAccrued(params: {
  email: string;
  externalId?: string;
  bonusAmount: number;
  bonusBalance: number;
  reason: string;
  expireAt?: string;
}): void {
  const payload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.BONUS_ACCRUED,
    email: params.email,
    externalCustomerId: params.externalId,
    eventData: {
      bonus_amount: String(params.bonusAmount),
      bonus_balance: String(params.bonusBalance),
      reason: params.reason,
      ...(params.expireAt && { expire_at: params.expireAt }),
    },
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, payload);
}

// 4.10 Birthday bonus accrued — Custom event
export function esputnikBirthdayBonusAccrued(params: {
  email: string;
  externalId?: string;
  bonusAmount: number;
  bonusBalance: number;
  expireAt?: string;
}): void {
  const payload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.BIRTHDAY_BONUS_ACCRUED,
    email: params.email,
    externalCustomerId: params.externalId,
    eventData: {
      bonus_amount: String(params.bonusAmount),
      bonus_balance: String(params.bonusBalance),
      ...(params.expireAt && { expire_at: params.expireAt }),
    },
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, payload);
}

// 4.11 Bonus expiring soon — Custom event
export function esputnikBonusExpiringSoon(params: {
  email: string;
  externalId?: string;
  bonusBalanceToExpire: number;
  expireAt: string;
  daysLeft: number;
}): void {
  const payload: EsputnikEventPayload = {
    eventKey: ESPUTNIK_EVENTS.BONUS_EXPIRING_SOON,
    email: params.email,
    externalCustomerId: params.externalId,
    eventData: {
      bonus_balance_to_expire: String(params.bonusBalanceToExpire),
      expire_at: params.expireAt,
      days_left: String(params.daysLeft),
    },
  };

  postToRoute(ESPUTNIK_API_ROUTES.EVENT, payload);
}
