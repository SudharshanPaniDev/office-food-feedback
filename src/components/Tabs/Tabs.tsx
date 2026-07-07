import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeIndex: number;
  completedIndexes?: number[];
  onSelect?: (index: number) => void;
}

export function Tabs({ tabs, activeIndex, completedIndexes = [], onSelect }: TabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        const isCompleted = completedIndexes.includes(index);
        const classes = [
          styles.tab,
          isActive ? styles.active : '',
          isCompleted && !isActive ? styles.completed : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={tab.id}
            type="button"
            className={classes}
            onClick={() => onSelect?.(index)}
            disabled={!onSelect}
          >
            <span className={styles.stepNumber}>{index + 1}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
