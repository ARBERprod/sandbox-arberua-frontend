import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './Footer.module.scss';
import { FooterTop } from '../FooterTop';
import { FooterBottom } from '../FooterBottom';
import { FooterBanner } from '../FooterBanner';

interface FooterProps {
  className?: string;
  withBanner?: boolean;
}

export const Footer = memo(({
  className,
  withBanner,
}: FooterProps) => {
  const { t } = useTranslation();
  return (
    <footer className={cn(styles.footer, className)}>
      {withBanner && (
        <FooterBanner
          title={t('footer.banner.title')}
          description={t('footer.banner.subtitle')}
        />
      )}
      <Container>
        <FooterTop />
        <FooterBottom />
      </Container>
    </footer>
  );
});
