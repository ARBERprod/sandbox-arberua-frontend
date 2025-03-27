import cn from 'classnames';
import { Logo } from '@/shared/ui/Logo';
import { useTranslation } from 'next-i18next';
import { SignUpNewsForm } from '@/features/SignUpForNews';
import { useGetMenusQuery } from '@/entities/Menu';
import { FooterSocials } from '../FooterSocials';
import { FooterContacts } from '../FooterContacts';
import { FooterMenu, FooterMenuVariants } from '../FooterMenu/FooterMenu';
import styles from './FooterTop.module.scss';
import { footerMenu1, footerMenu2 } from '../../constants/footerMenu';
import { FooterMenuWithTitle } from '../FooterMenuWithTitle';

interface FooterTopProps {
  className?: string;
}

export const FooterTop = ({ className }: FooterTopProps) => {
  const { t } = useTranslation();
  const { data } = useGetMenusQuery();

  const items = [
    ...(data?.pages?.slice(0, 7).filter((item) => item.slug !== 'pytania-i-vodpovidi') || []),
    { slug: 'faq', title: 'FAQ', url: '/faq' },
  ];

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.item, styles.first)}>
        <Logo className={cn(styles.logo)} />
        <FooterContacts className={cn(styles.contacts)} />
        <FooterSocials className={cn(styles.socials)} />
      </div>
      <div className={cn(styles.item, styles.second)}>
        <FooterMenuWithTitle items={footerMenu1(t)} title={t('footer.menu.about_company')} />
      </div>
      <div className={cn(styles.item, styles.third)}>
        <FooterMenuWithTitle items={footerMenu2(t)} title={t('footer.menu.client')} />
      </div>
      <div className={cn(styles.item, styles.fourth)}>
        {data && data.pages && <FooterMenu items={items} variant={FooterMenuVariants.SECONDARY} />}
      </div>
      <div className={cn(styles.item, styles.fifth)}>
        <SignUpNewsForm />
      </div>
    </div>
  );
};
