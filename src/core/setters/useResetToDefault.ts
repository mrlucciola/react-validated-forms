import { useCallback } from "react";
// interfaces
import type { UiValues, SetState, UiFormSchema, ZObj } from "@utils/index";
import type { FsDefaults } from "@core/types";

/** Generate memoized `resetToDefault` function to reset 'user-interface' form values. */
const useResetToDefault = <TFs extends ZObj>(
  uiFormSchema: UiFormSchema<TFs>,
  setUiForm: SetState<UiValues<TFs>>,
  setReferenceFormValues: SetState<UiValues<TFs>>
) => {
  /** Reset user-interface form values to their default-values (and optionally overwrite entire form)
   * ### Behavior:
   * If overwrite = false: Existing form-fields that DO NOT match keys from the passed-in `defaults` remain unchanged.
   * If overwrite = true: All form-fields are set to their `catch` values, then overwritten by fields in `defaults`.
   */
  const resetToDefault = useCallback(
    (defaults?: FsDefaults<TFs> | null, overwrite: boolean = false) => {
      setUiForm((prevForm) => {
        const updatedDefaultForm = {
          ...(overwrite ? {} : prevForm),
          ...(defaults ?? {}),
        };

        // Parse using the user-interface schema
        const parsed: UiValues<TFs> = uiFormSchema.parse(updatedDefaultForm);

        // Keep reference-copy of user-interface-form-values in sync
        setReferenceFormValues(parsed);

        return parsed;
      });
    },
    []
  );

  return resetToDefault;
};

export default useResetToDefault;
