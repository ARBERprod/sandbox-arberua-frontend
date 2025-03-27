import {
  FormEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import _cloneDeep from 'lodash.clonedeep';
import { set as _set } from 'object-path';
import _get from 'lodash.get';
import { FormValidator } from './validator/FormValidator';
import { TargetValidator, Validator } from './validator/validators/Validator';
import { FormField } from './FormField';
import { isField } from './utils/type-guards';
import {
  FormDataPaths, FormState, UseFormProps, ValidationMode, ValidatorConfig,
} from './types';
import { getInitialState } from './utils/getInitialState';
import { getFormData } from './utils/getFormData';
import { getArrayFieldName, isArrayElement, unregisterHandler } from './utils/unregisterHandler';
import { useNotification } from '@/shared/ui/Notification';
import { useTranslation } from 'next-i18next';
import { getRandomEventId } from '../../utils/getRandomEventId';

export const useForm = <FormData extends Record<string, any>>({
  initialState = {} as FormData,
  validatorConfig = {} as ValidatorConfig<FormData>,
  onSubmit,
  onSuccess,
  validationMode = 'onSubmit',
  clearFormAfterSuccess,
}: UseFormProps<FormData>) => {
  const {
    fieldPaths: initFieldPaths,
    initState,
    // eslint-disable-next-line
  } = useMemo(() => getInitialState(initialState), []);
  const { t } = useTranslation();
  const [mode] = useState<ValidationMode>(validationMode);
  const [fieldPaths, setFieldPaths] = useState<string[]>(initFieldPaths);
  const [formState, setFormState] = useState<FormState<FormData>>(initState);
  const [formValidator, setFormValidator] = useState(() => new FormValidator(validatorConfig));
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [touchedFieldsPaths, setTouchedFieldsPaths] = useState<string[]>([]);
  const { notify } = useNotification({ type: 'error', title: t('notify_error_text') });

  const validateForm = useCallback((overridedFieldPaths?: string[]) => {
    const paths = overridedFieldPaths || fieldPaths;
    const errors = formValidator.getFormErrors(formState, paths);
    const isValid = Object.keys(errors).length === 0;
    setIsValid(isValid);
    setErrors(errors);
    return isValid;
  }, [fieldPaths, formState, formValidator]);

  const register = useCallback((
    fieldName: string,
    initialValue?: any,
    validators?: (TargetValidator | Validator)[],
  ) => {
    if (fieldPaths.includes(fieldName)) return;

    setFormState((prev: any) => {
      const newState = _cloneDeep(prev);
      const newField = new FormField(initialValue || '', fieldName);
      _set(newState, fieldName, newField);
      return newState;
    });
    if (validators && validators.length > 0) {
      setFormValidator((prevValidator) => prevValidator.appendConfig(fieldName, validators));
    }
    setFieldPaths((prev) => prev.concat([fieldName]));
  }, [fieldPaths]);

  const unregister = useCallback((fieldName: string) => {
    if (!fieldPaths.includes(fieldName)) return;

    setFieldPaths((prev) => {
      const segments = fieldName.split('.');
      if (!isArrayElement(segments)) {
        return prev.filter((path) => path !== fieldName);
      }
      const arrayFieldName = getArrayFieldName(segments);
      const newItemsCount = prev.filter((path) => path.includes(arrayFieldName)).length - 1;
      return prev.filter((path) => !path.includes(arrayFieldName))
        .concat(
          new Array(newItemsCount).fill(null)
            .map((_, index) => `${arrayFieldName}.${index}`),
        );
    });

    setFormState(unregisterHandler(fieldName));

    setErrors(unregisterHandler(fieldName));

    setFormValidator((prev) => prev.removeConfig(fieldName));
  }, [fieldPaths]);

  const changeHandler = useCallback(<Value, >(name: string, value: Value) => {
    setServerErrors({});
    setFormState((prev: FormState<FormData>) => {
      const newState = _cloneDeep(prev);
      _set(newState, `${name}.value`, value);
      return newState;
    });
  }, []);

  const blurHandler = useCallback((name: string) => {
    if (touchedFieldsPaths.includes(name)) return;
    setTouchedFieldsPaths((prev) => prev.concat([name]));
  }, [touchedFieldsPaths]);

  const formDataGetter = useCallback(() => getFormData(formState), [formState]);

  const submitHandler = useCallback(async (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSubmitted(true);
    const isValid = validateForm();
    if (!isValid) {
      notify();
      return;
    }
    if (onSubmit) {
      setSubmitting(true);
      try {
        const formData = formDataGetter();
        const eventId = getRandomEventId();
        await onSubmit(formData, eventId);
        setSubmitting(false);
        if (clearFormAfterSuccess) {
          setFormState(initState);
          setSubmitted(false);
        }
        if (onSuccess) {
          onSuccess(eventId);
        }
      } catch (error) {
        notify();
        setSubmitting(false);
        setServerErrors(error as any);
      }
    }
  }, [validateForm, onSubmit, formDataGetter, clearFormAfterSuccess, initState, notify, onSuccess]);

  useEffect(() => {
    if (mode === 'onChange') {
      validateForm();
    }
    if (mode === 'onSubmit' && isSubmitted) {
      validateForm();
    }
    if (mode === 'onTouched') {
      if (!isSubmitted) {
        validateForm(touchedFieldsPaths);
      } else {
        validateForm();
      }
    }
  }, [formState, mode, isSubmitted, touchedFieldsPaths, validateForm]);

  const field = useCallback((name: FormDataPaths<FormData>) => {
    const field = _get(formState, name);
    if (isField(field)) {
      return {
        name,
        value: field.value,
        error: _get(errors, name) || _get(serverErrors, name),
        onChange: changeHandler,
        onBlur: blurHandler,
      } as const;
    }
    throw new Error(`Name ${name} is doesn't valid name in form data!`);
  }, [formState, errors, serverErrors, changeHandler, blurHandler]);

  return useMemo(() => ({
    formState,
    getFormData: formDataGetter,
    changeHandler,
    field,
    submitHandler,
    isSubmitting,
    isValid,
    register,
    unregister,
    formValidator,
  }), [
    formState,
    formDataGetter,
    changeHandler,
    field,
    submitHandler,
    isSubmitting,
    isValid,
    register,
    unregister,
    formValidator,
  ]);
};
