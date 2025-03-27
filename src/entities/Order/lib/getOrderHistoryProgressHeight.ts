import { HISTORY_CONTAINER_GAP, HISTORY_ITEMS_LINE_HEIGHT } from '../config/constants';

export const getOrderHistoryProgressHeight = (
  count: number,
) => count * HISTORY_ITEMS_LINE_HEIGHT + (count - 1) * HISTORY_CONTAINER_GAP;
