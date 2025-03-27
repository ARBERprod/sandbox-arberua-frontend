import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import {
  BlogPostData, GetPostParams, GetPostsParams, PostsDto,
} from './types';

export const blogApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getPosts: build.query<PostsDto, GetPostsParams>({
      query: ({
        page = 1,
        slug,
      }) => ({
        url: slug
          ? `${process.env.NEXT_PUBLIC_API_URL_V2}/blogs/categories/${slug}`
          : `${process.env.NEXT_PUBLIC_API_URL_V2}/blogs`,
        params: {
          page,
        },
      }),
      merge(
        currentCacheData: PostsDto,
        responseData: PostsDto,
        otherArgs,
      ): void | PostsDto {
        if (otherArgs.arg.merge) {
          currentCacheData.data.posts.push(...responseData.data.posts);
          // eslint-disable-next-line
          currentCacheData.meta = responseData.meta;
        } else {
          return responseData;
        }
      },
      forceRefetch({
        currentArg,
        previousArg,
      }) {
        return currentArg !== previousArg;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
    getPost: build.query<BlogPostData, GetPostParams>({
      query: ({ slug }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/blogs/posts/${slug}`,
      }),
      transformResponse: (response: SuccessApiResponse<BlogPostData>) => response.data,
    }),
  }),
});

export const {
  endpoints: {
    getPosts,
    getPost,
  },
  useGetPostQuery,
  useGetPostsQuery,
} = blogApi;
