import { memo } from 'react';
import cn from 'classnames';
import { AppImage } from '@/shared/ui/AppImage';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Container } from '@/shared/ui/Container';
import { useGetCertificatesQuery } from '@/entities/Certificate';
import { CertificateCardList } from '@/widgets/CertificatePresenter';
import { Loader } from '@/shared/ui/Loader';
import { Language } from '@/shared/config/lang';

import { BANNERS } from '../constants/banners';
import { useTranslation } from 'next-i18next';
import styles from './CertificatesView.module.scss';
import { useRouter } from 'next/router';

interface CertificatesViewProps {
  className?: string;
}

export const CertificatesView = memo(({ className }:CertificatesViewProps) => {
  const { data, isLoading, isError } = useGetCertificatesQuery();
  const { t } = useTranslation(['common', 'certificates']);
  const { locale } = useRouter();

  if (isLoading) return <Loader className={styles.loader} />;
  if (isError || !data) return null;

  return (
    <div className={cn(styles.root, className)}>
      <Container>
        <Flex justify="center">
          <PageBreadcrumbs breadcrumbs={data.breadcrumbs} className={styles.bc} />
        </Flex>
        <div className={styles.inner}>
          <div className={styles.banner_wrap}>
            <AppImage src={BANNERS[locale as Language]} alt="banner" className={styles.image} />
          </div>
          <div className={styles.content}>
            <Typography variant="title-1" className={styles.title}>{t('certificates:certificates.title')}</Typography>
            <Typography variant="body-1" className={styles.paragraph}>
              {t('certificates:certificates.title.paragraph')}
            </Typography>
            <Typography variant="body-1" className={styles.paragraph}>{t('certificates:certificates.title.paragraph1')}</Typography>

            <Typography variant="title-3" className={styles.title}>{t('certificates:certificates.title1')}</Typography>
            <Typography variant="body-1" className={styles.paragraph}>
              {t('certificates:certificates.paragraph')}

            </Typography>
            <Typography variant="body-1" className={styles.paragraph}>
              {t('certificates:certificates.title1.paragraph1')}
              {' '}
              <span className={styles.bold}>500</span>
              ,
              {' '}
              <span className={styles.bold}>1000</span>
              ,
              {' '}
              <span className={styles.bold}>3000</span>
              ,
              {' '}
              <span className={styles.bold}>5000</span>
              {' '}
              {t('certificates:certificates.title1.paragraph2')}
              {' '}
              <span className={styles.bold}>10000</span>
              {' '}
              {t('certificates:certificates.title1.paragraph3')}
            </Typography>
            <Typography variant="body-1" className={styles.paragraph}>{t('certificates:certificates.title1.paragraph4')}</Typography>

            <Typography variant="title-3" color="red" className={styles.title}>{t('certificates:certificates.title2')}</Typography>
            <Typography variant="body-1" className={styles.paragraph}>{t('certificates:certificates.title2.paragraph')}</Typography>
            <Typography variant="body-1" className={styles.paragraph}>
              {t('certificates:certificates.title2.paragraph1')}
              {' '}
              <Typography as="span" color="red">{t('certificates:certificates.title2.paragraph2')}</Typography>
            </Typography>
            <Typography variant="body-1" className={styles.paragraph}>{t('certificates:certificates.title3.paragraph')}</Typography>
            <Typography variant="title-3" className={styles.title}>{t('certificates:certificates.title3')}</Typography>
            <CertificateCardList
              items={data.certificates}
              className={styles.certificates}
            />
          </div>
        </div>
      </Container>
    </div>
  );
});
