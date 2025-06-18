import type { CvCb, EvOut, FormOut, ZObj } from "@utils/index";

// One ring to rule them all
export type FormConfig<
  TSchema extends ZObj,
  TCvCb extends CvCb | undefined = undefined,
  TEvSchema extends ZObj | undefined = undefined
> = {
  /** Field-level behaviour & validation */
  fields: Partial<FormFieldConfig<FormOut<TSchema>, ReturnType<TCvCb>, EvOut<TEvSchema>>>;
  /** Derived values callback (optional) */
  calcValuesCallback?: TCvCb;
  /** Runtime external values (optional) */
  externalValues?: EvOut<TEvSchema>;
};
