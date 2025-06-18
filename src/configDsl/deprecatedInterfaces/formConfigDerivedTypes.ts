import type { AnyFormConfig } from "src/configDsl/deprecatedInterfaces/interfaces";
import type { AnyCvCb, ZObj, FormOut } from "@utils/index";

// Renamed from `TForm`
export type InferFormSchemaFromConfig<TConfig extends AnyFormConfig> =
  TConfig extends AnyFormConfig<infer TFormSchema, infer _TCvCb, infer _TEvSchema>
    ? TFormSchema
    : never;
export type InferFormValuesFromConfig<TConfig extends AnyFormConfig> =
  InferExtSchemaFromConfig<TConfig> extends ZObj
    ? FormOut<InferExtSchemaFromConfig<TConfig>>
    : undefined;

export type InferCvCbFromConfig_<TConfig extends AnyFormConfig> = TConfig extends AnyFormConfig<
  infer _TFormSchema,
  infer TCvCb,
  infer _TEvSchema
>
  ? TCvCb extends AnyCvCb | undefined
    ? TCvCb
    : never
  : never;
export type InferCvCbFromConfig<TConfig extends AnyFormConfig> = TConfig extends AnyFormConfig<
  any,
  infer TCvCb,
  any
>
  ? TCvCb | undefined
  : undefined;

export type InferCalcValuesFromConfig<TConfig extends AnyFormConfig> =
  InferCvCbFromConfig<TConfig> extends NonNullable<AnyCvCb>
    ? InferCvCbFromConfig<TConfig>
    : undefined;

export type InferExtSchemaFromConfig<TConfig extends AnyFormConfig> = TConfig extends AnyFormConfig<
  infer _TFormSchema,
  infer _TCvCb,
  infer TEvSchema
>
  ? TEvSchema
  : never;
export type InferExternalValuesFromConfig<TConfig extends AnyFormConfig> =
  InferExtSchemaFromConfig<TConfig> extends infer T extends ZObj ? FormOut<T> : undefined;

// type TValues = FormConfigValues<TForm, TCalc, TExt>;

/// PREVIOUS
// export type FieldConfigFromConfig<T extends AnyFormCfgObj> = Pick<T, "fields">["fields"];

// // @todo derive this type more effectively
// export type CalcValuesCbFromConfig<T extends AnyFormCfgObj> = T extends FormConfigReturnDEPREC<
//   infer _Form,
//   infer TCv,
//   infer _Ext
// >
//   ? CvCbFromCv<TCv>
//   : never;

// // @todo derive this type more effectively
// export type ExtValuesCbFromConfig<T extends AnyFormCfgObj> = T extends FormConfigReturnDEPREC<
//   infer _Form,
//   infer _Cv,
//   infer TExt
// >
//   ? TExt
//   : never;

// type TValues = FormConfigValues<TForm, TCalc, TExt>;
