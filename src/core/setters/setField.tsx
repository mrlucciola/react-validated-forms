import { useCallback } from "react";
import type { z } from "zod";
// utils
import getFormConfigField from "../getters/getFormConfigField";
// interfaces
import type { FormConfigProp, FormConfigValues } from "../interfaces";
import type { FormOut, SetState, ZFormSchema } from "@utils/index";

/** @todo annotate */
const useSetField = <TBase extends ZFormSchema, TConfig extends FormConfigProp<TBase>>(
  setForm: SetState<FormOut<TBase>>,
  config: TConfig,
  configValues: FormConfigValues<TConfig, TBase>
) =>
  useCallback(
    <TField extends keyof z.input<TBase>>(
      fieldKey: TField,
      value: z.input<TBase>[TField] | null // use the applied-form-schema type instead
    ): void => {
      setForm((prevFormValues: FormOut<TBase>) => {
        const newForm = { ...prevFormValues, [fieldKey]: value };

        const fieldEffect = getFormConfigField<TBase>(config, fieldKey)?.changeEvent;
        if (config && fieldEffect) {
          // FieldCbValueProp<TForm, TCalcVal, TExt>

          const effectValues = configValues && fieldEffect(configValues);
          return { ...newForm, ...effectValues };
        }

        return newForm;
      });
    },
    []
  );

export default useSetField;
