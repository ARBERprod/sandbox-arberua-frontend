import {
  ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { ImageType } from '@/shared/types/common';
import { GalleryContext } from '../../context/GalleryContext';

interface GalleryProviderProps {
  children: ReactNode;
  initImages: ImageType[];
}

export const GalleryProvider = ({
  initImages = [],
  children,
}: GalleryProviderProps) => {
  const [images, setImages] = useState(initImages);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    setImages(initImages);
  }, [initImages]);

  const openGallery = useCallback((slideIndex: number) => {
    setActiveSlideIndex(slideIndex);
    setGalleryOpen(true);
  }, []);
  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
    setActiveSlideIndex(0);
  }, []);

  const providedValue = useMemo(() => ({
    images,
    isGalleryOpen,
    activeSlideIndex,
    openGallery,
    closeGallery,
    setActiveSlideIndex,
  }), [activeSlideIndex, closeGallery, images, isGalleryOpen, openGallery]);

  return (
    <GalleryContext.Provider value={providedValue}>
      {children}
    </GalleryContext.Provider>
  );
};
