import { CSSProperties, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Button } from '@/shared/ui/Button';
import { wrapper } from '@/shared/config/store/makeStore';
import { getXPayForm } from '@/features/CheckoutForm';
import { Typography } from '@/shared/ui/Typography';
import { Loader } from '@/shared/ui/Loader';

interface XPayPageProps {
  url: string | null;
  isError: boolean;
}

const wrapperStyles: CSSProperties = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '12px',
};

const XPayPage = ({ url = '', isError }: XPayPageProps) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const goToHomePage = () => {
    push(routerPaths.main);
  };

  useEffect(() => {
    if (isError || !url) return;

    window.location.href = url;

    // eslint-disable-next-line
  }, []);

  if (isError || !url) {
    return (
      <div style={wrapperStyles}>
        {JSON.stringify({ url, isError })}
        <ErrorMessage error={t('error_occurred')} />
        <Button size="xsmall" onClick={goToHomePage}>
          {t('not_found_view.to_home_btn')}
        </Button>
      </div>
    );
  }

  return (
    <div style={wrapperStyles}>
      <Typography>{t('wait_for_payment')}</Typography>
      <Loader size={24} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<XPayPageProps>(
  (store) => async ({ query, locale }) => {
    const orderId = query.order_id as string;

    const { data: url, isError } = await store.dispatch(
      getXPayForm.initiate({ orderId }),
    );

    return {
      props: {
        url: url || null,
        isError,
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  },
);

export default XPayPage;
