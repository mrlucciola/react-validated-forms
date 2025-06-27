import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "@core/utils";
import getFieldConfig from "../getters/getFieldConfig";
import useSetField from "../setters/setField";
// interfaces
import type { Nullable } from "@utils/utilityTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { SchemaParseErrors } from "./interfaces";
// DEPRECATED IMPORTS
import type { OnChangeEventUnionNew } from "@utils/schemaTypes";
import type { UiValues } from "@utils/valueTypes";
import type { ConfigInternal } from "@utils/configTypes";
import type { ConfigValues } from "@utils/fieldConfigTypes";

export type FieldProps<TFs extends ZObj, K extends keyof UiValues<TFs>> = {
  /** MUI-style onChange union handled in utils */
  onChange: (e: OnChangeEventUnionNew, ...rest: unknown[]) => void;

  value: UiValues<TFs>[K] | null;
  errors?: string;
  hidden: boolean;
  disabled?: boolean;
};

const useGetFieldProps = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(
  setField: ReturnType<typeof useSetField<TFs, TEs, TCv>>,
  form: UiValues<TFs>,
  errors: SchemaParseErrors<TFs> | undefined,
  config: ConfigInternal<TFs, TEs, TCv>, // might need to use a new AnyCfgInstance
  configValues: ConfigValues<TFs, TEs, TCv>
) =>
  useCallback(
    <TKey extends keyof UiValues<TFs>, TInValue extends Nullable<z.input<TFs>>[TKey]>(
      fieldKey: TKey
    ): FieldProps<TFs, TKey> => {
      const onChange = (e: OnChangeEventUnionNew, ...args: (boolean | unknown)[]) => {
        const newFieldValue = getValueFromEvent(e, args) as TInValue;
        setField(fieldKey, newFieldValue);
      };

      const registerOn = getFieldConfig(config.fieldConfigs, fieldKey)?.registerOn;

      // @todo
      const shouldDisplay =
        // @ts-ignore
        registerOn && configValues ? registerOn({ ...configValues, form }) : true;

      /** @deprecated not yet configured in `FormConfig` */
      const disabled = false;

      return {
        onChange,
        errors: errors && errors[fieldKey]?.join(",\n"),
        value: form[fieldKey] ?? null, // (form[fieldKey] ?? null) as TOutValue
        hidden: !shouldDisplay,
        /** @deprecated not yet configured in `FormConfig` */
        disabled,
      };
    },
    []
  );

export default useGetFieldProps;
