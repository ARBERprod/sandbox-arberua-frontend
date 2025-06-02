import { memo } from 'react';
import cn from 'classnames';
import { ImageType } from '@/shared/types/common';
import { FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { AppImage } from '@/shared/ui/AppImage';
import { useTranslation } from 'next-i18next';
import styles from './ManWomanBanner.module.scss';

interface ManWomanBannerProps {
    className?: string;
    title: string;
    description: string;
    isPageBanner?: boolean;
    backgroundDesktop: ImageType;
    backgroundMobile: ImageType;
    colorWhite?: boolean;
    man: ImageType;
    woman: ImageType;
    manShadow?: ImageType;
    womanShadow?: ImageType;
    onManButtonClick?: () => void;
    onWomanButtonClick?: () => void;
    manButtonText?: string;
    womanButtonText?: string;
    classes?: {
        manShadow?: string;
        womanShadow?: string;
        manWrap?: string;
        womanWrap?: string;
        text?: string;
        womanElement?: string;
    };
    variant?: 'primary' | 'secondary';
}

export const ManWomanBanner = memo(({
  className,
  title,
  description,
  isPageBanner = false,
  colorWhite,
  backgroundDesktop,
  backgroundMobile,
  man,
  woman,
  manShadow,
  womanShadow,
  onManButtonClick,
  onWomanButtonClick,
  womanButtonText,
  manButtonText,
  classes,
  variant = 'primary',
}: ManWomanBannerProps) => {
  const { t } = useTranslation();
  return (
    <FlexCol
      align="center"
      justify="center"
      className={cn(
        styles.root,
        className,
        { [styles.is_page_banner]: isPageBanner },
      )}
    >
      <div className={styles.bg}>
        <AppImage
          unoptimized
          className={cn(styles.banner, styles.banner_desktop)}
          alt={title}
          src={backgroundDesktop}
        />
        <AppImage
          unoptimized
          className={cn(styles.banner, styles.banner_mobile)}
          alt={title}
          src={backgroundMobile}
        />
        <FlexCol className={cn(styles.title, styles.title_primary, classes?.text)} align="center" gap="8">
          <Typography
            variant="title-1"
            as="h1"
            className={cn({ [styles.white]: colorWhite })}
          >
            {title}
          </Typography>
          <Typography
            variant="body-2"
            className={cn(styles.subtitle, { [styles.white]: colorWhite })}
          >
            {description}
          </Typography>
        </FlexCol>
        <div className={styles.images}>
          <div className={cn(styles.img_item, styles.primary)}>
            <div
              className={cn(
                styles.image_wrap,
                classes?.manWrap,
                styles.image_wrap_primary,
                { [styles.with_hover]: !isPageBanner },
              )}
            >
              <div className={cn(styles.figure_wrap, styles.figure_wrap_primary)}>
                <div className={styles.shadow_wrap} />
                <AppImage
                  unoptimized
                  className={cn(
                    styles.man,
                    styles.person,
                    { [styles.is_page_banner]: isPageBanner },
                  )}
                  alt={title}
                  src={man}
                />
                {manShadow && (
                  <AppImage
                    className={
                      cn(
                        styles.man_shadow,
                        classes?.manShadow,
                        { [styles.is_page_banner]: isPageBanner },
                      )
                    }
                    alt={title}
                    src={manShadow}
                  />
                )}
              </div>
            </div>
            <div className={cn(styles.btn_wrap, styles.btn_wrap_primary)}>
              <Button
                size="large"
                className={styles.button}
                onClick={onManButtonClick}
              >
                {manButtonText || t('colovikam')}
              </Button>
            </div>
          </div>
          <div className={styles.content}>
            <FlexCol className={cn(styles.title, styles.title_secondary)} align="center" gap="8">
              <Typography
                variant="title-1"
                as="h2"
                className={cn(styles.heading, { [styles.white]: colorWhite })}
              >
                {title}
              </Typography>
              <Typography
                variant="body-2"
                className={cn(styles.subtitle, { [styles.white]: colorWhite })}
              >
                {description}
              </Typography>
            </FlexCol>

            <div className={styles.content_btns}>
              <Button
                size="large"
                className={styles.button}
                onClick={onManButtonClick}
              >
                {manButtonText || t('colovikam')}
              </Button>
              <Button
                size="large"
                className={styles.button}
                onClick={onWomanButtonClick}
              >
                {womanButtonText || t('zinkam')}
              </Button>
            </div>
          </div>

          <div className={cn(styles.img_item, styles.secondary)}>
            <div
              className={cn(
                styles.image_wrap,
                classes?.womanWrap,
                styles.image_wrap_secondary,
                { [styles.with_hover]: !isPageBanner },
              )}
            >
              <div className={cn(styles.figure_wrap, styles.figure_wrap_secondary)}>
                <div className={cn(styles.shadow_wrap, classes?.womanElement, styles[variant])} />
                <AppImage
                  unoptimized
                  className={cn(
                    styles.woman,
                    styles.person,
                    { [styles.is_page_banner]: isPageBanner },
                  )}
                  alt={title}
                  src={woman}
                />
                {womanShadow && (
                  <AppImage
                    className={cn(
                      styles.woman_shadow,
                      classes?.womanShadow,
                      { [styles.is_page_banner]: isPageBanner },
                    )}
                    alt={title}
                    src={womanShadow}
                  />
                )}
              </div>
            </div>
            <div className={cn(styles.btn_wrap, styles.btn_wrap_secondary)}>
              <Button
                size="large"
                className={styles.button}
                onClick={onWomanButtonClick}
              >
                {womanButtonText || t('zinkam')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FlexCol>
  );
});
