import { renderComponent } from '@/shared/lib/test/renderComponent';
import { OrdersTable } from '../ui/OrdersTable';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';
import { SUCCESS_ORDER_RESPONSE } from './stubs/orderResponse';
import { useGetOrdersQuery } from '@/entities/Order';
import userEvent from '@testing-library/user-event';
import { officeOrdersReducer } from '../model/slices/officeOrderSlice';
import { OrderDetailsModal } from '../ui/OrderDetailsModal';

jest.mock('@/entities/Order', () => ({
  ...jest.requireActual('@/entities/Order'),
  useGetOrdersQuery: jest.fn(jest.requireActual('@/entities/Order').useGetOrdersQuery),
}));

const mockUseGetOrdersQuery = jest.mocked(useGetOrdersQuery);

const server = setupServer(
  rest.get('*/profile/history/orders', (req, res, context) => res(context.json(SUCCESS_ORDER_RESPONSE))),
);

const getTableLoader = () => screen.getByTestId('table-loader');

const createComponent = () => {
  renderComponent(
    <>
      <OrdersTable />
      <OrderDetailsModal />
    </>,
    {
      asyncReducers: {
        officeOrders: officeOrdersReducer,
      },
    },
  );
};

const FIRST_ORDER = SUCCESS_ORDER_RESPONSE.data[0];

describe('OfficeOrders', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should show spinner if data is loading', () => {
    mockUseGetOrdersQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      refetch: jest.fn(),
    });
    createComponent();

    expect(screen.getByTestId('table-loader'))
      .toBeInTheDocument();
  });

  it('Should load orders and render orders table', async () => {
    createComponent();

    await waitForElementToBeRemoved(getTableLoader);

    const tableContainer = screen.getByRole('table');

    const orderRows = tableContainer.querySelectorAll('tbody tr');

    expect(tableContainer)
      .toBeInTheDocument();
    expect(orderRows.length)
      .toBe(SUCCESS_ORDER_RESPONSE.data.length);
  });

  it('Should open order details modal', async () => {
    createComponent();

    await waitForElementToBeRemoved(getTableLoader);

    const firstOrderDetailsButton = screen.getAllByRole('button', { name: /details/i })[0];
    userEvent.click(firstOrderDetailsButton);

    const orderDetailsModal = screen.getByTestId('order-details-modal');
    expect(orderDetailsModal)
      .toBeInTheDocument();
  });

  it('Should display correct order details in modal', async () => {
    createComponent();

    await waitForElementToBeRemoved(getTableLoader);

    const firstOrderDetailsButton = screen.getAllByRole('button', { name: /details/i })[0];
    userEvent.click(firstOrderDetailsButton);

    const orderTitle = screen.getByRole('heading', { level: 5, name: `Заказ ${FIRST_ORDER.id}` });

    expect(orderTitle)
      .toBeInTheDocument();
  });

  it('Should show history in modal, by clicking on history button', async () => {
    createComponent();

    await waitForElementToBeRemoved(getTableLoader);

    const firstOrderDetailsButton = screen.getAllByRole('button', { name: /details/i })[0];
    userEvent.click(firstOrderDetailsButton);

    const historyButton = screen.getByRole('button', { name: 'Історія замовлення' });
    userEvent.click(historyButton);

    const modal = screen.getByTestId('history-modal');
    expect(modal).toHaveAttribute('aria-hidden', 'false');
  });

  it('Should show correct number of histories in modal, by clicking on history button', async () => {
    createComponent();

    await waitForElementToBeRemoved(getTableLoader);

    const firstOrderDetailsButton = screen.getAllByRole('button', { name: /details/i })[0];
    userEvent.click(firstOrderDetailsButton);

    const historyButton = screen.getByRole('button', { name: 'Історія замовлення' });
    userEvent.click(historyButton);

    const histories = screen.getAllByTestId('history-item');
    expect(histories.length).toBe(FIRST_ORDER.histories?.length);
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });
});
