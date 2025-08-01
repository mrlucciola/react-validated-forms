import { useCallback } from "react";
// interfaces
import type { SetState } from "@utils/utilityTypes";
import type { ZObj } from "@utils/rootTypes";
import type { UiSchema } from "@utils/schemaTypes";
import type { UiValues } from "@utils/valueTypes";

/** Generate memoized `resetToDefault` function to reset 'user-interface' form values. */
const useResetToDefault = <TFs extends ZObj>(
  uiFormSchema: UiSchema<TFs>,
  setUiForm: SetState<UiValues<TFs>>
) => {
  /** Reset user-interface form values to their default-values (and optionally overwrite entire form)
   * ### Behavior:
   * If overwrite = false: Existing form-fields that DO NOT match keys from the passed-in `defaults` remain unchanged.
   * If overwrite = true: All form-fields are set to their `catch` values, then overwritten by fields in `defaults`.
   */
  const resetToDefault = useCallback(
    (defaults?: UiValues<TFs> | null, overwrite: boolean = false) => {
      setUiForm((prevForm) => {
        const def = defaults ?? {};
        const updatedDefaultForm = overwrite ? def : { ...prevForm, ...def };

        // Parse using the user-interface schema
        const parsed: UiValues<TFs> = uiFormSchema.parse(updatedDefaultForm);

        return parsed;
      });
    },
    []
  );

  return resetToDefault;
};

export default useResetToDefault;
