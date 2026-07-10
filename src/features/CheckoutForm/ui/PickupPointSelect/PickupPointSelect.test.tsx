import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import type { Shop } from '@/entities/Shop';
import { PickupPointSelect } from './PickupPointSelect';

const points: Shop[] = [
  {
    id: 'store-1',
    title: 'ARBER Хрещатик',
    pickup_phone: '+380111111111',
    pickup_address: 'вул. Хрещатик, 1',
    pickup_time: 'Пн-Нд 10:00-21:00',
    latitude: 50.45,
    longitude: 30.52,
    url: '/stores/store-1',
  },
  {
    id: 'store-2',
    title: 'ARBER Оболонь',
    pickup_phone: '+380222222222',
    pickup_address: 'просп. Оболонський, 2',
    pickup_time: 'Пн-Нд 09:00-20:00',
    latitude: 50.51,
    longitude: 30.49,
    url: '/stores/store-2',
  },
];

describe('PickupPointSelect', () => {
  it('renders address, title and schedule for every pickup point', () => {
    renderComponent(
      <PickupPointSelect name="warehouse_id" value="" points={points} onChange={jest.fn()} />,
    );

    expect(screen.getByText('ARBER Хрещатик')).toBeInTheDocument();
    expect(screen.getByText('вул. Хрещатик, 1')).toBeInTheDocument();
    expect(screen.getByText('Пн-Нд 10:00-21:00')).toBeInTheDocument();
    expect(screen.getByText('ARBER Оболонь')).toBeInTheDocument();
    expect(screen.getByText('просп. Оболонський, 2')).toBeInTheDocument();
  });

  it('does not render store navigation links (the checkout picker is not navigable)', () => {
    renderComponent(
      <PickupPointSelect name="warehouse_id" value="" points={points} onChange={jest.fn()} />,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('writes the chosen point id into the field on selection', async () => {
    const onChange = jest.fn();
    renderComponent(
      <PickupPointSelect name="warehouse_id" value="" points={points} onChange={onChange} />,
    );

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[1]);

    expect(onChange).toHaveBeenCalledWith('warehouse_id', 'store-2');
  });

  it('marks the currently selected point as checked', () => {
    renderComponent(
      <PickupPointSelect name="warehouse_id" value="store-2" points={points} onChange={jest.fn()} />,
    );

    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
  });
});
