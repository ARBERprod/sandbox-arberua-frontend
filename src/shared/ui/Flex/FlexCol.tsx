import { ElementType } from 'react';
import { Flex, FlexProps } from './Flex';

export const FlexCol = <E extends ElementType = any>(props: FlexProps<E>) => {
  const { children, direction } = props;
  return (
    <Flex direction={direction || 'column'} {...props}>
      {children}
    </Flex>
  );
};
