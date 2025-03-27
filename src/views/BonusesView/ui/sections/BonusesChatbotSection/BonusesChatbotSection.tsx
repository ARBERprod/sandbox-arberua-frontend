import { memo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Container } from '@/shared/ui/Container';
import ChatbotImage from '@/shared/assets/images/chatbot-app.png';
import ChatbotImageBg from '@/shared/assets/images/chatbot-app-bg.jpg';
import TelegramIcon from '@/shared/assets/icons/telegram-white.svg';
import { useTranslation } from 'next-i18next';
import styles from './BonusesChatbotSection.module.scss';
import Link from 'next/link';

interface BonusesChatbotSectionProps {
  className?: string;
}

export const BonusesChatbotSection = memo(({ className }:BonusesChatbotSectionProps) => {
  const { t } = useTranslation('bonuses');
  return (
    <section className={cn(styles.root, className)}>
      <AppImage src={ChatbotImageBg} alt="bg" className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.inner}>
          <div className={cn(styles.item, styles.first)}>
            <div className={styles.item_inner}>
              <Typography variant="title-2" centered className={styles.title}>{t('bonuses.chatbot.title')}</Typography>
              <div className={styles.list_wrap}>
                <ul className={styles.list}>
                  <li className={styles.list_item}>
                    <Typography variant="body-1" centered>{t('bonuses.chatbot.text')}</Typography>
                  </li>
                  <li className={styles.list_item}>
                    <Typography variant="body-1" centered>{t('bonuses.chatbot.text1')}</Typography>
                  </li>
                  <li className={styles.list_item}>
                    <Typography variant="body-1" centered>{t('bonuses.chatbot.text2')}</Typography>
                  </li>
                  <li className={styles.list_item}>
                    <Typography variant="body-1" centered>{t('bonuses.chatbot.text3')}</Typography>
                  </li>
                </ul>
              </div>
              <Typography variant="body-2" color="grey-dark" centered className={styles.subtitle}>{t('bonuses.chatbot.text4')}</Typography>
              <Flex className={styles.buttons_wrap} justify="center" gap="12">
                <Button
                  as={Link}
                  href="https://tinyurl.com/559kub4s"
                  target="_blank"
                  size="large"
                  className={styles.button}
                  startIcon={(
                    <Svg
                      Icon={TelegramIcon}
                      width="24"
                      height="20"
                    />
                  )}
                  color="telegram"
                >
                  {t('bonuses.chatbot.text5')}
                </Button>
              </Flex>
            </div>

          </div>
          <div className={cn(styles.item, styles.second)}>
            <AppImage src={ChatbotImage} alt="app" className={styles.image} />
          </div>
        </div>
      </Container>
    </section>
  );
});
