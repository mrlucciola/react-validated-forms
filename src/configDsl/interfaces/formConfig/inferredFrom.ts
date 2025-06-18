import type { FormConfig } from "@configDsl/interfaces";
import type { ZObj } from "@utils/zodTypes";

export type InferFormSchemaFromConfig<TConfig extends FormConfig<ZObj>> =
  TConfig extends FormConfig<infer TFormSchema, infer _TCvCb, infer _TEvSchema>
    ? TFormSchema
    : never;
