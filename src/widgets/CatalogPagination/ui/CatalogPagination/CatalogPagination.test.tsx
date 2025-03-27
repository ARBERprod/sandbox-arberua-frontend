import { screen } from '@testing-library/dom';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { CatalogPagination } from '@/widgets/CatalogPagination';
import { Pagination } from '@/shared/ui/Pagination';
import userEvent from '@testing-library/user-event';

jest.mock('@/shared/ui/Pagination', () => ({
  Pagination: jest.fn(() => null),
}));

const mockedPagination = jest.mocked(Pagination);
const getMoreButton = () => screen.queryByText(/показати ще/i);
const noop = () => {
};

describe('CatalogPagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFetching', () => {
    it('Should show loader', () => {
      renderComponent(<CatalogPagination
        isFetching
        totalPages={10}
        currentPage={1}
        onButtonClick={noop}
        onPageChange={noop}
      />);
      expect(screen.getByTestId('loader'))
        .toBeInTheDocument();
    });
    it('Should not render button', () => {
      renderComponent(<CatalogPagination
        isFetching
        totalPages={10}
        currentPage={1}
        onButtonClick={noop}
        onPageChange={noop}
      />);

      expect(getMoreButton())
        .not
        .toBeInTheDocument();
    });
  });

  it('Should render Pagination component with correct props', () => {
    const TOTAL_PAGES = 10;
    const CURRENT_PAGE = 3;
    const onPageChange = jest.fn();
    renderComponent(<CatalogPagination
      isFetching={false}
      totalPages={TOTAL_PAGES}
      currentPage={CURRENT_PAGE}
      onButtonClick={noop}
      onPageChange={onPageChange}
    />);

    expect(mockedPagination)
      .toBeCalledWith(expect.objectContaining({
        pageCount: TOTAL_PAGES,
        onPageChange,
        activePage: CURRENT_PAGE,
      }), {});
  });

  it('Should not render button if "showMoreButton" = false', () => {
    renderComponent(<CatalogPagination
      showMoreBtn={false}
      isFetching={false}
      totalPages={10}
      currentPage={1}
      onButtonClick={noop}
      onPageChange={noop}
    />);

    expect(getMoreButton())
      .not
      .toBeInTheDocument();
  });
  it('Should not render more button if current page is last', () => {
    renderComponent(<CatalogPagination
      showMoreBtn={false}
      isFetching={false}
      totalPages={10}
      currentPage={10}
      onButtonClick={noop}
      onPageChange={noop}
    />);

    expect(getMoreButton())
      .not
      .toBeInTheDocument();
  });
  it('Should render more button if "showMoreButton" = true and there is next page', () => {
    renderComponent(<CatalogPagination
      showMoreBtn
      isFetching={false}
      totalPages={10}
      currentPage={9}
      onButtonClick={noop}
      onPageChange={noop}
    />);

    expect(getMoreButton()).toBeInTheDocument();
  });
  it('Should call button click handler', () => {
    const onButtonClick = jest.fn();
    renderComponent(<CatalogPagination
      showMoreBtn
      isFetching={false}
      totalPages={10}
      currentPage={9}
      onButtonClick={onButtonClick}
      onPageChange={noop}
    />);

    const button = screen.getByText(/показати ще/i);
    userEvent.click(button);

    expect(onButtonClick).toBeCalled();
  });
});
