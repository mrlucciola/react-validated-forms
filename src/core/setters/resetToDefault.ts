import { z } from "zod";
// utils
import setForm from "../functions/setForm";
// interfaces
import type { Nullish } from "../../utils/utilityTypes";
import type { FormOut, ZObj } from "../../fieldConfig/interfaces";

const resetToDefault = <TBase extends ZObj>(
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
};

export default resetToDefault;
