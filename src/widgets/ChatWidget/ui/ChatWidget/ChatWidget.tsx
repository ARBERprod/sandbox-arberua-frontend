import { memo, useState } from 'react';
import cn from 'classnames';
import MessageIcon from '@/shared/assets/icons/message.svg';
import CloseIcon from '@/shared/assets/icons/close-2.svg';
import CallIcon from '@/shared/assets/icons/phone.svg';
import ViberIcon from '@/shared/assets/icons/viber-colored.svg';
import TelegramIcon from '@/shared/assets/icons/telegram-colored.svg';
import { Svg } from '@/shared/ui/Svg';
import { CallbackModal, useCallbackModel } from '@/features/CallBack';
import styles from './ChatWidget.module.scss';
import { TELEGRAM_LINK, VIBER_LINK } from '../../constants/links';

interface ChatWidgetProps {
  className?: string;
}

export const ChatWidget = memo(({ className }: ChatWidgetProps) => {
  const $$callbackModel = useCallbackModel();
  const [menuOpened, setMenuOpened] = useState(false);
  const clickHandler = () => {
    setMenuOpened((prev) => !prev);
  };
  const openCallbackModal = () => {
    $$callbackModel.openModal();
  };

  const telegramClickHandler = () => {
    window.open(TELEGRAM_LINK, '_blank');
    setMenuOpened(false);
  };
  const viberClickHandler = () => {
    window.open(VIBER_LINK, '_blank');
    setMenuOpened(false);
  };
  return (
    <>
      <div className={styles.root}>
        {menuOpened
          && (
            <>
              {/* <button onClick={viberClickHandler} className={styles.btn} data-gtm-id="widget-viber" data-gtm-event="click" data-gtm-action="go_to_viber">
                <Svg Icon={ViberIcon} />
              </button> */}
              <button onClick={telegramClickHandler} className={styles.btn} data-gtm-id="widget-telegram" data-gtm-event="click" data-gtm-action="go_to_telegram">
                <Svg Icon={TelegramIcon} />
              </button>
            </>
          )}
        <button onClick={clickHandler} className={cn(styles.btn, className)} {...(!menuOpened ? { 'data-gtm-id': 'widget-open', 'data-gtm-event': 'click', 'data-gtm-action': 'open_widget' } : {})}>
          {menuOpened
            ? <Svg stroke="grey-dark" Icon={CloseIcon} width={12} height={12} />
            : <Svg Icon={MessageIcon} width={24} height={24} />}
        </button>
      </div>
      <CallbackModal onSuccess={() => setMenuOpened(false)} />
    </>
  );
});
