import { renderComponent } from '@/shared/lib/test/renderComponent';
import { AccordionItem } from './AccordionItem';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const mockToggleFunction = jest.fn();

const mockUseAccordion = jest.fn(() => ({
  toggle: mockToggleFunction,
  isVisible: false,
}));

jest.mock('@/shared/lib/hooks/useAccordion', () => ({
  useAccordion: () => mockUseAccordion(),
}));

describe('AccordionItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render item with passed title', () => {
    const TITLE = 'title';
    renderComponent(<AccordionItem title={TITLE} />);

    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it('Should render string content if typeof of passed content - string', () => {
    const CONTENT = 'content';
    renderComponent(<AccordionItem title="title" content={CONTENT} />);
    const contentComponent = screen.getByText(CONTENT);

    expect(contentComponent).toBeInTheDocument();
    expect(contentComponent).toHaveClass('content');
    expect(contentComponent).toHaveClass('body-2');
  });
  it('Should render content in div, if ReactElement passed as content', () => {
    const CONTENT = <span>content</span>;
    renderComponent(<AccordionItem title="title" content={CONTENT} />);
    const contentBlock = screen.getByText(/content/);

    expect(contentBlock).toBeInTheDocument();
    expect(contentBlock.parentElement).toHaveClass('content');
  });
  it('Should render children as content, if passed children', () => {
    const Content = () => <span>content</span>;
    renderComponent(
      <AccordionItem title="title">
        <Content />
      </AccordionItem>,
    );
    const contentBlock = screen.getByText(/content/);

    expect(contentBlock).toBeInTheDocument();
    expect(contentBlock.parentElement).toHaveClass('content');
  });
  it('Should toggle accordion visibility by clicking head component', () => {
    renderComponent(<AccordionItem title="title" />);
    const head = screen.getByRole('presentation');

    expect(head).toBeInTheDocument();

    userEvent.click(head);

    expect(mockToggleFunction).toBeCalled();
  });
});
