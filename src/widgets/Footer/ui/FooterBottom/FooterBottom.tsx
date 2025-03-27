import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { FooterStoreButtons } from '../FooterStoreButtons';
import styles from './FooterBottom.module.scss';
import { FooterSocials } from '../FooterSocials';

interface FooterBottomProps {
  className?: string;
}

export const FooterBottom = ({ className }: FooterBottomProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.row, styles.row_secondary)}>
        <div className={cn(styles.item)}>
          <FooterSocials className={styles.socials} />
        </div>
        <div className={cn(styles.item)}>
          {/* <FooterStoreButtons size="xsmall" variant="app-small" /> */}
        </div>
      </div>
      <div className={cn(styles.row, styles.row_primary)}>
        <div className={cn(styles.item)}>
          <div className={cn(styles.copy)}>{t('footer.bottom.text')}</div>
        </div>
        <div className={cn(styles.item)}>
          {/* <FooterStoreButtons className={styles.buttons_secondary} size="xsmall" variant="app" /> */}
        </div>
      </div>
    </div>
  );
};
