import type {
  ExtValues,
  CfgCvCb,
  CfgEs,
  CfgFs,
  InferCv,
  UiValues,
  AnyCfgMeta,
  ZObj,
  ZObjOpt,
  CvCbOpt,
} from "@utils/index";

/** Atomic context slice of Form-Config-Values */
type FormValuesCtx<C extends AnyCfgMeta> = { form: UiValues<CfgFs<C>> };
/** Atomic context slice of Form-Config-Values */
type CalcValuesCtx<C extends AnyCfgMeta> = { calculated?: InferCv<CfgCvCb<C>> };
/** Atomic context slice of Form-Config-Values */
type ExtValuesCtx<C extends AnyCfgMeta> = { external?: ExtValues<CfgEs<C>> };

type DefineConfigValuesBase<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = {
  form: UiValues<TFs>;
  external?: ExtValues<TEs>;
  calculated?: InferCv<TCvCb>;
};

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
type FormConfigValuesBase<C extends AnyCfgMeta> = FormValuesCtx<C> &
  CalcValuesCtx<C> &
  ExtValuesCtx<C>;

/** Used BEFORE config is defined */
export type DefineConfigValues<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = DefineConfigValuesBase<TFs, TEs, TCvCb>;

/** Used AFTER config is defined */
export type FormConfigValues<C extends AnyCfgMeta<ZObj, any, any, any>> = FormConfigValuesBase<C>;
