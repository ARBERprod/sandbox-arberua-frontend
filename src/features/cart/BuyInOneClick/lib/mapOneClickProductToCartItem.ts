import { ICartItem } from '@/entities/Cart';
import { OneClickProduct } from '../api/buyInOneClickApi';

export const mapOneClickProductToCartItem = (product: OneClickProduct):ICartItem => ({
  quantity: 1,
  cost: product.price,
  price: product.price,
  owner_id: product.id,
  id: product.id,
  old_price: product.old_price,
  picture: product.picture,
  title: product.title,
  url: product.url,
  options: product.options,
  parent_id: product.parent_id,
  category: product.category,
  brand: product.brand,
  variant: product.variant,
});
