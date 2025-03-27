import { renderComponent } from '@/shared/lib/test/renderComponent';
import { Counter } from '@/shared/ui/Counter/Counter';
import { fireEvent, screen } from '@testing-library/dom';

describe('Counter', () => {
  beforeEach(() => {
    renderComponent(<Counter title="My counter" initValue={10} />);
  });

  it('Should render counter', () => {
    const titleEl = screen.getByTestId('Counter.title');
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent('My counter');
    const counter = screen.getByTestId('Counter.count');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent('10');
  });

  it('Should increment counter', async () => {
    const incrementButton = screen.getByTestId('Counter.incr');
    expect(screen.getByTestId('Counter')).toBeInTheDocument();
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('Counter.count')).toHaveTextContent('11');
  });

  it('Should decrement counter', async () => {
    const decrementButton = screen.getByTestId('Counter.decr');
    expect(screen.getByTestId('Counter')).toBeInTheDocument();
    fireEvent.click(decrementButton);
    expect(screen.getByTestId('Counter.count')).toHaveTextContent('9');
  });
});
