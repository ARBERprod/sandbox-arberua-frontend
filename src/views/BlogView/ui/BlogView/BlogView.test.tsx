import { renderComponent } from '@/shared/lib/test/renderComponent';
import { BlogView } from './BlogView';
import {
  BlogCategories, PostsGrid, getMockPosts, useGetPostsQuery,
} from '@/entities/Blog';
import { CatalogPagination } from '@/widgets/CatalogPagination';
import { screen } from '@testing-library/dom';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';

const POSTS_LENGTH = 10;
const TOTAL_PAGES = 5;
const CURRENT_PAGE = 5;
const MOCK_POSTS = getMockPosts(POSTS_LENGTH);
const MOCK_CATEGORIES = [
  {
    id: '1',
    slug: 'slug_1',
    title: 'Category 1',
    url: 'url_1',
  },
];
const MOCK_BREADCRUMBS = [
  {
    title: 'Main',
    url: '/',
  }, {
    title: 'blog', url: '/blog',
  }];

const mockedCatalogPagination = jest.mocked(CatalogPagination);
const mockedBlogCategories = jest.mocked(BlogCategories);
const mockedPostsGrid = jest.mocked(PostsGrid);
const mockedPageBreadcrumbs = jest.mocked(PageBreadcrumbs);
const mockedUseGetPostsQuery = jest.mocked(useGetPostsQuery);

jest.mock('@/shared/ui/Breadcrumps', () => ({
  PageBreadcrumbs: jest.fn(() => null),
}));

jest.mock('@/widgets/CatalogPagination', () => ({
  CatalogPagination: jest.fn(() => null),
  usePaginate: jest.fn(() => ({
    page: 1,
    pageChangeHandler: jest.fn(),
    moreBtnClickHandler: jest.fn(),
    merge: false,
  })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {},
  })),
}));

jest.mock('@/entities/Blog', () => ({
  ...jest.requireActual('@/entities/Blog'),
  BlogCategories: jest.fn(),
  PostsGrid: jest.fn(),
  useGetPostsQuery: jest.fn(() => ({
    data: {
      meta: {
        page: {
          current: CURRENT_PAGE,
          total: TOTAL_PAGES,
        },
        total: 0,
        limit: 0,
      },
      data: {
        posts: MOCK_POSTS,
        breadcrumbs: MOCK_BREADCRUMBS,
        categories: MOCK_CATEGORIES,
      },
      success: true,
    },
    isLoading: false,
    isError: false,
    isFetching: false,
  })),
}));

describe('BlogView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render posts grid', () => {
    renderComponent(<BlogView />);

    expect(mockedPostsGrid).toBeCalledWith(expect.objectContaining({ articles: MOCK_POSTS }), {});
  });
  it('Should render categories', () => {
    renderComponent(<BlogView />);

    expect(mockedBlogCategories).toBeCalledWith(expect.objectContaining({ categories: MOCK_CATEGORIES }), {});
  });
  it('Should render breadcrumbs', () => {
    renderComponent(<BlogView />);

    expect(mockedPageBreadcrumbs).toBeCalledWith(expect.objectContaining({ breadcrumbs: MOCK_BREADCRUMBS }), {});
  });
  it('Should show page loader, when is loading', () => {
    mockedUseGetPostsQuery.mockImplementationOnce(() => ({
      isLoading: true,
    } as any));
    renderComponent(<BlogView />);

    expect(screen.getByTestId('page-loader')).toBeInTheDocument();
  });
  it('Should show error message, when is error', () => {
    mockedUseGetPostsQuery.mockImplementationOnce(() => ({
      isError: true,
    } as any));
    renderComponent(<BlogView />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
  it('Should render correct count of pages', () => {
    renderComponent(<BlogView />);

    expect(mockedCatalogPagination).toBeCalledWith(expect.objectContaining({ totalPages: TOTAL_PAGES }), {});
  });

  it('Should highlight correct page', () => {
    renderComponent(<BlogView />);

    expect(mockedCatalogPagination).toBeCalledWith(expect.objectContaining({ currentPage: CURRENT_PAGE }), {});
  });
});
