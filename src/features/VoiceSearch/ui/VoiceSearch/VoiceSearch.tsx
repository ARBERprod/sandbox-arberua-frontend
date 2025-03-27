import cn from 'classnames';
import styles from './VoiceSearch.module.scss';
import { useState } from 'react';
import { VoiceSearchModal } from '../VoiceSearchModal';
import MicroIcon from '@/shared/assets/icons/micro.svg';
import { Svg } from '@/shared/ui/Svg';

interface VoiceSearchProps {
  className?: string;
  onResult: (result: string) => void;
}

export const VoiceSearch = ({
  className,
  onResult,
}: VoiceSearchProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button type="button" onClick={() => setIsModalOpen(true)} className={cn(styles.root, className)}>
        <Svg fill="grey-dark" width={18} height={18} Icon={MicroIcon} />
      </button>
      {isModalOpen
        && <VoiceSearchModal onResult={onResult} onClose={closeHandler} />}
    </>
  );
};
