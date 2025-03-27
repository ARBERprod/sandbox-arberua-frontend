import { memo } from 'react';
import cn from 'classnames';
import ReasonsImage from '@/shared/assets/images/bonuses-reasons.jpg';
import ReasonsImageBg from '@/shared/assets/images/bonuses-reasons-bg.jpg';
import { Flex } from '@/shared/ui/Flex';
import { Container } from '@/shared/ui/Container';
import { Svg } from '@/shared/ui/Svg';
import { Typography } from '@/shared/ui/Typography';
import { AppImage } from '@/shared/ui/AppImage';
import StarIcon from '@/shared/assets/icons/star.svg';
import PercentIcon from '@/shared/assets/icons/percent.svg';
import GiftIcon from '@/shared/assets/icons/gift.svg';
import { useTranslation } from 'next-i18next';
import styles from './BonusesReasonsSection.module.scss';

interface BonusesReasonsSectionProps {
  className?: string;
}

export const BonusesReasonsSection = memo(({ className }:BonusesReasonsSectionProps) => {
  const { t } = useTranslation('bonuses');
  return (
    <section className={cn(styles.root, className)}>
      <AppImage src={ReasonsImageBg} alt="bg" className={styles.bg} />
      <Container className={styles.container}>
        <Typography variant="title-2" centered className={styles.title}>{t('bonuses.title2')}</Typography>
        <div className={styles.inner}>
          <div className={cn(styles.item, styles.first)}>
            <ul className={styles.list}>
              <li className={styles.list_item}>
                <Flex align="start">
                  <div className={styles.icon_wrap}>
                    <Svg Icon={PercentIcon} />
                  </div>
                  <Typography variant="body-1">{t('bonuses.cashback')}</Typography>
                </Flex>
              </li>
              <li className={styles.list_item}>
                <Flex align="start">
                  <div className={styles.icon_wrap}>
                    <Svg Icon={GiftIcon} />
                  </div>
                  <Typography variant="body-1">{t('bonuses.arber-gold')}</Typography>
                </Flex>
              </li>
              <li className={styles.list_item}>
                <Flex align="start">
                  <div className={styles.icon_wrap}>
                    <Svg Icon={StarIcon} />
                  </div>
                  <Typography variant="body-1">{t('bonuses.after-registration')}</Typography>
                </Flex>
              </li>
            </ul>
          </div>
          <div className={cn(styles.item, styles.second)}>
            <AppImage src={ReasonsImage} alt="bg" className={styles.image} />
          </div>
        </div>
      </Container>
    </section>
  );
});
