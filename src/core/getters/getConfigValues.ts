import type { AnyCfgDef, InferCfgDefCvCb, InferCv, InferConfigValues } from "@utils/index";

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TConfig extends AnyCfgDef>(
  uiValues: InferConfigValues<TConfig>["fields"],
  config?: TConfig // Might need to be AnyCfgInstance
): InferConfigValues<TConfig> => {
  type OutType<T extends AnyCfgDef> = T extends AnyCfgDef ? InferInstance<T> : null;

  if (config === undefined) return null as OutType<TConfig>;

  const calculated: InferCv<InferCfgDefCvCb<TConfig>> =
    config.calcValuesCallback === undefined
      ? undefined
      : config.calcValuesCallback(uiValues, config);

  return {
    form: uiValues,
    external: config?.externalValues,
    calculated,
  };
};

export default getConfigValues;
