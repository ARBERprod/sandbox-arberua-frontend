import { memo, useState } from 'react';
import cn from 'classnames';
import { SelectField, SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { noop } from '@/shared/lib/utils/noop';
import { ConsultantsPlaceholder } from './components/ConsultantsPlaceholder';
import { ConsultationSelectModal } from './components/ConsultationSelectModal';
import styles from './ConsultantPicker.module.scss';
import { Staff } from '../../model/types';
import { ConsultantCard } from '../ConsultantCard';

interface ConsultantPickerProps {
  className?: string;
  name: string;
  value: string;
  label?: string;
  error?: string;
  consultants: Staff[];
  onChange: (name: string, value: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
  onCloseModal: () => void;
  onBack: () => void;
}

export const ConsultantPicker = memo(({
  className,
  name,
  value,
  onChange,
  label,
  consultants = [],
  onFocus,
  error,
  onCloseModal,
  disabled,
  onBack,
}:ConsultantPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const options: SingleSelectOption[] = consultants.map((consultant) => (
    {
      value: consultant.id,
      label: <ConsultantCard consultant={consultant} variant="small" />,
    }
  ));
  const onClose = () => {
    setIsModalOpen(false);
    onCloseModal();
  };

  const focusHandler = () => {
    onFocus?.();
    setIsModalOpen(true);
  };

  const changeHandler = (consultantId: string) => {
    onChange(name, consultantId);
  };

  const backHandler = () => {
    setIsModalOpen(false);
    onBack();
  };

  return (
    <>
      <SelectField
        className={cn(styles.root, className)}
        name={name}
        value={value}
        options={options}
        label={label}
        onChange={noop}
        disabled={disabled}
        onFocus={focusHandler}
        menuIsOpen={false}
        error={error}
      />
      <ConsultationSelectModal
        isOpen={isModalOpen}
        onConsultantChange={changeHandler}
        onClose={onClose}
        consultants={consultants}
        activeConsultantId={value}
        onBack={backHandler}
      />
    </>
  );
});
