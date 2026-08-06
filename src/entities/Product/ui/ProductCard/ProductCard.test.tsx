import { screen } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { CardView } from '@/shared/types/common';
import type { ProductCollaboration } from '@/entities/Collaboration';
import type { Product } from '../../model/types';
import { getMockProduct } from '../../lib/getMockProducts';
import { ProductCard } from './ProductCard';

const LABEL = 'ARBER × Partner';

const collaboration: ProductCollaboration = {
  id: 'c-1',
  title: 'Partner',
  label: LABEL,
  url: '/collaboration/c-1',
};

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  ...getMockProduct({ id: 'p-1' }),
  title: 'Shirt',
  price: {
    value: 700,
    symbol: '₴',
  },
  old_price: false,
  skus: null,
  pictures: ['/picture.jpg'],
  ...overrides,
});

// 1000 → 700 is exactly -30%, so the discount label text is deterministic.
const oldPrice = {
  value: 1000,
  symbol: '₴',
};

const renderCard = (product: Product, view?: CardView) => {
  const { container } = renderComponent(<ProductCard product={product} view={view} />);
  return {
    container,
    stack: container.querySelector<HTMLElement>('.badges'),
  };
};

describe('ProductCard collaboration sticker', () => {
  it('renders no sticker for a product without a collaboration', () => {
    const { stack } = renderCard(makeProduct({ collaboration: null }));

    expect(stack).toBeNull();
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
  });

  it('renders the label from the API as is', () => {
    const { stack } = renderCard(makeProduct({ collaboration }));

    expect(stack?.children).toHaveLength(1);
    expect(stack).toContainElement(screen.getByText(LABEL));
  });

  // The field is optional on the type and absent on responses that predate the feature.
  it('renders no sticker when the field is missing entirely', () => {
    const product = makeProduct();
    delete product.collaboration;

    const { stack } = renderCard(product);

    expect(stack).toBeNull();
  });

  // An empty label is a filled-in collaboration with nothing to show — an empty box on the card.
  it('renders no sticker for a collaboration with an empty label', () => {
    const { stack } = renderCard(makeProduct({
      collaboration: {
        ...collaboration,
        label: '',
      },
    }));

    expect(stack).toBeNull();
  });

  it('keeps the discount alone in its old place when there is no collaboration', () => {
    const { stack } = renderCard(makeProduct({
      old_price: oldPrice,
      collaboration: null,
    }));

    expect(stack?.children).toHaveLength(1);
    expect(stack?.firstElementChild).toHaveClass('sale');
    expect(stack?.firstElementChild).toHaveTextContent('-30%');
  });

  it('stacks the discount above the sticker when the product has both', () => {
    const { stack } = renderCard(makeProduct({
      old_price: oldPrice,
      collaboration,
    }));

    expect(stack?.children).toHaveLength(2);
    expect(stack?.children[0]).toHaveTextContent('-30%');
    expect(stack?.children[1]).toHaveTextContent(LABEL);
  });

  // The small card is the tightest layout the sticker has to survive; the view modifier has to
  // reach the stack through Card for its narrower max-width to apply.
  it('keeps the sticker on the small card', () => {
    const { stack } = renderCard(makeProduct({
      old_price: oldPrice,
      collaboration,
    }), CardView.SMALL);

    expect(stack).toHaveClass('badges', 'small');
    expect(stack).toContainElement(screen.getByText(LABEL));
  });
});
