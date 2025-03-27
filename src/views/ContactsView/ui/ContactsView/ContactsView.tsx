import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { FeedbackForm } from '@/features/ContactUsForm';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { ContactUsFormWrapper } from '@/shared/ui/ContactUsFormWrapper';
import { Contacts } from '@/shared/ui/Contacts';
import { useTranslation } from 'next-i18next';
import styles from './ContactsView.module.scss';

interface ContactsViewProps {
  className?: string;
}

export const ContactsView = memo(({ className }:ContactsViewProps) => {
  const { t } = useTranslation('contacts-page');
  return (
    <div className={cn(styles.root, className)}>
      <Container>
        <Typography variant="title-2" centered className={styles.title}>{t('contact.title')}</Typography>
        <Flex justify="center">
          <ContactUsFormWrapper
            className={styles.inner}
            slotLeft={<Contacts variant="contactsPage" />}
            slotRight={<FeedbackForm />}
          />
        </Flex>
      </Container>
    </div>
  );
});
