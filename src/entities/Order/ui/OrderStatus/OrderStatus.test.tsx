import { screen } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { OrderStatus } from './OrderStatus';
import { OrderStatusCircle } from './OrderStatusCircle';
import { ORDER_VALUE_MISSING } from '../../config/constants';

describe('OrderStatus', () => {
  it('renders the order number and the status title', () => {
    renderComponent(<OrderStatus orderId={49308} status={{ title: 'Новий' }} />);

    expect(screen.getByText('49308')).toBeInTheDocument();
    expect(screen.getByText('Новий')).toBeInTheDocument();
  });

  it('falls back to a placeholder when the backend blanked the status', () => {
    renderComponent(<OrderStatus orderId={49308} status={null} />);

    expect(screen.getByText(ORDER_VALUE_MISSING)).toBeInTheDocument();
    expect(screen.getByText('49308')).toBeInTheDocument();
  });
});

describe('OrderStatusCircle', () => {
  it('renders without an inline colour — the dot is coloured by CSS', () => {
    const { container } = renderComponent(<OrderStatusCircle />);
    const circle = container.querySelector('div[class*="circle"]');

    expect(circle).toBeInTheDocument();
    expect(circle).not.toHaveAttribute('style');
  });
});
