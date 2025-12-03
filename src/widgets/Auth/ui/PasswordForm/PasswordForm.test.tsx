import { renderComponent as wrappedRender } from '@/shared/lib/test/renderComponent';
import { PasswordForm, type PasswordFormProps } from './PasswordForm';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const onSubmitHandler = jest.fn();

const BTN_TEXT = 'submit';
const TITLE = 'title';

const renderComponent = (props?: Partial<PasswordFormProps>) => {
  wrappedRender(
    <PasswordForm onSubmit={onSubmitHandler} title={TITLE} btnText={BTN_TEXT} {...props} />,
  );
};

const getSubmitButton = (text = BTN_TEXT) => screen.getByRole('button', { name: text });
const getFormComponent = () => screen.getByRole('form', { name: 'password' });
const getInputElement = () => screen.getByPlaceholderText(/пароль/i);
const getErrorMessage = () => screen.queryByText('Введіть пароль');

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

describe('PasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correct password form', () => {
    renderComponent();
    const {
      button, form, input, errorMessage,
    } = getFormElements();

    expect(form).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('Should render form with custom title', () => {
    const CUSTOM_TITLE = 'customTitle';
    renderComponent({ title: CUSTOM_TITLE });

    expect(screen.getByText(CUSTOM_TITLE)).toBeInTheDocument();
  });
  it('Should render form with custom button text', () => {
    const CUSTOM_BTN_TEXT = 'CUSTOM_BTN_TEXT';
    renderComponent({ btnText: CUSTOM_BTN_TEXT });

    const button = getSubmitButton(CUSTOM_BTN_TEXT);

    expect(button).toBeInTheDocument();
  });

  it('Should add additional class to form', () => {
    const CLASS_NAME = 'className';
    renderComponent({ className: CLASS_NAME });
    const form = getFormComponent();

    expect(form).toHaveClass(CLASS_NAME);
  });
  it('Should set new value to input', async () => {
    const INPUT_VALUE = 'password';
    renderComponent();
    const input = getInputElement();
    await userEvent.type(input, INPUT_VALUE);

    expect(input).toHaveValue(INPUT_VALUE);
  });
  describe('When input data is valid', () => {
    it('Should call passed onSubmit callback', async () => {
      const INPUT_VALUE = 'password';
      renderComponent();
      const { button, input } = getFormElements();

      await userEvent.type(input, INPUT_VALUE);
      await userEvent.click(button);

      await waitFor(() => {
        expect(onSubmitHandler).toBeCalled();
      });

      // useForm calls onSubmit with (formData, eventId), so check first arg only
      expect(onSubmitHandler).toBeCalledWith({ password: INPUT_VALUE }, expect.any(String));
    });
  });
  describe('When input data is invalid', () => {
    it('Should show error message if field is empty', async () => {
      renderComponent();
      const button = getSubmitButton();
      await userEvent.click(button);

      await waitFor(() => {
        const errorMessage = getErrorMessage();
        expect(errorMessage).toBeInTheDocument();
      });
    });
    it('Should not call passed onSubmit callback', async () => {
      renderComponent();
      const button = getSubmitButton();
      await userEvent.click(button);

      await waitFor(() => {
        expect(onSubmitHandler).not.toBeCalled();
      });
    });
  });
});
