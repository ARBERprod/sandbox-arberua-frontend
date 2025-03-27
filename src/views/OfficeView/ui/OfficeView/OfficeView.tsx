import { memo, useMemo } from 'react';
import { Svg } from '@/shared/ui/Svg';
import PhoneIcon from '@/shared/assets/icons/phone-4.svg';
import EmailIcon from '@/shared/assets/icons/envelope-3.svg';
import LockIcon from '@/shared/assets/icons/lock.svg';
import LocationIcon from '@/shared/assets/icons/location-2.svg';
import UserIcon from '@/shared/assets/icons/user-2.svg';
import { useSelector } from 'react-redux';
import {
  EditPersonalDataFormView,
  editPersonalDataReducer,
  editPersonalDataSelectors,
  PersonalDataModal,
  useEditPersonalDataModel,
} from '@/features/EditPersonalData';

import { useAuth } from '@/entities/Session';

import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { useTranslation } from 'next-i18next';
import { OfficeDataItem } from '../OfficeDataItem';
import { OfficeDataAddresses } from '../OfficeDataAddresses';
import styles from './OfficeView.module.scss';
import { getUserDataToDisplay } from '../../lib/getUserDataToDisplay';

export const OfficeView = memo(() => {
  const { userData } = useAuth();
  const { t } = useTranslation();

  const {
    phone,
    sex,
    birthday,
    fullName,
    email,
  } = useMemo(() => getUserDataToDisplay(t)(userData), [t, userData]);
  const $$editPersonalDataModel = useEditPersonalDataModel();

  const openModalClickHandler = (formView: EditPersonalDataFormView) => {
    $$editPersonalDataModel.openModal();
    $$editPersonalDataModel.setActiveEditPersonalDataFormView(formView);
  };

  const isModalOpen = useSelector(editPersonalDataSelectors.getIsModalOpen);

  return (
    <DynamicModuleLoader reducers={{ editPersonalData: editPersonalDataReducer }}>
      <div className={styles.root}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <OfficeDataItem
              Icon={<Svg Icon={UserIcon} width="48" height="48" className={styles.svg} />}
              data={[
                {
                  title: t('fio'),
                  content: fullName,
                },
                {
                  title: t('sex'),
                  content: sex,
                },
                {
                  title: t('birthday'),
                  content: birthday,
                },
              ]}
              onModalOpen={() => openModalClickHandler(EditPersonalDataFormView.PERSONAL_DATA_FORM)}
            />
          </li>
          <li className={styles.item}>
            <OfficeDataItem
              Icon={<Svg Icon={PhoneIcon} width="48" height="48" className={styles.svg} />}
              data={[
                {
                  title: t('phone-number'),
                  content: phone,
                },
              ]}
              onModalOpen={() => openModalClickHandler(EditPersonalDataFormView.PHONE_NUMBER_FORM)}
            />
          </li>
          <li className={styles.item}>
            <OfficeDataItem
              Icon={<Svg Icon={EmailIcon} width="48" height="48" className={styles.svg} />}
              data={[
                {
                  title: t('email'),
                  content: email,
                },
              ]}
              onModalOpen={() => openModalClickHandler(EditPersonalDataFormView.EMAIL_FORM)}
            />
          </li>
          <li className={styles.item}>
            <OfficeDataItem
              Icon={<Svg Icon={LockIcon} width="48" height="48" className={styles.svg} />}
              data={[
                {
                  title: t('password'),
                  content: '********',
                },
              ]}
              onModalOpen={() => openModalClickHandler(EditPersonalDataFormView.PASSWORD_FORM)}
            />
          </li>
          <li className={styles.item}>
            <OfficeDataItem
              Icon={<Svg Icon={LocationIcon} width="48" height="48" className={styles.svg} />}
              slot={(
                <OfficeDataAddresses />
              )}
            />
          </li>
        </ul>
      </div>
      {isModalOpen && <PersonalDataModal />}
    </DynamicModuleLoader>
  );
});
