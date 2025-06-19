import type { CvCbOpt, EvOut, FormConfigFields, UiValues, ZObj, ZObjOpt } from "@utils/index";

/** Deprecated types - Keeping for reference
---------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------
// Atomic context slice of Form-Field-Configs
type FieldConfigsCtx<TFs extends ZObj> = FormConfig<TFs>["fields"];
// Atomic context slice of Calculated-Values-Callback
type CvCbCtx<T extends AnyCvCb | undefined | unknown> = PartialOrOmit<T, { calcValuesCallback: T }>;
type ExtValues_<T extends ZObjOpt | unknown> = T extends ZObjOpt ? EvOut<T> : unknown;
// Atomic context slice of External-Values
type ExtValuesCtx<T extends ZObjOpt | unknown, U = ExtValues_<T>> = PartialOrOmit<
  U,
  { externalValues: U }
>;
---------------------------------------------------------------------------------------
export type FormConfigCbReturn<
  TFormSchema extends ZObj,
  TCvCb,
  TEvSchema extends ZObjOpt | unknown
> = FieldConfigsCtx<TFormSchema> & CvCbCtx<TCvCb> & ExtValuesCtx<TEvSchema>;
---------------------------------------------------------------------------------------
export type FormConfigCbArgs<TEs extends ZObjOpt | unknown> = [TEs] extends [ZObj]
  ? [externalValues: NonNullable<EvOut<NonNullable<TEs>>>]
  : [TEs] extends [undefined]
  ? []
  : [externalValues?: unknown];
export type FormConfigCb<
  TFormSchema extends ZObj,
  TCvCb,
  TEvSchema extends ZObjOpt | unknown
> = (...args: FormConfigCbArgs<TEvSchema>) => FormConfigCbReturn<TFormSchema, TCvCb, TEvSchema>;
---------------------------------------------------------------------------------------
*/
export type FormConfigInstance<
  TFs extends ZObj,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TEs extends ZObjOpt
> = {
  fields: Partial<FormConfigFields<TFs, TCvCb, TEs>>;
  calcValuesCallback?: TCvCb;
} & (TEs extends ZObj ? { externalValues: UiValues<NonNullable<TEs>> } : {});
export type InferInstance<F extends FormConfigFactory<any, any, any>> = ReturnType<F>;

/** Conditional parameter used in `FormConfigFactory` */
type ConfigFactoryParamExternalValue<TEs extends ZObjOpt> = TEs extends ZObj
  ? [externalValues: EvOut<TEs>]
  : [];
/** Scalable parameter-builder used in `FormConfigFactory` */
type ConfigFactoryParams<TEs extends ZObjOpt> = [...ConfigFactoryParamExternalValue<TEs>];

/**
 * Produced by `defineFormConfig`. Accepts current external values
 * (or none) and returns a fully-resolved config object.
 */
export type FormConfigFactory<
  TFs extends ZObj,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TEs extends ZObjOpt
> = TEs extends ZObj
  ? // if you declared an external schema
    (...args: ConfigFactoryParams<TEs>) => FormConfigInstance<TFs, TCvCb, NonNullable<TEs>>
  : // otherwise it’s parameterless `() => ...`
    () => FormConfigInstance<TFs, TCvCb, TEs>;
