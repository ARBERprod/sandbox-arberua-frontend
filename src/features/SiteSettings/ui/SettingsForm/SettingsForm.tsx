import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Svg } from '@/shared/ui/Svg';
import { useForm } from '@/shared/lib/hooks/useForm';
import { useSettingsForm } from '../../lib/useSettingsForm';
import { languagesOptionsMocked } from '../../constants/mockFormOptions';
import { SettingsFormData } from '../../model/types/SettingsFormData';
import styles from './SettingsForm.module.scss';

interface SettingsFormProps {
  className?: string;
}

export const SettingsForm = memo(({ className }: SettingsFormProps) => {
  const { t } = useTranslation();

  const {
    onSubmit, initialState,
  } = useSettingsForm();

  const {
    field,
    submitHandler,
  } = useForm<SettingsFormData>({
    initialState,
    onSubmit,
  });

  return (
    <div className={cn(styles.root, className)}>
      <Flex justify="center" className={styles.logo_wrap}>
        <Svg className={styles.logo} Icon={LogoIcon} />
      </Flex>
      <Typography variant="body-1" className={styles.title}>{t('settings-form.title')}</Typography>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={cn(styles.row, styles.secondary)}>
          <div className={styles.field}>
            <SelectField
              {...field('language')}
              options={languagesOptionsMocked}
              label={t('language')}
              placeholder={t('language')}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <Button type="submit" size="large" fullWidth>{t('settings-form.confirm')}</Button>
          </div>
        </div>
      </form>
    </div>
  );
});
