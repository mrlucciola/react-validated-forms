import type { ExtValues, UiValues } from "@utils/formOutputTypes";
import type { CvCb, CvCbOpt } from "@utils/index";
import type { AnyCfgMeta, CfgCvCb, CfgFc, CfgFs } from "@utils/types/formConfigDefinition";
import type { ConfigFieldsOpt } from "@utils/types/formFieldConfigs";
import type { ZObj, ZObjOpt } from "@utils/zodTypes";

/** Derive `defaults` type from the config-definition type (passed into `useForm`) */
export type CfgDefaults<C extends AnyCfgMeta> = Partial<CfgUiValues<C>>;
/** Derive `defaults` type from the `formSchema`/`TFs` type */
export type FsDefaults<TFs extends ZObj> = Partial<UiValues<TFs>>;

/** Derive `uiValues`/`formValues` type from the config-definition type (passed into `useForm`) */
export type CfgUiValues<C extends AnyCfgMeta> = UiValues<CfgFs<C>>;
export type CfgUiKeys<C extends AnyCfgMeta> = FsUiKeys<CfgFs<C>>;
export type CfgFcKeys<C extends AnyCfgMeta> = keyof CfgFc<C>;
export type CfgCalculatedValues<C extends AnyCfgMeta> = CfgCvCb<C> extends CvCb<any, any, infer R>
  ? R
  : void;
export type CvCbCalculatedValues<TCvCb extends CvCbOpt<any, any>> = TCvCb extends CvCb<
  any,
  any,
  infer R
>
  ? R
  : undefined;

export type DefaultsKeys<TFs extends ZObj> = keyof FsDefaults<TFs>;
export type FsUiKeys<TFs extends ZObj> = keyof UiValues<TFs>;
export type EsKeys<TEs extends ZObjOpt> = keyof ExtValues<TEs>;
export type FcKeys<Fc extends ConfigFieldsOpt<any, any, any>> = keyof Fc;
