import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "@utils/utils";
import getFormConfigField from "./getFormConfigField";
import type useSetField from "../setters/setField";
// interfaces
import type { FormOut, Nullable, OnChangeEventUnionNew, ZFormSchema } from "@utils/index";
import type { AnyFormCfgObj, FormConfigCbReturnInferred } from "@configDsl/interfaces";
import type { SchemaParseErrors, UserInputFormFields } from "../interfaces";

type UseSetFieldReturn<
  TBase extends ZFormSchema,
  TConfig extends AnyFormCfgObj<FormOut<TBase>>
> = ReturnType<typeof useSetField<TBase, TConfig>>;

const useGetFieldProps = <TBase extends ZFormSchema, TConfig extends AnyFormCfgObj<FormOut<TBase>>>(
  setField: UseSetFieldReturn<TBase, TConfig>,
  config: AnyFormCfgObj<FormOut<TBase>> | undefined,
  configValues: FormConfigCbReturnInferred<TConfig> | undefined,
  form: UserInputFormFields<TBase>,
  errors: SchemaParseErrors<TBase> | undefined
) =>
  useCallback(
    <TField extends keyof z.input<TBase>, TInValue extends Nullable<z.input<TBase>>[TField]>(
      fieldKey: TField
    ) => {
      const onChange = (e: OnChangeEventUnionNew, ...args: (boolean | unknown)[]) => {
        const newFieldValue = getValueFromEvent(e, args) as TInValue;
        setField(fieldKey, newFieldValue);
      };

      const registerOn = getFormConfigField<TBase>(config, fieldKey)?.registerOn;

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
