import type { FormConfigFieldsBase } from "@utils/fieldConfigTypes";
import type { CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ResolveProp } from "@utils/utilityTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

type CvCbParams<TFs extends ZObj, TEs extends ZObjOpt> = {
  form: UiValues<TFs>;
} & ResolveProp<ExtValues<TEs>, "externalValues">;

export type CvCbDefinition<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = (
  values: CvCbParams<TFs, TEs>
) => TCv;
export type CvCbInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObj | void = ZObj | void,
  TCv extends CalcValues | void = CalcValues
> = (values: { form: UiValues<TFs>; externalValues?: ExtValues<TEs> }) => TCv;

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
  fieldConfigs?: FormConfigFieldsBase<TFs, TEs, TCv, FcKeys>;
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
