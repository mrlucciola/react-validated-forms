import { useCallback } from "react";
import type { z } from "zod";
// utils
import getFieldConfig from "../getters/getFieldConfig";
// interfaces
import type {
  AnyCfgMeta,
  CfgDefMeta,
  CfgFs,
  FormConfigValues,
  SetState,
  UiValues,
} from "@utils/index";
import type { UseFormProps } from "@core/types";

// const updateForm = useCallback(
//   <K extends keyof UiValues<TFs>>(
//     key: K,
//     val: UiValues<TFs>[K] | ((prev: UiValues<TFs>[K]) => UiValues<TFs>[K])
//   ) => {
//     setForm((prev) => {
//       // @note Not a huge fan of this conditional - this is an edge-case, however
//       const next = typeof val === "function" ? (val as any)(prev[key]) : val;
//       const merged = { ...prev, [key]: next };
//       markDirty(key, next);
//       return merged;
//     });
//   },
//   []
// );

/** @todo annotate */
const useSetField = <C extends AnyCfgMeta, TFs extends CfgFs<C> = CfgFs<C>>(
  setForm: SetState<UiValues<TFs>>,
  config: UseFormProps<C>,
  configValues: FormConfigValues<C>,
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
