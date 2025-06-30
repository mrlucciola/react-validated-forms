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
  const fieldConfigs = config.fieldConfigs;
  if (!fieldConfigs || !fieldConfigs[fieldConfigKey as any]) return undefined;

  return fieldConfigs[fieldConfigKey as keyof ConfigInternal<TFs, TEs, TCv>["fieldConfigs"]];
};

export default getFieldConfig;
