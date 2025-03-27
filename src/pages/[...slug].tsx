import { wrapper } from '@/shared/config/store/makeStore';
import { routerPaths } from '@/shared/config/router';
import { getPageRedirect } from '@/entities/Redirects';

export default function RedirectPage() {
  return null;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({
  query,
}) => {
  try {
    const slug = Array.isArray(query.slug) ? query.slug.join('/') : query.slug;
    const { data: redirectData } = await store.dispatch(getPageRedirect.initiate({ slug }));
    const redirectUrl = redirectData?.data?.[0]?.destination;

    if (redirectUrl) {
      return {
        redirect: {
          destination: redirectUrl,
          permanent: true,
        },
      };
    }

    return {
      redirect: {
        destination: routerPaths.not_found,
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: routerPaths.not_found,
        permanent: false,
      },
    };
  }
});
