import type { FormOut, ZFormSchema, ZObj } from "@utils/index";
import type {
  AnyFormCfgObj,
  FormCfgReturnObj,
  FormConfigCbReturnInferred,
} from "@configDsl/interfaces";
import type { UserInputFormFields } from "../interfaces";
import type { FormConfigReturn } from "@configDsl/formConfigCallbackTypes";

type FormCfgRtnObjGeneric<T> = T extends FormConfigReturn<infer TFv, infer TCv, infer TEv>
  ? ReturnType<FormConfigReturn<TFv, TCv, TEv>>
  : T extends FormCfgReturnObj<infer TFv, infer TCv, infer TEv>
  ? FormCfgReturnObj<TFv, TCv, TEv>
  : never;

type TConfig<TBase extends ZFormSchema> = AnyFormCfgObj<FormOut<TBase>>;

/** @todo abstract this logic out to `FormCfgRtnObjGeneric` */
type ConfigParam<TBase extends ZFormSchema> = FormCfgRtnObjGeneric<TConfig<TBase>> | undefined;

type OutType<
  TBase extends ZFormSchema,
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
