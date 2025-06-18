import { useCallback } from "react";
import type { z } from "zod";
// utils
import getFormConfigField from "../getters/getFormConfigField";
// interfaces
import type { FormConfig, SetState, UiValues, ZFormSchema } from "@utils/index";
import type { AnyFormConfigValues } from "@configDsl/deprecatedInterfaces";

/** @todo annotate */
const useSetField = <
  TBase extends ZFormSchema,
  // Neither should need to be passed in. All that is necessary is TConfig and the rest should be able to be derived.
  TConfig extends FormConfig<TBase>
>(
  setForm: SetState<UiValues<TBase>>,
  config?: TConfig,
  configValues?: AnyFormConfigValues<TBase>
) =>
  useCallback(
    <TField extends keyof z.input<TBase>>(
      fieldKey: TField,
      value: z.input<TBase>[TField] | null // use the applied-form-schema type instead
    ): void => {
      setForm((prevFormValues: UiValues<TBase>) => {
        const newForm = { ...prevFormValues, [fieldKey]: value };

        const fieldEffect = config && getFormConfigField(config, fieldKey).changeEvent;
        if (fieldEffect) {
          const effectValues = configValues && fieldEffect(configValues);
          return { ...newForm, ...effectValues };
        }

        return newForm;
      });
    },
    []
  );

export default useSetField;
