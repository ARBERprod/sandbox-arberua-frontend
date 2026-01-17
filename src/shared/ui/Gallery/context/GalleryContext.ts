import { createContext, Dispatch, SetStateAction } from 'react';
import { GalleryImage } from '@/shared/types/common';

interface GalleryContextProps {
  images: GalleryImage[];
  isGalleryOpen: boolean;
  activeSlideIndex: number;
  openGallery: (slideIndex: number) => void;
  closeGallery: () => void;
  setActiveSlideIndex: Dispatch<SetStateAction<number>>
}

export const GalleryContext = createContext<GalleryContextProps>({} as GalleryContextProps);
