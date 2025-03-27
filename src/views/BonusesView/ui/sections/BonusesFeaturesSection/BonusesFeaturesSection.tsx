import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { AppImage } from '@/shared/ui/AppImage';
import { Svg } from '@/shared/ui/Svg';
import { Typography } from '@/shared/ui/Typography';
import PocketIcon from '@/shared/assets/icons/pocket.svg';
import PocketIcon2 from '@/shared/assets/icons/pocket-2.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import SandclockIcon from '@/shared/assets/icons/sandclock.svg';
import UahIcon from '@/shared/assets/icons/uah.svg';
import FeaturesImage from '@/shared/assets/images/bonuses-features.jpg';
import { useTranslation } from 'next-i18next';
import styles from './BonusesFeaturesSection.module.scss';

interface BonusesFeaturesSectionProps {
  className?: string;
}

export const BonusesFeaturesSection = memo(({ className }:BonusesFeaturesSectionProps) => {
  const { t } = useTranslation('bonuses');
  return (
    <section className={cn(styles.root, className)}>
      <Container>
        <Typography variant="title-2" className={styles.title}>{t('bonuses.peculiarities-title')}</Typography>
        <div className={styles.inner}>
          <div className={cn(styles.item, styles.first)}>
            <AppImage src={FeaturesImage} alt="image" className={styles.image} />
          </div>
          <div className={cn(styles.item, styles.second)}>
            <ul className={styles.list}>
              <li className={cn(styles.list_item, styles.first)}>
                <div className={styles.icon_wrap}>
                  <Svg Icon={UahIcon} width="32" height="32" />
                </div>
                <Typography variant="body-2" className={styles.item_title}>{t('bonuses.peculiarities-title1')}</Typography>
              </li>
              <li className={cn(styles.list_item, styles.second)}>
                <div className={styles.icon_wrap}>
                  <Svg Icon={SandclockIcon} width="32" height="32" />
                </div>
                <Typography variant="body-2" className={styles.item_title}>{t('bonuses.peculiarities-title2')}</Typography>
              </li>
              <li className={cn(styles.list_item, styles.third)}>
                <div className={styles.icon_wrap}>
                  <Svg Icon={CalendarIcon} width="32" height="32" />
                </div>
                <Typography variant="body-2" className={styles.item_title}>{t('bonuses.peculiarities-title3')}</Typography>
              </li>
              <li className={cn(styles.list_item, styles.fourth)}>
                <div className={styles.icon_wrap}>
                  <Svg Icon={PocketIcon} width="32" height="32" />
                </div>
                <Typography variant="body-2" className={styles.item_title}>{t('bonuses.peculiarities-title4')}</Typography>
              </li>
              <li className={cn(styles.list_item, styles.fifth)}>
                <div className={styles.icon_wrap}>
                  <Svg Icon={UahIcon} width="32" height="32" />
                </div>
                <Typography variant="body-2" className={styles.item_title}>{t('bonuses.peculiarities-title5')}</Typography>
              </li>
              <li className={cn(styles.list_item, styles.sixth)}>
                <div className={styles.icon_wrap}>
                  <Svg Icon={PocketIcon2} width="32" height="32" />
                </div>
                <Typography variant="body-2" className={styles.item_title}>{t('bonuses.peculiarities-title6')}</Typography>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
});
