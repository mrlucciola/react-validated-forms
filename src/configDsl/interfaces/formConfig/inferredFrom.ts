import type { FormConfig, ZObj } from "@utils/index";

export type InferFormSchemaFromConfig<TConfig extends FormConfig<ZObj>> =
  TConfig extends FormConfig<infer TFormSchema, infer _TCvCb, infer _TEvSchema>
    ? TFormSchema
    : never;
