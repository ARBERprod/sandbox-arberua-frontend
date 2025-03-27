import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { ArticlePost, BlogCategory, Post } from '../model/types';
import { Product } from '@/entities/Product';

export type PostsDto = SuccessApiResponseWithMeta<{
  categories: BlogCategory[];
  posts: Post[];
  breadcrumbs: Breadcrumb[];
}>;

export type GetPostsParams = {
  page?: number;
  slug?: string;
  merge?: boolean;
}

export type GetPostParams = {
  slug: string;
}

export type BlogPostData = {
  post: ArticlePost;
  previous: string | null;
  relates: Product[];
  next: string | null;
  breadcrumbs: Breadcrumb[];
}
