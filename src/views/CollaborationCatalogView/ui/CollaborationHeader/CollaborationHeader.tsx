import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { AppImage } from '@/shared/ui/AppImage';
import { toImageHost } from '@/shared/lib/utils/toImageHost';
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
  // The banner keeps <picture> for art direction (a different image per breakpoint, which
  // next/image cannot express), so the move to the image host AppImage does for its own src is
  // done here by hand, once per source.
  const horizontal = collaboration.banner_horizontal && toImageHost(collaboration.banner_horizontal);
  const banner = collaboration.banner_vertical ? toImageHost(collaboration.banner_vertical) : horizontal;

  return (
    <div className={cn(styles.root, className)}>
      {banner && (
        <picture className={styles.banner}>
          {horizontal && (
            <source media="(min-width: 768px)" srcSet={horizontal} />
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
          <AppImage
            className={styles.logo}
            src={collaboration.logo}
            // Decorative: the title it sits next to says the same thing, and a screen reader
            // would otherwise read the name twice.
            alt=""
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
