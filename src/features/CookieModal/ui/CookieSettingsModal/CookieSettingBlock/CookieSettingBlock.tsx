import cn from 'classnames';
import styles from './CookieSettingBlock.module.scss';
import { Typography } from '@/shared/ui/Typography';
import { CheckboxSwitch } from '@/shared/ui/Form/Checkbox/CheckboxSwitch';
import { Divider } from '@/shared/ui/Divider';

interface CookieSettingBlockProps {
  className?: string,
  title: string,
  description: string,
  name: string,
  value: boolean,
  disabled?: boolean,
  onChange?: (name:string, value: boolean) => void;
}

export const CookieSettingBlock = ({
  className,
  title,
  description,
  name,
  value,
  disabled,
  onChange,
}: CookieSettingBlockProps) => (
  <div className={cn(styles.root, className)}>
    <div className={styles.head}>
      <Typography variant="title-2">
        {title}
      </Typography>
      <CheckboxSwitch name={name} value={value} disabled={disabled} onChange={onChange} />
    </div>
    <Typography variant="body-2" className={styles.description}>
      {description}
    </Typography>
    <Divider />
  </div>
);
