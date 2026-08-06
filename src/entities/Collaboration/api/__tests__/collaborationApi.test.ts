import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { makeStore } from '@/shared/config/store/makeStore';
import { getMockProduct } from '@/entities/Product/lib/getMockProducts';
import type { Product } from '@/entities/Product';
import { getCollaboration, getCollaborations } from '../collaborationApi';
import type { CollaborationsDto, CollaborationSingleDto } from '../types';

const collaborationsDto: CollaborationsDto = {
  success: true,
  data: {
    collaborations: [{
      id: 'c-1',
      title: 'Partner',
      label: 'ARBER × Partner',
      // Locale prefix comes from the backend on ru/en and must reach href untouched.
      url: '/ru/collaboration/c-1',
      logo: 'https://img.arber.ua/collaborations/logo.png',
    }],
  },
};

const singleDto = (id: string, products: Product[], page = 1): CollaborationSingleDto => ({
  success: true,
  data: {
    collaboration: {
      id,
      title: 'Partner',
      label: 'ARBER × Partner',
      description: '<p>text</p>',
      logo: null,
      banner_horizontal: null,
      banner_vertical: null,
      url: `/collaboration/${id}`,
    },
    filter: [],
    sorter: [{ title: 'За замовчуванням', value: null }],
    products,
    breadcrumbs: [
      { title: 'Головна', url: '/' },
      { title: 'Partner', url: `/collaboration/${id}` },
    ],
  },
  meta: {
    page: { current: page, total: 3 },
    limit: 12,
    total: 30,
  },
});

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('collaborationApi.getCollaborations', () => {
  it('hits /collaborations and unwraps the envelope to a flat payload', async () => {
    let path: string | undefined;
    server.use(rest.get('*/collaborations', (req, res, ctx) => {
      path = req.url.pathname;
      return res(ctx.json(collaborationsDto));
    }));

    const store = makeStore();
    const result = await store.dispatch(getCollaborations.initiate()).unwrap();

    expect(path?.endsWith('/collaborations')).toBe(true);
    expect(result).toEqual(collaborationsDto.data);
  });

  it('leaves the locale prefix in url as it came from the API', async () => {
    server.use(rest.get('*/collaborations', (_req, res, ctx) => res(ctx.json(collaborationsDto))));

    const store = makeStore();
    const result = await store.dispatch(getCollaborations.initiate()).unwrap();

    expect(result.collaborations[0].url).toBe('/ru/collaboration/c-1');
  });

  // Guards the configured timeout: without it the request below would simply succeed late,
  // and on SSR a hung API would hold every page of the site.
  it('gives up on a hung API instead of waiting for the response', async () => {
    server.use(rest.get('*/collaborations', (_req, res, ctx) => res(
      ctx.delay(3000),
      ctx.json(collaborationsDto),
    )));

    const store = makeStore();
    const result = await store.dispatch(getCollaborations.initiate());

    expect(result.isError).toBe(true);
    // RTK aborts the whole thunk (`api.abort()`), so the timeout surfaces as AbortError
    // rather than as a fetchBaseQuery TIMEOUT_ERROR envelope.
    expect((result.error as { name?: string })?.name).toBe('AbortError');
  }, 10000);
});

describe('collaborationApi.getCollaboration query string', () => {
  const captureSearch = () => {
    const captured = { value: '' };
    server.use(rest.get('*/collaborations/:id', (req, res, ctx) => {
      captured.value = req.url.search;
      return res(ctx.json(singleDto('c-1', [])));
    }));
    return captured;
  };

  // An empty filter string used to leave a dangling separator behind — `?&sort=`, and `?&` with
  // nothing selected at all.
  it('sends no query at all when nothing is selected', async () => {
    const search = captureSearch();

    await makeStore().dispatch(getCollaboration.initiate({
      collaboration_id: 'c-1',
      filters: '',
      sort: '',
    })).unwrap();

    expect(search.value).toBe('');
  });

  it('opens the query with sort when there are no filters', async () => {
    const search = captureSearch();

    await makeStore().dispatch(getCollaboration.initiate({
      collaboration_id: 'c-1',
      filters: '',
      sort: 'price_asc',
      page: 2,
    })).unwrap();

    expect(search.value).toBe('?sort=price_asc&page=2');
  });

  // The filter string is assembled by FilterUtils and joins values with commas: it has to reach
  // the API exactly as it is, commas included.
  it('passes the filter string through untouched', async () => {
    const search = captureSearch();

    await makeStore().dispatch(getCollaboration.initiate({
      collaboration_id: 'c-1',
      filters: 'color=red,blue&size=m',
      sort: 'price_asc',
    })).unwrap();

    expect(search.value).toBe('?color=red,blue&size=m&sort=price_asc');
  });
});

describe('collaborationApi.getCollaboration', () => {
  it('keeps the raw envelope so that meta.page stays reachable', async () => {
    const products = [getMockProduct()];
    server.use(rest.get('*/collaborations/:id', (_req, res, ctx) => res(
      ctx.json(singleDto('c-1', products)),
    )));

    const store = makeStore();
    const result = await store.dispatch(getCollaboration.initiate({ collaboration_id: 'c-1' })).unwrap();

    expect(result.data.collaboration.id).toBe('c-1');
    expect(result.data.products).toHaveLength(1);
    expect(result.meta.page).toEqual({ current: 1, total: 3 });
  });

  it('refetches when collaboration_id changes despite the shared cache key', async () => {
    server.use(rest.get('*/collaborations/:id', (req, res, ctx) => {
      const id = req.params.id as string;
      return res(ctx.json(singleDto(id, [getMockProduct({ id: `product-of-${id}` })])));
    }));

    const store = makeStore();
    await store.dispatch(getCollaboration.initiate({ collaboration_id: 'c-1' })).unwrap();
    const second = await store.dispatch(getCollaboration.initiate({ collaboration_id: 'c-2' })).unwrap();

    expect(second.data.collaboration.id).toBe('c-2');
    expect(second.data.products[0].id).toBe('product-of-c-2');
  });

  it('appends the next page products when merge is requested', async () => {
    server.use(rest.get('*/collaborations/:id', (req, res, ctx) => {
      const page = Number(req.url.searchParams.get('page') ?? 1);
      return res(ctx.json(singleDto('c-1', [getMockProduct({ id: `page-${page}` })], page)));
    }));

    const store = makeStore();
    await store.dispatch(getCollaboration.initiate({ collaboration_id: 'c-1', page: 1 })).unwrap();
    const merged = await store.dispatch(getCollaboration.initiate({
      collaboration_id: 'c-1',
      page: 2,
      merge: true,
    })).unwrap();

    expect(merged.data.products.map((product) => product.id)).toEqual(['page-1', 'page-2']);
    expect(merged.meta.page.current).toBe(2);
  });

  it('replaces the products when merge is not requested', async () => {
    server.use(rest.get('*/collaborations/:id', (req, res, ctx) => {
      const page = Number(req.url.searchParams.get('page') ?? 1);
      return res(ctx.json(singleDto('c-1', [getMockProduct({ id: `page-${page}` })], page)));
    }));

    const store = makeStore();
    await store.dispatch(getCollaboration.initiate({ collaboration_id: 'c-1', page: 1 })).unwrap();
    const second = await store.dispatch(getCollaboration.initiate({
      collaboration_id: 'c-1',
      page: 2,
    })).unwrap();

    expect(second.data.products.map((product) => product.id)).toEqual(['page-2']);
  });
});
