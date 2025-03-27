import { AuthProposal } from './AuthProposal';
import { screen } from '@testing-library/dom';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import userEvent from '@testing-library/user-event';
import { AuthModalType } from '../../model/types/AuthSchema';

const mockSetActiveModal = jest.fn();

jest.mock('../../model/slices/authSlice', () => ({
  ...jest.requireActual('../../model/slices/authSlice'),
  useAuthActions: jest.fn(() => ({ setActiveModal: mockSetActiveModal })),
}));

describe('AuthProposal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should add additional className', () => {
    const CLASS_NAME = 'className';
    renderComponent(<AuthProposal to="login" className={CLASS_NAME} />);

    const root = screen.getByTestId('AuthProposal');

    expect(root).toBeInTheDocument();
    expect(root).toHaveClass(CLASS_NAME);
  });
  describe('proposal to login', () => {
    it('Should display correct title', () => {
      renderComponent(<AuthProposal to="login" />);

      expect(screen.getByText(/вже є обліковий запис?/i));
    });
    it('Should display correct button text', () => {
      renderComponent(<AuthProposal to="login" />);

      expect(screen.getByRole('button')).toHaveTextContent(/увійти/i);
    });
    it('Should set active login modal', () => {
      renderComponent(<AuthProposal to="login" />);

      userEvent.click(screen.getByRole('button'));

      expect(mockSetActiveModal).toBeCalledWith(AuthModalType.LOGIN_USERNAME);
    });
  });
  describe('proposal to register', () => {
    it('Should display correct text', () => {
      renderComponent(<AuthProposal to="register" />);

      expect(screen.getByText(/немає облікового запису?/i));
    });
    it('Should display correct button text', () => {
      renderComponent(<AuthProposal to="register" />);

      expect(screen.getByRole('button')).toHaveTextContent(/зареєструйтесь/i);
    });
    it('Should set active register modal', () => {
      renderComponent(<AuthProposal to="register" />);

      userEvent.click(screen.getByRole('button'));

      expect(mockSetActiveModal).toBeCalledWith(AuthModalType.REGISTER);
    });
  });
});
