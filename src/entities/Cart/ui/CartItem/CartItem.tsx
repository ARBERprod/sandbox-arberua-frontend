import { memo } from 'react';
import cn from 'classnames';
import { ICartItem } from '@/entities/Cart';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import { Svg } from '@/shared/ui/Svg';
import DeleteIcon from '@/shared/assets/icons/close.svg';
import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import styles from './CartItem.module.scss';
import { displayPrice } from '@/shared/lib/utils/displayPrice';
import Link from 'next/link';
import { measurementsPost, pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { useUserId } from '@/entities/Session';

interface CartItemProps {
  className?: string;
  cartItem: ICartItem;
  onDelete?: (itemId: string) => void;
  onAdd?: (itemId: string) => void;
  onRemove?: (itemId: string) => void;
  withCounter?: boolean;
}

export const CartItem = memo(({
  cartItem, onAdd, onDelete, withCounter, onRemove, className,
}:CartItemProps) => {
  const {
    quantity,
    id,
    title,
    brand,
    category,
    picture,
    cost,
    options,
    variant,
    parent_id,
  } = cartItem;
  const clientId = useUserId();

  const deleteHandler = () => {
    const items = [{
      id: parent_id || id,
      name: title,
      category,
      brand,
      variant,
      price: cost.value,
      currency: 'UAH',
      quantity,
    }];

    const itemsMeasurements = [{
      item_id: parent_id,
      item_name: title,
      affiliation: 'Онлайн-магазин',
      // coupon: '',
      currency: 'UAH',
      // discount: '',
      // index: 0,
      item_brand: brand,
      item_category: category,
      // item_list_id: product.category.id,
      // item_list_name: product.category.title,
      item_variant: variant || '',
      price: cost.value || 0,
      quantity,
    }];

    const params = {
      currency: 'UAH',
      value: cost.value || 0,
      items: itemsMeasurements,
    };

    measurementsPost({
      name: 'remove_from_cart',
      params,
      client_id: clientId,
    });

    pushDataLayerEvent({
      event: 'remove_from_cart',
      ecommerce: {
        items,
      },
    });

    onDelete?.(id);
  };
  const addHandler = () => {
    onAdd?.(id);
  };
  const removeHandler = () => {
    onRemove?.(id);
  };
  return (
    <Flex gap="16" className={cn(styles.root, { [styles.withCounter]: withCounter }, className)}>
      <Link href={cartItem.url} className={styles.image}>
        <AppImage unoptimized alt={title} src={picture} />
      </Link>
      <FlexCol fullWidth>
        <Flex justify="between" align="start" gap="8">
          <Link href={cartItem.url}>
            <Typography as="span" variant="body-2">
              {title}
              {!withCounter && ` (${quantity})`}
            </Typography>
          </Link>
          {onDelete
            && (
              <button onClick={deleteHandler}>
                <Svg stroke="grey-dark" width={10} height={10} Icon={DeleteIcon} />
              </button>
            )}
        </Flex>
        {options?.map(({ title, value }) => (
          <Typography key={id} className={styles.property} variant="body-3">
            {title}
            :
            {' '}
            {value}
          </Typography>
        ))}
        {withCounter
        && (
          <Flex align="start" className={styles.counter} gap="10">
            <button onClick={removeHandler}>
              <Svg height={12} width={12} Icon={MinusIcon} />
            </button>
            <Typography>{quantity}</Typography>
            <button onClick={addHandler}>
              <Svg height={12} width={12} Icon={PlusIcon} />
            </button>
          </Flex>
        )}
        <Typography variant="body-2" className={styles.price}>
          {displayPrice(cost) || 0}
        </Typography>
      </FlexCol>
    </Flex>
  );
});
