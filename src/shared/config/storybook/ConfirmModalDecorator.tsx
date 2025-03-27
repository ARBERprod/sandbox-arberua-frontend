import { StoryFn } from '@storybook/react';
import { ConfirmModalContext, OpenModalOptions } from '@/shared/lib/components/ConfirmModalProvider/ConfirmModalContext';
import { useMemo } from 'react';

export const ConfirmModalDecorator = (StoryComponent: StoryFn) => {
  const valueObj = useMemo(() => ({ openModal: (options: OpenModalOptions) => {} }), []);
  return (
    <ConfirmModalContext.Provider value={valueObj}>
      <StoryComponent />
    </ConfirmModalContext.Provider>
  );
};
