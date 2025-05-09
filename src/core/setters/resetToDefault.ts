import type { Nullish } from "../../common/interfaces";
import type { FormOut, ZObj } from "../../fieldConfig/interfaces";
import setForm from "../functions/setForm";

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
