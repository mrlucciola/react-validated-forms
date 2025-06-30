import type { CalcValuesOpt, CfgFieldKeys, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ConfigInternal } from "@utils/configTypes";
import type { DefineFieldConfig } from "@utils/fieldConfigTypes";

/** @todo add description
 * @todo Remove type-casts/type properly
 */
const getFieldConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends CfgFieldKeys<TFs>,
  FcKey extends CfgFieldKeys<TFs> = CfgFieldKeys<TFs>
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
