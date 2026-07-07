import { Tabs, type TabItem } from '../../../components/Tabs';

interface ProgressTabsProps {
  tabs: TabItem[];
  activeIndex: number;
  completedIndexes: number[];
}

export function ProgressTabs({ tabs, activeIndex, completedIndexes }: ProgressTabsProps) {
  return <Tabs tabs={tabs} activeIndex={activeIndex} completedIndexes={completedIndexes} />;
}
