import type { FormConfigCbReturnInferred } from "../../fieldConfig/callbacks";
import type { FormOut, ZObj } from "../../fieldConfig/interfaces";
import type { AnyFormCfgObj, FormCfgRtnObjGeneric } from "../../fieldConfig/returnTypes";
import type { UserInputFormFields } from "../interfaces";

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <
  TBase extends ZObj,
  TConfig extends AnyFormCfgObj<FormOut<TBase>>,
  TConfigParam extends FormCfgRtnObjGeneric<TConfig> | undefined
>(
  form: UserInputFormFields<TBase>,
  config?: TConfigParam
): TConfigParam extends NonNullable<AnyFormCfgObj> ? null : FormConfigCbReturnInferred<TConfig> => {
  return (
    config === undefined
      ? null
      : {
          form,
          external: config.externalValues,
          calculated: config.calcValues && config.calcValues(form, config.externalValues),
        }
  ) as TConfigParam extends NonNullable<AnyFormCfgObj> ? null : FormConfigCbReturnInferred<TConfig>;
};

export default getConfigValues;
