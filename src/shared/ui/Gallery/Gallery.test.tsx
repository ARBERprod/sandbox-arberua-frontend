import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { Gallery } from '@/shared/ui/Gallery/Gallery';
import GalleryImage1 from '@/shared/assets/images/totallook/gallery/1.jpg';
import GalleryImage2 from '@/shared/assets/images/totallook/gallery/2.jpg';
import GalleryImage3 from '@/shared/assets/images/totallook/gallery/3.jpg';
import GalleryImage4 from '@/shared/assets/images/totallook/gallery/4.jpg';
import GalleryImage5 from '@/shared/assets/images/totallook/gallery/5.jpg';
import GalleryImage6 from '@/shared/assets/images/totallook/gallery/6.jpg';

const gallery = [
  GalleryImage1,
  GalleryImage2,
  GalleryImage3,
  GalleryImage4,
  GalleryImage5,
  GalleryImage6,
];

describe('Gallery', () => {
  it('Should render gallery', () => {
    renderComponent(<Gallery images={gallery} />);
    expect(screen.getByTestId('Gallery')).toBeInTheDocument();
  });

  it('Should render "more button" if images length > 4', () => {
    renderComponent(<Gallery images={gallery} />);
    const moreBtn = screen.getByText(/Більше фото/);

    expect(moreBtn).toBeInTheDocument();
  });

  it('Should not render "more button" if images length <= 4', () => {
    renderComponent(<Gallery images={gallery.slice(0, 4)} />);
    const moreBtn = screen.queryByText(/Більше фото/);

    expect(moreBtn).not.toBeInTheDocument();
  });

  it('Should open fullscreen slider by more button click', async () => {
    renderComponent(<Gallery images={gallery} />);
    const moreBtn = screen.getByText(/Більше фото/);
    expect(screen.queryByTestId('FullscreenThumbsSlider')).not.toBeInTheDocument();
    await userEvent.click(moreBtn);

    await waitFor(() => {
      expect(screen.getByTestId('FullscreenThumbsSlider')).toBeInTheDocument();
    });
  });

  it('Should open fullscreen slider by image click', async () => {
    renderComponent(<Gallery images={gallery} />);
    expect(screen.queryByTestId('FullscreenThumbsSlider')).not.toBeInTheDocument();
    const images = screen.getAllByTestId('GalleryDesktopGrid.ImageButton');

    await userEvent.click(images[0]);

    await waitFor(() => {
      expect(screen.getByTestId('FullscreenThumbsSlider')).toBeInTheDocument();
    });
  });

  it('Should set active slide by click image', async () => {
    renderComponent(<Gallery images={gallery} />);
    expect(screen.queryByTestId('FullscreenThumbsSlider')).not.toBeInTheDocument();
    const images = screen.getAllByTestId('GalleryDesktopGrid.ImageButton');

    await userEvent.click(images[1]);

    await waitFor(() => {
      expect(screen.getByTestId('FullscreenThumbsSlider')).toBeInTheDocument();
      expect(screen.getByTestId('FullscreenThumbsSlider.activeSlide')).toHaveTextContent('1');
    });
  });
});
