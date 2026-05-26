import type { ReactNode } from 'react';
import { act, render, screen } from '@testing-library/react';
import { PromotionCard } from '../PromotionCard';
import type { PromotionsItem } from '../../../model/types/Promotions';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const dict: Record<string, string> = {
        end_of_promotion: 'До конца акции',
        promotion_ended: 'Акция завершена',
        day: 'день',
        days: 'дня',
        days2: 'дней',
        hour: 'час',
        hours: 'часа',
        hours2: 'часов',
        minute: 'минута',
        minutes: 'минуты',
        minutes2: 'минут',
      };
      return dict[key] ?? key;
    },
  }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

jest.mock('@/shared/ui/AppImage', () => ({
  AppImage: ({ alt }: { alt: string }) => <span data-testid="AppImage">{alt}</span>,
}));

jest.mock('@/shared/ui/Typography', () => ({
  Typography: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

const makePromotion = (overrides: Partial<PromotionsItem> = {}): PromotionsItem => ({
  title: 'Promo',
  picture: 'p.jpg',
  start_date: '2026-05-28T22:00:00+03:00',
  end_date: '2026-05-29T10:00:00+03:00',
  is_started: true,
  has_seconds_until_end: 12 * 60 * 60,
  show_pdp_timer: false,
  ...overrides,
});

describe('PromotionCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-28T23:00:00+03:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('countdown decreases by at least one minute after two minutes of fake time', () => {
    const promotion = makePromotion({ has_seconds_until_end: 12 * 60 * 60 });
    render(<PromotionCard promotion={promotion} />);

    const initial = screen.getByText(/До конца акции/).textContent ?? '';

    act(() => {
      jest.advanceTimersByTime(2 * 60 * 1000 + 500);
    });

    const after = screen.getByText(/До конца акции/).textContent ?? '';
    expect(after).not.toBe(initial);
  });

  it('renders the "ended" label once the deadline has passed', () => {
    const promotion = makePromotion({ has_seconds_until_end: 0 });
    render(<PromotionCard promotion={promotion} />);

    expect(screen.getByText('Акция завершена')).toBeInTheDocument();
  });
});
