import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "@core/utils";
import getFieldConfig from "../getters/getFieldConfig";
import useSetField from "../setters/setField";
// interfaces
import type { Nullable } from "@utils/utilityTypes";
import type { ZObj } from "@utils/rootTypes";
import type { SchemaParseErrors } from "./interfaces";
import type { ResolveConfigValues } from "@external/configValuesTypes";
// DEPRECATED IMPORTS
import type { AnyCfgMetaDEPREC, CfgDefMeta, CfgFs } from "@utils/deprec/formConfigDefinition";
import type { OnChangeEventUnionNew } from "@utils/deprec/fxnTypes";
import type { UiValues } from "@utils/deprec/formOutputTypes";
import type { UseFormProps } from "@utils/deprec/useFormTypes/useFormTypes";
import type { FsUiKeys } from "@utils/deprec/derived";

type UseSetFieldReturn<C extends CfgDefMeta> = ReturnType<typeof useSetField<C>>;

export type FieldProps<TFs extends ZObj, K extends FsUiKeys<TFs>> = {
  /** MUI-style onChange union handled in utils */
  onChange: (e: OnChangeEventUnionNew, ...rest: unknown[]) => void;

  value: UiValues<TFs>[K] | null;
  errors?: string;
  hidden: boolean;
  disabled?: boolean;
};

const useGetFieldProps = <C extends AnyCfgMetaDEPREC, TFs extends CfgFs<C> = CfgFs<C>>(
  setField: ReturnType<typeof useSetField<C>>,
  form: UiValues<TFs>,
  errors: SchemaParseErrors<TFs> | undefined,
  config: UseFormProps<C>, // might need to use a new AnyCfgInstance
  configValues: ResolveConfigValues<C>
) =>
  useCallback(
    <TKey extends FsUiKeys<TFs>, TInValue extends Nullable<z.input<TFs>>[TKey]>(
      fieldKey: TKey
    ): FieldProps<TFs, TKey> => {
      const onChange = (e: OnChangeEventUnionNew, ...args: (boolean | unknown)[]) => {
        const newFieldValue = getValueFromEvent(e, args) as TInValue;
        setField(fieldKey, newFieldValue);
      };

      const registerOn = getFieldConfig(config.fieldConfigs, fieldKey as never)?.registerOn;

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
