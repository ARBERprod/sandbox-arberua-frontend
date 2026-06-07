import { act, renderHook } from '@testing-library/react';
import { useBuyInOneClick } from './useBuyInOneClick';
import { getWrapper } from '@/shared/lib/test/getWrapper';
import { StatusCode, ValidationError } from '@/shared/types/api';

const CART_ITEMS: any = [];

const mockCloseCart = jest.fn();
const mockClearCartItems = jest.fn();
const mockShowSuccessModal = jest.fn();
const mockCheckout = jest.fn(() => ({ unwrap: jest.fn().mockResolvedValue({}) }));
const mockNotify = jest.fn();

const mockUseBuiInOneClickMutation = jest.fn(() => [mockCheckout]);

jest.mock('@/shared/ui/Notification/useErrorNotification', () => ({
  useErrorNotification: () => ({ notify: mockNotify }),
}));

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

  it('Should notify with the server message on a business error', async () => {
    const MESSAGE = 'Order was not accepted. Please contact support.';
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue({
        data: { success: false, error: { code: 'ONE_CLICK_ORDER_FAILED', message: MESSAGE } },
      }),
    }));
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockNotify).toBeCalledWith({ title: MESSAGE });
  });

  it('Should notify with the default message on an unknown error', async () => {
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue({ status: 500, data: {} }),
    }));
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockNotify).toBeCalledWith();
  });

  it('Should notify with the default message when the business error message is empty', async () => {
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue({
        data: { success: false, error: { code: 'ONE_CLICK_ORDER_FAILED', message: '' } },
      }),
    }));
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockNotify).toBeCalledWith();
  });

  it('Should set both phone and name errors from a single validation error', async () => {
    const PHONE_ERROR = 'PHONE_ERROR';
    const NAME_ERROR = 'NAME_ERROR';
    const ERROR: ValidationError = {
      status: StatusCode.VALIDATION_ERROR,
      data: {
        errors: {
          phone: [PHONE_ERROR],
          name: [NAME_ERROR],
        },
      },
    };
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue(ERROR),
    }));
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(result.current.fieldError).toBe(PHONE_ERROR);
    expect(result.current.nameError).toBe(NAME_ERROR);
  });

  it('Should notify with the default message when the error has no data field', async () => {
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue(new Error('Network Error')),
    }));
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockNotify).toBeCalledWith();
  });

  it('Should send a whitespace name to the BE as-is (no client-side trim)', async () => {
    const NAME_VALUE = '   ';
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });
    await act(() => {
      result.current.changeHandler('name', NAME_VALUE);
    });

    await act(async () => {
      await result.current.clickHandler();
    });

    expect(mockCheckout).toBeCalledWith({ phone: '', name: NAME_VALUE, items: [] });
  });

  it('Should clear nameError when the name field changes', async () => {
    const ERROR: ValidationError = {
      status: StatusCode.VALIDATION_ERROR,
      data: { errors: { name: ['NAME_ERROR'] } },
    };
    mockCheckout.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue(ERROR),
    }));
    const { result } = renderHook(() => useBuyInOneClick(), { wrapper });

    await act(async () => {
      await result.current.clickHandler();
    });
    expect(result.current.nameError).toBe('NAME_ERROR');

    act(() => {
      result.current.changeHandler('name', 'John');
    });

    expect(result.current.nameError).toBe('');
  });
});
