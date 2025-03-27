import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { TFunction, useTranslation } from 'next-i18next';
import { AuthModalType } from '../../model/types/AuthSchema';
import { useAuthActions } from '../../model/slices/authSlice';
import styles from './AuthProposal.module.scss';

type authProposalGetter=(t:TFunction)=> Record<'login' | 'register', {
  text: string;
  linkText: string;
  modalType: AuthModalType
}>
const proposalMap:authProposalGetter = (t:TFunction) => ({
  login: {
    text: t('auth.proposal.text'),
    linkText: t('sign_in'),
    modalType: AuthModalType.LOGIN_USERNAME,
  },
  register: {
    text: t('auth.proposal.text1'),
    linkText: t('auth.proposal.text2'),
    modalType: AuthModalType.REGISTER,
  },
});

interface AuthProposalProps {
  className?: string;
  to: 'login' | 'register'
}

export const AuthProposal = memo(({ className, to }:AuthProposalProps) => {
  const { setActiveModal } = useAuthActions();
  const { t } = useTranslation();
  const clickHandler = () => {
    setActiveModal(proposalMap(t)[to].modalType);
  };
  return (
    <div data-testid="AuthProposal" className={cn(styles.root, className)}>
      <Typography variant="body-2" color="grey-dark">
        {proposalMap(t)[to].text}
      </Typography>
      <Typography as="button" onClick={clickHandler} variant="body-2" className={styles.btn}>{proposalMap(t)[to].linkText}</Typography>
    </div>
  );
});
