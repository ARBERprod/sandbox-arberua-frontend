import { screen } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { useGetCollaborationsQuery } from '@/entities/Collaboration';
import type { Collaboration } from '@/entities/Collaboration';
import type { MenuLink } from '../../../model/types';
import { HeaderMenuMain } from './HeaderMenuMain';

jest.mock('@/entities/Collaboration', () => ({
  useGetCollaborationsQuery: jest.fn(),
}));

// The real list pulls in the menu context and the link item; the captions are what this suite is
// about, so the items are rendered flat.
jest.mock('../HeaderMenuListItems', () => ({
  HeaderMenuListItems: ({ items }: { items: MenuLink[] | false }) => (
    <ul>
      {(items || []).map((item) => (
        <li key={item.id ?? item.title}>{item.title}</li>
      ))}
    </ul>
  ),
}));

const mockedQuery = jest.mocked(useGetCollaborationsQuery);

const collaboration = (label: string | null): Collaboration => ({
  id: 'c-1',
  title: 'Partner',
  label,
  url: '/ru/collaboration/c-1',
  logo: null,
});

const renderMenu = (item: Collaboration) => {
  // Only `data` is read here; the rest of the RTK Query result would be dead weight in the stub.
  mockedQuery.mockReturnValue(
    { data: { collaborations: [item] } } as unknown as ReturnType<typeof useGetCollaborationsQuery>,
  );

  renderComponent(<HeaderMenuMain />);
};

describe('HeaderMenuMain collaboration item', () => {
  it('captions the item with the sticker text', () => {
    renderMenu(collaboration('ARBER × Partner'));

    expect(screen.getByText('ARBER × Partner')).toBeInTheDocument();
  });

  it('falls back to the collaboration name when the sticker is empty', () => {
    renderMenu(collaboration(null));

    expect(screen.getByText('Partner')).toBeInTheDocument();
  });
});
