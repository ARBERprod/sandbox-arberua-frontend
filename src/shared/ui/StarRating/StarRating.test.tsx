import { renderComponent } from '@/shared/lib/test/renderComponent';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Rating } from 'react-simple-star-rating';

jest.mock('react-simple-star-rating', () => ({
  Rating: jest.fn(({ onClick }: any) => (
    <div role="presentation" onClick={onClick}>star icon</div>
  )),
}));

const mockedRating = jest.mocked(Rating);

describe('Star rating', () => {
  beforeEach(() => {
    mockedRating.mockClear();
  });

  it('Should render component', () => {
    renderComponent(<StarRating value={1} />);
    expect(screen.getByTestId('StarRating')).toBeInTheDocument();
  });

  it('Should set normal size by default', () => {
    renderComponent(<StarRating value={1} />);
    expect(screen.getByTestId('StarRating')).toBeInTheDocument();
    expect(screen.getByTestId('StarRating')).toHaveStyle({ '--height': '15px', '--gap': '2px' });
  });

  it('Should set large sizes by pass pass "large" size prop', () => {
    renderComponent(<StarRating value={1} size="large" />);
    expect(screen.getByTestId('StarRating')).toBeInTheDocument();
    expect(screen.getByTestId('StarRating')).toHaveStyle({ '--height': '28px', '--gap': '12px' });
  });
  it('Should render 3 stars if passed iconsCount prop "3"', () => {
    const iconsCount = 3;
    renderComponent(<StarRating value={1} iconsCount={iconsCount} />);
    const container = screen.getByTestId('StarRating');
    expect(container).toBeInTheDocument();
    expect(mockedRating).toHaveBeenCalledWith(expect.objectContaining({ iconsCount }), {});
  });
  it('Should call clickHandler, by clicking on star', async () => {
    const clickHandler = jest.fn();
    renderComponent(<StarRating value={1} onClick={clickHandler} />);

    const starComponent = screen.getByText(/star icon/);
    userEvent.click(starComponent);

    expect(clickHandler).toBeCalled();
  });
});
