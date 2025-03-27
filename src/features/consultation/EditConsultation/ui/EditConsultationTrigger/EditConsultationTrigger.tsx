import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Svg } from '@/shared/ui/Svg';
import EditIcon from '@/shared/assets/icons/edit-2.svg';
import styles from './EditConsultationTrigger.module.scss';
import {
  useEditConsultationActions,
} from '../../model/slices/editConsultationSlice';

interface EditConsultationTriggerProps {
  className?: string;
  consultationId: string;
}

export const EditConsultationTrigger = memo(({ className, consultationId }:EditConsultationTriggerProps) => {
  const { openModal } = useEditConsultationActions();
  const clickHandler = () => {
    openModal();
  };
  return (
    <div className={cn(styles.root, className)}>
      <Button color="icon" onClick={clickHandler}>
        <Svg width={24} height={24} Icon={EditIcon} />
      </Button>
    </div>
  );
});
