import { memo, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button } from '@/shared/ui/Button';
import { Svg } from '@/shared/ui/Svg';
import GoogleIcon from '@/shared/assets/icons/google.svg';
import { useLazySessionFetchQuery } from '@/entities/Session';
import { tokenService } from '@/shared/lib/services/token.service';
import { routerPaths } from '@/shared/config/router';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import styles from './AuthByGoogleButton.module.scss';
import { googleAuthHelper } from '../../../lib/googleAuthHelper';
import {
  isGoogleAuthMessageEvent,
  isRedirectMessageEventData,
  isResponseMessageEventData,
} from '../../../lib/typeGuards';
import { useAuthBySocialsActions } from '../../../model/slices/authBySocialsSlice';

interface AuthByGoogleButtonProps {
  className?: string;
  variant: 'button' | 'icon';
  onSuccess?: () => void;
  onError?: () => void;
  onRegisterModalOpen?: () => void;
}

export const AuthByGoogleButton = memo(({
  className,
  variant = 'button',
  onSuccess,
  onError,
  onRegisterModalOpen,
}: AuthByGoogleButtonProps) => {
  const { t } = useTranslation();
  const [fetchSession] = useLazySessionFetchQuery();
  const { openGoogleModal } = useAuthBySocialsActions();
  const { push } = useRouter();
  const windowRef = useRef<Window | null>(null);

  const clickHandler = async () => {
    const url = googleAuthHelper.getUrl();
    windowRef.current = window.open(url, '_blank', `toolbar=1, scrollbars=1, resizable=1, width=${1015}, height=${800}`);
  };

  useEffect(() => {
    async function receiveMessage(event: MessageEvent) {
      if (!isGoogleAuthMessageEvent(event.data)) return;

      windowRef.current?.postMessage({
        action: 'close',
        type: 'OAuthParentRequest',
      }, '*');
      windowRef.current = null;

      if (isResponseMessageEventData(event.data)) {
        const token = event.data?.payload?.access_token || '';
        if (!token) {
          return;
        }
        tokenService.setToken(token);
        try {
          const { data } = await fetchSession().unwrap();
          if (data.user) {
            sendCustomerDataEvent(data.user);
            push(routerPaths.office);
            onSuccess?.();
          } else {
            onError?.();
          }
        } catch (e) {
          console.error('Something went wrong', e);
          onError?.();
        }
      }
      if (isRedirectMessageEventData(event.data)) {
        const { email, first_name, last_name } = event.data.payload;
        openGoogleModal({
          email,
          first_name,
          last_name,
        });
        onRegisterModalOpen?.();
      }
    }

    window.addEventListener('message', receiveMessage, false);

    return () => window.removeEventListener('message', receiveMessage, false);
    // eslint-disable-next-line
  }, []);

  if (variant === 'button') {
    return (
      <Button
        className={className}
        size="large"
        fullWidth
        startIcon={<Svg Icon={GoogleIcon} />}
        color="light-secondary"
        onClick={clickHandler}
      >
        {t('google')}
      </Button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={clickHandler}
        className={cn(styles.iconBtn, className)}
      >
        <Svg Icon={GoogleIcon} />
      </button>
    );
  }

  return null;
});
