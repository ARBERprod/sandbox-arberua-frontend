import { memo } from 'react';
import cn from 'classnames';
import { Contacts } from '@/shared/ui/Contacts';
import { ContactUsFormWrapper } from '@/shared/ui/ContactUsFormWrapper';
import styles from './OfficeFeedbackView.module.scss';
import { OfficeFeedbackForm } from '@/features/ContactUsForm';

interface OfficeFeedbackProps {
  className?: string;
}

export const OfficeFeedbackView = memo(({ className }: OfficeFeedbackProps) => (
  <div className={cn(styles.root, className)}>
    <ContactUsFormWrapper
      slotLeft={<Contacts />}
      slotRight={(
        <OfficeFeedbackForm />
      )}
    />
  </div>
));
