import { act, renderHook } from '@testing-library/react';
import { useBuyInOneClick } from './useBuyInOneClick';
import { getWrapper } from '@/shared/lib/test/getWrapper';
import { StatusCode, ValidationError } from '@/shared/types/api';

const CART_ITEMS: any = [];

const mockCloseCart = jest.fn();
const mockDeleteCart = jest.fn(() => ({ unwrap: jest.fn() }));
const mockCheckout = jest.fn(() => ({ unwrap: jest.fn() }));

const mockUseBuiInOneClickMutation = jest.fn(() => [mockCheckout]);
const mockUseDeleteCartMutation = jest.fn(() => [mockDeleteCart]);

jest.mock('../../api/buyInOneClickApi', () => ({
  useBuyInOneClickMutation: () => mockUseBuiInOneClickMutation(),
}));

jest.mock('@/entities/Cart', () => ({
  useCartActions: () => ({ closeCart: mockCloseCart }),
  useDeleteCartMutation: () => mockUseDeleteCartMutation(),
}));

describe('useBuyInOneClick', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = getWrapper();
    jest.clearAllMocks();
  });

  it('Should call checkout', async () => {
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    const CHECKOUT_DATA = {
      phone: result.current.phone,
    };

    await act(() => {
      result.current.clickHandler();
    });

    expect(mockCheckout).toBeCalledWith(CHECKOUT_DATA);
  });

  it('Should delete cart', async () => {
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    await act(() => {
      result.current.clickHandler();
    });

    expect(mockDeleteCart).toBeCalled();
  });

  it('Should close cart after success', async () => {
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(() => {
      result.current.clickHandler();
    });

    expect(mockCloseCart).toBeCalled();
  });

  it('Should call checkout with correct phone', async () => {
    const PHONE_VALUE = '1111111111';
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    await act(() => {
      result.current.changeHandler('phone', PHONE_VALUE);
    });

    const CHECKOUT_DATA = {
      phone: PHONE_VALUE,
    };

    await act(() => {
      result.current.clickHandler();
    });

    expect(mockCheckout).toBeCalledWith(CHECKOUT_DATA);
  });

  it('Should set validation error', async () => {
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    const ERROR_MESSAGE = 'ERROR_MESSAGE';
    const ERROR: ValidationError = {
      status: StatusCode.VALIDATION_ERROR,
      data: {
        errors: {
          phone: [ERROR_MESSAGE],
        },
      },
    };
    mockCheckout.mockImplementation(() => {
      throw ERROR;
    });

    await act(() => {
      result.current.clickHandler();
    });

    expect(result.current.fieldError).toBe(ERROR_MESSAGE);
  });
  it('Should change phone', () => {
    const NEW_VALUE = 'NEW_VALUE';
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    act(() => {
      result.current.changeHandler('phone', NEW_VALUE);
    });

    expect(result.current.phone).toBe(NEW_VALUE);
  });
});
