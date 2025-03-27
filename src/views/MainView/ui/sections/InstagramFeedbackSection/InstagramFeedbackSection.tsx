import { memo } from 'react';
import cn from 'classnames';
import { Instagram, InstagramModal, InstagramSlider } from '@/entities/InstagramFeedback';

import styles from './InstagramFeedbackSection.module.scss';

interface InstagramFeedbackSectionProps {
  className?: string;
  instagrams: Instagram[];
}

export const InstagramFeedbackSection = memo(({ className, instagrams = [] }:InstagramFeedbackSectionProps) => {
  if (instagrams.length === 0) return null;
  return (
    <section className={cn(styles.root, className)}>
      <InstagramSlider instagrams={instagrams} />
      <InstagramModal />
    </section>
  );
});
