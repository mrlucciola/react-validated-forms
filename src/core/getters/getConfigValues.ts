import type { FormOut, ZFormSchema, ZObj } from "@utils/index";
import type {
  AnyFormCfgObj,
  AnyFormConfigValues,
  FormCfgReturnObj,
  FormConfigCbReturnInferred,
} from "@configDsl/interfaces";
import type { FormConfigProp, UiValues } from "../interfaces";
import type { FormConfigReturn } from "@configDsl/formConfigCallbackTypes";

type FormCfgRtnObjGeneric<T> = T extends FormConfigReturn<infer TFv, infer TCv, infer TEv>
  ? ReturnType<FormConfigReturn<TFv, TCv, TEv>>
  : T extends FormCfgReturnObj<infer TFv, infer TCv, infer TEv>
  ? FormCfgReturnObj<TFv, TCv, TEv>
  : never;

// type TConfig<TBase extends ZFormSchema> = AnyFormCfgObj<FormOut<TBase>>;

/** @todo abstract this logic out to `FormCfgRtnObjGeneric` */
// type ConfigParam<TBase extends ZFormSchema> = FormCfgRtnObjGeneric<TConfig<TBase>> | undefined;

type OutType<TConfig extends AnyFormConfigValues> = TConfig extends AnyFormConfigValues
  ? FormConfigCbReturnInferred<TConfig>
  : null;

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TBase extends ZFormSchema, TConfig extends AnyFormCfgObj<TBase>>(
  form: UiValues<TBase>,
  config?: TConfig
): OutType<TConfig> => {
  if (config === undefined) return null as OutType<TConfig>;

  return {
    form,
    external: config.externalValues,
    calculated: config.calcValues && config.calcValues(form, config.externalValues),
  } as unknown as OutType<TConfig>;
};

export default getConfigValues;
