import type { AnyCvCb, FormConfig, UiValues, ZObj } from "@utils/index";

export type InferFormValuesFromConfig<TConfig extends FormConfig<ZObj>> =
  InferExtSchemaFromConfig<TConfig> extends ZObj
    ? UiValues<InferExtSchemaFromConfig<TConfig>>
    : undefined;

export type InferCvCbFromConfig_<TConfig extends FormConfig<ZObj>> = TConfig extends FormConfig<
  infer _TFormSchema,
  infer TCvCb,
  infer _TEvSchema
>
  ? TCvCb extends AnyCvCb | undefined
    ? TCvCb
    : never
  : never;
export type InferCvCbFromConfig<TConfig extends FormConfig<ZObj>> = TConfig extends FormConfig<
  any,
  infer TCvCb,
  any
>
  ? TCvCb | undefined
  : undefined;

export type InferCalcValuesFromConfig<TConfig extends FormConfig<ZObj>> =
  InferCvCbFromConfig<TConfig> extends NonNullable<AnyCvCb>
    ? InferCvCbFromConfig<TConfig>
    : undefined;

export type InferExtSchemaFromConfig<TConfig extends FormConfig<ZObj>> = TConfig extends FormConfig<
  infer _TFormSchema,
  infer _TCvCb,
  infer TEvSchema
>
  ? TEvSchema
  : never;
export type InferExternalValuesFromConfig<TConfig extends FormConfig<ZObj>> =
  InferExtSchemaFromConfig<TConfig> extends infer T extends ZObj ? UiValues<T> : undefined;
