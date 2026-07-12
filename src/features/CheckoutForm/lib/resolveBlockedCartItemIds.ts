import { ICartItem } from '@/entities/Cart';

// Pickup diagnostics report a hard-blocker by `product_id`, but the cart-delete
// mutation is keyed by cart-item id. The cart stores variants (parent_id = product,
// id = offer) and the backend's product_id may be either level, so match on either
// and return the concrete cart-item id(s) the delete mutation actually expects.
export const resolveBlockedCartItemIds = (
  items: ICartItem[] | undefined,
  productId: string,
): string[] => (items ?? [])
  .filter((item) => item.id === productId || item.parent_id === productId)
  .map((item) => item.id);
