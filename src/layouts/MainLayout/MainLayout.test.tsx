import { renderComponent } from '@/shared/lib/test/renderComponent';
import { MainLayout, DynamicMeta } from './MainLayout';

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/widgets/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

jest.mock('@/widgets/Footer', () => ({
  Footer: () => <div data-testid="footer" />,
}));

const DEFAULT_TITLE = 'Інтернет-магазин українського бренду ARBER - Купити Чоловічий та Жіночий одяг, взуття, аксесуари';
const DEFAULT_DESCRIPTION = 'Офіційний сайт українського бренду ARBER – стильний чоловічий і жіночий одяг, взуття та аксесуари. Сезонні знижки, вигідні акції та великий асортимент для створення вашого ідеального образу.';

const getTitle = () => document.querySelector('title')?.textContent;
const getDescription = () => document.querySelector('meta[name="description"]')?.getAttribute('content');

const renderLayout = (dynamicMeta?: DynamicMeta) => renderComponent(
  <MainLayout dynamicMeta={dynamicMeta}>
    <div data-testid="content" />
  </MainLayout>,
);

describe('MainLayout meta tags', () => {
  describe('title with DynamicMeta', () => {
    it('builds title with textAfterTitle', () => {
      renderLayout({
        title: 'Сорочка чоловіча',
        textAfterTitle: 'Купити онлайн',
        description: 'Опис товару',
      });

      expect(getTitle()).toBe('Сорочка чоловіча | Купити онлайн');
    });

    it('builds title without textAfterTitle when not provided', () => {
      renderLayout({
        title: 'Сорочка чоловіча',
        description: 'Опис товару',
      });

      expect(getTitle()).toBe('Сорочка чоловіча');
    });

    it('builds title with page number', () => {
      renderLayout({
        title: 'Каталог',
        textAfterTitle: 'ARBER',
        description: 'Опис',
        page: '2',
      });

      const title = getTitle();
      expect(title).toContain('Каталог');
      expect(title).toContain('| ARBER');
      expect(title).toContain('2');
    });

    it('falls back to default title when dynamicMeta.title is empty', () => {
      renderLayout({
        title: '',
        description: 'Опис товару',
      });

      expect(getTitle()).toBe(DEFAULT_TITLE);
    });
  });

  describe('description with DynamicMeta', () => {
    it('concatenates all description segments without extra spaces', () => {
      renderLayout({
        title: 'Сорочка',
        description: 'Якісна сорочка',
        textBeforeDescription: 'Замовляйте',
        textAfterDescription: 'ARBER. Швидка доставка.',
        descriptionUsesTitle: 'Сорочка',
        textEndDescription: 'ARBER за вигідною ціною!',
      });

      expect(getDescription()).toBe(
        'Замовляйте Якісна сорочка ARBER. Швидка доставка. Сорочка ARBER за вигідною ціною!',
      );
    });

    it('skips empty optional segments without double spaces', () => {
      renderLayout({
        title: 'Сорочка',
        description: 'Якісна сорочка',
        textBeforeDescription: 'Замовляйте',
        textAfterDescription: 'ARBER.',
      });

      const content = getDescription() || '';
      expect(content).toBe('Замовляйте Якісна сорочка ARBER.');
      expect(content).not.toMatch(/  /);
    });

    it('falls back to default when description is empty string', () => {
      renderLayout({
        title: 'Сорочка',
        description: '',
        textBeforeDescription: 'Замовляйте',
        textAfterDescription: 'ARBER.',
      });

      expect(getDescription()).toBe(DEFAULT_DESCRIPTION);
    });

    it('falls back to default when no dynamicMeta provided', () => {
      renderLayout();

      expect(getDescription()).toBe(DEFAULT_DESCRIPTION);
    });
  });

  describe('product page SEO edge cases', () => {
    it('handles product with empty title — title fallback, description still works', () => {
      renderLayout({
        title: '',
        textAfterTitle: 'Купити онлайн',
        description: 'Опис товару',
        descriptionUsesTitle: '',
        textBeforeDescription: 'Замовляйте',
        textAfterDescription: 'ARBER. Швидка доставка.',
        textEndDescription: 'ARBER за вигідною ціною!',
      });

      expect(getTitle()).toBe(DEFAULT_TITLE);

      expect(getDescription()).toBe(
        'Замовляйте Опис товару ARBER. Швидка доставка. ARBER за вигідною ціною!',
      );
    });

    it('handles product with empty description — no garbage meta', () => {
      renderLayout({
        title: 'Сорочка',
        textAfterTitle: 'Купити онлайн',
        description: '',
        textBeforeDescription: 'Замовляйте',
        textAfterDescription: 'ARBER. Швидка доставка.',
        descriptionUsesTitle: 'Сорочка',
        textEndDescription: 'ARBER за вигідною ціною!',
      });

      expect(getDescription()).toBe(DEFAULT_DESCRIPTION);
    });
  });
});
