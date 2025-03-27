import { memo, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { Breadcrumps } from '@/shared/ui/Breadcrumps';
import { FeedbackForm } from '@/features/ContactUsForm';
import { ContactUsFormWrapper } from '@/shared/ui/ContactUsFormWrapper';
import { Contacts } from '@/shared/ui/Contacts';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { FaqSectionDesktop } from '../FaqSectionDesktop';
import { FaqSectionMobile } from '../FaqSectionMobile';
import AboutIcon from '@/shared/assets/icons/faq/about.svg';
import CartIcon from '@/shared/assets/icons/faq/cart.svg';
import CooperationIcon from '@/shared/assets/icons/faq/cooperation.svg';
import LoyaltyIcon from '@/shared/assets/icons/faq/loyalty.svg';
import ReturnIcon from '@/shared/assets/icons/faq/return-and-swap.svg';
import DeliveryIcon from '@/shared/assets/icons/faq/delivery.svg';
import RefundIcon from '@/shared/assets/icons/faq/refund.svg';
import OrderIcon from '@/shared/assets/icons/faq/order.svg';
import { faqViewReducer, useFaqViewActions } from '../../model/slices/faqViewSlice';
import { faqViewSelectors } from '../../model/selectors/faqViewSelectors';
import styles from './FaqView.module.scss';
import { FaqTab } from '../../model/types/types';

interface FaqViewProps {
  className?: string;
}

const getTabs = (t: (key: string) => string): FaqTab[] => [
  {
    id: '1',
    title: t('faq:title.orders'),
    contents: [
      {
        id: '1',
        title: t('faq:subtitle.orders.1'),
        description: t('faq:answer.orders.1'),
      },
      {
        id: '2',
        title: t('faq:subtitle.orders.2'),
        description: t('faq:answer.orders.2'),
      },
      {
        id: '3',
        title: t('faq:subtitle.orders.3'),
        description: t('faq:answer.orders.3'),
      },
      {
        id: '4',
        title: t('faq:subtitle.orders.4'),
        description: t('faq:answer.orders.4'),
      },
    ],
    picture: OrderIcon,
  },
  {
    id: '2',
    title: t('faq:title.delivery'),
    contents: [
      {
        id: '1',
        title: t('faq:subtitle.delivery.1'),
        description: t('faq:answer.delivery.1'),
      },
      {
        id: '2',
        title: t('faq:subtitle.delivery.2'),
        description: t('faq:answer.delivery.2'),
      },
      {
        id: '3',
        title: t('faq:subtitle.delivery.3'),
        description: t('faq:answer.delivery.3'),
      },
    ],
    picture: DeliveryIcon,
  },
  {
    id: '3',
    title: t('faq:title.refund'),
    contents: [
      {
        id: '1',
        title: t('faq:subtitle.refund.1'),
        description: t('faq:answer.refund.1'),
      },
      {
        id: '2',
        title: t('faq:subtitle.refund.2'),
        description: t('faq:answer.refund.2'),
      },
    ],
    picture: RefundIcon,
  },
  {
    id: '4',
    title: t('faq:title.returns'),
    contents: [
      {
        id: '1',
        title: t('faq:subtitle.returns.1'),
        description: t('faq:answer.returns.1'),
      },
      {
        id: '2',
        title: t('faq:subtitle.returns.2'),
        description: t('faq:answer.returns.2'),
      },
      {
        id: '3',
        title: t('faq:subtitle.returns.3'),
        description: t('faq:answer.returns.3'),
      },
    ],
    picture: ReturnIcon,
  },
  {
    id: '5',
    title: t('faq:title.arber-club'),
    contents: [
      {
        id: '1',
        title: t('faq:subtitle.arber-club.1'),
        description: t('faq:answer.arber-club.1'),
      },
    ],
    picture: LoyaltyIcon,
  },
  {
    id: '6',
    title: t('faq:title.availability'),
    contents: [
      {
        id: '1',
        title: t('faq:subtitle.availability.1'),
        description: t('faq:answer.availability.1'),
      },
      {
        id: '2',
        title: t('faq:subtitle.availability.2'),
        description: t('faq:answer.availability.2'),
      },
    ],
    picture: CartIcon,
  },
  {
    id: '7',
    title: t('faq:title.cooperation'),
    contents: [
      {
        id: '1',
        title: t('faq:subtitle.cooperation.1'),
        description: t('faq:answer.cooperation.1'),
      },
    ],
    picture: CooperationIcon,
  },
  // {
  //   id: '8',
  //   title: t('faq:title.registration'),
  //   contents: [
  //     {
  //       id: '1',
  //       title: t('faq:subtitle.registration.1'),
  //       description: t('faq:answer.registration.1'),
  //     },
  //     {
  //       id: '2',
  //       title: t('faq:subtitle.registration.2'),
  //       description: t('faq:answer.registration.2'),
  //     },
  //     {
  //       id: '3',
  //       title: t('faq:subtitle.registration.3'),
  //       description: t('faq:answer.registration.3'),
  //     },
  //   ],
  //   picture: UserIcon,
  // },
];

export const FaqView = memo(({ className }:FaqViewProps) => {
  const currentTab = useSelector(faqViewSelectors.getCurrentTab);
  const currentQuestions = useSelector(faqViewSelectors.getCurrentQuestions);
  const { t } = useTranslation();
  const { setCurrentTab, setCurrentQuestions } = useFaqViewActions();
  const tabs = useMemo(() => getTabs(t), [t]);
  useEffect(() => {
    if (!tabs || currentTab === null) return;
    const questions = tabs.find((tab) => tab.id === currentTab)?.contents || [];
    setCurrentQuestions(questions);
  }, [currentTab, setCurrentQuestions, tabs]);

  const onTabClickHandler = (id: string) => {
    setCurrentTab(id);
  };

  return (
    <DynamicModuleLoader reducers={{ faqPage: faqViewReducer }}>
      <div className={cn(styles.root, className)}>
        <Container>
          <Flex justify="center">
            <Breadcrumps className={styles.bc}>
              <Typography variant="body-2">{t('main')}</Typography>
              <Typography variant="body-2" color="black">{t('menu.faq')}</Typography>
            </Breadcrumps>
          </Flex>
          <Typography variant="title-2" centered className={styles.title}>{t('menu.faq')}</Typography>
          <div className={styles.inner}>
            <FaqSectionDesktop
              className={cn(styles.faq, 'hide-mobile-tablet')}
              currentTab={currentTab}
              currentQuestions={currentQuestions}
              tabs={tabs}
              onClick={onTabClickHandler}
            />
            <FaqSectionMobile
              className={cn(styles.faq, 'hide-desktop')}
              tabs={tabs}
            />
            <Flex justify="center">
              <ContactUsFormWrapper
                title={t('faq.contact-us')}
                background="grey"
                className={styles.form}
                variant="secondary"
                slotRight={<Contacts variant="faqPage" />}
                slotLeft={<FeedbackForm showTitle={false} />}
              />
            </Flex>
          </div>
        </Container>
      </div>
    </DynamicModuleLoader>
  );
});
