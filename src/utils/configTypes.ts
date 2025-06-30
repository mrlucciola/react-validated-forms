import type { CvCbDefinition, CvCbInternal, FieldConfigs } from "@utils/configPropTypes";
import type { CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

/** This type represents the param `config` passed into `useForm`.
 * This should not be used outside of the `useForm` prop.
 */
export type ConfigDef<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends keyof UiValues<TFs>
> = {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: Partial<ExtValues<TEs>>;
  fieldConfigs?: FieldConfigs<TFs, TEs, TCv, FcKeys>;
};

export type ConfigInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = ZObj,
  TCv extends CalcValuesOpt = CalcValues,
  FcKeys extends keyof UiValues<TFs> = keyof UiValues<TFs>
> = ConfigDef<
  TFs,
  TEs extends ZObj ? TEs : ZObj,
  TCv extends CalcValues ? TCv : CalcValues,
  FcKeys extends keyof UiValues<TFs> ? FcKeys : keyof UiValues<TFs>
> & {
  calcValuesCallback?: CvCbInternal;
};
