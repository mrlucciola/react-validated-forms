import type { ConfigInternal } from "@utils/configTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";

/** @todo add description */
const getFieldConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  Fc extends ConfigInternal<TFs, TEs, TCv>["fieldConfigs"],
  FcKey extends keyof Fc
>(
  fieldConfigs: Fc,
  fieldConfigKey: FcKey
): Fc extends void ? undefined : NonNullable<Fc[FcKey]> => {
  if (!fieldConfigs) return undefined as Fc extends void ? undefined : NonNullable<Fc[FcKey]>;

  return fieldConfigs[fieldConfigKey] as Fc extends void ? undefined : NonNullable<Fc[FcKey]>;
};

export default getFieldConfig;
