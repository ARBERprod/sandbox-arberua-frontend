import { memo, useMemo, useState } from 'react';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { SearchField } from '@/shared/ui/Form/SearchField';
import { useTranslation } from 'next-i18next';
import { Staff } from '../../../../model/types';
import { ConsultationOptionList } from '../ConsultationOptionList';
import styles from './ConsultationSelectModal.module.scss';

const filterBySearch = (
  data: Staff[],
  input: string,
) => {
  if (!input.trim()) return data;
  return data.filter((consultant) => consultant.user_name.toLowerCase().includes(input.toLowerCase()));
};

interface ConsultationSelectModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  consultants: Staff[];
  activeConsultantId: string;
  onConsultantChange: (consultantId: string) => void;
}

export const ConsultationSelectModal = memo(({
  className,
  isOpen = false,
  onConsultantChange,
  onClose,
  onBack,
  consultants,
  activeConsultantId,
}:ConsultationSelectModalProps) => {
  const [currentConsultant, setCurrentConsultant] = useState<string>(activeConsultantId);
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  const closeHandler = () => {
    onClose();
  };

  const backHandler = () => {
    onBack();
  };

  const nextHandler = () => {
    onConsultantChange(currentConsultant);
    onBack();
  };

  const consultantClickHandler = (consultantId: string) => {
    setCurrentConsultant(consultantId);
  };

  const searchChangeHandler = (value: string) => {
    setSearch(value);
  };

  const searchClearHandler = () => {
    setSearch('');
  };

  const sortedFilteredData: Staff[] = useMemo(() => filterBySearch(consultants, search), [consultants, search]);

  return (
    <MainModal
      lazy
      title={t('consultant.to_chose_consultant')}
      width={530}
      unmountOnClose
      className={cn(styles.root, className)}
      classes={{ wrapper: styles.wrapper }}
      isOpen={isOpen}
      withCloseBtn
      onClose={closeHandler}
      withBackButton
      onBack={backHandler}
      centered
    >
      <div className={cn(styles.root, className)}>
        <SearchField
          name="consultatnt"
          value={search}
          placeholder={t('consultant.find_consultant')}
          variant="lightColor"
          className={styles.search}
          onChange={searchChangeHandler}
          onRemove={searchClearHandler}
        />
        {sortedFilteredData && (
          <ConsultationOptionList
            activeConsultantId={currentConsultant}
            data={sortedFilteredData}
            onClick={consultantClickHandler}
          />
        )}
        <Button
          size="large"
          fullWidth
          onClick={nextHandler}
        >
          {t('next')}
        </Button>
      </div>
    </MainModal>

  );
});
