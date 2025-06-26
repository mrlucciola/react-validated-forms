import type { CvCbDefinition, CvCbInternal } from "@utils/configTypes";
import type { AnyCfgMeta, CalcValues, CfgMeta, ZObj } from "@utils/rootTypes";

export type ConfigInternal<
  TFs extends ZObj,
  TEs extends ZObj | void,
  TCv extends CalcValues | void
> = {
  schema: TFs;
  externalSchema?: NonNullable<TEs>;
  calcValuesCallback?: NonNullable<CvCbInternal<TFs, TEs, TCv>>;
};
export type UseFormConfig<M extends CfgMeta<any, any, any>> = M extends CfgMeta<
  infer TFs,
  infer TEs,
  infer TCv
>
  ? ConfigInternal<TFs, TEs, TCv>
  : never;
