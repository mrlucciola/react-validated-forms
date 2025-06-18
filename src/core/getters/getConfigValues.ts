import type { FormConfig, ZObj } from "@utils/index";
import type {
  AnyFormConfigValues,
  InferCalcValuesFromConfig,
  InferCvCbFromConfig,
  InferFormSchemaFromConfig,
} from "@configDsl/interfaces";
import type { UiValues } from "../interfaces";

type OutType<TConfigValues extends AnyFormConfigValues> = TConfigValues extends AnyFormConfigValues
  ? // Cannot find name 'FormConfigCbReturnInferred'.ts(2304)
    FormConfigCbReturnInferred<TConfigValues>
  : null;

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TConfig extends FormConfig<ZObj>>(
  uiValues: UiValues<InferFormSchemaFromConfig<TConfig>>,
  config?: TConfig
) => {
  if (config === undefined) return null as OutType<TConfig>;
  /** Error
   * Type 'undefined' is not assignable to type 'InferCvCbFromConfig<TConfig>'.ts(2322)
   * - const cvcb: InferCvCbFromConfig<TConfig>
   */
  const cvcb: InferCvCbFromConfig<TConfig> = config.calcValuesCallback;
  /** Error:
   * Cannot invoke an object which is possibly 'undefined'.ts(2722)
   * - 'cvcb' is possibly 'undefined'.ts(18048)
   * - const cvcb: undefined
   */
  const asdf = cvcb({} as any, {} as any);

  if (!!cvcb) {
    // const cvcb = config.calcValuesCallback; // als
    /** Error
     * This expression is not callable.
     * - Type 'never' has no call signatures.ts(2349)
     * - const cvcb: never
     */
    const asdf = cvcb({} as any, {} as any);
  }

  const calculated: InferCalcValuesFromConfig<TConfig> =
    config.calcValuesCallback === undefined
      ? undefined
      : /** Error at .calcValuesCallback
         * This expression is not callable.
         * - Type 'never' has no call signatures.ts(2349)
         * - (property) calcValuesCallback?: never
         */
        config.calcValuesCallback(uiValues, config.externalValues);

  return {
    form: uiValues,
    external: config.externalValues,
    calculated,
  };
};

export default getConfigValues;
