import { ImageType } from '@/shared/types/common';

type Consultant = {
  id: string;
  user_name: string;
  picture: ImageType;
  url: string;
}

export interface Consultation {
  id: string;
  date: string;
  review?: {
    rating: number;
    comment: string;
  }
  consultant: Consultant,
  status?: string;
  format?: string;
  addresses?: string[];
  address?: string;
  city?: string;
}

export type ConsultationType = 'offline' | 'online';
