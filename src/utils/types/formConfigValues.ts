import type {
  AnyCfgMeta,
  CfgCvCb,
  CfgEs,
  CfgFs,
  CvCbCalculatedValues,
  CvCbOpt,
  ExtValues,
  Tighten,
  UiValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";

type DefineConfigValuesBase<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = {
  form: UiValues<TFs>;
  external?: ExtValues<TEs>;
  calculated?: CvCbCalculatedValues<TCvCb>;
};

/** Used BEFORE config is defined */
export type DefineConfigValues<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = DefineConfigValuesBase<TFs, TEs, TCvCb>;

export type InferConfigValues<C extends AnyCfgMeta> = DefineConfigValuesBase<
  CfgFs<C>,
  CfgEs<C>,
  CfgCvCb<C>
>;

/** Used AFTER config is defined */
export type ResolveConfigValues<C extends AnyCfgMeta<ZObj, any, any, any>> = Tighten<
  DefineConfigValuesBase<CfgFs<C>, CfgEs<C>, CfgCvCb<C>>
>;
