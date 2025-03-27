import { memo } from 'react';
import { useGetConsultationsQuery } from '@/entities/Consultation';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { Typography } from '@/shared/ui/Typography';
import { noop } from '@/shared/lib/utils/noop';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { EditConsultationTrigger } from '@/features/consultation/EditConsultation';
import styles from './ConsultationsList.module.scss';
import { ConsultantCard } from '@/entities/Staff';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';

interface ConsultationsListProps {
  className?: string;
}

export const ConsultationsList = memo(({ className }:ConsultationsListProps) => {
  const { data: consultations, isLoading, isError } = useGetConsultationsQuery();
  const { t } = useTranslation();
  if (isLoading) return <Loader centered />;
  if (!consultations || isError) return <ErrorMessage error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      <Flex gap="8">
        <SelectField
          className="w-full"
          placeholder={t('office.all-consultation')}
          name="filter"
          value=""
          onChange={noop}
          options={[]}
        />
        <SelectField
          className="w-full"
          placeholder={t('sort')}
          name="sort"
          value=""
          onChange={noop}
          options={[]}
        />
      </Flex>
      <FlexCol className="mt-4" as="ul" fullWidth gap="12">
        {consultations.map((consultation) => (
          <li key={consultation.id}>
            <ExpandableCard>
              <Flex direction="column" gap="12">
                <Flex align="center">
                  <Typography variant="body-3" className={styles.title}>
                    {t('office.date')}
                    :
                  </Typography>
                  <Typography variant="body-3" className={styles.content}>{consultation.date}</Typography>
                </Flex>
                <Flex align="center">
                  <Typography variant="body-3" className={styles.title}>
                    {t('office.status')}
                    :
                  </Typography>
                  <Typography variant="body-3" className={styles.content}>{consultation.status}</Typography>
                </Flex>
                <Flex align="center">
                  <Typography variant="body-3" className={styles.title}>
                    {t('office.format')}
                    :
                  </Typography>
                  <Typography variant="body-3" className={styles.content}>{consultation.format}</Typography>
                </Flex>
                <Flex align="center">
                  <Typography variant="body-3" className={styles.title}>
                    {t('office.consultant')}
                    :
                  </Typography>
                  <ConsultantCard consultant={consultation.consultant} />
                </Flex>
              </Flex>
            </ExpandableCard>
          </li>

        ))}
      </FlexCol>
    </div>
  );
});
