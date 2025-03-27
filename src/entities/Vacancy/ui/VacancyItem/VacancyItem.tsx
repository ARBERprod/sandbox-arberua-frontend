import { memo } from 'react';
import cn from 'classnames';
import { AccordionItem } from '@/shared/ui/Accordion/AccordionItem';
import { Vacancy, VacancyDescription } from '@/entities/Vacancy';
import styles from './VacancyItem.module.scss';

interface VacancyItemProps {
  className?: string;
  vacancy: Vacancy;
}

export const VacancyItem = memo(({
  className,
  vacancy,
}: VacancyItemProps) => (
  <AccordionItem
    className={cn(styles.root, className)}
    title={vacancy.title}
    content={<VacancyDescription vacancy={vacancy} />}
  />
));
