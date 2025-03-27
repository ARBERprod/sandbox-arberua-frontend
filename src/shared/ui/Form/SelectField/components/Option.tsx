import { components, GroupBase, OptionProps } from 'react-select';
import { Svg } from '@/shared/ui/Svg';
import CheckIcon from '@/shared/assets/icons/check.svg';
import styles from '../styles/Selectfield.module.scss';

export const Option = <
  Option,
  Group extends GroupBase<Option> = GroupBase<Option>
>
  ({ ...props }: OptionProps<Option, false, Group>) => (
    <components.Option {...props}>
      <div className={styles.option}>
        <div>
          {props.children}
        </div>
        {props.isSelected
        && <Svg width={15} height={10} Icon={CheckIcon} />}
      </div>
    </components.Option>
  );
