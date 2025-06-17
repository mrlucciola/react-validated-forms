import type { FormOut, ZObj } from "@utils/index";
import type {
  AnyFormCfgObj,
  DefinedFormConfigCb,
  FormCfgReturnObj,
  FormConfigCbReturnInferred,
} from "@configDsl/interfaces";
import type { UserInputFormFields } from "../interfaces";

type FormCfgRtnObjGeneric<T> = T extends DefinedFormConfigCb<infer TForm, infer TCalc, infer TExt>
  ? ReturnType<DefinedFormConfigCb<TForm, TCalc, TExt>>
  : T extends FormCfgReturnObj<infer TForm, infer TCalc, infer TExt>
  ? FormCfgReturnObj<TForm, TCalc, TExt>
  : never;

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
