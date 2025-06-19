import type {
  AnyCfgDef,
  CvCbOpt,
  EvOut,
  FormConfig,
  InferCfgDefCvCb,
  InferCfgDefExternalSchema,
  InferCfgDefFormSchema,
  InferCv,
  OmitOptionalKeys,
  PartialOrOmit,
  UiValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";

/** Atomic context slice of Form-Config-Values */
type FormValuesCtx<TCfgDef extends AnyCfgDef> = {
  fields: UiValues<InferCfgDefFormSchema<TCfgDef>>;
};
/** Atomic context slice of Form-Config-Values */
type CalcValuesCtx<TCfgDef extends AnyCfgDef> = PartialOrOmit<
  InferCfgDefCvCb<TCfgDef>,
  { calculated: InferCv<InferCfgDefCvCb<TCfgDef>> }
>;
/** Atomic context slice of Form-Config-Values */
type ExtValuesCtx<TCfgDef extends AnyCfgDef> = PartialOrOmit<
  InferCfgDefExternalSchema<TCfgDef>,
  { external: EvOut<InferCfgDefExternalSchema<TCfgDef>> }
>;

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
type FormConfigValuesBase<TCfgDef extends AnyCfgDef> = FormValuesCtx<TCfgDef> &
  CalcValuesCtx<TCfgDef> &
  ExtValuesCtx<TCfgDef>;

export type InferFormConfigValues<TConfig extends FormConfig<ZObj>> = TConfig extends FormConfig<
  infer TFs,
  infer TCvCb,
  infer TEs
>
  ? FormConfigValues<TFs, TEs, TCvCb>
  : never;

export type FormConfigValues<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = OmitOptionalKeys<FormConfigValuesBase<AnyCfgDef<TFs, TEs, TCvCb>>>;
