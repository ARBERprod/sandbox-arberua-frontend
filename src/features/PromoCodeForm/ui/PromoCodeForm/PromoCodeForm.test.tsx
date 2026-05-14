import { ReactNode } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createStore } from 'redux';
import i18n from '@/shared/lib/test/i18nForTest';
import { createMockRouter } from '@/shared/lib/test/createMockRouter';
import type { PromocodeMeta } from '@/entities/Cart';

// Mock only the two RTK Query hooks the component pulls from the barrel.
// We re-export the centralised promocode-code predicates and getPromocodeErrorKey
// from their concrete modules (no circular init through cartSlice). The mock
// factory replaces the entire @/entities/Cart barrel — every symbol used at
// render time must be re-declared here.
/* eslint-disable @typescript-eslint/no-var-requires, global-require */
jest.mock('@/entities/Cart', () => {
  const codes = require('@/entities/Cart/model/types/promocodeCodes');
  const keyMod = require('@/entities/Cart/lib/getPromocodeErrorKey');
  return {
    __esModule: true,
    useApplyPromocodeMutation: jest.fn(),
    useRemovePromocodeMutation: jest.fn(),
    cartSelectors: {
      getPromocode: (state: any) => state?.cart?.cartData?.promocode ?? null,
    },
    ...codes,
    ...keyMod,
  };
});
/* eslint-enable @typescript-eslint/no-var-requires, global-require */

/* eslint-disable @typescript-eslint/no-var-requires, global-require */
const { useApplyPromocodeMutation, useRemovePromocodeMutation } = require('@/entities/Cart') as {
  useApplyPromocodeMutation: jest.Mock;
  useRemovePromocodeMutation: jest.Mock;
};
/* eslint-enable @typescript-eslint/no-var-requires, global-require */

// eslint-disable-next-line import/first
import { PromoCodeForm } from './PromoCodeForm';

const makeUnwrap = (rejected?: unknown, resolved?: unknown) => () => ({
  unwrap: () => (rejected ? Promise.reject(rejected) : Promise.resolve(resolved)),
});

const baseResult = (overrides: Record<string, any> = {}) => ({
  reset: jest.fn(),
  isLoading: false,
  isError: false,
  isSuccess: false,
  isUninitialized: true,
  status: 'uninitialized',
  originalArgs: undefined,
  data: undefined,
  error: undefined,
  endpointName: 'whatever',
  requestId: undefined,
  startedTimeStamp: undefined,
  fulfilledTimeStamp: undefined,
  ...overrides,
});

const setApply = (override: Record<string, any> = {}, trigger: jest.Mock = jest.fn(makeUnwrap())) => {
  useApplyPromocodeMutation.mockReturnValue([trigger, baseResult(override)]);
  return trigger;
};
const setRemove = (override: Record<string, any> = {}, trigger: jest.Mock = jest.fn(makeUnwrap())) => {
  useRemovePromocodeMutation.mockReturnValue([trigger, baseResult(override)]);
  return trigger;
};

const businessError = (code: string, status = 422) => ({
  status,
  data: { success: false, error: { code, message: `${code} message` } },
});

const APPLIED: PromocodeMeta = {
  code: 'SALE15',
  discount: 15,
  period_to: null,
  total_discount: 15000,
};

type CartState = { cart: { cartData: { promocode: PromocodeMeta | null } } };

const renderWithPromocode = (promocode: PromocodeMeta | null) => {
  const state: CartState = { cart: { cartData: { promocode } } };
  // Tiny read-only store: PromoCodeForm only reads, never dispatches into cart slice.
  const store = createStore((s = state) => s);
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <RouterContext.Provider value={createMockRouter({})}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store as any}>{children}</Provider>
      </I18nextProvider>
    </RouterContext.Provider>
  );
  return render(<Wrapper><PromoCodeForm /></Wrapper>);
};

describe('PromoCodeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setApply();
    setRemove();
  });

  describe('empty state', () => {
    it('renders input + apply button', () => {
      renderWithPromocode(null);
      expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeInTheDocument();
    });

    it('apply button is disabled when input is empty', () => {
      renderWithPromocode(null);
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeDisabled();
    });

    it('apply button is disabled when input is whitespace only', async () => {
      renderWithPromocode(null);
      await userEvent.type(screen.getByPlaceholderText(/промокод/i), '    ');
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeDisabled();
    });

    it('apply button is enabled once a non-whitespace value is typed', async () => {
      renderWithPromocode(null);
      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'SALE15');
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeEnabled();
    });

    it('calls applyPromocode trigger with the trimmed code on click', async () => {
      const trigger = jest.fn(makeUnwrap());
      setApply({}, trigger);
      renderWithPromocode(null);
      await userEvent.type(screen.getByPlaceholderText(/промокод/i), '  SALE15  ');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));
      // Flush the post-unwrap setValue('') microtask inside act.
      await act(async () => { await Promise.resolve(); });
      expect(trigger).toHaveBeenCalledWith({ code: 'SALE15' });
    });

    it('Edge Case 5: passes a long code through verbatim without truncation', async () => {
      const trigger = jest.fn(makeUnwrap());
      setApply({}, trigger);
      renderWithPromocode(null);
      const longCode = 'A'.repeat(120);
      await userEvent.type(screen.getByPlaceholderText(/промокод/i), longCode);
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));
      await act(async () => { await Promise.resolve(); });
      expect(trigger).toHaveBeenCalledWith({ code: longCode });
    });

    it('Edge Case 5: a zero-width-space–only input enables Apply (frontend trim() does not strip ZWSP — backend rejects via PROMOCODE_NOT_FOUND)', async () => {
      const trigger = jest.fn(makeUnwrap());
      setApply({}, trigger);
      renderWithPromocode(null);
      // U+200B is NOT whitespace per String.prototype.trim() spec.
      const zwsp = '​';
      await userEvent.type(screen.getByPlaceholderText(/промокод/i), zwsp);
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeEnabled();
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));
      await act(async () => { await Promise.resolve(); });
      expect(trigger).toHaveBeenCalledWith({ code: zwsp });
    });
  });

  describe('Edge Case 2: applyPromocode succeeds but cart.promocode stays null', () => {
    it('keeps the empty state (input visible, no error) — render reflects cart, not mutation success', async () => {
      const trigger = jest.fn(makeUnwrap());
      setApply({}, trigger);
      // Cart state still has promocode === null even after a "successful" apply.
      // The component's `applied` selector reads cart, so the empty view persists.
      renderWithPromocode(null);
      await userEvent.type(screen.getByPlaceholderText(/промокод/i), 'NOAPPLY');
      await userEvent.click(screen.getByRole('button', { name: /застосувати/i }));
      await act(async () => { await Promise.resolve(); });
      expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('applied state', () => {
    it('renders the applied code and discount label', () => {
      renderWithPromocode(APPLIED);
      expect(screen.getByText('SALE15')).toBeInTheDocument();
      expect(screen.getByText(/−15%/)).toBeInTheDocument();
    });

    it('shows remove button and hides the input', () => {
      renderWithPromocode(APPLIED);
      expect(screen.getByRole('button', { name: /видалити/i })).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/промокод/i)).not.toBeInTheDocument();
    });

    it('clicking "Видалити" triggers removePromocode', async () => {
      const trigger = jest.fn(makeUnwrap());
      setRemove({}, trigger);
      renderWithPromocode(APPLIED);
      await userEvent.click(screen.getByRole('button', { name: /видалити/i }));
      await act(async () => { await Promise.resolve(); });
      expect(trigger).toHaveBeenCalledTimes(1);
    });

    it('remove button is disabled while a mutation is in flight', () => {
      setRemove({ isLoading: true, isUninitialized: false });
      renderWithPromocode(APPLIED);
      expect(screen.getByRole('button', { name: /видалити/i })).toBeDisabled();
    });
  });

  describe('error states', () => {
    it('validation: shows under-input error text for known validation code', () => {
      setApply({
        isError: true,
        isUninitialized: false,
        error: businessError('PROMOCODE_EXPIRED'),
      });
      renderWithPromocode(null);
      expect(screen.getByText(/термін дії промокоду минув/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument();
    });

    it('validation: unknown business code falls back to "Не вдалося застосувати промокод" and logs to console', () => {
      setApply({
        isError: true,
        isUninitialized: false,
        error: businessError('PROMOCODE_FROM_THE_FUTURE'),
      });
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      renderWithPromocode(null);
      // Unknown business codes map to { kind: 'validation', code: null } so the
      // form's forward-compat console.error branch fires (PromoCodeForm:43-47).
      expect(screen.getByText(/не вдалося застосувати промокод/i)).toBeInTheDocument();
      expect(errorSpy).toHaveBeenCalledWith(
        '[PromoCodeForm] unknown business error payload:',
        expect.objectContaining({
          status: 422,
          data: expect.objectContaining({
            error: expect.objectContaining({ code: 'PROMOCODE_FROM_THE_FUTURE' }),
          }),
        }),
      );
      errorSpy.mockRestore();
    });

    it('non-business error (e.g. raw 5xx without error.code) → service banner', () => {
      setApply({
        isError: true,
        isUninitialized: false,
        error: { status: 500, data: 'Internal Server Error' },
      });
      renderWithPromocode(null);
      expect(screen.getByRole('alert')).toHaveTextContent(/сервіс промокодів тимчасово недоступний/i);
      expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument();
    });

    it('cta: PROMOCODE_USER_PHONE_MISSING renders the "phone missing" CTA with /office link', () => {
      setApply({
        isError: true,
        isUninitialized: false,
        error: businessError('PROMOCODE_USER_PHONE_MISSING'),
      });
      renderWithPromocode(null);
      expect(screen.getByText(/заповніть телефон у профілі/i)).toBeInTheDocument();
      const link = screen.getByRole('link', { name: /перейти в профіль/i });
      expect(link).toHaveAttribute('href', '/office');
      expect(screen.queryByPlaceholderText(/промокод/i)).not.toBeInTheDocument();
    });

    it('cta: PROMOCODE_CLIENT_NOT_FOUND renders the "client not found" CTA', () => {
      setApply({
        isError: true,
        isUninitialized: false,
        error: businessError('PROMOCODE_CLIENT_NOT_FOUND'),
      });
      renderWithPromocode(null);
      expect(screen.getByText(/профіль не знайдено в системі лояльності/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /перейти в профіль/i })).toBeInTheDocument();
    });

    it('service: PROMOCODE_SERVICE_UNAVAILABLE renders the banner above the input', () => {
      setApply({
        isError: true,
        isUninitialized: false,
        error: businessError('PROMOCODE_SERVICE_UNAVAILABLE', 503),
      });
      renderWithPromocode(null);
      expect(screen.getByRole('alert'))
        .toHaveTextContent(/сервіс промокодів тимчасово недоступний/i);
      expect(screen.getByPlaceholderText(/промокод/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('apply button is disabled while applyPromocode is in flight', () => {
      setApply({ isLoading: true, isUninitialized: false });
      renderWithPromocode(null);
      expect(screen.getByRole('button', { name: /застосувати/i })).toBeDisabled();
    });

    it('input field is disabled while a mutation is in flight', () => {
      setApply({ isLoading: true, isUninitialized: false });
      renderWithPromocode(null);
      expect(screen.getByPlaceholderText(/промокод/i)).toBeDisabled();
    });
  });
});
