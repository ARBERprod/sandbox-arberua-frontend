import { CSSProperties, memo } from 'react';
import { ToastContentProps } from 'react-toastify';
import { Typography } from '@/shared/ui/Typography';
import { NotificationOptions } from './useNotification';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Svg } from '@/shared/ui/Svg';
import { NotificationType } from './types';
import { NotificationIcon } from './NotificationIcon';

type NotificationProps = ToastContentProps & NotificationOptions;

export const Notification = memo(({
  content, title, additional, subtitle, closeToast, toastProps, withCloseButton = true,
}:NotificationProps) => (
  <>
    <Flex align="center" justify="between" gap="8">
      <Flex gap="8" align="center">
        <NotificationIcon style={{ '--size': '32px' } as CSSProperties} type={toastProps.type as NotificationType} />
        <Typography variant="title-5">{title}</Typography>
      </Flex>
      {withCloseButton
        && (
          <button onClick={closeToast}>
            <Svg Icon={CloseIcon} width={16} />
          </button>
        )}
    </Flex>
    <FlexCol>
      {subtitle
       && <Typography variant="title-6">{subtitle}</Typography>}
      {content && <Typography variant="body-1" color="grey-dark">{content}</Typography>}
      {additional && <div className="mt-3">{additional}</div>}
    </FlexCol>
  </>
));
