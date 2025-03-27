import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { CheckoutForm, CheckoutFormData } from '@/features/CheckoutForm';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { NoSSR } from '@/shared/lib/components/NoSSR';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import { useAuth } from '@/entities/Session';
import { Loader } from '@/shared/ui/Loader';
import { AuthByEmailForm } from '@/features/auth/AuthByEmail';
import { FlexCol } from '@/shared/ui/Flex';
import { AuthBySocials } from '@/features/auth/AuthBySocials';
import { RecoverPassword } from '@/features/auth/RecoverPassword';
import { CheckoutCart } from '../CheckoutCart';
import styles from './Checkout.module.scss';
import { CheckoutTabs } from '../CheckoutTabs';
import { checkoutSelectors } from '../../model/selectors/checkoutSelectors';
import { checkoutReducer, useCheckoutActions } from '../../model/slices/checkoutSlice';

interface CheckoutProps {
    className?: string;
}

export const Checkout = memo(({ className }: CheckoutProps) => {
  const {
    isAuth, userData, isFetching, isLoaded,
  } = useAuth();
  const isTablet = useMediaQuery(breakpoints.tablet);
  const currentTab = useSelector(checkoutSelectors.getCurrentTab);
  const promoCode = useSelector(checkoutSelectors.getPromoCode);
  const { setTab } = useCheckoutActions();
  const showCheckoutCard = isTablet || currentTab === 'regular';

  const onAuthFormSubmit = () => {
    setTab('new');
  };
  const initState: Partial<CheckoutFormData> | undefined = useMemo(() => {
    if (!isAuth || !userData) return undefined;
    return {
      customer: {
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        middle_name: userData.middle_name || '',
        phone: userData.phone,
      },
    };
  }, [isAuth, userData]);
  const renderContent = () => {
    if (isFetching || !isLoaded) return <Loader className={styles.loader} />;
    return (
      <>
        {
          !isAuth
                    && <CheckoutTabs className="mb-7" />
        }
        {currentTab === 'new'
                    && (
                      <CheckoutForm
                        promoCode={promoCode}
                        cartSlot={isTablet ? undefined : <CheckoutCart />}
                        initState={initState}
                      />
                    )}
        {
          currentTab === 'regular' && (
            <FlexCol gap="32">
              <AuthByEmailForm
                recoverPasswordSlot={
                  <RecoverPassword />
                }
                onSubmit={onAuthFormSubmit}
              />
              {/* <AuthBySocials onSuccess={onAuthFormSubmit} variant="icon" /> */}
            </FlexCol>
          )
        }
      </>
    );
  };
  return (
    <DynamicModuleLoader reducers={{ checkout: checkoutReducer }}>
      <NoSSR>
        <div className={cn(styles.root, className)}>
          <div className={styles.left}>
            {renderContent()}
          </div>
          <div className={styles.right}>
            {showCheckoutCard && <CheckoutCart />}
          </div>
        </div>
      </NoSSR>
    </DynamicModuleLoader>
  );
});
