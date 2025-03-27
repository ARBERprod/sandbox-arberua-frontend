export type AddToCartBody = {
  product_id: string;
  quantity: number;
  eventId: string;
}

export type UpdateProductParams = {
  quantity: number;
  itemId: string;
}

export type DeleteProductParams = {
  itemId: string;
}

export type AddManyProductsBody = {
  product_ids: string[];
}
