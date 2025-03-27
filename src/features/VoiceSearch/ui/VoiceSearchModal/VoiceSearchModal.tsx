import cn from 'classnames';
import styles from './VoiceSearchModal.module.scss';
import { PaperModal } from '@/shared/ui/Modal';
import { useEffect, useRef, useState } from 'react';
import { Svg } from '@/shared/ui/Svg';
import MicroIcon from '@/shared/assets/icons/micro.svg';
import { useTranslation } from 'next-i18next';
import { LANG_DIALECT_MAP, Language } from '@/shared/config/lang';

interface VoiceSearchModalProps {
  className?: string;
  onClose: () => void;
  onResult: (result: string) => void;
}

export const VoiceSearchModal = ({
  className,
  onClose,
  onResult,
}: VoiceSearchModalProps) => {
  const { t, i18n: { language } } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  // eslint-disable-next-line
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;
    // eslint-disable-next-line
    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = LANG_DIALECT_MAP[language as Language];

    recognition.onresult = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      onResult(text);
      onClose();
    };

    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Unable to recognize speech', event.error);
    };

    recognition?.start();

    return () => {
      recognition?.stop();
    };

    // eslint-disable-next-line
  }, []);

  return (
    <PaperModal
      classes={{ wrapper: styles.wrapper }}
      centered
      isOpen
      onClose={onClose}
      className={cn(styles.root, className)}
    >
      <div className={cn(styles.microphone, { [styles.animate]: isListening })}>
        <Svg Icon={MicroIcon} width={64} height={64} fill="black" />
      </div>
      <h4 className={styles.title}>{isListening ? t('speak') : t('unable-recognize')}</h4>
      {isListening
      && (
        <div className={styles.dots}>
          <span
            className={styles.dotsItem}
          />
          <span
            className={styles.dotsItem}
          />
          <span
            className={styles.dotsItem}
          />
          <span
            className={styles.dotsItem}
          />
        </div>
      )}
    </PaperModal>
  );
};
