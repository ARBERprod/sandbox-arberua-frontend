import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { AccordionList } from './AccordionList';
import { IAccordionItem } from '../AccordionItem';

jest.mock('@/shared/ui/Svg', () => ({
  Svg: ({ className }: { className?: string }) => <span className={className} data-testid="svg-mock" />,
}));

const ITEMS:IAccordionItem[] = [
  {
    title: 'title1',
    content: 'content2',
  },
  {
    title: 'title2',
    content: 'content2',
  },
];

describe('AccordionList', () => {
  it('Should render Accordion List component', () => {
    render(<AccordionList items={ITEMS} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('Should add additional className to root block', () => {
    const CLASS_NAME = 'customClass';
    render(<AccordionList items={ITEMS} className={CLASS_NAME} />);

    expect(screen.getByRole('list')).toHaveClass(CLASS_NAME);
  });
  it('Should render children if passed children', () => {
    render(
      <AccordionList>
        <div role="figure" />
      </AccordionList>,
    );

    expect(screen.getByRole('figure')).toBeInTheDocument();
  });
  it('Should render list of accordion items', () => {
    render(<AccordionList items={ITEMS} />);
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(2);
  });
  it('Should render nothing if no children or items props passed', () => {
    const { container } = render(<AccordionList />);

    expect(container).toBeEmptyDOMElement();
  });
  it('Should render nothing passed items with 0 length', () => {
    const { container } = render(<AccordionList items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
