declare module 'react-inner-image-zoom' {
  import * as React from 'react';

  export interface InnerImageZoomProps {
    src: string;
    srcSet?: string;
    sizes?: string;
    sources?: Array<{
      srcSet: string;
      type?: string;
      media?: string;
      sizes?: string;
    }>;
    width?: number;
    height?: number;
    hasSpacer?: boolean;
    imgAttributes?: React.ImgHTMLAttributes<HTMLImageElement>;
    zoomSrc?: string;
    zoomScale?: number;
    zoomPreload?: boolean;
    moveType?: 'pan' | 'drag';
    zoomType?: 'click' | 'hover';
    fadeDuration?: number;
    fullscreenOnMobile?: boolean;
    mobileBreakpoint?: number;
    hideCloseButton?: boolean;
    hideHint?: boolean;
    className?: string;
    afterZoomIn?: () => void;
    afterZoomOut?: () => void;
  }

  const InnerImageZoom: React.FC<InnerImageZoomProps>;
  export default InnerImageZoom;
}
