import { useCallback } from "react";
import { z } from "zod";
// interfaces
import type { UiValues, Nullish, SetState, UiFormSchema, ZObj } from "@utils/index";

/**
 * @todo add description
 *
 * @param form
 * @param setForm
 * @param formSchema
 * @param setReferenceFormValues
 * @returns
 */
const useResetToDefault = <TBase extends ZObj>(
  form: UiValues<TBase>,
  setForm: SetState<UiValues<TBase>>,
  formSchema: UiFormSchema<TBase>,
  // formSchema: TBase,
  setReferenceFormValues: SetState<UiValues<TBase>>
) => {
  const resetToDefault = useCallback(
    (
      newDefaultValues?: Nullish<z.input<TBase>> | null,
      overwriteExistingFormValues: boolean = false
    ) => {
      const updatedDefaultForm = {
        ...(overwriteExistingFormValues ? {} : form),
        ...(newDefaultValues ?? {}),
      };
      const parsed: UiValues<TBase> = formSchema.parse(updatedDefaultForm);
      setReferenceFormValues(parsed);
      setForm(parsed);
    },
    []
  );

  return resetToDefault;
};

export default useResetToDefault;
