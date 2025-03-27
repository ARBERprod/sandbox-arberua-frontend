import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import styles from './FooterContacts.module.scss';

interface FooterContactsProps {
  className?: string;
}

export const FooterContacts = ({ className }: FooterContactsProps) => {
  const { t } = useTranslation();
  return (
    <ul className={cn(styles.root, className)}>
      <li className={cn(styles.contacts_item)}>
        <a href={t('contact.tel.link')} className={cn(styles.contacts_link)}>
          {t('contact.tel')}
        </a>
      </li>
      <li className={cn(styles.contacts_item)}>
        <a href={t('contact.mail.link')} className={cn(styles.contacts_link)}>
          {t('contact.mail')}
        </a>
      </li>
    </ul>
  );
};
