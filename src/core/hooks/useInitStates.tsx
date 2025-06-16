import { useEffect, useMemo, useState } from "react";
import type { z } from "zod";
import { isEqual } from "lodash";
// utils
import useResetToDefault from "../setters/useResetToDefault";
// interfaces
import type { AppliedFieldSchema, ZObj } from "@utils/index";
import type { Nullish } from "@utils/utilityTypes";
import type { UserInputFormFields } from "../interfaces";

const useInitStates = <TBase extends ZObj>(
  /** Should this be the catch schema? */
  userInputSchema: AppliedFieldSchema<TBase>,
  defaultFormValues: Nullish<z.input<TBase>> | null | undefined,
  baseSchema: TBase
) => {
  /** Used for dependency array updates */
  const defaultValuesRef = JSON.stringify(defaultFormValues);

  const initializedForm: UserInputFormFields<TBase> = useMemo(
    () => userInputSchema.parse(defaultFormValues ?? {}),
    [defaultValuesRef]
  );
  const uninitializedForm: UserInputFormFields<TBase> = useMemo(
    () => userInputSchema.parse({}),
    []
  );

  const [referenceFormValues, setReferenceFormValues] =
    useState<UserInputFormFields<TBase>>(initializedForm);
  const [form, setForm] = useState<UserInputFormFields<TBase>>(initializedForm);

  const resetToDefault = useResetToDefault<TBase>(
    form,
    setForm,
    baseSchema,
    setReferenceFormValues
  );

  /** When `defaultValues` is updated (i.e. from request), set those fields on the `form` state
   * @todo update init-logic (see 'todo's)
   */
  useEffect(() => {
    const isRefFormInit = isEqual(initializedForm, referenceFormValues);
    const isFormInit = isEqual(initializedForm, form);

    // Set form after once when default-form-values is available
    // @todo Replace with below 'todo'
    if (isRefFormInit && isFormInit && defaultFormValues !== null) {
      resetToDefault(initializedForm);
    }
    // @todo Uncomment below line after fixed:
    // resetToDefault(userInputSchema.parse({ ...referenceFormValues, ...form, ...defaultFormValues }));

    // @todo Apply updated default-form-values to non-dirty fields (requires defining `dirtyValues` object)
  }, [defaultValuesRef]);

  return {
    /** @note Used for checking if first render (**BEFORE**, state/passed in defaults are set) */
    uninitializedForm,
    /** @note Used for checking if `form` state is updated with `defaultValues` */
    initializedForm,

    /** User-input fields */
    form,
    setForm,

    /** Form initialized with `defaultValues` */
    referenceFormValues,
    setReferenceFormValues,

    // Utils
    resetToDefault,
  };
};

export default useInitStates;
