import type { AnyCfgDef, ZObj } from "@utils/index";

export type InferFormSchemaFromConfig<TConfig extends AnyCfgDef<ZObj>> = TConfig extends AnyCfgDef<
  infer TFs,
  infer _TEs,
  infer _TCvCb,
  infer _TFc
>
  ? TFs
  : never;
