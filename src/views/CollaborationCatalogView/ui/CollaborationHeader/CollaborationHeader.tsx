import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import type { CollaborationDetails } from '@/entities/Collaboration';
import styles from './CollaborationHeader.module.scss';

interface CollaborationHeaderProps {
  className?: string;
  collaboration: CollaborationDetails;
}

// The banner is the LCP element of the section. `fetchpriority` is spelled lowercase and passed
// through a spread: @types/react 18.0.35 predates the attribute, while React forwards an unknown
// lowercase attribute to the DOM untouched.
const FETCH_PRIORITY_HIGH: Record<string, string> = { fetchpriority: 'high' };

export const CollaborationHeader = memo(({ className, collaboration }: CollaborationHeaderProps) => {
  // All three images are nullable by contract: mobile falls back to the horizontal banner, and
  // <picture> is skipped altogether when neither exists — an <img> without src renders broken.
  const banner = collaboration.banner_vertical ?? collaboration.banner_horizontal;

  return (
    <div className={cn(styles.root, className)}>
      {banner && (
        <picture className={styles.banner}>
          {collaboration.banner_horizontal && (
            <source media="(min-width: 768px)" srcSet={collaboration.banner_horizontal} />
          )}
          <img
            {...FETCH_PRIORITY_HIGH}
            src={banner}
            alt={collaboration.title}
            width={1440}
            height={480}
          />
        </picture>
      )}
      <div className={styles.heading}>
        {collaboration.logo && (
          <img
            className={styles.logo}
            src={collaboration.logo}
            alt={collaboration.title}
            width={160}
            height={80}
          />
        )}
        <Typography variant="title-2" centered className={styles.title}>
          {collaboration.title}
        </Typography>
      </div>
      {collaboration.description && (
        <div
          className={styles.description}
          // Source is the admin panel, not user input — same call as PageView/ArticlePostView.
          dangerouslySetInnerHTML={{ __html: collaboration.description }}
        />
      )}
    </div>
  );
});
