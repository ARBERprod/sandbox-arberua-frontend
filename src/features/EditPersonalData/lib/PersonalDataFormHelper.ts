import { User } from '@/entities/User';
import dayjs from 'dayjs';
import { UserPersonalFormData } from '../model/types/types';
import { PersonalDataBody } from '../api/types';
import { defaultData } from '../config/personalFormConfig';

class PersonalDataFormHelper {
  private getInitBirthday(birthday: string | null): string {
    if (!birthday) return '';
    const date = dayjs(new Date(birthday));

    return date.format('DD.MM.YYYY');
  }

  private transformBirthday(birthday?: string): string {
    if (!birthday) return '';
    return birthday.split('.').reverse().join('-');
  }

  getInitialFormState(userData: User | null): UserPersonalFormData {
    if (!userData) return defaultData;

    const birthdate = this.getInitBirthday(userData.birthday);
    const sex = userData.sex || 'male';

    return {
      birthday: birthdate,
      sex,
      first_name: userData.first_name,
      last_name: userData.last_name,
      middle_name: userData.middle_name || '',
    };
  }

  prepareFormStateToSending(formData: UserPersonalFormData): PersonalDataBody {
    return {
      ...formData,
      birthday: this.transformBirthday(formData.birthday),
    };
  }
}

export const personalDataFormHelper = new PersonalDataFormHelper();
