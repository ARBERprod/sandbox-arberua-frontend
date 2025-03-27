import { renderComponent } from '@/shared/lib/test/renderComponent';
import { Typography } from '@/shared/ui/Typography/Typography';
import { screen } from '@testing-library/dom';

describe('Typography', () => {
  it('Should render typography component with text in children', () => {
    renderComponent(<Typography>Hello world</Typography>);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it('Should be body-1 variant by default', () => {
    renderComponent(<Typography>Hello world</Typography>);

    expect(screen.getByText(/hello world/i)).toHaveClass('body-1');
  });

  it('Should change variant', () => {
    renderComponent(<Typography variant="title-2">Hello world</Typography>);
    expect(screen.getByText(/hello world/i)).toHaveClass('title-2');
  });
});
