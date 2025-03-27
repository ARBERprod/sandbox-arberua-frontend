import { PageControlFactory, type PageControlFactoryProps } from './PageControlFactory';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const mockedSvg = jest.fn();

jest.mock('@/shared/ui/Svg', () => ({
  Svg: (props: any) => mockedSvg(props),
}));

const onPageChange = jest.fn();

const renderComponent = (props?: Partial<PageControlFactoryProps>) => render(<PageControlFactory
  type="page"
  page={1}
  href=""
  activePage={1}
  pageCount={10}
  onPageChange={onPageChange}
  {...props}
/>);

describe('PageControlFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call onPageChange by clicking', () => {
    renderComponent({ page: 2 });
    const pageButton = screen.getByRole('button', { name: '2' });
    userEvent.click(pageButton);

    expect(onPageChange)
      .toBeCalled();
    expect(onPageChange)
      .toBeCalledWith(2);
  });
  it('Should render link with correct href if href passed', () => {
    const HREF = '/some-url';
    renderComponent({ href: HREF });

    const link = screen.getByRole('link');

    expect(link)
      .toBeInTheDocument();
    expect(link)
      .toHaveAttribute('href', HREF);
  });

  describe('When type === jump', () => {
    it('Should render button with 3 dots text content (jump-next)', () => {
      renderComponent({ type: 'jump-next' });

      const button = screen.getByRole('button');
      expect(button)
        .toBeInTheDocument();
      expect(button)
        .toHaveTextContent('...');
    });

    it('Should render button with 3 dots text content (jump-prev)', () => {
      renderComponent({ type: 'jump-prev' });

      const button = screen.getByRole('button');
      expect(button)
        .toBeInTheDocument();
      expect(button)
        .toHaveTextContent('...');
    });
  });

  describe('When type === page', () => {
    it.each([
      {
        page: 1,
        text: '1',
      },
      {
        page: 3,
        text: '3',
      },
      {
        page: 4,
        text: '4',
      },
    ])('Should render button with text of page number', ({ page, text }) => {
      renderComponent({ page, type: 'page' });

      const button = screen.getByRole('button');
      expect(button)
        .toBeInTheDocument();
      expect(button)
        .toHaveTextContent(text);
    });
    it('Should add active class, when page is active', () => {
      renderComponent({ page: 2, activePage: 2, type: 'page' });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('active');
    });
    it('Should not call onPageChange if current page is active', () => {
      renderComponent({ page: 2, activePage: 2, type: 'page' });

      const button = screen.getByRole('button');
      userEvent.click(button);

      expect(onPageChange).not.toBeCalled();
    });
  });

  describe('When type === next', () => {
    it('Should render button with next icon', () => {
      renderComponent({ type: 'next' });
      const button = screen.getByRole('button');

      expect(button).toHaveClass('ml-15');
      expect(mockedSvg).toBeCalled();
    });
    it('Should add disabled class, if current page is last', () => {
      renderComponent({ type: 'next', pageCount: 10, activePage: 10 });
      const button = screen.getByRole('button');

      expect(button).toHaveClass('disabled');
      expect(mockedSvg).toBeCalledWith(expect.objectContaining({ stroke: 'grey' }));
    });
  });

  describe('When type === prev', () => {
    it('Should render button with prev icon', () => {
      renderComponent({ type: 'prev' });
      const button = screen.getByRole('button');

      expect(button).toHaveClass('mr-15');
      expect(mockedSvg).toBeCalled();
    });
    it('Should add disabled class, if current first page', () => {
      renderComponent({ type: 'prev', activePage: 1, pageCount: 2 });
      const button = screen.getByRole('button');

      expect(button).toHaveClass('disabled');
      expect(mockedSvg).toBeCalledWith(expect.objectContaining({ stroke: 'grey' }));
    });
  });
});
