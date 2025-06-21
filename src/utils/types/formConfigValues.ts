import type { CfgDefMeta, ExtValues, CfgCvCb, CfgEs, CfgFs, InferCv, UiValues } from "@utils/index";

/** Atomic context slice of Form-Config-Values */
type FormValuesCtx<TCfgDef extends CfgDefMeta> = { form: UiValues<CfgFs<TCfgDef>> };
/** Atomic context slice of Form-Config-Values */
type CalcValuesCtx<TCfgDef extends CfgDefMeta> = { calculated?: InferCv<CfgCvCb<TCfgDef>> };
/** Atomic context slice of Form-Config-Values */
type ExtValuesCtx<TCfgDef extends CfgDefMeta> = { external?: ExtValues<CfgEs<TCfgDef>> };

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
type FormConfigValuesBase<TCfgDef extends CfgDefMeta> = FormValuesCtx<TCfgDef> &
  CalcValuesCtx<TCfgDef> &
  ExtValuesCtx<TCfgDef>;

export type FormConfigValues<TCfg extends CfgDefMeta> = FormConfigValuesBase<TCfg>;
