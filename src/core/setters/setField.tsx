import { useCallback } from "react";
import type { z } from "zod";
// utils
import getFormConfigField from "../getters/getFormConfigField";
// interfaces
import type { FormConfig, SetState, UiValues, ZObj } from "@utils/index";

/** @todo annotate */
const useSetField = <TFs extends ZObj, TConfig extends FormConfig<TFs>>(
  setForm: SetState<UiValues<TFs>>,
  config?: TConfig,
  configValues?: InferConfigValues<TConfig> // not yet created
) =>
  useCallback(
    <TField extends keyof z.input<TFs>>(
      fieldKey: TField,
      value: z.input<TFs>[TField] | null // use the applied-form-schema type instead
    ): void => {
      setForm((prevFormValues: UiValues<TFs>) => {
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
