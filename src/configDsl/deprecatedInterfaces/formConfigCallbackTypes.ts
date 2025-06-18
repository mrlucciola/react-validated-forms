import type {
  AnyCvCb,
  AnyCvCb_,
  CvCb,
  CvCb_,
  CvCbFromCv,
  EvOut,
  FormOut,
  InferCalcValuesFromCvCb,
  Nullish,
  OmitOptionalKeys,
  PartialOrOmit,
  ZEvSchema,
  ZFormSchema,
  ZObj,
} from "@utils/index";
import type { AnyFormCfgObj, InferCalcValuesFromConfig } from "./interfaces";
import type { FormConfig } from "./formConfigTypes";

type ExternalValuesCbDEPREC<TEv extends EvOut> = (
  externalValues?: Nullish<NonNullable<TEv>> | null
) => void;
type EvPropDEPREC<TEv extends EvOut> = TEv extends undefined | never
  ? never
  : Parameters<ExternalValuesCbDEPREC<TEv>>;

/**
 * @deprecated fix type - should omit fields that are undefined
 * @deprecated add additional support type - `AnyFormConfigReturn` for `unknown` values on `Partial<...>` fields
 */
export type FormConfigReturnDEPREC<TFv extends FormOut, TCv, TEv extends EvOut> = (
  ...args: EvPropDEPREC<TEv>
) => {
  fields: FormConfig<TFv, TCv, TEv>; // prev: ConfigFieldsProp
  /** @deprecated fix type - should be CvCb_<TFv, TCv, TEv> */
  calcValuesCallback?: CvCbFromCv<TCv>;
  externalValues?: TEv;
};
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
type FormConfigDefinition<
  TFormSchema extends ZObj,
  TCv extends Record<string, any>,
  TEvSchema extends EvSchema
> = {
  formSchema: TFormSchema;
  fields: Partial<FormConfig<FormOut<TFormSchema>, TCv, EvOut<TEvSchema>>>; // prev: ConfigFieldsProp
  calcValuesCallback?: (form: FormOut<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;
  externalSchema?: TEvSchema;
};

export type FormConfigReturnDEPREC<TFv extends FormOut, TCv, TEv extends EvOut> = (
  ...args: EvPropDEPREC<TEv>
) => {
  fields: FormConfig<TFv, TCv, TEv>; // prev: ConfigFieldsProp
  calcValuesCallback?: CvCbFromCv<TCv>;
  externalValues?: TEv;
};
 */

// export type FormConfigCbInput<TEvSchema extends ZEvSchema | unknown> = EvOut<TEvSchema>;

export type FormConfigCbArgs<TEs extends ZEvSchema | unknown> = [TEs] extends [ZObj]
  ? [externalValues: NonNullable<EvOut<NonNullable<TEs>>>]
  : [TEs] extends [undefined]
  ? []
  : [externalValues?: unknown];

////////////////////////////////////////////////////////////////////////////////

/** Atomic context slice of Form-Field-Configs */
type FieldConfigsCtx<T extends ZFormSchema> = { fields: FormConfig<T, any, any> };
/** Atomic context slice of Calculated-Values-Callback */
type CvCbCtx<T extends AnyCvCb | undefined | unknown> = PartialOrOmit<T, { calcValuesCallback: T }>;
type ExtValues_<T extends ZEvSchema | unknown> = T extends ZEvSchema ? EvOut<T> : unknown;
/** Atomic context slice of External-Values */
type ExtValuesCtx<T extends ZEvSchema | unknown, U = ExtValues_<T>> = PartialOrOmit<
  U,
  { externalValues: U }
>;

////////////////////////////////////////////////////////////////////////////////

export type FormConfigCbReturn<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema | unknown
> = FieldConfigsCtx<TFormSchema> & CvCbCtx<TCvCb> & ExtValuesCtx<TEvSchema>;

export type FormConfigCbReturnStrict<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema
> = OmitOptionalKeys<FormConfigCbReturn<TFormSchema, TCvCb, TEvSchema>>;

////////////////////////////////////////////////////////////////////////////////

/** Generics represent original types FormConfigReturnDEPREC */
export type FormConfigCb<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema | unknown
> = (...args: FormConfigCbArgs<TEvSchema>) => FormConfigCbReturn<TFormSchema, TCvCb, TEvSchema>;

export type FormConfigCbStrict<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema
> = (
  // May need to do a ternary with `never` in props for `undefined` types
  ...args: FormConfigCbArgs<TEvSchema>
) => FormConfigCbReturnStrict<TFormSchema, TCvCb, TEvSchema>;

////////////////////////////////////////////////////////////////////////////////

/** Replaces `AnyFormCfgObj` */
export type AnyFormConfigCb<
  TFormSchema extends ZFormSchema = ZFormSchema,
  TCvCb extends AnyCvCb | unknown = AnyCvCb,
  TEvSchema extends ZEvSchema | unknown = ZEvSchema
> = FormConfigCb<TFormSchema, TCvCb, TEvSchema>;
// export type AnyFormConfigCbStrict<
//   TFormSchema extends ZFormSchema = ZFormSchema,
//   TCvCb extends AnyCvCbStrict = AnyCvCbStrict,
//   TEvSchema extends ZEvSchema = ZEvSchema
// > = FormConfigCbStrict<TFormSchema, TCvCb, TEvSchema>;

////////////////////////////////////////////////////////////////////////////////

export type AnyFormConfig<
  TFs extends ZFormSchema = ZFormSchema,
  TCvCb extends AnyCvCb = AnyCvCb,
  TEs extends ZEvSchema = ZEvSchema
> = {
  fields: FormConfig<TFs, InferCalcValuesFromCvCb<TCvCb>, EvOut<TEs>>;
  calcValuesCallback?: TCvCb;
  externalValues?: EvOut<TEs>;
};
// export type AnyFormConfigStrict<
//   TFormSchema extends ZFormSchema = ZFormSchema,
//   TCvCb extends AnyCvCbStrict = AnyCvCbStrict,
//   TEvSchema extends ZEvSchema = ZEvSchema
// > = ReturnType<AnyFormConfigCbStrict<TFormSchema, TCvCb, TEvSchema>>;
