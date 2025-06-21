import type { CfgCvCb, CfgFs, FormConfigValues, InferCv, UiValues, AnyCfgDef } from "@utils/index";

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TCfg extends AnyCfgDef>(
  uiValues: UiValues<CfgFs<TCfg>>,
  config?: TCfg
): FormConfigValues<TCfg> | null => {
  if (config === undefined) return null;

  const calculated: InferCv<CfgCvCb<TCfg>> =
    config.calcValuesCallback && config.calcValuesCallback(uiValues, config);

  return {
    form: uiValues,
    external: config?.externalValues,
    calculated,
  };
};

export default getConfigValues;
