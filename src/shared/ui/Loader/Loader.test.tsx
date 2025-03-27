import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('should render load', () => {
    render(<Loader />);
  });
  it('should add additional className', () => {
    render(<Loader className="class" />);

    const el = screen.getByTestId('loader');

    expect(el).toHaveClass('class');
  });
  it('should add centered className if centered prop passed', () => {
    render(<Loader className="class centered" />);

    const el = screen.getByTestId('loader');

    expect(el).toHaveClass('class centered');
  });
  it('should set custom size', () => {
    render(<Loader size={120} />);

    const el = screen.getByTestId('loader');

    expect(el).toHaveStyle('width: 120px; height: 120px;');
  });
  it('should have a default size of 90px for Loader component', () => {
    render(<Loader />);

    const el = screen.getByTestId('loader');

    expect(el).toHaveStyle('width: 90px; height: 90px;');
  });
});
