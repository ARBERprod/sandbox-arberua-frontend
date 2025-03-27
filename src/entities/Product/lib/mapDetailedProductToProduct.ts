import { DetailedProduct, Product } from '../model/types';

export const mapDetailedProductToProduct = (detailed: DetailedProduct): Product => ({
  id: detailed.id,
  old_price: detailed.old_price,
  price: detailed.price,
  title: detailed.title,
  wishlists_count: detailed.wishlists_count,
  url: detailed.url,
  pictures: detailed.pictures,
  skus: detailed.skus,
  category: detailed.category,
  brand: detailed.brand,
  parent_id: detailed.parent_id,
});
