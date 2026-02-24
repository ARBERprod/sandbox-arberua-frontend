import { memo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import { Typography } from '@/shared/ui/Typography';
import { SocialsMenu } from '@/shared/ui/SocialsMenu';
import PhoneIcon from '@/shared/assets/icons/phone-3.svg';
import EmailIcon from '@/shared/assets/icons/envelope-2.svg';
import ClockIcon from '@/shared/assets/icons/clock-2.svg';
import { useTranslation } from 'next-i18next';
import styles from './Contacts.module.scss';
import { CONTACTS_SOCIALS } from '@/shared/constants/socials';

interface ContactsProps {
  className?: string;
  variant?: 'normal' | 'contactsPage' | 'faqPage';
}

export const Contacts = memo(({
  className,
  variant = 'normal',
}:ContactsProps) => {
  const { t } = useTranslation(['contacts-page', 'common']);
  return (
    <div className={cn(styles.root, className)}>
      <ul className={styles.list}>
        <li className={cn(styles.item, styles[variant])}>
          <div className={styles.icon_wrap}>
            <Svg Icon={PhoneIcon} />
          </div>
          <div className={styles.content}>
            <Typography variant="body-1" className={styles.title}>{t('contacts-page:contact.tel.shop.text')}</Typography>
            <Typography as="a" href={t('common:contact.tel.shop.link')} variant="body-2" className={styles.subtitle}>{t('contacts-page:contact.tel.shop')}</Typography>
            <Typography variant="body-2" className={styles.description}>{t('contacts-page:contact.tel.shop.description')}</Typography>
          </div>
        </li>
        <li className={cn(styles.item, styles[variant])}>
          <div className={styles.icon_wrap}>
            <Svg Icon={PhoneIcon} />
          </div>
          <div className={styles.content}>
            <Typography variant="body-1" className={styles.title}>{t('contacts-page:contact.tel.care.text')}</Typography>
            <Typography as="a" href={t('common:contact.tel.care.link')} variant="body-2" className={styles.subtitle}>{t('contacts-page:contact.tel.care')}</Typography>
            <Typography variant="body-2" className={styles.description}>{t('contacts-page:contact.tel.care.description')}</Typography>
          </div>
        </li>
        <li className={cn(styles.item, styles[variant])}>
          <div className={styles.icon_wrap}>
            <Svg Icon={EmailIcon} />
          </div>
          <div className={styles.content}>
            <Typography variant="body-1" className={styles.title}>{t('contacts-page:contact.mail.text')}</Typography>
            <Typography as="a" href={t('common:contact.mail.link')} variant="body-2" className={styles.subtitle}>{t('contact.mail')}</Typography>
          </div>
        </li>
        <li className={cn(styles.item, styles[variant])}>
          <div className={styles.icon_wrap}>
            <Svg Icon={ClockIcon} />
          </div>
          <div className={styles.content}>
            <Typography variant="body-1" className={styles.title}>{t('contacts-page:contact.schedule.text')}</Typography>
            <Typography variant="body-2" className={styles.subtitle}>{t('contacts-page:contact.schedule')}</Typography>
          </div>
        </li>
        <li className={cn(styles.item, styles[variant])}>
          <div className={styles.icon_wrap} />
          <div className={styles.content}>
            <Typography variant="body-1" className={styles.title}>{t('contacts-page:contact.social.text')}</Typography>
            <SocialsMenu socials={CONTACTS_SOCIALS} className={styles.socilals} />
          </div>
        </li>
      </ul>
    </div>
  );
});
