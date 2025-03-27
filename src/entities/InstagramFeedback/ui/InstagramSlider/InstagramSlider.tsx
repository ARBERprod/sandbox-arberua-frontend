import { memo } from 'react';
import cn from 'classnames';
import { MainSlider, Slide } from '@/shared/ui/Slider';

import { Container } from '@/shared/ui/Container';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { InstagramCard } from '../InstagramCard';
import styles from './InstagramSlider.module.scss';
import { routerPaths } from '@/shared/config/router';
import { Instagram } from '@/entities/InstagramFeedback';

interface InstagramSliderProps {
  className?: string;
  instagrams: Instagram[];

}

export const InstagramSlider = memo(({ className, instagrams = [] }:InstagramSliderProps) => {
  const { t } = useTranslation(['main-page', 'common']);

  const slides:Slide[] = instagrams.map((item) => ({
    id: item.id,
    slide: <InstagramCard instagram={item} />,
  }));
  return (
    <Container className={cn(styles.root, className)}>
      <Flex align="center" justify="between" className={styles.header}>
        <Typography variant="title-2">{t('main-page:instagram_slider.title')}</Typography>
        <Link href={routerPaths.instagram}>
          <Typography as="span" variant="body-2">{t('common:view_all')}</Typography>
        </Link>
      </Flex>
      <MainSlider
        slides={slides}
        classes={{
          slide: styles.slide,
        }}
        spaceBetween={16}
      />
    </Container>
  );
});
