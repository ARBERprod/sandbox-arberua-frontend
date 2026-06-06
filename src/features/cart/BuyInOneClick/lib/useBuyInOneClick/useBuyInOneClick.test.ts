import { act, renderHook } from '@testing-library/react';
import { useBuyInOneClick } from './useBuyInOneClick';
import { getWrapper } from '@/shared/lib/test/getWrapper';
import { StatusCode, ValidationError } from '@/shared/types/api';

const CART_ITEMS: any = [];

const mockCloseCart = jest.fn();
const mockClearCartItems = jest.fn();
const mockShowSuccessModal = jest.fn();
const mockCheckout = jest.fn(() => ({ unwrap: jest.fn().mockResolvedValue({}) }));

const mockUseBuiInOneClickMutation = jest.fn(() => [mockCheckout]);

jest.mock('../../api/buyInOneClickApi', () => ({
  useBuyInOneClickMutation: () => mockUseBuiInOneClickMutation(),
}));

jest.mock('../../model/buyInOneClickCartSlice', () => ({
  useBuyInOneClickCartActions: () => ({
    closeCart: mockCloseCart,
    clearCartItems: mockClearCartItems,
    showSuccessModal: mockShowSuccessModal,
  }),
}));

jest.mock('../../model/buyInOneClickCartSelectors', () => ({
  buyInOneClickCartSelectors: {
    getCartItems: () => CART_ITEMS,
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector: any) => selector(),
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
      name: '',
      items: [],
    };

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockCheckout).toBeCalledWith(CHECKOUT_DATA);
  });

  it('Should clear cart items', async () => {
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockClearCartItems).toBeCalled();
  });

  it('Should close cart after success', async () => {
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(async () => {
      await result.current.clickHandler();
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
      name: '',
      items: [],
    };

    await act(async () => {
      await result.current.clickHandler();
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
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue(ERROR),
    }));

    await act(async () => {
      await result.current.clickHandler();
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

  it('Should change name when changeHandler called with name field', () => {
    const NAME_VALUE = 'John';
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    act(() => {
      result.current.changeHandler('name', NAME_VALUE);
    });

    expect(result.current.name).toBe(NAME_VALUE);
    expect(result.current.phone).toBe('');
  });

  it('Should call checkout with name', async () => {
    const NAME_VALUE = 'John';
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    await act(() => {
      result.current.changeHandler('name', NAME_VALUE);
    });

    const CHECKOUT_DATA = {
      phone: '',
      name: NAME_VALUE,
      items: [],
    };

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockCheckout).toBeCalledWith(CHECKOUT_DATA);
  });

  it('Should reset phone and name after successful submit', async () => {
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockResolvedValue({}),
    }));
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(() => {
      result.current.changeHandler('phone', '1111111111');
      result.current.changeHandler('name', 'John');
    });

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(result.current.phone).toBe('');
    expect(result.current.name).toBe('');
  });

  it('Should set name validation error', async () => {
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    const ERROR_MESSAGE = 'NAME_ERROR_MESSAGE';
    const ERROR: ValidationError = {
      status: StatusCode.VALIDATION_ERROR,
      data: {
        errors: {
          name: [ERROR_MESSAGE],
        },
      },
    };
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue(ERROR),
    }));

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(result.current.nameError).toBe(ERROR_MESSAGE);
  });
});
