import { renderComponent as wrappedRender } from '@/shared/lib/test/renderComponent';
import { LoginUserNameForm, LoginUserNameFormProps } from './LoginUserNameForm';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const onSubmitHandler = jest.fn();

const renderComponent = (props?: Partial<LoginUserNameFormProps>) => {
  wrappedRender(
    <LoginUserNameForm onSubmit={onSubmitHandler} {...props} />,
  );
};

const getSubmitButton = () => screen.getByRole('button', { name: /продовжити/i });
const getFormComponent = () => screen.getByRole('form', { name: 'username' });
const getInputElement = () => screen.getByPlaceholderText(/телефон або електронна пошта/i);
const getErrorMessage = () => screen.queryByText("Введіть ім'я користувача");

const getFormElements = () => {
  const button = getSubmitButton();
  const form = getFormComponent();
  const input = getInputElement();
  const errorMessage = getErrorMessage();

  return {
    button,
    form,
    input,
    errorMessage,
  };
};

describe('LoginUserNameForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correct login form', () => {
    renderComponent();
    const {
      button, form, input, errorMessage,
    } = getFormElements();

    expect(form).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('Should add additional class to form', () => {
    const CLASS_NAME = 'className';
    renderComponent({ className: CLASS_NAME });
    const form = getFormComponent();

    expect(form).toHaveClass(CLASS_NAME);
  });
  it('Should set new value to input', () => {
    const INPUT_VALUE = 'someUserName';
    renderComponent();
    const input = getInputElement();
    userEvent.type(input, INPUT_VALUE);

    expect(input).toHaveValue(INPUT_VALUE);
  });
  describe('When input data is valid', () => {
    it('Should call passed onSubmit callback', async () => {
      const INPUT_VALUE = 'someUserName';
      renderComponent();
      const { button, input } = getFormElements();

      userEvent.type(input, INPUT_VALUE);
      userEvent.click(button);

      await waitFor(() => {
        expect(onSubmitHandler).toBeCalled();
        expect(onSubmitHandler).toBeCalledWith({ username: INPUT_VALUE });
      });
    });
  });
  describe('When input data is invalid', () => {
    it('Should show error message if field is empty', async () => {
      renderComponent();
      const button = getSubmitButton();
      userEvent.click(button);

      await waitFor(() => {
        const errorMessage = getErrorMessage();
        expect(errorMessage).toBeInTheDocument();
      });
    });
    it('Should not call passed onSubmit callback', async () => {
      renderComponent();
      const button = getSubmitButton();
      userEvent.click(button);

      await waitFor(() => {
        expect(onSubmitHandler).not.toBeCalled();
      });
    });
  });
});
