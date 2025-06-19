import type { AnyCfgDef } from "@utils/index";

export type InferCfgDefCvCb<TDef extends AnyCfgDef> = NonNullable<TDef["calcValuesCallback"]>;
export type InferCfgDefFormSchema<TDef extends AnyCfgDef> = NonNullable<TDef["formSchema"]>;
export type InferCfgDefExternalSchema<TDef extends AnyCfgDef> = NonNullable<TDef["externalSchema"]>;
export type InferCfgDefFieldConfigs<TDef extends AnyCfgDef> = NonNullable<TDef["fields"]>;
