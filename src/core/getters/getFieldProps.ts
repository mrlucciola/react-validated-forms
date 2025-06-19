import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "@utils/utils";
import getFormConfigField from "./getFormConfigField";
import type useSetField from "../setters/setField";
// interfaces
import type { FormConfig, Nullable, OnChangeEventUnionNew, UiValues, ZObj } from "@utils/index";
import type { SchemaParseErrors } from "../interfaces";

type UseSetFieldReturn<TFs extends ZObj, TConfig extends FormConfig<TFs>> = ReturnType<
  typeof useSetField<TFs, TConfig>
>;

const useGetFieldProps = <TFs extends ZObj, TConfig extends FormConfig<TFs>>(
  setField: UseSetFieldReturn<TFs, TConfig>,
  form: UiValues<TFs>,
  errors: SchemaParseErrors<TFs> | undefined,
  config?: FormConfig<TFs>,
  configValues?: TConfig["fields"]
) =>
  useCallback(
    <TField extends keyof z.input<TFs>, TInValue extends Nullable<z.input<TFs>>[TField]>(
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
