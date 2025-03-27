import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout } from '@/layouts/MainLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { BlogPostData, getPost } from '@/entities/Blog';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { ArticlePostView } from '@/views/ArticlePostView';
import { routerPaths } from '@/shared/config/router';

interface PostPageProps {
  articleData: BlogPostData;
}

const PostPage = ({ articleData }: PostPageProps) => (
  <MainLayout>
    <ArticlePostView
      article={articleData.post}
      recommended={articleData.relates}
      next={articleData.next}
      breadcrumbs={articleData.breadcrumbs}
      previous={articleData.previous}
    />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps<PostPageProps>((store) => async ({
  query,
  locale,
}) => {
  const {
    data,
    isError,
  } = await store.dispatch(getPost.initiate({
    slug: query.slug as string,
  }));

  if (isError || !data) {
    return {
      redirect: {
        permanent: false,
        destination: routerPaths.not_found,
      },
    };
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      articleData: data,
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});

export default PostPage;
