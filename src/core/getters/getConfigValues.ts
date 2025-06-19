import type { FormConfig, InferInstance, ZObj } from "@utils/index";

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TConfig extends FormConfig<ZObj>>(
  uiValues: InferUiValues<TConfig>, // not yet implemented
  config?: TConfig
) => {
  type OutType<T extends FormConfig<ZObj>> = T extends FormConfig<ZObj> ? InferInstance<T> : null;

  if (config === undefined) return null as OutType<TConfig>;

  const calculated: InferCalcValues<TConfig> =
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
