import type { FormConfig, InferInstance, UiValues, ZObj } from "@utils/index";
import type { InferCalcValuesFromConfig, InferFormSchemaFromConfig } from "@configDsl/interfaces";

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TConfig extends FormConfig<ZObj>>(
  uiValues: UiValues<InferFormSchemaFromConfig<TConfig>>,
  config?: TConfig
) => {
  type OutType<T extends FormConfig<ZObj>> = T extends FormConfig<ZObj> ? InferInstance<T> : null;

  if (config === undefined) return null as OutType<TConfig>;

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
