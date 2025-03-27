import {
  memo, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Container } from '@/shared/ui/Container';
import { Breadcrumps } from '@/shared/ui/Breadcrumps';
import { routerPaths } from '@/shared/config/router';
import { Typography } from '@/shared/ui/Typography';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { Flex } from '@/shared/ui/Flex';
import { Vacancy, VacancyDescription, VacancyItem } from '@/entities/Vacancy';
import { Svg } from '@/shared/ui/Svg';
import ChevronRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField/types/types';
import { useTranslation } from 'next-i18next';
import { City } from '@/entities/Location';
import styles from './VacancyView.module.scss';
import { useGetVacancyDataQuery } from '../../api/vacancyApi';
import { Loader } from '@/shared/ui/Loader';

interface VacancyViewProps {
  className?: string;

}

export const VacancyView = memo(({
  className,
}: VacancyViewProps) => {
  const [city, setCity] = useState<City | null>(null);
  const {
    data,
    isLoading,
    isFetching,
  } = useGetVacancyDataQuery({ city_id: city?.id });
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const onChange = (name: string, value: string) => {
    const city = data?.cities.find((city) => city.id === value);
    if (city) {
      setCity(city);
      setActiveVacancy(null);
    }
  };

  const vacancyChangeHandler = (vacancy: Vacancy) => {
    setActiveVacancy(vacancy);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const cityOptions: SingleSelectOption[] = useMemo(() => {
    if (!data) return [];
    return data.cities.map((city) => ({
      value: city.id,
      label: city.title,
    }));
  }, [data]);

  const vacanciesCrop = useMemo(() => {
    if (!data) return [];
    return data.vacancies;
  }, [data]);
  const { t } = useTranslation(['common', 'vacancy-page']);
  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <Breadcrumps className={styles.breadcrumps}>
          <Link href={routerPaths.main}>
            <Typography as="span" variant="body-2">{t('common:main')}</Typography>
          </Link>
          <Typography color="black" variant="body-2">
            {t('vacancy-page:vacancy.title')}
          </Typography>
        </Breadcrumps>
        <Typography variant="title-2" className={styles.title}>{t('vacancy-page:vacancy.title')}</Typography>
        <SelectField
          className={cn(styles.select, 'hide-mobile-tablet')}
          name="city"
          value={city?.id || ''}
          onChange={onChange}
          options={cityOptions}
          placeholder={t('common:city')}
        />
        {(isLoading || isFetching) ? <Loader className={styles.loader} />
          : (
            <Flex gap="16" className={styles.body}>
              <div className={styles.left}>
                <div className={styles.desktopList}>
                  {vacanciesCrop.map((vacancy) => (
                    <button
                      className={styles.vacancyItem}
                      onClick={() => vacancyChangeHandler(vacancy)}
                      key={vacancy.id}
                    >
                      <Typography>{vacancy.title}</Typography>
                      <Svg Icon={ChevronRightIcon} width={12} height={7} />
                    </button>
                  ))}
                </div>
                <div className={styles.mobileList}>
                  {vacanciesCrop.map((vacancy) => <VacancyItem vacancy={vacancy} key={vacancy.id} />)}
                </div>
                <div className={styles.info}>
                  <Typography className={styles.text} variant="body-2">
                    {t('vacancy-page:vacancy.text')}
                  </Typography>
                  <Typography as="a" variant="title-5" color="blue" href={t('common:contact.mail.link')}>
                    {t('common:contact.mail')}
                  </Typography>
                  <SelectField
                    className={cn(styles.select, 'hide-desktop mt-7')}
                    name="city"
                    value={city?.id || ''}
                    onChange={onChange}
                    options={cityOptions}
                  />
                </div>
              </div>
              <div ref={infoRef} className={styles.right}>
                {activeVacancy
                  && <VacancyDescription vacancy={activeVacancy} />}
              </div>
            </Flex>
          )}
      </Container>
    </div>
  );
});
