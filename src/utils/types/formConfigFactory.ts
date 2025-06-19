import type { CvCb, CvCbOpt, EvOut, FormConfigFields, UiValues, ZObj, ZObjOpt } from "@utils/index";

export type FormConfigInstance<
  TFs extends ZObj,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TEs extends ZObjOpt
> = {
  fields: Partial<FormConfigFields<TFs, TCvCb, TEs>>;
  calcValuesCallback?: TCvCb;
} & (TEs extends ZObj ? { externalValues: UiValues<NonNullable<TEs>> } : {});
export type InferInstance<F extends FormConfigFactory<any, any, any>> = ReturnType<F>;

/**
 * Produced by `defineFormConfig`. Accepts current external values
 * (or none) and returns a fully-resolved config object.
 */
export type FormConfigFactory<
  TFs extends ZObj,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TEs extends ZObjOpt
> = TEs extends ZObj
  ? // if you declared an external schema
    (externalValues: EvOut<TEs>) => FormConfigInstance<TFs, TCvCb, NonNullable<TEs>>
  : // otherwise it’s parameterless `() => ...`
    () => FormConfigInstance<TFs, TCvCb, TEs>;
