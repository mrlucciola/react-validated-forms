import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "@utils/utils";
import getFieldConfig from "./getFieldConfig";
import type useSetField from "../setters/setField";
// interfaces
import type {
  AnyCfgDef,
  InferCfgDefFormSchema,
  InferConfigValues,
  Nullable,
  OnChangeEventUnionNew,
  UiValues,
} from "@utils/index";
import type { SchemaParseErrors } from "../interfaces";

type UseSetFieldReturn<TConfig extends AnyCfgDef> = ReturnType<typeof useSetField<TConfig>>;

const useGetFieldProps = <TConfig extends AnyCfgDef>(
  setField: UseSetFieldReturn<TConfig>,
  form: UiValues<InferCfgDefFormSchema<TConfig>>,
  errors: SchemaParseErrors<InferCfgDefFormSchema<TConfig>> | undefined,
  config?: TConfig, // might need to use a new AnyCfgInstance
  configValues?: InferConfigValues<TConfig>
) =>
  useCallback(
    <
      TField extends keyof z.input<InferCfgDefFormSchema<TConfig>>,
      TInValue extends Nullable<z.input<InferCfgDefFormSchema<TConfig>>>[TField]
    >(
      fieldKey: TField
    ) => {
      const onChange = (e: OnChangeEventUnionNew, ...args: (boolean | unknown)[]) => {
        const newFieldValue = getValueFromEvent(e, args) as TInValue;
        setField(fieldKey, newFieldValue);
      };

      const registerOn = config && getFieldConfig(config, fieldKey)?.registerOn;

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
