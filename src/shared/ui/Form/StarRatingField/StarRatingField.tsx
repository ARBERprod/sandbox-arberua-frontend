import { memo } from 'react';
import cn from 'classnames';
import { StarRating, StarRatingProps } from '@/shared/ui/StarRating';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import styles from './StarRatingField.module.scss';

interface StarRatingFieldProps extends Omit<StarRatingProps, 'onClick' | 'className'> {
  className?: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  error?: string;
}

export const StarRatingField = memo(({
  className, name, value, onChange, error, ...ratingProps
}: StarRatingFieldProps) => {
  const changeHandler = (rating: number) => {
    onChange(name, rating);
  };

  return (
    <div className={cn(styles.root, className)}>
      <StarRating value={value} onClick={changeHandler} {...ratingProps} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
});
