import { renderComponent } from '@/shared/lib/test/renderComponent';
import { screen } from '@testing-library/dom';
import { AddToCardButton } from './AddToCartButton';
import userEvent from '@testing-library/user-event';

const mockClickHandler = jest.fn();

const mockUseAddToCart = jest.fn((...args: any[]) => ({
  isDisabled: false,
  isLoading: false,
  clickHandler: mockClickHandler,
}));

jest.mock('../lib/useAddToCart/useAddToCart', () => ({
  useAddToCart: (...args: any[]) => mockUseAddToCart(...args),
}));

const PRODUCT_ID = '111';
const PRODUCT_IDS = ['111', '222', '333'];

describe('AddToCardButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render add to cart button', () => {
    renderComponent(<AddToCardButton productId={PRODUCT_ID} />);

    expect(screen.getByText('В кошик')).toBeInTheDocument();
  });

  it('Should render add to cart button with custom text', () => {
    const CUSTOM_TEXT = '222';
    renderComponent(<AddToCardButton productId={PRODUCT_ID}>{CUSTOM_TEXT}</AddToCardButton>);

    expect(screen.getByText(CUSTOM_TEXT)).toBeInTheDocument();
  });

  it('Should call click handler by button click', () => {
    renderComponent(<AddToCardButton productId={PRODUCT_ID} />);
    userEvent.click(screen.getByRole('button'));

    expect(mockClickHandler).toBeCalled();
  });

  it('Should show loader, if isLoading = true', () => {
    mockUseAddToCart.mockImplementation(() => ({
      isDisabled: false,
      isLoading: true,
      clickHandler: jest.fn(),
    }));
    renderComponent(<AddToCardButton productId={PRODUCT_ID} />);

    expect(screen.getByTestId('page-loader')).toBeInTheDocument();
  });
  it('Should disable button, if isDisabled = true', () => {
    mockUseAddToCart.mockImplementation(() => ({
      isDisabled: true,
      isLoading: false,
      clickHandler: jest.fn(),
    }));
    renderComponent(<AddToCardButton productId={PRODUCT_ID} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
  it('Should pass correct params to useAddToCart hook', () => {
    const onSuccess = jest.fn();
    renderComponent(<AddToCardButton productId={PRODUCT_IDS} onSuccess={onSuccess} />);

    expect(mockUseAddToCart).toBeCalledWith(PRODUCT_IDS, onSuccess);
  });
});
