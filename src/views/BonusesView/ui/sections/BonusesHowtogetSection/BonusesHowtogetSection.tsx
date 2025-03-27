import { memo } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Typography } from '@/shared/ui/Typography';
import { AppImage } from '@/shared/ui/AppImage';
import HowtogetImageBg from '@/shared/assets/images/bonuses-howtoget-bg.jpg';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { useAuthModel } from '@/widgets/Auth';
import styles from './BonusesHowtogetSection.module.scss';
import { useAuth } from '@/entities/Session';

interface BonusesHowtogetSectionProps {
  className?: string;
}

export const BonusesHowtogetSection = memo(({ className }:BonusesHowtogetSectionProps) => {
  const { t } = useTranslation(['common', 'bonuses']);
  const { push } = useRouter();
  const { openRegisterModal } = useAuthModel();
  const { isAuth } = useAuth();

  const leftClickHandler = () => {
    if (isAuth) {
      push(routerPaths.office_bonuses);
    } else {
      openRegisterModal();
    }
  };

  const rightClickHandler = () => {
    push(routerPaths.shops);
  };

  return (
    <section className={cn(styles.root, className)}>
      <AppImage src={HowtogetImageBg} alt="bg" className={styles.bg} />
      <Container className={styles.container}>
        <Typography variant="title-2" color="white" centered className={styles.title}>{t('bonuses:bonuses.get-bonus-card')}</Typography>
        <div className={styles.inner}>
          <div className={styles.item}>
            <Flex direction="column" justify="center" align="center">
              <Typography variant="title-4" className={styles.item_title} centered>{t('bonuses:bonuses.title')}</Typography>
              <Typography variant="body-2" className={styles.item_subtitle} centered>{t('bonuses:bonuses.subtitle')}</Typography>
              <Button size="mediumlarge" className={styles.button} onClick={leftClickHandler}>{isAuth ? t('bonuses:bonuses.check-bonuses') : t('common:registers')}</Button>
            </Flex>
          </div>
          <div className={styles.item}>
            <Flex direction="column" justify="center" align="center">
              <Typography variant="title-4" className={styles.item_title} centered>{t('bonuses:bonuses.fill-blank')}</Typography>
              <Typography variant="body-2" className={styles.item_subtitle} centered>{t('bonuses:bonuses.fill-blank.text')}</Typography>
              <Button size="mediumlarge" className={styles.button} onClick={rightClickHandler}>{t('bonuses:bonuses.shops')}</Button>
            </Flex>
          </div>
        </div>
      </Container>
    </section>
  );
});
