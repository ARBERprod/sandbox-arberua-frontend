import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { useSiteSettingsModel } from '@/features/SiteSettings';
import { useRouter } from 'next/router';
import { Language as LanguagesList } from '@/shared/config/lang';
import styles from './Language.module.scss';

const languages: Record<LanguagesList, 'UA' | 'RU' | 'EN'> = {
  [LanguagesList.UKRAINIAN]: 'UA',
  [LanguagesList.RUSSIAN]: 'RU',
  [LanguagesList.ENGLISH]: 'EN',
};

interface LanguageProps {
  className?: string;
}

export const Language = memo(({ className }:LanguageProps) => {
  const router = useRouter();
  const $$model = useSiteSettingsModel();
  const onClickHandler = () => {
    $$model.openSettingsModal();
  };

  return (
    <div className={cn(styles.root, className)}>
      <button className={cn(styles.btn)} onClick={onClickHandler}>
        <Typography variant="body-2">
          {router.locale ? languages[router.locale as LanguagesList] : ''}
        </Typography>
      </button>
    </div>
  );
});
