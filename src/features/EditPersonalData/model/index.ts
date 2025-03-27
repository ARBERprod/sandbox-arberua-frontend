import { useEditPersonalDataActions } from './slices/editPersonalDataSlice';

export const useEditPersonalDataModel = () => {
  const {
    openModal,
    closeModal,
    setActiveEditPersonalDataFormView,
  } = useEditPersonalDataActions();

  return {
    openModal,
    closeModal,
    setActiveEditPersonalDataFormView,
  };
};
