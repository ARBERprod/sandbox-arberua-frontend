import cn from 'classnames';
import styles from './CardHoverImage.module.scss';
import { AppImage } from '@/shared/ui/AppImage';
import { ImageType } from '@/shared/types/common';

interface CardHoverImageProps {
  image: ImageType;
  hoverImage?: ImageType;
  classes?: {
    image?: string;
    hoverImage?: string;
  }
  title: string;
}

export const CardHoverImage = ({
  image,
  hoverImage,
  title,
  classes,
}: CardHoverImageProps) => (
  <>
    <AppImage
      className={cn(styles.primaryImage, classes?.image)}
      src={image}
      unoptimized
      alt={title}
      lazy
    />
    {hoverImage
      && (
        <AppImage
          className={cn(styles.hoverImage, classes?.hoverImage)}
          src={hoverImage}
          unoptimized
          alt={title}
          lazy
        />
      )}
  </>
);
