import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Svg } from '@/shared/ui/Svg';
import { useTranslation } from 'next-i18next';
import FacebookIcon from '@/shared/assets/icons/facebook-colored.svg';
import styles from './AuthByFacebookButton.module.scss';

interface AuthByFacebookButtonProps {
  className?: string;
  variant: 'button' | 'icon'
}

export const AuthByFacebookButton = memo(({ className, variant = 'button' }: AuthByFacebookButtonProps) => {
  const { t } = useTranslation();
  const clickHandler = () => {};
  if (variant === 'button') {
    return (
      <Button
        className={className}
        size="large"
        fullWidth
        startIcon={<Svg Icon={FacebookIcon} />}
        color="light-secondary"
        onClick={clickHandler}
      >
        {t('facebook')}
      </Button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={clickHandler}
        className={cn(styles.iconBtn, className)}
      >
        <Svg Icon={FacebookIcon} />
      </button>
    );
  }

  return null;
});
