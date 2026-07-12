import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { PickupDiagnostics } from './PickupDiagnostics';

const hardBlocker = {
  kind: 'hard_blocker' as const,
  items: [
    { product_id: 'p1', title: 'Куртка зимова', slug: 'kurtka' },
    { product_id: 'p2', title: 'Шапка вовняна', slug: 'shapka' },
  ],
};

describe('PickupDiagnostics', () => {
  it('state 1: renders the temporary "1C down" message for stock_check_unavailable', () => {
    renderComponent(<PickupDiagnostics availability={{ kind: 'stock_check_unavailable' }} />);

    expect(screen.getByRole('status')).toHaveTextContent(/тимчасово недоступний/i);
  });

  it('state 3: renders the hard-blocker message and lists every blocker item title', () => {
    renderComponent(
      <PickupDiagnostics
        availability={{
          kind: 'hard_blocker',
          items: [
            { product_id: 'p1', title: 'Куртка зимова', slug: 'kurtka' },
            { product_id: 'p2', title: 'Шапка вовняна', slug: 'shapka' },
          ],
        }}
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent(/недоступні для самовивозу в жодній точці/i);
    expect(screen.getByText('Куртка зимова')).toBeInTheDocument();
    expect(screen.getByText('Шапка вовняна')).toBeInTheDocument();
  });

  it('state 4: renders the distributed-stock message for no_common_store', () => {
    renderComponent(<PickupDiagnostics availability={{ kind: 'no_common_store' }} />);

    expect(screen.getByRole('status')).toHaveTextContent(/немає точки, де є всі товари/i);
  });

  it('state 5: renders the neutral fallback for unavailable', () => {
    renderComponent(<PickupDiagnostics availability={{ kind: 'unavailable' }} />);

    expect(screen.getByRole('status')).toHaveTextContent(/зараз недоступний для цього кошика/i);
  });

  it.each(['idle', 'loading', 'available'])('renders no status for the selectable state %s', (kind) => {
    renderComponent(<PickupDiagnostics availability={{ kind, points: [] } as any} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  describe('hard_blocker remove action', () => {
    it('renders a remove button per blocker item when onRemoveItem is provided', () => {
      renderComponent(<PickupDiagnostics availability={hardBlocker} onRemoveItem={jest.fn()} />);

      expect(screen.getAllByRole('button', { name: 'Видалити' })).toHaveLength(2);
    });

    it('calls onRemoveItem with the clicked item product_id', async () => {
      const onRemoveItem = jest.fn();
      renderComponent(<PickupDiagnostics availability={hardBlocker} onRemoveItem={onRemoveItem} />);

      const buttons = screen.getAllByRole('button', { name: 'Видалити' });
      await userEvent.click(buttons[1]);

      expect(onRemoveItem).toHaveBeenCalledTimes(1);
      expect(onRemoveItem).toHaveBeenCalledWith('p2');
    });

    it('renders no remove button when onRemoveItem is absent (back-compat)', () => {
      renderComponent(<PickupDiagnostics availability={hardBlocker} />);

      expect(screen.getByText('Куртка зимова')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
