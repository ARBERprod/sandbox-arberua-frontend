import { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import InnerImageZoom from 'react-inner-image-zoom';
import { Typography } from '@/shared/ui/Typography';
import { Svg } from '@/shared/ui/Svg';
import ArrowRightDownIcon from '@/shared/assets/icons/arrow-r-d.svg';
import { useTranslation } from 'next-i18next';
import { useGallery } from '../../lib/useGallery';
import styles from './GalleryDesktopGrid.module.scss';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

interface GalleryDesktopGridProps {
  className?: string;
}

export const GalleryDesktopGrid = memo(({ className }: GalleryDesktopGridProps) => {
  const {
    images,
    openGallery,
  } = useGallery();
  const { t } = useTranslation();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((oldKey) => oldKey + 1);
  }, [t]);

  return (
    <div data-testid="GalleryDesktopGrid" className={cn(styles.root, className)}>
      <div className={styles.grid}>
        {images.slice(0, 4)
          .map((image, index) => (
            <button
              data-testid="GalleryDesktopGrid.ImageButton"
              onClick={() => openGallery(index)}
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${renderKey}`}
              className={styles.item}
            >
              <div className={styles.imageWrap}>
                <InnerImageZoom
                  zoomPreload
                  className={styles.img}
                  src={image as string}
                  zoomSrc={image as string}
                  zoomScale={1.6}
                  zoomType="hover"
                />
              </div>
            </button>
          ))}
      </div>
      {images.length > 4
            && (
              <Typography as="button" variant="body-2" className={styles.btn} onClick={() => openGallery(0)}>
                {t('more_photos')}
                {' '}
                <Svg Icon={ArrowRightDownIcon} />
              </Typography>
            )}
    </div>
  );
});
