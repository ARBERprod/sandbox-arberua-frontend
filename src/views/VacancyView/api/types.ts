import { Vacancy } from '@/entities/Vacancy';
import { City } from '../../../entities/Location';

export type VacancyData = {
  cities: City[];
  vacancies: Vacancy[];
}
