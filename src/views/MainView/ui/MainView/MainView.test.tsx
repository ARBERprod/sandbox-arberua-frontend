import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { MainView } from './MainView';

jest.mock('@/shared/lib/analytics/esputnik', () => ({
  sendEsEvent: jest.fn(),
}));

jest.mock('../../lib/useMainPageData', () => ({
  useMainPageData: jest.fn(() => ({ isLoading: true, errors: {} })),
}));

describe('MainView eSputnik event', () => {
  beforeEach(() => jest.clearAllMocks());

  it('fires the MainPage web-tracking event on mount', () => {
    renderComponent(<MainView />);

    expect(sendEsEvent).toHaveBeenCalledWith('MainPage');
  });
});
