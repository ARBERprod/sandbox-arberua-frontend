import { memo } from 'react';
import cn from 'classnames';
import styles from './LabelCollaboration.module.scss';

interface LabelCollaborationProps {
  className?: string;
  label: string;
}

// `label` comes from the admin panel ready to render — the "ARBER ×" prefix is editable text,
// so it is never assembled, translated or trimmed on the client.
export const LabelCollaboration = memo(({ className, label }: LabelCollaborationProps) => (
  <span className={cn(styles.root, className)}>
    {label}
  </span>
));
