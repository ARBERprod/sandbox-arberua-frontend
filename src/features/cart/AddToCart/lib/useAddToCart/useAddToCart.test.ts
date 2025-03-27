import { renderHook } from '@testing-library/react';
import { useAddToCart } from '@/features/cart/AddToCart/lib/useAddToCart/useAddToCart';

const mockAddProductToCart = jest.fn();
const mockAddProductsToCart = jest.fn();
const mockOpenCart = jest.fn();
const mockUseAddProductToCartMutation = jest.fn(() => [mockAddProductToCart, { isLoading: false }]);
const mockUseAddManyProductsToCartMutation = jest.fn(() => [mockAddProductsToCart, { isLoading: false }]);
const mockUseCartActions = jest.fn(() => ({
  openCart: mockOpenCart,
}));

jest.mock('@/entities/Cart', () => ({
  useAddProductToCartMutation: () => mockUseAddProductToCartMutation(),
  useAddManyProductsToCartMutation: () => mockUseAddManyProductsToCartMutation(),
  useCartActions: () => mockUseCartActions(),
}));

const PRODUCT_ID = '111';
const PRODUCT_IDS = ['111', '222', '333'];

describe('useAddToCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call addProductToCart if passed only one product id', async () => {
    const PARAMS = {
      quantity: 1,
      product_id: PRODUCT_ID,
    };
    const { result } = renderHook(() => useAddToCart(PRODUCT_ID));
    await result.current.clickHandler();

    expect(mockAddProductsToCart).not.toBeCalled();
    expect(mockAddProductToCart).toBeCalledWith(PARAMS);
  });
  it('Should call mockAddProductsToCart if passed array of ids', async () => {
    const PARAMS = {
      product_ids: PRODUCT_IDS,
    };
    const { result } = renderHook(() => useAddToCart(PRODUCT_IDS));
    await result.current.clickHandler();

    expect(mockAddProductToCart).not.toBeCalled();
    expect(mockAddProductsToCart).toBeCalledWith(PARAMS);
  });
  it('Should open cart after successful adding to cart', async () => {
    const { result } = renderHook(() => useAddToCart(PRODUCT_ID));
    await result.current.clickHandler();

    expect(mockOpenCart).toBeCalled();
  });
  it('Should call onSuccess callback after successful adding to cart', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useAddToCart(PRODUCT_ID, onSuccess));
    await result.current.clickHandler();

    expect(onSuccess).toBeCalled();
  });
  it('Should return isLoading - true, if addProductToCart mutation has loading status', () => {
    mockUseAddProductToCartMutation.mockImplementation(() => [mockAddProductToCart, { isLoading: true }]);
    const { result } = renderHook(() => useAddToCart(PRODUCT_ID));

    expect(result.current.isLoading).toBe(true);
  });
  it('Should return isLoading - true, if addProductToCart mutation has loading status', () => {
    mockUseAddManyProductsToCartMutation.mockImplementation(() => [mockAddProductsToCart, { isLoading: true }]);
    const { result } = renderHook(() => useAddToCart(PRODUCT_ID));

    expect(result.current.isLoading).toBe(true);
  });
  it('Should return isDisabled - true, passed empty array of ids', () => {
    const { result } = renderHook(() => useAddToCart([]));

    expect(result.current.isDisabled).toBe(true);
  });
});
