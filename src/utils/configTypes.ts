import type { CalcValues, CalcValuesOpt, CfgFieldKeys, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { CvCbInternal, FieldConfigs } from "@utils/configPropTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

/** This type represents the param `config` passed into `useForm`.
 * This should not be used outside of the `useForm` prop.
 */
export type ConfigDef<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends CfgFieldKeys<TFs>
> = {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbInternal<TFs, TEs, TCv>;
  fieldConfigs?: FieldConfigs<TFs, TEs, TCv, FcKeys>;
};

export type ConfigExternalInputs<TFs extends ZObj, TEs extends ZObjOpt> =
  | { defaults?: Partial<UiValues<TFs>>; externalValues?: Partial<ExtValues<TEs>> }
  | undefined;

export type ConfigInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = ZObj,
  TCv extends CalcValuesOpt = CalcValues,
  FcKeys extends CfgFieldKeys<TFs> = CfgFieldKeys<TFs>
> = ConfigDef<
  TFs,
  TEs extends ZObj ? TEs : ZObj,
  TCv extends CalcValues ? TCv : CalcValues,
  FcKeys extends CfgFieldKeys<TFs> ? FcKeys : CfgFieldKeys<TFs>
>;
