import type {
  AnyCfgDef,
  CfgCvCb,
  CfgEs,
  CfgFc,
  CfgFs,
  ConfigFieldsOpt,
  CvCbOpt,
  ExtValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";

/** Deprecated types - Keeping for reference
---------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------
// Atomic context slice of Form-Field-Configs
type FieldConfigsCtx<TFs extends ZObj> = FormConfig<TFs>["fields"];
// Atomic context slice of Calculated-Values-Callback
type CvCbCtx<T extends AnyCvCb | undefined | unknown> = PartialOrOmit<T, { calcValuesCallback: T }>;
type ExtValues_<T extends ZObjOpt | unknown> = T extends ZObjOpt ? ExtValues<T> : unknown;
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
  ? [externalValues: NonNullable<ExtValues<NonNullable<TEs>>>]
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
export type FormConfigInstance<TCfg extends AnyCfgDef> = {
  fieldSchema: CfgFs<TCfg>;
  externalValues?: ExtValues<CfgEs<TCfg>>;
  calcValuesCallback?: CfgCvCb<TCfg>;
  fieldConfigs?: CfgFc<TCfg>;
};
export type InferInstanceFromFactory<F extends FormConfigFactory<any>> = ReturnType<F>;

/** Conditional parameter used in `FormConfigFactory` */
type ConfigFactoryParamExternalValue<TEs extends ZObjOpt> = TEs extends ZObj
  ? [externalValues: ExtValues<TEs>]
  : [];
/** Scalable parameter-builder used in `FormConfigFactory` */
export type ConfigFactoryParams<TEs extends ZObjOpt> = [...ConfigFactoryParamExternalValue<TEs>];

/**
 * Produced by `defineFormConfig`. Accepts current external values
 * (or none) and returns a fully-resolved config object.
 */
export type FormConfigFactory<TCfg extends AnyCfgDef> = (
  ...args: ConfigFactoryParams<CfgEs<TCfg>>
) => FormConfigInstance<TCfg>;
