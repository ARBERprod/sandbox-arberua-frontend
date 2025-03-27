import React, {
  ChangeEventHandler,
  FocusEventHandler, forwardRef,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from 'react';
import cn from 'classnames';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { getNumberValue } from '@/shared/lib/utils/getNumberValue';
import { Label } from '../Label';
import styles from './TextField.module.scss';

type InputAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>;

export interface TextFieldProps extends InputAttributes {
  name?: string;
  className?: string;
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  action?: ReactNode;
  onActionClick?: () => void;
  autoComplete?: 'off';
  min?: number;
  max?: number;
  size?: 'normal' | 'big';

  classes?: {
    control?: string;
    input?: string;
    action?: string;
    label?: string;
  }
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  name,
  className,
  value,
  type = 'text',
  placeholder,
  disabled,
  onChange,
  onBlur,
  label,
  error,
  action,
  onActionClick,
  classes,
  min,
  max,
  size = 'normal',
  ...rest
}: TextFieldProps, ref) => {
  const id = useId();
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    if (type === 'number') {
      const newValue = getNumberValue(value);
      onChange(name, newValue);
      return;
    }
    onChange(name, value);
  };

  const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    if (type === 'number') {
      if (min !== undefined && Number(value) < min) {
        onChange(name, String(min));
      }
      if (max !== undefined && Number(value) > max) {
        onChange(name, String(max));
      }
      if (Number(value) === 0) {
        onChange(name, String(0));
      }
    }
    onBlur?.(name);
  };
  const inputProps = {
    id,
    name,
    placeholder,
    value: type === 'number' ? Number(value).toString() : value,
    type,
    disabled,
    onChange: changeHandler,
    onBlur: blurHandler,
    min,
    max,
    ...rest,
  };
  return (
    <div className={cn(styles.root, {
      [styles.error]: Boolean(error),
    }, className)}
    >
      {label && <Label htmlFor={id} className={cn(styles.label, classes?.label)}>{label}</Label>}
      <div className={cn(styles.control, classes?.control, styles[size])}>
        <input
          className={cn(styles.input, classes?.input)}
          ref={ref}
          {...inputProps}
        />
        {action && <button className={cn(styles.action, classes?.action)} onClick={onActionClick} type="button">{action}</button>}
      </div>
      {error && (
        <ErrorMessage error={error} />
      )}
    </div>
  );
});
