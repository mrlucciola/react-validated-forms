import type {
  CvCbOpt,
  EvOut,
  FormConfig,
  InferCv,
  OmitOptionalKeys,
  PartialOrOmit,
  UiValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";

/** Atomic context slice of Form-Config-Values */
type FormValuesCtx<TFs extends ZObj> = { fields: UiValues<TFs> };
/** Atomic context slice of Form-Config-Values */
type CalcValuesCtx<TCvCb extends CvCbOpt<any, any>> = PartialOrOmit<
  TCvCb,
  { calculated: InferCv<TCvCb> }
>;
/** Atomic context slice of Form-Config-Values */
type ExtValuesCtx<TEs extends ZObjOpt> = PartialOrOmit<TEs, { external: EvOut<TEs> }>;

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
type FormConfigValuesBase<
  TFs extends ZObj,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TEs extends ZObjOpt
> = FormValuesCtx<TFs> & CalcValuesCtx<TCvCb> & ExtValuesCtx<TEs>;

export type InferFormConfigValues<TConfig extends FormConfig<ZObj>> = TConfig extends FormConfig<
  infer TFs,
  infer TCvCb,
  infer TEs
>
  ? FormConfigValues<TFs, TCvCb, TEs>
  : never;

export type FormConfigValues<
  TFs extends ZObj,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TEs extends ZObjOpt
> = OmitOptionalKeys<FormConfigValuesBase<TFs, TCvCb, TEs>>;
