import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';

export interface ManWomanTab {
  title: string;
  slug: string;
}

interface ManWomanSwitcherButtonsProps {
  className?: string;
  tabs: ManWomanTab[];
  chosenTab: string;
  setChosenTab: (tab: string) => void;
}

export const ManWomanSwitcherButtons = memo(({
  className,
  chosenTab,
  setChosenTab,
  tabs,
}: ManWomanSwitcherButtonsProps) => (
  <Flex className={className} gap="12">
    {tabs.map((tab) => (
      <Button
        key={tab.slug}
        color={chosenTab === tab.slug ? 'dark' : 'transparent'}
        onClick={() => setChosenTab(tab.slug)}
        size="small"
        variant="action"
      >
        {tab.title}
      </Button>
    ))}
  </Flex>
));
