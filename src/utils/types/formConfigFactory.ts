import type {
  CfgDefMeta,
  CfgCvCb,
  CfgEs,
  CfgFc,
  CfgFs,
  ExtValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";

export type FormConfigInstance<TCfg extends CfgDefMeta> = {
  fieldSchema: CfgFs<TCfg>;
  externalValues?: ExtValues<CfgEs<TCfg>>;
  calcValuesCallback?: CfgCvCb<TCfg>;
  fieldConfigs?: CfgFc<TCfg>;
};
export type InferInstanceFromFactory<F extends FormConfigFactory<any>> = ReturnType<F>;

/** Conditional parameter used in `FormConfigFactory` */
type ConfigFactoryParamExternalValue<TEs extends ZObjOpt> = TEs extends ZObj
  ? [externalValues: ExtValues<TEs>]
  : [];
/** Scalable parameter-builder used in `FormConfigFactory` */
export type ConfigFactoryParams<TEs extends ZObjOpt> = [...ConfigFactoryParamExternalValue<TEs>];

/**
 * Produced by `defineFormConfig`. Accepts current external values
 * (or none) and returns a fully-resolved config object.
 */
export type FormConfigFactory<TCfg extends CfgDefMeta> = (
  ...args: ConfigFactoryParams<CfgEs<TCfg>>
) => FormConfigInstance<TCfg>;
