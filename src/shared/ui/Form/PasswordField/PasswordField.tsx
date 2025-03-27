import { memo, useCallback, useState } from 'react';
import { TextField, TextFieldProps } from '@/shared/ui/Form/TextField';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Svg } from '@/shared/ui/Svg';
import NoEyeIcon from '@/shared/assets/icons/no-eye.svg';
import { useTranslation } from 'next-i18next';

interface PasswordFieldProps extends Omit<TextFieldProps, 'type' | 'action' | 'onActionClick' | 'autoComplete'> {
  className?: string;
}

export const PasswordField = memo((props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? 'text' : 'password';
  const Icon = showPassword ? EyeIcon : NoEyeIcon;
  const toggleType = useCallback(() => setShowPassword((prev) => !prev), [setShowPassword]);
  const { t } = useTranslation();

  return (
    <TextField
      {...props}
      type={type}
      placeholder={props.placeholder || `${t('password')}`}
      action={<Svg width={24} height={24} Icon={Icon} />}
      onActionClick={toggleType}
      autoComplete="off"
    />
  );
});
