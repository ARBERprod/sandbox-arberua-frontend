import { OrderDto } from '../api/types';
import { Order } from '../model/types';

export const orderMapper = (orderDto: OrderDto): Order => {
  const {
    id,
    city,
    cost,
    created_at,
    delivery_method,
    products,
    note,
    order_number,
    payment_method,
    status,
    histories,
    address,
    totals,
    customer,
    deduct_bonus,
  } = orderDto;
  return {
    id,
    delivery_method: delivery_method?.title ?? null,
    payment_method: payment_method?.title ?? null,
    note,
    count: products.reduce((acc, product) => acc + product.quantity, 0),
    status: status ? { title: status.title } : null,
    total_price: cost,
    cost,
    histories: histories || [],
    date: created_at,
    order_number,
    products: products.map((product) => ({
      id: product.id,
      title: product.title,
      picture: product.picture,
      url: product.url,
      price: product.price,
      quantity: product.quantity,
      properties: product.options ?? [],
      bonus_deduction: product?.bonus_deduction || 0,
    })),
    address,
    totals,
    customer,
    deduct_bonus,
    city,
  };
};
