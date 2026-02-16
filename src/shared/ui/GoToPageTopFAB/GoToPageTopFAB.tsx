import cn from 'classnames';
import styles from './GoToPageTopFAB.module.scss';
import { useEffect, useState } from 'react';
import UpArrowIcon from '@/shared/assets/icons/up-arrow.svg';
import { Svg } from '@/shared/ui/Svg';

interface GoToPageTopFABProps {
  className?: string;
}

export const GoToPageTopFAB = ({ className }: GoToPageTopFABProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button onClick={scrollToTop} className={cn(styles.root, { [styles.visible]: isVisible }, className)}>
      <Svg Icon={UpArrowIcon} width={24} height={24} />
    </button>
  );
};
