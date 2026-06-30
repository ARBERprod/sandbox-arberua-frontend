import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { NotFoundView } from './NotFoundView';

jest.mock('@/shared/lib/analytics/esputnik', () => ({
  sendEsEvent: jest.fn(),
}));

describe('NotFoundView eSputnik event', () => {
  beforeEach(() => jest.clearAllMocks());

  it('fires the NotFound web-tracking event on mount', () => {
    renderComponent(<NotFoundView />);

    expect(sendEsEvent).toHaveBeenCalledWith('NotFound');
  });
});
