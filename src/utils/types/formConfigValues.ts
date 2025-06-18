import type {
  EvOut,
  UiValues,
  FormConfig,
  OmitOptionalKeys,
  PartialOrOmit,
  ZObj,
  ZObjOpt,
  CvCb,
} from "@utils/index";

/** Atomic context slice of Form-Config-Values */
type FormValuesCtx<T extends UiValues> = { fields: T };
/** Atomic context slice of Form-Config-Values */
type CalcValuesCtx<T extends any> = PartialOrOmit<T, { calculated: T }>;
/** Atomic context slice of Form-Config-Values */
type ExtValuesCtx<T extends EvOut | unknown> = PartialOrOmit<T, { external: T }>;

/** Identical to FormConfigValuesBase but with different generics */
export type FormConfigCtx<TFv extends UiValues, TCv, TEv extends EvOut> = FormValuesCtx<TFv> &
  CalcValuesCtx<TCv> &
  ExtValuesCtx<TEv>;

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
type FormConfigValuesBase<TFs extends ZObj, TCvCb, TEs extends ZObjOpt> = FormValuesCtx<
  UiValues<TFs>
> &
  // Need to sort out generic - whether the callback type is provided or its return values
  CalcValuesCtx<TCvCb> &
  ExtValuesCtx<EvOut<TEs>>;

export type InferFormConfigValues<TConfig extends FormConfig<ZObj>> = TConfig extends FormConfig<
  infer TFs,
  infer TCvCb,
  infer TEs
>
  ? FormConfigValues<TFs, TCvCb, TEs>
  : never;

export type FormConfigValues<
  TFs extends ZObj,
  TCvCb extends CvCb<TFs, any, any> | undefined,
  TEs extends ZObjOpt
> = OmitOptionalKeys<FormConfigValuesBase<TFs, TCvCb, TEs>>;
