import { ClassNamesConfig } from 'react-select';
import cn from 'classnames';
import styles from './Selectfield.module.scss';

export function selectClassNames<
  Option,
>(isError?: boolean) {
  const classNames: ClassNamesConfig<Option, false> = {
    control: (props) => cn(styles.control, {
      [styles.focused]: props.menuIsOpen,
      [styles.error]: isError,
      [styles.disabled]: props.isDisabled,
    }),
    indicatorSeparator: () => styles.indicatorSeparator,
    menu: () => styles.menu,
    option: ({
      isSelected,
      isFocused,
    }) => cn(
      styles.option,
      {
        [styles.selected]: isSelected,
        [styles.focused]: isFocused,
      },
    ),
    menuList: () => styles.menuList,
    placeholder: () => styles.placeholder,
  };
  return classNames;
}

export function multiSelectClassNames<
  Option,
>(isError?: boolean) {
  const classNames: ClassNamesConfig<Option, true> = {
    control: (props) => cn(styles.control, {
      [styles.focused]: props.menuIsOpen,
      [styles.error]: isError,
    }),
    indicatorSeparator: () => styles.indicatorSeparator,
    menu: () => styles.menu,
    option: ({
      isSelected,
      isFocused,
    }) => cn(
      styles.option,
      {
        [styles.selected]: isSelected,
        [styles.focused]: isFocused,
      },
    ),
    menuList: () => styles.menuList,
    placeholder: () => styles.placeholder,
  };
  return classNames;
}
