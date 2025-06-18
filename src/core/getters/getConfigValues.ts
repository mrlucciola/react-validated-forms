import type {
  AnyFormConfigValues,
  FormConfigCbReturnInferred,
  InferCalcValuesFromConfig,
  InferCvCbFromConfig,
  InferExternalValuesFromConfig,
  InferExtSchemaFromConfig,
  InferFormSchemaFromConfig,
  InferFormValuesFromConfig,
  AnyFormConfig,
} from "src/configDsl/deprecatedInterfaces/interfaces";
import type { UiValues } from "../interfaces";
import type { AnyCvCb } from "@utils/cvCbTypes";

// type FormCfgRtnObjGeneric<T> = T extends FormConfigReturnDEPREC<infer TFv, infer TCv, infer TEv>
//   ? ReturnType<FormConfigReturnDEPREC<TFv, TCv, TEv>>
//   : T extends FormCfgReturnObj<infer TFv, infer TCv, infer TEv>
//   ? FormCfgReturnObj<TFv, TCv, TEv>
//   : never;

// type TConfig<TBase extends ZFormSchema> = AnyFormCfgObj<FormOut<TBase>>;

/** @todo abstract this logic out to `FormCfgRtnObjGeneric` */
// type ConfigParam<TBase extends ZFormSchema> = FormCfgRtnObjGeneric<TConfig<TBase>> | undefined;

type OutType<TConfig extends AnyFormConfigValues> = TConfig extends AnyFormConfigValues
  ? FormConfigCbReturnInferred<TConfig>
  : null;

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TConfig extends AnyFormConfig>(
  uiValues: UiValues<InferFormSchemaFromConfig<TConfig>>,
  config?: TConfig
) => {
  if (config === undefined) return null as OutType<TConfig>;

  type FormSchema = InferFormSchemaFromConfig<TConfig>;
  // AnyFormConfigDEPREC<_, TCvCb, _>
  type CvCb = InferCvCbFromConfig<TConfig>;
  type EvSchema = InferExtSchemaFromConfig<TConfig>;
  type FormValues = InferFormValuesFromConfig<TConfig>;
  type CalcValues = InferCalcValuesFromConfig<TConfig>;
  type ExtValues = InferExternalValuesFromConfig<TConfig>;
  // UiValues<InferFormSchemaFromConfig<TConfig>>
  // const calculated: CvCbStrict<FormSchema, CvCb, EvSchema> =
  const cvcb: InferCvCbFromConfig<TConfig> = config.calcValuesCallback; // this is throwing an error
  const asdf = cvcb({} as any, {} as any);

  if (!!cvcb) {
    // const cvcb = config.calcValuesCallback; // als
    const asdf = cvcb({} as any, {} as any);
  }

  const calculated: InferCalcValuesFromConfig<TConfig> =
    config.calcValuesCallback === undefined
      ? undefined
      : config.calcValuesCallback(uiValues, config.externalValues);

  return {
    form: uiValues,
    external: config.externalValues,
    calculated,
  };
};

export default getConfigValues;
