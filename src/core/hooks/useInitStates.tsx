import { useEffect, useMemo, useState } from "react";
import { isEqual } from "lodash";
// utils
import useDeepCompareMemoize from "@utils/hooks/useDeepCompareMemoize";
import useResetToDefault from "../setters/useResetToDefault";
// interfaces
import type { UiFormSchema, UiValues, ZObj } from "@utils/index";

const useInitStates = <TFs extends ZObj>(
  baseUiSchema: UiFormSchema<TFs>,
  defaults?: Partial<UiValues<TFs>>
) => {
  /** Used for dependency array updates */
  const defaultsMemo = useDeepCompareMemoize(defaults);

  const initializedForm: UiValues<TFs> = useMemo(
    () => baseUiSchema.parse(defaults ?? {}),
    [defaultsMemo]
  );
  const uninitializedForm: UiValues<TFs> = useMemo(() => baseUiSchema.parse({}), []);

  const [referenceFormValues, setReferenceFormValues] = useState<UiValues<TFs>>(initializedForm);
  const [form, setForm] = useState<UiValues<TFs>>(initializedForm);

  const resetToDefault = useResetToDefault(form, setForm, baseUiSchema, setReferenceFormValues);

  /** When `defaultValues` is updated (i.e. from request), set those fields on the `form` state
   * @todo update init-logic (see 'todo's)
   */
  useEffect(() => {
    const isSameRef = isEqual(initializedForm, referenceFormValues);
    const isSameForm = isEqual(initializedForm, form);

    // Set form after once when default-form-values is available
    // @todo Replace with below 'todo'
    if (isSameRef && isSameForm && defaults !== null) {
      resetToDefault(initializedForm);
    }
    // @todo Uncomment below line after fixed:
    // resetToDefault(baseUiSchema.parse({ ...referenceFormValues, ...form, ...defaultFormValues }));

    // @todo Apply updated default-form-values to non-dirty fields (requires defining `dirtyValues` object)
  }, [defaultsMemo]);

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
