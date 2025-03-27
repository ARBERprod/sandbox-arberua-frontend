import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { AuthByEmailForm } from '@/features/auth/AuthByEmail';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { tokenService } from '@/shared/lib/services/token.service';
import { signIn } from '@/entities/Session';
import { StatusCode } from '@/shared/types/api';

const ACCESS_TOKEN = 'access-token';
const onSubmit = jest.fn();
const getEmailField = () => screen.getByPlaceholderText(/e-mail/i);
const getPasswordField = () => screen.getByPlaceholderText(/пароль/i);
const getSubmitButton = () => screen.getByRole('button', { name: /Увійти/i });

const server = setupServer(
  rest.post('*/sign-in', (req, res, ctx) => res(ctx.json({
    access_token: ACCESS_TOKEN,
    success: true,
    token_type: 'Bearer',
  }))),
);

jest.mock('@/entities/Session', () => ({
  ...jest.requireActual('@/entities/Session'),
}));

const mockedSignIn = jest.mocked(signIn);

describe('AuthByEmailForm', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render email and password fields', () => {
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);

    expect(getEmailField()).toBeInTheDocument();
    expect(getPasswordField()).toBeInTheDocument();
  });

  it('Should change email value by typing', () => {
    const EMAIL_VALUE = 'email@mail.com';
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const emailField = getEmailField();

    userEvent.type(emailField, EMAIL_VALUE);

    expect(emailField).toHaveValue(EMAIL_VALUE);
  });
  it('Should change password value by typing', () => {
    const PASSWORD = 'password';
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const passwordField = getPasswordField();

    userEvent.type(passwordField, PASSWORD);

    expect(passwordField).toHaveValue(PASSWORD);
  });
  it('Should display validation errors if input values are empty', () => {
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const submitButton = getSubmitButton();

    expect(screen.queryByText('Введите email')).not.toBeInTheDocument();
    expect(screen.queryByText('Введите пароль')).not.toBeInTheDocument();

    userEvent.click(submitButton);

    expect(screen.getByText('Введите email')).toBeInTheDocument();
    expect(screen.getByText('Введите пароль')).toBeInTheDocument();
  });
  it('Should call api, if no validation errors', () => {
    const initiate = jest.spyOn(mockedSignIn, 'initiate');
    const PASSWORD = 'password';
    const EMAIL_VALUE = 'email@mail.com';
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const emailField = getEmailField();
    const passwordField = getPasswordField();
    const submitButton = getSubmitButton();

    userEvent.type(emailField, EMAIL_VALUE);
    userEvent.type(passwordField, PASSWORD);

    userEvent.click(submitButton);

    expect(initiate).toBeCalledWith({ login: EMAIL_VALUE, password: PASSWORD });
  });
  it('Should set token after submit', async () => {
    const mockedSetToken = jest.spyOn(tokenService, 'setToken');

    const PASSWORD = 'password';
    const EMAIL_VALUE = 'email@mail.com';
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const emailField = getEmailField();
    const passwordField = getPasswordField();
    const submitButton = getSubmitButton();

    userEvent.type(emailField, EMAIL_VALUE);
    userEvent.type(passwordField, PASSWORD);

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedSetToken).toBeCalledWith(ACCESS_TOKEN);
    });
  });
  it('Should call onSubmit after submit', async () => {
    const PASSWORD = 'password';
    const EMAIL_VALUE = 'email@mail.com';
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const emailField = getEmailField();
    const passwordField = getPasswordField();
    const submitButton = getSubmitButton();

    userEvent.type(emailField, EMAIL_VALUE);
    userEvent.type(passwordField, PASSWORD);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({ password: PASSWORD, login: EMAIL_VALUE });
    });
  });
  it('Should render recover password slot component', () => {
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} recoverPasswordSlot={<div>recover password</div>} />);

    expect(screen.getByText('recover password')).toBeInTheDocument();
  });
  it('Should show server validation errors', async () => {
    const EMAIL_ERROR_MESSAGE = 'EMAIL_ERROR_MESSAGE';
    const PASSWORD_ERROR_MESSAGE = 'PASSWORD_ERROR_MESSAGE';
    server.use(
      rest.post('*/sign-in', (req, res, ctx) => res(
        ctx.status(StatusCode.VALIDATION_ERROR),
        ctx.json({
          errors: {
            login: [EMAIL_ERROR_MESSAGE],
            password: [PASSWORD_ERROR_MESSAGE],
          },
        }),
      )),
    );
    const PASSWORD = 'password';
    const EMAIL_VALUE = 'email@mail.com';
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const emailField = getEmailField();
    const passwordField = getPasswordField();
    const submitButton = getSubmitButton();

    userEvent.type(emailField, EMAIL_VALUE);
    userEvent.type(passwordField, PASSWORD);

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(EMAIL_ERROR_MESSAGE)).toBeInTheDocument();
      expect(screen.getByText(PASSWORD_ERROR_MESSAGE)).toBeInTheDocument();
    });
  });
  it('Should credentials error', async () => {
    server.use(
      rest.post('*/sign-in', (req, res, ctx) => res(
        ctx.status(StatusCode.VALIDATION_ERROR),
        ctx.json({
          errors: {
            login: ['cred error'],
          },
          success: false,
        }),
      )),
    );
    const PASSWORD = 'password';
    const EMAIL_VALUE = 'email@mail.com';
    renderComponent(<AuthByEmailForm onSubmit={onSubmit} />);
    const emailField = getEmailField();
    const passwordField = getPasswordField();
    const submitButton = getSubmitButton();

    userEvent.type(emailField, EMAIL_VALUE);
    userEvent.type(passwordField, PASSWORD);

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Ім\'я користувача або пароль введені неправильно!')).toBeInTheDocument();
    });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });
});
