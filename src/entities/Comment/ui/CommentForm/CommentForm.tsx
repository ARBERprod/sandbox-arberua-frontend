import { memo } from 'react';
import cn from 'classnames';
import { MinValueValidator, RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { TextAreaField } from '@/shared/ui/Form/TextAreaField';
import { Button } from '@/shared/ui/Button';
import { StarRatingField } from '@/shared/ui/Form/StarRatingField';
import { useTranslation } from 'next-i18next';
import styles from './CommentForm.module.scss';
import { CommentFormData } from '../../model/types/CommentFormData';

interface CommentFormProps {
  className?: string;
  onSubmit: (data: CommentFormData) => void;
}

export const CommentForm = memo(({ className, onSubmit }: CommentFormProps) => {
  const { t } = useTranslation();
  const { field, submitHandler } = useForm<CommentFormData>({
    initialState: {
      content: '',
      rating: 0,
    },
    onSubmit,
    validatorConfig: {
      rating: [
        new RequiredValidator({ message: `${t('card.comment.specify_rating')}` }),
        new MinValueValidator({ value: -1, message: `${t('card.comment.rating_is_required')}` }),
      ],
      content: [new RequiredValidator({ message: `${t('card.comment.enter_your_comment')}` })],
    },
  });
  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <StarRatingField className={styles.rating} {...field('rating')} size="large" />
      <TextAreaField
        className="mt-5"
        classes={{
          control: styles.area,
        }}
        placeholder={t('card.comment.your_review')}
        {...field('content')}
      />
      <Button className="mt-4" size="large" fullWidth type="submit">{t('leave_review')}</Button>
    </form>
  );
});
