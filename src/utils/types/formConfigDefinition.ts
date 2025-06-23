import type { ConfigFieldsOpt, CvCb, CvCbOpt, ZObj, ZObjOpt } from "@utils/index";

/** Canonical Configuration Definition type
 * This is a "phantom" type, implemented to:
 * - Reduce type-coupling/improve flexibility
 * - Facilitate deriving other types
 *
 * AI slop that needs to be cleaned up
 */
export interface CfgDefMeta<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = void,
  TCvCb extends CvCbOpt<TFs, TEs> = void,
  TFc extends ConfigFieldsOpt<TFs, TEs, TCvCb> = void
> {
  readonly _fs: TFs; // Form Schema
  readonly _es: TEs; // External Schema
  readonly _cv: TCvCb; // Calc-Values Callback
  readonly _fc: TFc; // Config Fields
}
export type AnyCfgMetaOrig = CfgDefMeta<ZObj, any, any, any>;
export type AnyCfgMeta<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs> = CvCbOpt<TFs, TEs>,
  TFc extends ConfigFieldsOpt<TFs, TEs, TCvCb> = ConfigFieldsOpt<TFs, TEs, TCvCb>
> = CfgDefMeta<TFs, TEs, TCvCb, TFc>;

export type CustomCfgDef<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TFc extends ConfigFieldsOpt<TFs, TEs, TCvCb>
> = {
  formSchema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: TCvCb;
  fieldConfigs?: TFc;
};

/** */
export type ConfigDefinition<TCfg extends AnyCfgMeta> = {
  formSchema: CfgFs<TCfg>;
  externalSchema?: CfgEs<TCfg>;
  calcValuesCallback?: CfgCvCb<TCfg>;
  fieldConfigs?: CfgFc<TCfg>;
};
export type AnyCfgDef = ConfigDefinition<AnyCfgMeta>;

export type BuildCfg<Def extends ConfigDefinition<any>> = CfgDefMeta<
  Def["formSchema"],
  Def["externalSchema"] extends ZObj ? Def["externalSchema"] : void,
  Def["calcValuesCallback"] extends CvCb<any> ? Def["calcValuesCallback"] : void,
  Def["fieldConfigs"] extends ConfigFieldsOpt<any, any, any> ? Def["fieldConfigs"] : void
>;

export type CfgFs<TCfg extends AnyCfgMeta> = TCfg["_fs"];
export type CfgEs<TCfg extends AnyCfgMeta> = TCfg["_es"];
export type CfgCvCb<TCfg extends AnyCfgMeta> = TCfg["_cv"];
export type CfgFc<TCfg extends AnyCfgMeta> = TCfg["_fc"];
