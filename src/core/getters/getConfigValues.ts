import type { UseFormProps } from "@core/types";
import type { AnyCfgMeta, CfgEs, CfgFs, ExtValues, FormConfigValues, UiValues } from "@utils/index";

const getCalculatedValues = <C extends AnyCfgMeta>(
  uiValues: UiValues<CfgFs<C>>,
  config: UseFormProps<C>
) => {
  return config.calcValues && config.calcValues(uiValues, config.externalValues);
};
const getExternalValues = <C extends AnyCfgMeta>(config: UseFormProps<C>): ExtValues<CfgEs<C>> => {
  return (
    config.externalSchema &&
    config.externalSchema.parse(config.externalValues ?? config.externalValues)
  );
};

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <C extends AnyCfgMeta>(
  uiValues: UiValues<CfgFs<C>>,
  config: UseFormProps<C>
): FormConfigValues<C> => {
  return {
    form: uiValues,
    external: getExternalValues(config),
    calculated: getCalculatedValues(uiValues, config),
  };
};

export default getConfigValues;
