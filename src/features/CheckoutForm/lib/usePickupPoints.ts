import { useGetPickupPointsQuery } from '../api/checkoutApi';

type UsePickupPointsOptions = {
  cityId?: string;
  enabled: boolean;
};

// Store pickup data source (replaces getWarehouses?type=store per the pickup
// design contract). Query is gated on `enabled` (a store method is relevant) + a
// chosen city; availability derivation for the disable-with-reason UI lives in
// derivePickupAvailability.
export const usePickupPoints = ({ cityId, enabled }: UsePickupPointsOptions) => {
  const {
    data, isLoading, isFetching, refetch,
  } = useGetPickupPointsQuery(
    { city_id: cityId },
    { skip: !enabled || !cityId },
  );

  return {
    pickupData: data,
    points: data?.points ?? [],
    isLoading: isLoading || isFetching,
    refetch,
  };
};
