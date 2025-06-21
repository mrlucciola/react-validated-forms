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
const useResetToDefault = <TFs extends ZObj>(
  form: UiValues<TFs>,
  setForm: SetState<UiValues<TFs>>,
  formSchema: UiFormSchema<TFs>,
  setReferenceFormValues: SetState<UiValues<TFs>>
) => {
  const resetToDefault = useCallback(
    (
      newDefaultValues?: Nullish<z.input<TFs>> | null,
      overwriteExistingFormValues: boolean = false
    ) => {
      const updatedDefaultForm = {
        ...(overwriteExistingFormValues ? {} : form),
        ...(newDefaultValues ?? {}),
      };
      const parsed: UiValues<TFs> = formSchema.parse(updatedDefaultForm);
      setReferenceFormValues(parsed);
      setForm(parsed);
    },
    []
  );

  return resetToDefault;
};

export default useResetToDefault;
