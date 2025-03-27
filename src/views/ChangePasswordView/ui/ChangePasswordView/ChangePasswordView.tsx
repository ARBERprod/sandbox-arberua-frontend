import { memo } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useAuthModel } from '@/widgets/Auth';
import { ChangePasswordForm } from '@/features/auth/ChangePassword';
import { Container } from '@/shared/ui/Container';
import { Typography } from '@/shared/ui/Typography';
import { routerPaths } from '@/shared/config/router';
import styles from './ChangePasswordView.module.scss';

interface ChangePasswordViewProps {
  className?: string;
}

export const ChangePasswordView = memo(({ className }: ChangePasswordViewProps) => {
  const { query, push } = useRouter();
  const { openLoginModal } = useAuthModel();
  const { t } = useTranslation();
  const token = query.token as string;
  const email = query.email as string;

  const goToAuth = async () => {
    await push(routerPaths.main);
    openLoginModal();
  };

  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <Typography className={styles.title} variant="title-2">
          {t('auth.password_recovery')}
        </Typography>
        <ChangePasswordForm onSuccess={goToAuth} token={token} email={email} />
      </Container>
    </div>
  );
});
