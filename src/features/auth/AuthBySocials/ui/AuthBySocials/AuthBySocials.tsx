import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Divider } from '@/shared/ui/Divider';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { AuthByGoogleButton } from '../google/AuthByGoogleButton';
import styles from './AuthBySocials.module.scss';

interface AuthBySocialsProps {
  className?: string;
  variant?: 'button' | 'icon';
  onSuccess?: () => void;
  onError?: () => void;
  onRegisterModalOpen?: () => void;
}

export const AuthBySocials = memo(({
  className,
  variant = 'button',
  onSuccess,
  onError,
  onRegisterModalOpen,
}: AuthBySocialsProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Flex gap="12" align="center">
        <Divider />
        <Typography color="grey-dark-6" className={styles.text} variant="body-2">
          {variant === 'button'
            ? t('auth.socials.text') : t('auth.socials_icons.text')}
        </Typography>
        <Divider />
      </Flex>
      <Flex justify={variant === 'button' ? 'between' : 'center'} gap="12" className="mt-5">
        <AuthByGoogleButton
          onRegisterModalOpen={onRegisterModalOpen}
          onError={onError}
          onSuccess={onSuccess}
          variant={variant}
        />
      </Flex>
    </div>
  );
});
