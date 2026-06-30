import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { snapshotPurchaseGuid } from '@/shared/lib/analytics/esputnikCartGuid';
import { CartActions } from './CartActions';

jest.mock('@/shared/lib/analytics/esputnikCartGuid', () => ({
  snapshotPurchaseGuid: jest.fn(),
  lastCartGuid: jest.fn(() => 'live-guid'),
}));
jest.mock('@/shared/lib/analytics/dataLayer', () => ({
  measurementsPost: jest.fn(),
  pushDataLayerEvent: jest.fn(),
}));
jest.mock('@/entities/Events', () => ({
  useInitiateCheckoutMutation: () => [jest.fn()],
}));

const cartData = {
  items: [
    {
      id: 'v1', parent_id: 'p1', title: 'Tee', category: 'C', brand: 'Br', variant: 'V', cost: { value: 990, symbol: '₴' }, price: { value: 990, symbol: '₴' }, quantity: 1,
    },
  ],
  totals: [{ title: 'Сума', price: { value: 990, symbol: '₴' } }],
  total: 990,
  quantity: 1,
  promocode: null,
};

describe('CartActions — purchase GUID snapshot', () => {
  beforeEach(() => jest.clearAllMocks());

  it('snapshots the live cart GUID when checkout begins', async () => {
    renderComponent(<CartActions />, {
      initialState: { cart: { cartData: cartData as any } },
    });

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(snapshotPurchaseGuid).toHaveBeenCalledTimes(1);
    });
  });
});
