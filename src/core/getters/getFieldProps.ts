import { useCallback } from "react";
import type { z } from "zod";
// utils
import { getValueFromEvent } from "../../utils";
import getFormConfigField from "./getFormConfigField";
import type { FormConfigCbReturnInferred } from "../../fieldConfig/callbacks";
import type useSetField from "../setters/setField";
// interfaces
import type { Nullable } from "../../common/interfaces";
import type { OnChangeEventUnionNew } from "../../interfaces";
import type { FormOut, ZObj } from "../../fieldConfig/interfaces";
import type { AnyFormCfgObj } from "../../fieldConfig/returnTypes";
import type { SchemaParseErrors, UserInputFormFields } from "../interfaces";

type UseSetFieldReturn<
  TBase extends ZObj,
  TConfig extends AnyFormCfgObj<FormOut<TBase>>
> = ReturnType<typeof useSetField<TBase, TConfig>>;

const useGetFieldProps = <TBase extends ZObj, TConfig extends AnyFormCfgObj<FormOut<TBase>>>(
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

      const registerOn = getFormConfigField(config, fieldKey)?.registerOn;

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
