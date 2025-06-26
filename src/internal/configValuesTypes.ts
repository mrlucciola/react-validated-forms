import type { ZObj, ZObjOpt } from "@utils/rootTypes";
// DEPRECATED IMPORTS
import type { CvCbOpt } from "@utils/deprec/cvCbTypes";
import type { ExtValues, UiValues } from "@utils/deprec/formOutputTypes";
import type { CvCbCalculatedValues } from "@utils/deprec/derived";
import type { AnyCfgMeta, CfgCvCb, CfgEs, CfgFs } from "@utils/deprec/formConfigDefinition";

/** Used BEFORE config is defined */
export type DefineConfigValues<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = {
  form: UiValues<TFs>;
  external?: ExtValues<TEs>;
  calculated?: CvCbCalculatedValues<TCvCb>;
};

export type InferConfigValues<C extends AnyCfgMeta> = DefineConfigValues<
  CfgFs<C>,
  CfgEs<C>,
  CfgCvCb<C>
>;
