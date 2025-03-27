export const submitFormOutside = (formId: string) => {
  const form = document?.getElementById(formId) as HTMLFormElement;
  if (form) {
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  }
};
