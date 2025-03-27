import { createContext, Dispatch, SetStateAction } from 'react';
import { ImageType } from '@/shared/types/common';

interface GalleryContextProps {
  images: ImageType[];
  isGalleryOpen: boolean;
  activeSlideIndex: number;
  openGallery: (slideIndex: number) => void;
  closeGallery: () => void;
  setActiveSlideIndex: Dispatch<SetStateAction<number>>
}

export const GalleryContext = createContext<GalleryContextProps>({} as GalleryContextProps);
