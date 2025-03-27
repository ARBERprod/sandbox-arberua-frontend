import { memo, ReactNode } from 'react';
import { Button, ButtonProps } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { useSignUpForConsultationActions } from '../../model/slices/signUpForConsultationSlice';
import { ConsultationType } from '@/entities/Consultation';
import { Staff } from '@/entities/Staff';

interface SignUpForConsultationTriggerProps {
  format: ConsultationType;
  consultants: Staff[];
  isConsultantPredefined?: true;
  shopId: string;
  consultantId?: string;
  className?: string;
  buttonProps?: Pick<ButtonProps<'button'>, 'color' | 'size' | 'fullWidth'>;
  children?: ReactNode;
}

export const SignUpForConsultationTrigger = memo(({
  className,
  buttonProps = {
    color: 'dark',
    size: 'large',
    fullWidth: false,
  },
  format,
  consultants = [],
  shopId,
  isConsultantPredefined,
  consultantId,
  children,
}: SignUpForConsultationTriggerProps) => {
  const { openModal } = useSignUpForConsultationActions();
  const { t } = useTranslation();
  const clickHandler = () => {
    openModal({
      format, consultantId, consultants, shopId, blockConsultant: isConsultantPredefined || false,
    });
  };
  return (
    <Button {...buttonProps} className={className} onClick={clickHandler}>
      {children || t('enroll')}
    </Button>
  );
});
