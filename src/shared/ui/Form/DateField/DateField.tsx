import React, {
  memo,
  ChangeEventHandler,
  FocusEventHandler,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from 'react';
import { Label } from '@/shared/ui/Form/Label';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import InputMask from 'react-input-mask';
import cn from 'classnames';
import styles from './DateField.module.scss';

type InputAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>;

export interface DateFieldProps extends InputAttributes {
  name?: string;
  className?: string;
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  disabled?: boolean;
  label?: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  action?: ReactNode;
  onActionClick?: () => void;
  autoComplete?: 'off';
  size?: 'normal' | 'big';

  classes?: {
    control?: string;
    input?: string;
    action?: string;
    label?: string;
  }
}

export const DateField = memo(({
  name,
  className,
  value,
  disabled,
  onChange,
  onBlur,
  label,
  error,
  action,
  onActionClick,
  classes,
  size = 'normal',
  ...rest
}:DateFieldProps) => {
  const id = useId();
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.target;
    onBlur?.(name);
  };
  const inputProps = {
    id,
    name,
    value,
    disabled,
    onChange: changeHandler,
    onBlur: blurHandler,
    ...rest,
  };

  return (
    <div className={cn(styles.root, {
      [styles.error]: Boolean(error),
    }, className)}
    >
      {label && <Label htmlFor={id} className={cn(styles.label, classes?.label)}>{label}</Label>}
      <div className={cn(styles.control, classes?.control, styles[size])}>
        <InputMask
          className={cn(styles.input, classes?.input)}
          mask="99.99.9999"
          maskPlaceholder={null}
          maskChar=""
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
