import { User } from '@/entities/User';
import { TFunction } from 'next-i18next';
import dayjs from 'dayjs';

interface UserDataToDisplay {
  fullName: string;
  phone: string;
  email: string;
  sex: string;
  birthday: string;
}

export const getUserDataToDisplay = (t: TFunction) => (userData: User | null): UserDataToDisplay => {
  if (!userData) {
    return {
      fullName: '',
      birthday: '',
      sex: t('male-small'),
      email: '',
      phone: '',
    };
  }
  const sexMap = {
    male: t('male-big'),
    female: t('female-big'),
  };

  const firstName = userData.first_name || '';
  const lastName = userData.last_name || '';
  const middleName = userData.middle_name || '';
  const phone = userData.phone || '';
  const email = userData.email || '';
  const birthday = userData.birthday ? dayjs(new Date(userData.birthday)).format('DD.MM.YYYY') : '';
  const sex = userData.sex ? sexMap[userData.sex] : t('male-big');
  return {
    fullName: `${lastName} ${firstName} ${middleName}`.trim(),
    phone,
    email,
    sex,
    birthday,
  };
};
