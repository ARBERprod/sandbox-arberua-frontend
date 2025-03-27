import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Container } from '@/shared/ui/Container';
import { useTranslation } from 'next-i18next';
import { Svg } from '@/shared/ui/Svg';
import RedArrowRight from '@/shared/assets/icons/red-arrow-right.svg';
import styles from './BonusesHowitworksSection.module.scss';

interface BonusesHowitworksSectionProps {
  className?: string;
}

export const BonusesHowitworksSection = memo(({ className }:BonusesHowitworksSectionProps) => {
  const { t } = useTranslation('bonuses');
  return (
    <section className={cn(styles.root, className)}>
      <Container>
        <Typography variant="title-2" className={styles.title}>{t('bonuses.title3')}</Typography>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.icon}>
              <Typography as="span" color="grey" variant="title-2">01</Typography>
            </div>
            <div className={styles.content}>
              <div className={styles.item_heading}>
                <Typography variant="title-6" className={styles.item_title}>{t('bonuses.title4')}</Typography>
                <Svg className={styles.svg} Icon={RedArrowRight} width={34} />
              </div>
              <Typography variant="body-2" className={styles.item_subtitle}>{t('bonuses.title4.subtitle')}</Typography>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.icon}>
              <Typography as="span" color="grey" variant="title-2">02</Typography>
            </div>
            <div className={styles.content}>
              <div className={styles.item_heading}>
                <Typography variant="title-6" className={styles.item_title}>{t('bonuses.title5')}</Typography>
                <Svg className={styles.svg} Icon={RedArrowRight} width={34} />
              </div>
              <Typography variant="body-2" className={styles.item_subtitle}>{t('bonuses.title5.subtitle')}</Typography>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.icon}>
              <Typography as="span" color="grey" variant="title-2">03</Typography>
            </div>
            <div className={styles.content}>
              <div className={styles.item_heading}>
                <Typography variant="title-6" className={styles.item_title}>{t('bonuses.title6')}</Typography>
                <Svg className={styles.svg} Icon={RedArrowRight} width={34} />
              </div>
              <Typography variant="body-2" className={styles.item_subtitle}>{t('bonuses.title6.subtitle')}</Typography>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.icon}>
              <Typography as="span" color="grey" variant="title-2">04</Typography>
            </div>
            <div className={styles.content}>
              <div className={styles.item_heading}>
                <Typography variant="title-6" className={styles.item_title}>{t('bonuses.title7')}</Typography>
              </div>
              <Typography variant="body-2" className={styles.item_subtitle}>{t('bonuses.title7.subtitle')}</Typography>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
});
