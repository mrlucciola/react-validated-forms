import { useCallback } from "react";
import type { z } from "zod";
// utils
import getFormConfigField from "../getters/getFormConfigField";
// interfaces
import type { SetState } from "../../common/interfaces";
import type { FormOut, ZObj } from "../../fieldConfig/interfaces";
import type { FormConfigProp, FormConfigValues } from "../interfaces";

/** @todo annotate */
const useSetField = <TSchema extends ZObj, TConfig extends FormConfigProp<TSchema>>(
  setForm: SetState<FormOut<TSchema>>,
  config: TConfig,
  configValues: FormConfigValues<TConfig, TSchema>
) =>
  useCallback(
    <TField extends keyof z.input<TSchema>>(
      fieldKey: TField,
      value: z.input<TSchema>[TField] | null // use the applied-form-schema type instead
    ): void => {
      setForm((prevFormValues) => {
        const newForm = { ...prevFormValues, [fieldKey]: value };

        const fieldEffect = getFormConfigField<TConfig, TSchema>(config, fieldKey)?.changeEvent;
        if (config && fieldEffect) {
          const effectValues = configValues && fieldEffect(configValues);
          return { ...newForm, ...effectValues };
        }

        return newForm;
      });
    },
    []
  );
export default useSetField;
