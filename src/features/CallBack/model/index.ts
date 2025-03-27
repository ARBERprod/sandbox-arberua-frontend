import { useCallbackActions } from './slices/callBackSlice';

export const useCallbackModel = () => {
  const { openModal } = useCallbackActions();

  return { openModal };
};
