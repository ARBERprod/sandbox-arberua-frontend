import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { PromoCodeForm } from './PromoCodeForm';

const cartWithPromo = {
  totals: [],
  items: [],
  total: 85000,
  quantity: 1,
  promocode: {
    code: 'SALE15',
    discount: 15,
    period_to: null,
    total_discount: 15000,
  },
};

const cartWithoutPromo = {
  totals: [],
  items: [],
  total: 100000,
  quantity: 1,
  promocode: null,
};

const businessErrorBody = (code: string) => ({
  success: false,
  error: { code, message: `${code} message` },
});

const stateEmpty = {
  cart: {
    isOpen: false, cartData: cartWithoutPromo, isFetching: false, isLoading: false, isError: false,
  },
};

const server = setupServer();

const queueApplyResponse = (response: (req: any, res: any, ctx: any) => any) => {
  server.use(rest.post('*/cart-se/apply-promocode', response));
};

const queueRemoveResponse = (response: (req: any, res: any, ctx: any) => any) => {
  server.use(rest.delete('*/cart-se/remove-promocode', response));
};

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PromoCodeForm integration (acceptance scenarios §7)', () => {
  describe('1. Happy path', () => {
    it('apply → renders applied state with code + discount label', async () => {
      queueApplyResponse((_req, res, ctx) => res(
        ctx.status(200),
        ctx.json({ success: true, data: cartWithPromo }),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateEmpty });

      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'SALE15');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));

      await waitFor(() => expect(screen.getByText('SALE15')).toBeInTheDocument());
      expect(screen.getByText(/−15%/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /видалити/i })).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/промокод/i)).not.toBeInTheDocument();
    });
  });

  describe('2. Remove', () => {
    it('remove → returns to empty state with input visible', async () => {
      const stateApplied = {
        cart: {
          isOpen: false, cartData: cartWithPromo, isFetching: false, isLoading: false, isError: false,
        },
      };

      queueRemoveResponse((_req, res, ctx) => res(
        ctx.status(200),
        ctx.json({ success: true, data: cartWithoutPromo }),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateApplied });

      await userEvent.click(screen.getByRole('button', { name: /видалити/i }));

      await waitFor(() => expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument());
      expect(screen.queryByRole('button', { name: /видалити/i })).not.toBeInTheDocument();
    });
  });

  describe('4. Already used', () => {
    it('422 PROMOCODE_ALREADY_USED → under-input error, input stays active', async () => {
      queueApplyResponse((_req, res, ctx) => res(
        ctx.status(422),
        ctx.json(businessErrorBody('PROMOCODE_ALREADY_USED')),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateEmpty });

      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'SALE15');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));

      await waitFor(() => expect(screen.getByText(/вже використовували/i)).toBeInTheDocument());
      expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeEnabled();
    });
  });

  describe('6. Expired', () => {
    it('422 PROMOCODE_EXPIRED → "Термін дії промокоду минув"', async () => {
      queueApplyResponse((_req, res, ctx) => res(
        ctx.status(422),
        ctx.json(businessErrorBody('PROMOCODE_EXPIRED')),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateEmpty });

      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'OLD');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));

      await waitFor(() => expect(screen.getByText(/термін дії промокоду минув/i)).toBeInTheDocument());
    });
  });

  describe('7. Phone missing', () => {
    it('422 PROMOCODE_USER_PHONE_MISSING → CTA with /office link', async () => {
      queueApplyResponse((_req, res, ctx) => res(
        ctx.status(422),
        ctx.json(businessErrorBody('PROMOCODE_USER_PHONE_MISSING')),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateEmpty });

      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'X');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));

      await waitFor(() => expect(screen.getByText(/заповніть телефон/i)).toBeInTheDocument());
      const link = screen.getByRole('link', { name: /перейти в профіль/i });
      expect(link).toHaveAttribute('href', '/office');
    });
  });

  describe('8. Client not found', () => {
    it('422 PROMOCODE_CLIENT_NOT_FOUND → "Профіль не знайдено в системі лояльності"', async () => {
      queueApplyResponse((_req, res, ctx) => res(
        ctx.status(422),
        ctx.json(businessErrorBody('PROMOCODE_CLIENT_NOT_FOUND')),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateEmpty });

      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'X');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));

      await waitFor(() => expect(screen.getByText(/не знайдено в системі лояльності/i)).toBeInTheDocument());
    });
  });

  describe('9. 1С недоступний', () => {
    it('503 PROMOCODE_SERVICE_UNAVAILABLE → banner, input stays active', async () => {
      queueApplyResponse((_req, res, ctx) => res(
        ctx.status(503),
        ctx.json(businessErrorBody('PROMOCODE_SERVICE_UNAVAILABLE')),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateEmpty });

      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'X');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));

      const alert = await waitFor(() => screen.getByRole('alert'));
      expect(within(alert).getByText(/тимчасово недоступний/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument();
    });
  });

  describe('10. Unknown error.code', () => {
    it('422 with unknown code → fallback "Не вдалося застосувати промокод" + console.error', async () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      queueApplyResponse((_req, res, ctx) => res(
        ctx.status(422),
        ctx.json(businessErrorBody('PROMOCODE_BRAND_NEW_THING')),
      ));

      renderComponent(<PromoCodeForm />, { initialState: stateEmpty });

      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'X');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));

      await waitFor(() => expect(screen.getByText(/не вдалося застосувати промокод/i)).toBeInTheDocument());
      // The form must log unknown business-error payloads (forward-compat hook):
      // see PromoCodeForm:43-47. If this expectation fails, the dead-code regression has returned.
      expect(errorSpy).toHaveBeenCalledWith(
        '[PromoCodeForm] unknown business error payload:',
        expect.objectContaining({
          status: 422,
          data: expect.objectContaining({
            success: false,
            error: expect.objectContaining({ code: 'PROMOCODE_BRAND_NEW_THING' }),
          }),
        }),
      );
      errorSpy.mockRestore();
    });
  });
});

// Scenarios deferred to higher-level surfaces / future work:
//   3. Cart change after apply (toast) — covered by promocodeInvalidationListener unit test.
//   5. Already used on checkout race — belongs in useCheckout.submitCheckoutForm tests.
//  11. 401 / Sanctum re-auth — depends on baseQueryWithReauth + login modal flow.
//  12. Bonus auto-reset toast — out of scope (no `bonuses_deducted` field on the contract).
