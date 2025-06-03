import { memo } from 'react';
import cn from 'classnames';
import { Product } from '@/entities/Product';
import Link from 'next/link';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { AppImage } from '@/shared/ui/AppImage';
import { Container } from '@/shared/ui/Container';
import { ProductSlider } from '@/widgets/ProductPresenter';
import { useTranslation } from 'next-i18next';
import { ImageType } from '@/shared/types/common';
import styles from './CollectionsSection.module.scss';

interface CollectionsSectionProps {
  className?: string;
  title: string;
  products: Product[];
  picture: ImageType;
  href: string;
}

export const CollectionsSection = memo(({
  className,
  products,
  title,
  href,
  picture,
}:CollectionsSectionProps) => {
  const { t } = useTranslation();
  return (
    <section className={cn(styles.root, className)}>
      <Container>
        <Flex justify="center" align="center" className={styles.header}>
          <Typography variant="title-2">{title}</Typography>
        </Flex>

        <div className={styles.content}>
          <div className={styles.image_wrap}>
            <div className={styles.image_inner}>
              <AppImage
                alt={title}
                src={picture}
                className={styles.image}
                unoptimized
              />
            </div>
          </div>
          <Flex justify="start" align="center" className={styles.footer}>
            <Link href={href}>
              <Typography as="span" variant="body-2">{t('view_all')}</Typography>
            </Link>
          </Flex>
          <div className={styles.slider_wrap}>
            <Flex gap="16" justify="between" align="center" className={styles.header_secondary}>
              <Typography className={styles.title} variant="title-2">{title}</Typography>
              <Link className={styles.link} href={href}>
                <Typography as="span" variant="body-2">{t('view_all')}</Typography>
              </Link>
            </Flex>
            <ProductSlider
              products={products}
              slidesPerView={3}
              notFullWidthOnMobile
              navigationMode="wide"
            />
          </div>
        </div>
      </Container>

    </section>
  );
});
