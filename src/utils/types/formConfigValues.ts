import type { AnyCfgDef, ExtValues, CfgCvCb, CfgEs, CfgFs, InferCv, UiValues } from "@utils/index";

/** Atomic context slice of Form-Config-Values */
type FormValuesCtx<TCfgDef extends AnyCfgDef> = { form: UiValues<CfgFs<TCfgDef>> };
/** Atomic context slice of Form-Config-Values */
type CalcValuesCtx<TCfgDef extends AnyCfgDef> = { calculated?: InferCv<CfgCvCb<TCfgDef>> };
/** Atomic context slice of Form-Config-Values */
type ExtValuesCtx<TCfgDef extends AnyCfgDef> = { external?: ExtValues<CfgEs<TCfgDef>> };

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
type FormConfigValuesBase<TCfgDef extends AnyCfgDef> = FormValuesCtx<TCfgDef> &
  CalcValuesCtx<TCfgDef> &
  ExtValuesCtx<TCfgDef>;

export type FormConfigValues<TCfg extends AnyCfgDef> = FormConfigValuesBase<TCfg>;
