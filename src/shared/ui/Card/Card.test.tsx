import { screen } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { CardView } from '@/shared/types/common';
import { Card, CardProps } from './Card';

const BADGE_TEXT = 'ARBER × Partner';

const renderCard = (props: Partial<CardProps> = {}) => renderComponent(
  <Card title="Some product" href="/product/1" {...props} />,
);

const badge = <span data-testid="Badge">{BADGE_TEXT}</span>;

const stackOf = (container: HTMLElement) => container.querySelector<HTMLElement>('.badges');

describe('Card badge stack', () => {
  it('renders no stack at all when there is neither a sale nor a badge', () => {
    const { container } = renderCard();

    expect(stackOf(container)).toBeNull();
  });

  it('renders the discount alone when there is no badge', () => {
    const { container } = renderCard({ sale: 30 });

    const stack = stackOf(container);
    expect(stack).not.toBeNull();
    expect(stack?.children).toHaveLength(1);
    expect(stack?.firstElementChild).toHaveClass('sale');
    expect(stack?.firstElementChild).toHaveTextContent('-30%');
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });

  it('renders the badge alone when there is no sale', () => {
    const { container } = renderCard({ badges: badge });

    const stack = stackOf(container);
    expect(stack?.children).toHaveLength(1);
    expect(stack?.querySelector('.sale')).toBeNull();
    expect(screen.getByTestId('Badge')).toHaveTextContent(BADGE_TEXT);
    expect(stack).toContainElement(screen.getByTestId('Badge'));
  });

  // Both labels at once is the case the change introduces: the discount stays first and the
  // badge stacks under it, instead of the two overlapping as separate absolute blocks.
  it('stacks the discount above the badge when both are present', () => {
    const { container } = renderCard({
      sale: 30,
      badges: badge,
    });

    const stack = stackOf(container);
    expect(stack?.children).toHaveLength(2);
    expect(stack?.children[0]).toHaveClass('sale');
    expect(stack?.children[1]).toHaveTextContent(BADGE_TEXT);
  });

  it('keeps a zero discount out of the stack', () => {
    const { container } = renderCard({ sale: 0 });

    expect(stackOf(container)).toBeNull();
  });

  it('keeps a null discount out of the stack while still rendering the badge', () => {
    const { container } = renderCard({
      sale: null,
      badges: badge,
    });

    const stack = stackOf(container);
    expect(stack?.children).toHaveLength(1);
    expect(stack?.querySelector('.sale')).toBeNull();
  });

  // The stack is positioned on `.root` and must stay a sibling of `.wrap`: `.actions` lives
  // inside `.wrap` with a lower z-index, and the labels have to paint above it.
  it('mounts the stack next to .wrap, not inside it', () => {
    const { container } = renderCard({
      sale: 30,
      badges: badge,
    });

    const stack = stackOf(container);
    expect(stack?.parentElement).toHaveClass('root');
    expect(container.querySelector('.wrap')?.querySelector('.badges')).toBeNull();
  });

  // The `.small` max-width rule exists only for the tightest card, so the view modifier has to
  // reach the stack — the class is applied next to `.badges`, not instead of it.
  it.each([
    [CardView.SMALL, 'small'],
    [CardView.NORMAL, 'normal'],
    [CardView.BIG, 'big'],
  ])('carries the %s view modifier on the stack', (view, expectedClass) => {
    const { container } = renderCard({
      sale: 30,
      view,
    });

    expect(stackOf(container)).toHaveClass('badges', expectedClass);
  });
});
