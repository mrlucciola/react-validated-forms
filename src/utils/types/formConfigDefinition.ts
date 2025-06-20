import type { ConfigFieldsOpt, CvCb, CvCbOpt, ZObj, ZObjOpt } from "@utils/index";

/**
 * What the schema author writes once, usually in a separate file.
 * No runtime data here – just the recipe.
 */
export type ConfigDefinition<TCfg extends AnyCfgDef<any, any, any, any>> = {
  formSchema: CfgFs<TCfg>;
  externalSchema?: CfgEs<TCfg>;
  calcValuesCallback?: CfgCvCb<TCfg>;
  fieldConfigs?: CfgFc<TCfg>;
};

export interface AnyCfgDef<
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
export type InferCfg<TCfg extends AnyCfgDef<any, any, any, any> = AnyCfgDef<any, any, any, any>> =
  AnyCfgDef<TCfg["_fs"], TCfg["_es"], TCfg["_cv"], TCfg["_fc"]>;

// export type InferCfgDefCvCb<TDef extends AnyCfgDef> = TDef["calcValuesCallback"];
// export type InferCfgDefFormSchema<TDef extends AnyCfgDef> = TDef["formSchema"];
// export type InferCfgDefExternalSchema<TDef extends AnyCfgDef> = TDef["externalSchema"];
// export type InferCfgDefFieldConfigs<TDef extends AnyCfgDef> = TDef["fields"];
export type CfgFs<TCfg extends InferCfg> = TCfg["_fs"];
export type CfgEs<TCfg extends InferCfg> = TCfg["_es"];
export type CfgCvCb<TCfg extends InferCfg> = TCfg["_cv"];
export type CfgFc<TCfg extends InferCfg> = TCfg["_fc"];

/**
 * Example:
 * type ExampleCfg = CfgFromDef<typeof exampleConfigDefinition>;
 */
export type CfgFromDef<TDef extends ConfigDefinition<any>> = AnyCfgDef<
  TDef["formSchema"],
  // Coerce the following to void if not provided
  TDef["externalSchema"] extends ZObj ? TDef["externalSchema"] : void,
  TDef["calcValuesCallback"] extends CvCb<any> ? TDef["calcValuesCallback"] : void,
  TDef["fieldConfigs"] extends ConfigFieldsOpt<any, any, any> ? TDef["fieldConfigs"] : void
>;
