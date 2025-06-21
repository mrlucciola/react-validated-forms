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
export type AnyCfgMeta = CfgDefMeta<any, any, any, any>;
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

// export type InferCfgDefCvCb<TDef extends CfgDefMeta> = TDef["calcValuesCallback"];
// export type InferCfgDefFormSchema<TDef extends CfgDefMeta> = TDef["formSchema"];
// export type InferCfgDefExternalSchema<TDef extends CfgDefMeta> = TDef["externalSchema"];
// export type InferCfgDefFieldConfigs<TDef extends CfgDefMeta> = TDef["fields"];
type Pass<T> = [T] extends [void] ? void : T;
export type CfgFs<TCfg extends CfgDefMeta> = TCfg["_fs"];
export type CfgEs<TCfg extends CfgDefMeta> = TCfg extends CfgDefMeta<any, infer ES, any, any>
  ? Pass<ES>
  : void;
export type CfgCvCb<TCfg extends CfgDefMeta> = TCfg["_cv"];
export type CfgFc<TCfg extends CfgDefMeta> = TCfg["_fc"];

/**
 * Example:
 * type ExampleCfg = CfgFromDef<typeof exampleConfigDefinition>;
 */
export type CfgFromDef<TDef extends ConfigDefinition<any>> = CfgDefMeta<
  TDef["formSchema"],
  // Coerce the following to void if not provided
  TDef["externalSchema"] extends ZObj ? TDef["externalSchema"] : void,
  TDef["calcValuesCallback"] extends CvCb<any> ? TDef["calcValuesCallback"] : void,
  TDef["fieldConfigs"] extends ConfigFieldsOpt<any, any, any> ? TDef["fieldConfigs"] : void
>;
