import type { AnyCfgDef } from "@utils/index";

export type InferCfgDefCvCb<TDef extends AnyCfgDef> = TDef["calcValuesCallback"];
export type InferCfgDefFormSchema<TDef extends AnyCfgDef> = TDef["formSchema"];
export type InferCfgDefExternalSchema<TDef extends AnyCfgDef> = TDef["externalSchema"];
export type InferCfgDefFieldConfigs<TDef extends AnyCfgDef> = TDef["fields"];
