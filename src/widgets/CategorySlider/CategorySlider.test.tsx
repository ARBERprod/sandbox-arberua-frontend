import { Category, CategoryCircle, SubcategoryLabelSlide } from '@/entities/Category';
import { render } from '@testing-library/react';
import { CategorySlider, CategorySliderProps } from './CategorySlider';
import { screen } from '@testing-library/dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { CardView } from '@/shared/types/common';

interface CategoryItem {
  category: Category;
  onClick?: (category: Category) => void;
}

const onCategoryChange = jest.fn();

jest.mock('@/entities/Category', () => ({
  ...jest.requireActual('@/entities/Category'),
  CategoryCircle: jest.fn(),
  SubcategoryLabelSlide: jest.fn(),
}));

jest.mock('@/shared/ui/GridViewSwitcher', () => ({
  GridViewSwitcher: () => null,
}));

jest.mock('@/shared/ui/Svg', () => ({
  Svg: ({ className }: { className?: string }) => <span className={className} data-testid="svg-mock" />,
}));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const CATEGORIES: Category[] = [
  {
    id: '1',
    url: '/1',
    title: 'title 1',
  },
  {
    id: '2',
    url: '/2',
    title: 'title 2',
  },
  {
    id: '3',
    url: '/3',
    title: 'title 3',
  },
];

const mockedCategoryCircle = jest.mocked(CategoryCircle);
const mockedSubcategoryLabelSlide = jest.mocked(SubcategoryLabelSlide);

const renderComponent = (props?: Partial<CategorySliderProps>) => {
  render(<CategorySlider
    basePath="/"
    categories={CATEGORIES}
    category={null}
    isSubcategory={false}
    onCategoryChange={onCategoryChange}
    onViewChange={() => {}}
    view={CardView.NORMAL}
    filters={[]}
    {...props}
  />);
};

describe('CategorySlider', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSubcategoryLabelSlide.mockImplementation(({ onClick, category }: CategoryItem) => (
      <button onClick={() => onClick?.(category)}>subcategory label slide</button>
    ));
    mockedCategoryCircle.mockImplementation(({ onClick, category }: CategoryItem) => (
      <button onClick={() => onClick?.(category)}>category circle</button>
    ));
  });

  it('Should add additional className', () => {
    const CLASS_NAME = 'customClassName';
    renderComponent({ className: CLASS_NAME });

    expect(screen.getByTestId('CategorySlider')).toHaveClass(CLASS_NAME);
  });
  it('Should render category title, if category passed', () => {
    const CATEGORY: Category = {
      id: 'test',
      title: 'category title',
      url: '/',
    };
    renderComponent({ category: CATEGORY });

    expect(screen.getByText(CATEGORY.title)).toBeInTheDocument();
  });

  describe('when is not subcategory', () => {
    it('Should render slides', () => {
      renderComponent();

      const slides = screen.queryAllByText('subcategory label slide');
      expect(slides.length).toBeGreaterThan(0);
    });
    it('Should render correct count of slides', () => {
      renderComponent();

      expect(mockedSubcategoryLabelSlide).toBeCalledTimes(CATEGORIES.length);
    });
    it('Should call onCategoryChange callback by clicking on slide', () => {
      const CATEGORY = { id: 'test', title: 'category', url: '/' };
      const CATEGORIES = [
        CATEGORY,
      ];
      renderComponent({ categories: CATEGORIES });

      const categoryCircle = screen.getByText(/category/i);
      userEvent.click(categoryCircle);

      expect(onCategoryChange).toBeCalled();
      expect(onCategoryChange).toBeCalledWith(CATEGORY);
    });
  });

  describe('when is subcategory', () => {
    it('Should render subcategory labels', () => {
      renderComponent({ isSubcategory: true });

      const subCategoryLabelSlides = screen.queryAllByText('subcategory label slide');
      expect(subCategoryLabelSlides.length).toBeGreaterThan(0);
    });
    it('Should not render slider', () => {
      renderComponent({ isSubcategory: true });

      const categoryCircles = screen.queryAllByText('category circle');
      expect(categoryCircles.length).toBe(0);
    });
    it('Should render correct count of slides', () => {
      renderComponent({ isSubcategory: true });

      expect(mockedSubcategoryLabelSlide).toBeCalledTimes(CATEGORIES.length);
    });
    it('Should call onCategoryChange callback by clicking on label', () => {
      const CATEGORY = { id: 'test', title: 'category', url: '/' };
      const CATEGORIES = [
        CATEGORY,
      ];
      renderComponent({ isSubcategory: true, categories: CATEGORIES });

      const categorySlide = screen.getByText(/category/i);
      userEvent.click(categorySlide);

      expect(onCategoryChange).toBeCalled();
      expect(onCategoryChange).toBeCalledWith(CATEGORY);
    });
  });
});
