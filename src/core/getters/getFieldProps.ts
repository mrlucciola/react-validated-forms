import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "@utils/utils";
import getFormConfigField from "./getFormConfigField";
import type useSetField from "../setters/setField";
// interfaces
import type { Nullable, OnChangeEventUnionNew, ZFormSchema } from "@utils/index";
import type { AnyFormCfgObj, AnyFormConfigValues } from "src/configDsl/deprecatedInterfaces/interfaces";
import type { SchemaParseErrors, UiValues } from "../interfaces";

type UseSetFieldReturn<
  TBase extends ZFormSchema,
  TConfig extends AnyFormCfgObj<TBase>
> = ReturnType<typeof useSetField<TBase, TConfig>>;

const useGetFieldProps = <TBase extends ZFormSchema, TConfig extends AnyFormCfgObj<TBase>>(
  setField: UseSetFieldReturn<TBase, TConfig>,
  form: UiValues<TBase>,
  errors: SchemaParseErrors<TBase> | undefined,
  config?: AnyFormCfgObj<TBase>,
  configValues?: AnyFormConfigValues<TBase>
) =>
  useCallback(
    <TField extends keyof z.input<TBase>, TInValue extends Nullable<z.input<TBase>>[TField]>(
      fieldKey: TField
    ) => {
      const onChange = (e: OnChangeEventUnionNew, ...args: (boolean | unknown)[]) => {
        const newFieldValue = getValueFromEvent(e, args) as TInValue;
        setField(fieldKey, newFieldValue);
      };

      const registerOn = config && getFormConfigField(config, fieldKey)?.registerOn;

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
