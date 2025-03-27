import { useEffect, useMemo } from 'react';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { useErrorNotification } from '@/shared/ui/Notification';
import { useGetWarehousesQuery } from '../api/checkoutApi';
import { DeliveryMethod } from '../api/types';
import { checkoutOptionsMapper } from './checkoutOptionsMapper';
import { useTranslation } from 'next-i18next';

type UseWarehousesOptions = {
  deliveryMethod?: DeliveryMethod;
  cityId?: string;
  onEmptyResults?: () => void;
};

export const useWarehouses = ({
  deliveryMethod,
  onEmptyResults,
  cityId,
}: UseWarehousesOptions) => {
  const { t } = useTranslation();
  const { notify } = useErrorNotification(
    t('no-nova-poshta-branches'),
  );
  const { data, isLoading } = useGetWarehousesQuery(
    { city_id: cityId, type: deliveryMethod?.code },
    { skip: !deliveryMethod || !cityId || deliveryMethod.type !== 'storage' },
  );

  useEffect(() => {
    if (!data) return;
    if (data.length === 0) {
      onEmptyResults?.();
      notify();
    }
    // eslint-disable-next-line
  }, [data]);

  const warehousesOptions: SingleSelectOption[] = useMemo(() => {
    if (!data) return [];
    return data.map(checkoutOptionsMapper.mapWarehouseToSelectOption);
  }, [data]);

  return {
    warehousesOptions,
    isLoading,
  };
};
