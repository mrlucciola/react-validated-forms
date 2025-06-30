import type { z } from "zod";
import { isDayjs } from "dayjs";
// utils
import getFieldConfig from "./getFieldConfig";
import useSetField from "../setters/setField";
// interfaces
import type { Nullable } from "@utils/utilityTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { OnChangeEventUnionNew } from "@utils/schemaTypes";
import type { UiValues } from "@utils/valueTypes";
import type { ConfigInternal } from "@utils/configTypes";
import type { ConfigValues } from "@utils/fieldConfigTypes";
import type { SchemaParseErrors } from "./interfaces";

export type FieldProps<TFs extends ZObj, K extends keyof UiValues<TFs>> = {
  /** MUI-style onChange union handled in utils */
  onChange: (e: OnChangeEventUnionNew, ...rest: unknown[]) => void;

  value: UiValues<TFs>[K] | null;
  errors?: string;
  isRegistered: boolean;
  hidden: boolean;
  disabled: boolean;
};

const getValueFromEvent = (e: OnChangeEventUnionNew, args?: (boolean | unknown)[]) => {
  // @note Handle event-type from `MuiDatePicker.onChange()`, or 'nullish' events. If `undefined`, convert to `null`.
  if (e === null || e === undefined || isDayjs(e)) return e ?? null;

  // @note Handle event-type from `MuiCheckBox.onChange()`.
  if (args && args.length > 0 && typeof args[0] === "boolean") return args[0];

  return e.target?.value ?? null;
};

/**
 * @todo annotate
 * @todo memoize where possible
 * @todo simplify implementation
 * @todo implement `disabled`
 */
const useGetFieldProps =
  <
    TFs extends ZObj,
    TEs extends ZObjOpt,
    TCv extends CalcValuesOpt,
    FcKeys extends keyof UiValues<TFs> = keyof UiValues<TFs>
  >(
    setField: ReturnType<typeof useSetField<TFs, TEs, TCv>>,
    form: UiValues<TFs>,
    errors: SchemaParseErrors<TFs> | undefined,
    config: ConfigInternal<TFs, TEs, TCv, FcKeys>,
    configValues: ConfigValues<TFs, TEs, TCv>
  ) =>
  <TKey extends keyof UiValues<TFs>, TInValue extends Nullable<z.input<TFs>>[TKey]>(
    fieldKey: TKey
  ): FieldProps<TFs, TKey> => {
    const onChange = (e: OnChangeEventUnionNew, ...args: (boolean | unknown)[]) => {
      const newFieldValue = getValueFromEvent(e, args) as TInValue;
      setField(fieldKey, newFieldValue);
    };

    const fieldConfig = getFieldConfig(config, fieldKey);

    const hidden = fieldConfig?.isHidden
      ? // If `isHidden` is defined: run logic
        fieldConfig.isHidden({ ...configValues, form })
      : fieldConfig?.isHidden === false
      ? // If `isHidden` is defined as false: return false
        fieldConfig.isHidden
      : // If `isHidden` is NOT defined: apply opposite value of `isRegistered`
        false;

    const isRegistered =
      hidden === true
        ? false
        : fieldConfig?.registerOn
        ? fieldConfig.registerOn({ ...configValues, form })
        : true;

    const disabled = fieldConfig?.disableOn
      ? fieldConfig?.disableOn({ ...configValues, form })
      : false;

    return {
      onChange,
      errors: errors && errors[fieldKey]?.join(",\n"),
      value: form[fieldKey] ?? null,
      isRegistered,
      hidden,
      disabled,
    };
  };

export default useGetFieldProps;
