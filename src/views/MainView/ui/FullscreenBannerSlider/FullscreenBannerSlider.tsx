import { memo, useMemo } from 'react';
import { Slide, Slider } from '@/shared/ui/Slider';
import { Button } from '@/shared/ui/Button';
import { Autoplay, Pagination } from 'swiper';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { BannerCategory, BannerItem } from '../../api/types';
import styles from './FullscreenBannerSlider.module.scss';
import { FullscreenBannerSlide } from '../FullscreenBannerSlide';
import Banner from '../../../../../public/banner.jpg';
import BannerMob from '../../../../../public/banner-mobile.jpg';
import BannerTablet from '../../../../../public/banner-tablet.jpg';
import Banner1 from '../../../../../public/banner-1.jpg';
import BannerMob1 from '../../../../../public/banner-mobile-1.jpg';
import BannerTablet1 from '../../../../../public/banner-tablet-1.jpg';

interface FullscreenBannerSliderProps {
  className?: string;
  classes?: {
    slider?: string;
    slide?: string;
  };
  bannerData: BannerItem[];
  categories: BannerCategory[];
}

export const FullscreenBannerSlider = memo(({
  className,
  classes,
  bannerData = [],
  categories,
}: FullscreenBannerSliderProps) => {
  const router = useRouter();
  const { push, locale } = router;

  const banners = useMemo(() => (bannerData.map((item) => {
    if (!locale) return item;
    const { translations } = item;
    const { picture_desktop, picture_tablet, picture_mobile } = translations?.[locale] || {};

    if (item.type === 'video') {
      return {
        ...item,
      };
    }

    if (!picture_desktop && !picture_tablet && !picture_mobile) return null;

    return {
      ...item,
      url: picture_desktop,
      mobileUrl: picture_mobile,
      tabletUrl: picture_tablet,
      link: item.link,
    };
  }).filter(Boolean)), [bannerData, locale]);

  console.log('banners', banners);

  const slidesList:Slide[] = [...banners].map((item, index) => ({
    id: index,
    slide: (
      <FullscreenBannerSlide
        src={item?.url}
        srcMob={item?.mobileUrl}
        srcTab={item?.tabletUrl}
        type={item?.type}
        link={item?.link}
      />
    ),
  }));

  const defaultButtons = categories.filter((category, index) => index < 2).reverse();
  const notFormattedThirdButton = categories.length > 2 ? categories[2] : null;
  const thirdButton = notFormattedThirdButton?.url.includes('https://') ? {
    title: notFormattedThirdButton?.title,
    url: `https://${notFormattedThirdButton?.url.split('https://')[1]}`,
  } : notFormattedThirdButton;

  return (
    <div className={cn(styles.root, className)}>
      <Slider
        className={classes?.slider}
        onBeforeInit={() => {}}
        spaceBetween={0}
        grabCursor
        slides={slidesList}
        slideClassName={classes?.slide}
        slidesPerView="auto"
        loop
        pagination={{
          clickable: true,
          renderBullet(_, className) {
            return `<span class="${className} ${styles.bullet}"></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
      />
      {thirdButton ? (
        <div className={cn(styles.buttonsWrapper)}>
          <div className={cn(styles.buttons)}>
            {defaultButtons.map((category) => (
              <Button
                key={category.url}
                className={cn(styles.btn)}
                color="light-primary"
                size="large"
                onClick={() => push(category.url)}
                style={{
                  lineHeight: '18px',
                }}
              >
                {category.title}
              </Button>
            ))}
          </div>
          {!!thirdButton && (
            <Button
              className={cn(styles.finalSaleBtn)}
              size="large"
              onClick={() => push(thirdButton.url)}
              style={{
                lineHeight: '18px',
              }}
            >
              {thirdButton.title}
            </Button>
          )}
        </div>
      ) : (
        <div className={cn(styles.buttonsDefault)}>
          {defaultButtons.map((category) => (
            <Button
              key={category.url}
              className={cn(styles.btn)}
              color="light-primary"
              size="large"
              onClick={() => push(category.url)}
              style={{
                lineHeight: '18px',
              }}
            >
              {category.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
});
