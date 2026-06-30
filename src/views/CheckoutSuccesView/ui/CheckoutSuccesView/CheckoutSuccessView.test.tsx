import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { readPurchaseGuid, clearPurchaseGuid } from '@/shared/lib/analytics/esputnikCartGuid';
import { OrderDto } from '@/entities/Order';
import { CheckoutSuccessView } from './CheckoutSuccessView';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));
jest.mock('@/shared/lib/analytics/esputnikCartGuid', () => ({
  readPurchaseGuid: jest.fn(() => 'snapshot-guid'),
  clearPurchaseGuid: jest.fn(),
}));
jest.mock('@/shared/lib/analytics/dataLayer', () => ({
  measurementsPost: jest.fn(),
  pushDataLayerEvent: jest.fn(),
  pushGAdsEvent: jest.fn(),
}));
jest.mock('@/entities/Product', () => ({
  SmallProductCard: () => null,
  ClothesItem: () => null,
}));

const order = {
  id: 'ord-1',
  order_number: 555,
  created_at: '2026-06-30',
  cost: { value: 1990, symbol: '₴' },
  city: { title: 'Kyiv' },
  delivery_method: { title: 'Nova Poshta' },
  address: null,
  customer: {
    email: 'a@b.c', phone: '380', first_name: 'A', last_name: 'B', middle_name: '', id: 'cust-1',
  },
  totals: [],
  products: [
    {
      id: 'v1', parent_id: 'p1', price: { value: 990, symbol: '₴' }, quantity: 2, title: 'Tee', category: 'C', brand: 'Br', variant: 'V',
    },
  ],
} as unknown as OrderDto;

describe('CheckoutSuccessView — PurchasedItems event', () => {
  beforeEach(() => jest.clearAllMocks());

  it('emits PurchasedItems with the snapshot GUID, then clears it', () => {
    renderComponent(<CheckoutSuccessView order={order} />);

    expect(readPurchaseGuid).toHaveBeenCalled();
    expect(sendEsEvent).toHaveBeenCalledWith('PurchasedItems', {
      items: [{ productKey: 'p1', price: 990, quantity: 2 }],
      OrderNumber: 555,
      guid: 'snapshot-guid',
    });
    expect(clearPurchaseGuid).toHaveBeenCalledTimes(1);
  });
});
