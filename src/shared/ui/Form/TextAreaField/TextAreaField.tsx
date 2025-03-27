import React, {
  ChangeEventHandler, HTMLAttributes, TextareaHTMLAttributes, useId,
} from 'react';

import cn from 'classnames';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Label } from '../Label';
import styles from './TextAreaField.module.scss';

type TextAreaAttributes = Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onBlur'>

export interface TextAreaFieldProps extends TextAreaAttributes {
   name: string;
   className?: string;
   classes?: {
      label?: string;
      control?: string;
   };
   value?: TextareaHTMLAttributes<HTMLTextAreaElement>['value'];
   placeholder?: string;
   onChange?: (name: string, value: string) => void;
   onBlur?: (name: string) => void;
   label?: string;
   error?: string;
 }

export const TextAreaField = ({
  name,
  className,
  classes,
  value,
  placeholder,
  onChange,
  onBlur,
  label,
  error,
  ...rest
}: TextAreaFieldProps) => {
  const id = useId();
  const errorMessageId = useId();

  const changeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange?.(e.target.name, e.target.value);
  };

  const blurHandler = () => {
    onBlur?.(name);
  };
  return (
    <div className={cn(styles.root, {
      [styles.error]: Boolean(error),
    }, className)}
    >
      {label && <Label htmlFor={id} className={cn(styles.label, classes?.label)}>{label}</Label>}
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-errormessage={errorMessageId}
        name={name}
        className={cn(styles.textarea, classes?.control)}
        onChange={changeHandler}
        onBlur={blurHandler}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      {error && (
        <ErrorMessage id={errorMessageId} error={error} />
      )}
    </div>
  );
};
