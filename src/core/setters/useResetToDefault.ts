import { useCallback } from "react";
import { z } from "zod";
// interfaces
import type { Nullish, SetState } from "@utils/utilityTypes";
import type { FormOut, ZObj } from "@fieldConfig/interfaces";
import type { UserInputFormFields } from "@core/interfaces";

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
  form: UserInputFormFields<TBase>,
  setForm: SetState<UserInputFormFields<TBase>>,
  // formSchema:UiFormSchema<TBase>,
  formSchema: TBase,
  setReferenceFormValues: SetState<UserInputFormFields<TBase>>
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
      const parsed: FormOut<TBase> = formSchema.parse(updatedDefaultForm);
      setReferenceFormValues(parsed);
      setForm(parsed);
    },
    []
  );

  return resetToDefault;
};

export default useResetToDefault;
