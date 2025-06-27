import { useCallback } from "react";
// utils
import getFieldConfig from "../getters/getFieldConfig";
// interfaces
import type { SetState } from "@utils/utilityTypes";
import type { ConfigInternal } from "@utils/configTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { UiValues } from "@utils/valueTypes";
import type { ConfigValues } from "@utils/fieldConfigTypes";

/** @todo annotate */
const useSetField = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  C extends ConfigInternal<TFs, TEs, TCv> = ConfigInternal<TFs, TEs, TCv>
>(
  setForm: SetState<UiValues<TFs>>,
  config: C,
  configValues: ConfigValues<TFs, TEs, TCv>,
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
