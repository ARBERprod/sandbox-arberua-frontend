import { Flex, FlexProps } from '@/shared/ui/Flex/Flex';
import { ElementType } from 'react';

export const FlexCenter = <E extends ElementType = ElementType>(props: FlexProps<E>) => {
  const { children, justify, align } = props;
  return (
    <Flex justify={justify || 'center'} align={align || 'center'} {...props}>
      {children}
    </Flex>
  );
};
