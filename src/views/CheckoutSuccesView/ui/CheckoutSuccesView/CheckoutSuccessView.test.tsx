import { useState } from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { sendGuestCustomerDataEvent } from '@/features/auth/lib/sendGuestCustomerDataEvent';
import { pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { readPurchaseGuid, clearPurchaseGuid } from '@/shared/lib/analytics/esputnikCartGuid';
import { OrderDto } from '@/entities/Order';
import { User } from '@/entities/User';
import { CheckoutSuccessView } from './CheckoutSuccessView';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));
jest.mock('@/features/auth/lib/sendGuestCustomerDataEvent', () => ({ sendGuestCustomerDataEvent: jest.fn() }));

const mockUseAuth = jest.fn<{ userData: User | null }, []>(() => ({ userData: null }));
jest.mock('@/entities/Session', () => ({
  ...jest.requireActual('@/entities/Session'),
  useAuth: () => mockUseAuth(),
}));
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

// Re-runs the purchase effect on demand by handing CheckoutSuccessView a fresh `order`
// reference — simulating clientId/userData resolving after mount.
const RerunHarness = () => {
  const [ord, setOrd] = useState(order);
  return (
    <>
      <button type="button" onClick={() => setOrd({ ...(order as object) } as OrderDto)}>
        rerun
      </button>
      <CheckoutSuccessView order={ord} />
    </>
  );
};

const AUTH_USER: User = {
  addresses: [],
  first_name: 'Auth',
  last_name: 'User',
  middle_name: null,
  email: 'auth@example.com',
  phone: '380000000000',
  bonus_balance: 0,
  sex: null,
  birthday: null,
  user_id: 'auth-1',
};

describe('CheckoutSuccessView — PurchasedItems event', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ userData: null });
  });

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

  it('emits PurchasedItems at most once even when the effect re-runs', () => {
    renderComponent(<RerunHarness />);

    // Re-trigger the effect via a new `order` reference (a tracked dependency).
    fireEvent.click(screen.getByText('rerun'));

    const purchaseCalls = (sendEsEvent as jest.Mock).mock.calls
      .filter(([name]) => name === 'PurchasedItems');
    expect(purchaseCalls).toHaveLength(1);
    expect(clearPurchaseGuid).toHaveBeenCalledTimes(1);
    // GA stays ungated: the effect itself genuinely re-ran on the new dependency.
    expect((pushDataLayerEvent as jest.Mock).mock.calls.length).toBeGreaterThan(1);
  });

  it('sends guest CustomerData once from the order contact under the same latch', () => {
    renderComponent(<RerunHarness />);

    fireEvent.click(screen.getByText('rerun'));

    expect(sendGuestCustomerDataEvent).toHaveBeenCalledTimes(1);
    expect(sendGuestCustomerDataEvent).toHaveBeenCalledWith({
      email: 'a@b.c',
      phone: '380',
      first_name: 'A',
      city: 'Kyiv',
    });
  });

  it('does not send guest CustomerData for an authenticated shopper', () => {
    mockUseAuth.mockReturnValue({ userData: AUTH_USER });

    renderComponent(<CheckoutSuccessView order={order} />);

    expect(sendGuestCustomerDataEvent).not.toHaveBeenCalled();
  });
});
