import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { Product } from '@/entities/Product';
import { ToggleWishListButton } from './ToggleWishListButton';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));

const mockUnwrap = jest.fn();
const mockToggle = jest.fn(() => ({ unwrap: mockUnwrap }));

jest.mock('@/entities/WishList', () => ({
  ...jest.requireActual('@/entities/WishList'),
  useToggleProductInWishListMutation: () => [mockToggle, { isLoading: false }],
}));

jest.mock('@/entities/Session', () => ({
  ...jest.requireActual('@/entities/Session'),
  useAuth: () => ({ isAuth: true }),
}));

jest.mock('@/widgets/Auth', () => ({
  ...jest.requireActual('@/widgets/Auth'),
  useAuthModel: () => ({ openLoginModal: jest.fn() }),
}));

const productInList = (id: string, parentId: string, price: number) => ({
  id,
  parent_id: parentId,
  price: { value: price, symbol: '₴' },
}) as unknown as Product;

describe('ToggleWishListButton — AddToWishlist event', () => {
  beforeEach(() => jest.clearAllMocks());

  it('fires AddToWishlist once on the not-in-list → in-list transition', async () => {
    // Before: empty wishlist. Toggle returns the product now present → an add.
    mockUnwrap.mockResolvedValueOnce([productInList('p1', 'parent-1', 1990)]);

    renderComponent(<ToggleWishListButton productId="p1" />, {
      initialState: { wishList: { products: [] } },
    });

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(sendEsEvent).toHaveBeenCalledTimes(1);
    });
    expect(sendEsEvent).toHaveBeenCalledWith('AddToWishlist', {
      productKey: 'parent-1',
      price: 1990,
    });
  });

  it('fires nothing on the in-list → not-in-list transition (remove)', async () => {
    // Before: product already in wishlist. Toggle returns it absent → a remove.
    mockUnwrap.mockResolvedValueOnce([]);

    renderComponent(<ToggleWishListButton productId="p1" />, {
      initialState: { wishList: { products: [productInList('p1', 'parent-1', 1990)] } },
    });

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockUnwrap).toHaveBeenCalled();
    });
    expect(sendEsEvent).not.toHaveBeenCalled();
  });
});
