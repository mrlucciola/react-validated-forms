import type { CalcValues, CfgFieldKeys, ZObj } from "@utils/rootTypes";
import type { CvCbDefinition, FieldConfigs } from "@utils/configPropTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

/** Only for use in `useValidatedForm`
 * For fields on `externalSchema`, `null` is applied to fields where a catch is not provided
 */
export const defineFormConfig = <
  TFs extends ZObj,
  TEs extends ZObj,
  TCv extends CalcValues,
  FcKeys extends CfgFieldKeys<TFs>
>(configInput: {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: Partial<ExtValues<TEs>>;
  fieldConfigs?: FieldConfigs<TFs, TEs, TCv, FcKeys>;
}) => {
  // type TCfg = BuildCfg<TDef>;
  // return factory;
};
