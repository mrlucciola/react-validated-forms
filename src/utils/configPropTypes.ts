import type { CalcValues, CalcValuesOpt, CfgFieldKeys, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { DefineFieldConfig } from "@utils/fieldConfigTypes";
import type { ResolveProp } from "@utils/utilityTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

export type CvCbParams<TFs extends ZObj, TEs extends ZObjOpt> = {
  form: UiValues<TFs>;
} & ResolveProp<ExtValues<TEs>, "externalValues">;

export type CvCbDefinition<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = (
  values: CvCbParams<TFs, TEs>
) => TCv;

export type CvCbInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = ZObjOpt,
  TCv extends CalcValuesOpt = CalcValues
> = (values: { form: UiValues<TFs>; externalValues?: ExtValues<TEs> }) => TCv;

export type FieldConfigs<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends CfgFieldKeys<TFs>
> = { [FieldKey in FcKeys]: DefineFieldConfig<TFs, TEs, TCv, FieldKey> };

export type FieldConfigsOpt<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends CfgFieldKeys<TFs> = CfgFieldKeys<TFs>
> = FieldConfigs<TFs, TEs, TCv, FcKeys> | void;
