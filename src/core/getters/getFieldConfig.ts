import type { ConfigInternal } from "@utils/configTypes";
import type { DefineFieldConfig } from "@utils/fieldConfigTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { UiValues } from "@utils/valueTypes";

/** @todo add description
 * @todo Remove type-casts/type properly
 */
const getFieldConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends keyof UiValues<TFs>,
  FcKey extends keyof UiValues<TFs> = keyof UiValues<TFs>
>(
  config: ConfigInternal<TFs, TEs, TCv, FcKeys>,
  fieldConfigKey: FcKey
): undefined | DefineFieldConfig<TFs, TEs, TCv, FcKey> => {
  type FieldConfigKeys = keyof ConfigInternal<TFs, TEs, TCv>["fieldConfigs"];

  // Validate if fieldConfigs is defined
  const fieldConfigs = config?.fieldConfigs;
  if (!fieldConfigs) return undefined;

  // Validate if config for provided field is defined
  const fieldConfig = fieldConfigs[fieldConfigKey as FieldConfigKeys];
  if (!fieldConfig) return undefined;

  return fieldConfig;
};

export default getFieldConfig;
