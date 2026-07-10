import { screen } from '@testing-library/dom';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { PickupDiagnostics } from './PickupDiagnostics';

describe('PickupDiagnostics', () => {
  it('state 1: renders the temporary "1C down" message for stock_check_unavailable', () => {
    renderComponent(<PickupDiagnostics availability={{ kind: 'stock_check_unavailable' }} />);

    expect(screen.getByRole('alert')).toHaveTextContent(/тимчасово недоступний/i);
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

    expect(screen.getByRole('alert')).toHaveTextContent(/недоступні для самовивозу в жодній точці/i);
    expect(screen.getByText('Куртка зимова')).toBeInTheDocument();
    expect(screen.getByText('Шапка вовняна')).toBeInTheDocument();
  });

  it('state 4: renders the distributed-stock message for no_common_store', () => {
    renderComponent(<PickupDiagnostics availability={{ kind: 'no_common_store' }} />);

    expect(screen.getByRole('alert')).toHaveTextContent(/немає точки, де є всі товари/i);
  });

  it('state 5: renders the neutral fallback for unavailable', () => {
    renderComponent(<PickupDiagnostics availability={{ kind: 'unavailable' }} />);

    expect(screen.getByRole('alert')).toHaveTextContent(/зараз недоступний для цього кошика/i);
  });

  it.each(['idle', 'loading', 'available'])('renders no alert for the selectable state %s', (kind) => {
    renderComponent(<PickupDiagnostics availability={{ kind, points: [] } as any} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
