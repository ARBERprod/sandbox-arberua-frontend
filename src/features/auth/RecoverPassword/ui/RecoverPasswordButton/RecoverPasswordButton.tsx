import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import { useRecoverPasswordActions } from '../../model/slices/recoverPasswordSlice';

interface RecoverPasswordButtonProps {
  className?: string;
}

export const RecoverPasswordButton = memo(({ className }:RecoverPasswordButtonProps) => {
  const { t } = useTranslation();
  const { openModal } = useRecoverPasswordActions();
  const clickHandler = () => {
    openModal({ type: 'email' });
  };
  return (
    <Typography variant="body-2" underlined as="button" type="button" onClick={clickHandler} className={className}>
      {t('auth.forgot_password')}
    </Typography>
  );
});
