import { useCallback } from "react";
// utils
import getFieldConfig from "../getters/getFieldConfig";
// interfaces
import type { AnyCfgMeta, CfgFs, InferConfigValues, SetState, UiValues } from "@utils/index";
import type { UseFormProps } from "@core/types";

/** @todo annotate */
const useSetField = <C extends AnyCfgMeta, TFs extends CfgFs<C> = CfgFs<C>>(
  setForm: SetState<UiValues<TFs>>,
  config: UseFormProps<C>,
  configValues: InferConfigValues<C>,
  markDirty: (key: keyof UiValues<TFs>, v: UiValues<TFs>[keyof UiValues<TFs>]) => void
) =>
  useCallback(
    <TField extends keyof UiValues<TFs>>(
      fieldKey: TField,
      value: UiValues<TFs>[TField] // use the applied-form-schema type instead
    ): void => {
      setForm((prevFormValues: UiValues<TFs>) => {
        const newForm = { ...prevFormValues, [fieldKey]: value };

        const fieldConfig = getFieldConfig(config.fieldConfigs, fieldKey as never);
        markDirty(fieldKey, value);
        const fieldEffect = fieldConfig?.changeEvent;
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
