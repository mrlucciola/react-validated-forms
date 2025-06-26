import type { CvCb } from "@utils/deprec/cvCbTypes";
import type { DefineConfigFields } from "@utils/deprec/formFieldConfigs";
import type { ConfigBase } from "@utils/deprec/useFormTypes/useFormTypes";
import type { ZObj } from "@utils/rootTypes";

export type AnyConfig<
  TFs extends ZObj = ZObj,
  TEs extends ZObj | void = ZObj | void,
  TCvCb extends CvCb<TFs, TEs> = CvCb<TFs, TEs>,
  TFc extends DefineConfigFields<TFs, TEs, TCvCb> = any
> = ConfigBase<TFs, TEs, TCvCb, TFc>;
