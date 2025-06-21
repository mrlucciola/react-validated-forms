import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "@utils/utils";
import getFieldConfig from "../getters/getFieldConfig";
import type useSetField from "../setters/setField";
// interfaces
import type {
  CfgDefMeta,
  CfgFs,
  FormConfigValues,
  InferFormKeys,
  Nullable,
  OnChangeEventUnionNew,
  UiValues,
  ZObj,
} from "@utils/index";
import type { SchemaParseErrors } from "./interfaces";

type UseSetFieldReturn<TConfig extends CfgDefMeta> = ReturnType<typeof useSetField<TConfig>>;

export type FieldProps<TFs extends ZObj, K extends InferFormKeys<TFs>> = {
  /** MUI-style onChange union handled in utils */
  onChange: (e: OnChangeEventUnionNew, ...rest: unknown[]) => void;

  value: UiValues<TFs>[K] | null;
  errors?: string;
  hidden: boolean;
  disabled?: boolean;
};

const useGetFieldProps = <TConfig extends CfgDefMeta, TFs extends CfgFs<TConfig> = CfgFs<TConfig>>(
  setField: UseSetFieldReturn<TConfig>,
  form: UiValues<TFs>,
  errors: SchemaParseErrors<TFs> | undefined,
  config?: TConfig, // might need to use a new AnyCfgInstance
  configValues?: FormConfigValues<TConfig>
) =>
  useCallback(
    <TKey extends InferFormKeys<TFs>, TInValue extends Nullable<z.input<TFs>>[TKey]>(
      fieldKey: TKey
    ): FieldProps<TFs, TKey> => {
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
