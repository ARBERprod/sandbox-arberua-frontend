import { CSSProperties, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { getWayForPayForm } from '@/features/CheckoutForm';
import { wrapper } from '@/shared/config/store/makeStore';
import { routerPaths } from '@/shared/config/router';
import { Typography } from '@/shared/ui/Typography';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Button } from '@/shared/ui/Button';

interface WayForPayPageProps {
  formHTML: string | null;
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

const WayForPayPage = ({ formHTML = '', isError }: WayForPayPageProps) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const goToHomePage = () => {
    push(routerPaths.main);
  };

  useEffect(() => {
    if (isError) return;

    const submitBtn = document.querySelector('[type=submit]') as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.click();
    }

    // eslint-disable-next-line
  }, []);

  if (isError || !formHTML) {
    return (
      <div style={wrapperStyles}>
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
      <div
        style={{ visibility: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: formHTML }}
      />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<WayForPayPageProps>(
  (store) => async ({ query, locale }) => {
    const orderId = query.order_id as string;

    const { data: formHTML, isError } = await store.dispatch(
      getWayForPayForm.initiate({ orderId }),
    );

    return {
      props: {
        formHTML: formHTML || null,
        isError,
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  },
);

export default WayForPayPage;
