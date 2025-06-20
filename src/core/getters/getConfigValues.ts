import type { AnyCfgDef, CfgCvCb, CfgFs, FormConfigValues, InferCv, UiValues } from "@utils/index";

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TConfig extends AnyCfgDef>(
  uiValues: UiValues<CfgFs<TConfig>>,
  config?: TConfig // Might need to be AnyCfgInstance
): FormConfigValues<TConfig> | null => {
  if (config === undefined) return null;

  const calculated: InferCv<CfgCvCb<TConfig>> =
    config.calcValuesCallback && config.calcValuesCallback(uiValues, config);

  return {
    form: uiValues,
    external: config?.externalValues,
    calculated,
  };
};

export default getConfigValues;
