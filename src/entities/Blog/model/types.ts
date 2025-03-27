import { ImageType } from '@/shared/types/common';

export interface Post {
  url: string;
  title: string;
  description: string;
  created_at: string;
  reading_time: string;
  picture: ImageType;
}

export interface BlogCategory {
  title: string;
  url: string;
}

export interface ArticlePost extends Post {
  description: string;
}
