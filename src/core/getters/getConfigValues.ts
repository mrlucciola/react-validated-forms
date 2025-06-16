import type { FormConfigCbReturnInferred } from "@fieldConfig/callbacks";
import type { FormOut } from "@fieldConfig/interfaces";
import type { AnyFormCfgObj, FormCfgRtnObjGeneric } from "@fieldConfig/returnTypes";
import type { ZObj } from "@utils/index";
import type { UserInputFormFields } from "../interfaces";

type TConfig<TBase extends ZObj> = AnyFormCfgObj<FormOut<TBase>>;
/** @todo abstract this logic out to `FormCfgRtnObjGeneric` */
type ConfigParam<TBase extends ZObj> = FormCfgRtnObjGeneric<TConfig<TBase>> | undefined;

type OutType<
  TBase extends ZObj,
  TConfigParam extends ConfigParam<TBase>
> = TConfigParam extends NonNullable<AnyFormCfgObj>
  ? FormConfigCbReturnInferred<TConfig<TBase>>
  : null;

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <
  TBase extends ZObj,
  TConfigParam extends ConfigParam<TBase> = ConfigParam<TBase>
>(
  form: UserInputFormFields<TBase>,
  config?: TConfigParam
): OutType<TBase, TConfigParam> => {
  if (config === undefined) return null as OutType<TBase, TConfigParam>;

  return {
    form,
    external: config.externalValues,
    calculated: config.calcValues && config.calcValues(form, config.externalValues),
  } as unknown as OutType<TBase, NonNullable<TConfigParam>>;
};

export default getConfigValues;
