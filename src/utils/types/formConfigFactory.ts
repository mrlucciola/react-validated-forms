import type { CvCb } from "@utils/cvCbTypes";
import type { EvOut, FormConfigFields, UiValues } from "@utils/index";
import type { ZObj, ZObjOpt } from "@utils/zodTypes";

export type FormConfigInstance<
  TFs extends ZObj,
  TCvCb extends CvCb<TFs, any, any> | void,
  TEs extends ZObjOpt
> = {
  fields: Partial<FormConfigFields<TFs, TCvCb, TEs>>;
  calcValuesCallback?: TCvCb;
} & TEs extends undefined
  ? {}
  : { externalValues: UiValues<NonNullable<TEs>> };

/**
 * Produced by `defineFormConfig`.  Accepts *current* external values
 * (or none) and returns a fully-resolved config object.
 */
export type FormConfigFactory<
  TFs extends ZObj,
  TCvCb extends CvCb<TFs, any, any> | void,
  TEs extends ZObj | void
> = TEs extends ZObj
  ? // if you declared an external schema
    (external: EvOut<TEs>) => FormConfigInstance<TFs, TCvCb, NonNullable<TEs>>
  : // otherwise it’s parameterless `() => …`
    () => FormConfigInstance<TFs, TCvCb, undefined>;
