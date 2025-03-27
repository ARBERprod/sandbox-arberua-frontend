import { Story } from '@storybook/react';
import { FloatingProvider } from '@/shared/lib/components/FloatingProvider';

export const FloatDecorator = (StoryComponent: Story) => (
  <FloatingProvider>
    <StoryComponent />
    <div id="portal" />
  </FloatingProvider>
);
