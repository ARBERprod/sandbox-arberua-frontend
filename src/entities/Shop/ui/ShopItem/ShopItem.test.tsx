import { screen } from '@testing-library/dom';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { Shop } from '../../model/types';
import { ShopItem } from './ShopItem';

const shop: Shop = {
  id: 's1',
  title: 'ARBER Хрещатик',
  pickup_phone: '+380000000000',
  pickup_address: 'вул. Хрещатик, 1',
  pickup_time: 'Пн-Нд 10:00-21:00',
  latitude: 50.45,
  longitude: 30.52,
  url: '/stores/s1',
};

describe('ShopItem', () => {
  it('renders address, title and schedule', () => {
    renderComponent(<ShopItem shop={shop} />);

    expect(screen.getByText('вул. Хрещатик, 1')).toBeInTheDocument();
    expect(screen.getByText('ARBER Хрещатик')).toBeInTheDocument();
    expect(screen.getByText('Пн-Нд 10:00-21:00')).toBeInTheDocument();
  });

  it('renders the navigation arrow-link by default', () => {
    renderComponent(<ShopItem shop={shop} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/stores/s1');
  });

  it('hides the navigation arrow-link when hideLink is set (checkout picker is not navigable)', () => {
    renderComponent(<ShopItem shop={shop} hideLink />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
