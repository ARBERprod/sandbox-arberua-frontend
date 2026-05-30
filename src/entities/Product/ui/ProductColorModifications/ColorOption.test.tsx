import { render, screen } from '@testing-library/react';
import { ColorOption } from './ColorOption';
import { ProductPickerColor } from '../../model/types';

// Identity proxy so CSS-module class names survive jest's style mock,
// letting us assert which modifier classes ColorOption applies.
jest.mock('./ProductColorModifications.module.scss', () => new Proxy(
  {},
  { get: (_target, prop) => String(prop) },
));

const baseColor: ProductPickerColor = {
  url: '/product/product-1-black',
  value: '#000000',
};

describe('ColorOption', () => {
  it('falls back to color.value for aria-label when title is absent', () => {
    render(<ColorOption color={baseColor} active={false} />);
    expect(screen.getByRole('link', { name: '#000000' })).toBeInTheDocument();
  });

  it('uses color.title for aria-label and title attribute when present', () => {
    render(<ColorOption color={{ ...baseColor, title: 'Black' }} active={false} />);
    const link = screen.getByRole('link', { name: 'Black' });
    expect(link).toHaveAttribute('title', 'Black');
  });

  it('applies the unavailable class only when isAvailable === false', () => {
    const { rerender } = render(
      <ColorOption color={{ ...baseColor, isAvailable: false }} active={false} />,
    );
    expect(screen.getByRole('link')).toHaveClass('unavailable');

    rerender(<ColorOption color={{ ...baseColor, isAvailable: true }} active={false} />);
    expect(screen.getByRole('link')).not.toHaveClass('unavailable');

    rerender(<ColorOption color={baseColor} active={false} />);
    expect(screen.getByRole('link')).not.toHaveClass('unavailable');
  });

  it('keeps the swatch clickable (a real link) when unavailable', () => {
    render(<ColorOption color={{ ...baseColor, isAvailable: false }} active={false} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/product-1-black');
  });
});
