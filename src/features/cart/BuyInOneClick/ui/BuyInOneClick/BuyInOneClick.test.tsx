import { renderComponent } from '@/shared/lib/test/renderComponent';
import { BuyInOneClick } from './BuyInOneClick';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const mockChangeHandler = jest.fn();
const mockClickHandler = jest.fn();

const mockUseBuyInOneClick = jest.fn(() => ({
  isLoading: false,
  fieldError: '',
  changeHandler: mockChangeHandler,
  phone: '',
  clickHandler: mockClickHandler,
}));

jest.mock('../../lib/useBuyInOneClick', () => ({
  useBuyInOneClick: () => mockUseBuyInOneClick(),
}));

const CART_STATE = {
  cartData: {
    items: [],
    quantity: 0,
    totals: [],
  },
};

describe('BuyInOneClick', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should add custom className', () => {
    const CLASS_NAME = 'customClassName';
    renderComponent(<BuyInOneClick className={CLASS_NAME} />, {
      initialState: {
        cart: CART_STATE,
      },
    });

    const rootElement = screen.getByTestId('BuyInOneClick');

    expect(rootElement).toBeInTheDocument();
    expect(rootElement).toHaveClass(CLASS_NAME);
  });

  it('Should call changeHandler when phone input changes', async () => {
    renderComponent(<BuyInOneClick />, {
      initialState: {
        cart: CART_STATE,
      },
    });

    const input = screen.getByRole('textbox');

    await userEvent.type(input, '5');
    expect(mockChangeHandler).toHaveBeenCalled();
  });

  it('Should call click handler by click on button', async () => {
    renderComponent(<BuyInOneClick />, {
      initialState: {
        cart: CART_STATE,
      },
    });
    const btn = screen.getByText('Купити');

    await userEvent.click(btn);

    expect(mockClickHandler).toBeCalled();
  });

  it('Should show error message', () => {
    const ERROR_MESSAGE = 'ERROR_MESSAGE';
    mockUseBuyInOneClick.mockImplementation(() => ({
      fieldError: ERROR_MESSAGE,
      changeHandler: jest.fn(),
      clickHandler: jest.fn(),
      isLoading: false,
      phone: '',
    }));
    renderComponent(<BuyInOneClick />, {
      initialState: {
        cart: CART_STATE,
      },
    });
    const errorBlock = screen.getByText(ERROR_MESSAGE);

    expect(errorBlock).toBeInTheDocument();
  });

  it('Should show preloader, if isLoading', () => {
    mockUseBuyInOneClick.mockImplementation(() => ({
      fieldError: '',
      changeHandler: jest.fn(),
      clickHandler: jest.fn(),
      isLoading: true,
      phone: '',
    }));
    renderComponent(<BuyInOneClick />, {
      initialState: {
        cart: CART_STATE,
      },
    });

    const loader = screen.getByTestId('page-loader');

    expect(loader).toBeInTheDocument();
  });
});
