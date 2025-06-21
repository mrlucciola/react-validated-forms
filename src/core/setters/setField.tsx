import { useCallback } from "react";
import type { z } from "zod";
// utils
import getFieldConfig from "../getters/getFieldConfig";
// interfaces
import type { CfgDefMeta, CfgFs, FormConfigValues, SetState, UiValues } from "@utils/index";

/** @todo annotate */
const useSetField = <TConfig extends CfgDefMeta, TFs extends CfgFs<TConfig> = CfgFs<TConfig>>(
  setForm: SetState<UiValues<TFs>>,
  config?: TConfig,
  configValues?: FormConfigValues<TConfig>
) =>
  useCallback(
    <TField extends keyof z.input<TFs>>(
      fieldKey: TField,
      value: z.input<TFs>[TField] | null // use the applied-form-schema type instead
    ): void => {
      setForm((prevFormValues: UiValues<TFs>) => {
        const newForm = { ...prevFormValues, [fieldKey]: value };

        const fieldConfig = getFieldConfig(config, fieldKey);
        const fieldEffect = fieldConfig.changeEvent;
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
