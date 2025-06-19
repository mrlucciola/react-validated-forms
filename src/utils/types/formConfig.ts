import type { CvCbOpt, EvOut, FormConfigFields, ZObj, ZObjOpt } from "@utils/index";

/** One ring to rule them all
 * Replaces:
type AnyFormConfigCb<
  TFormSchema extends ZObj = ZObj,
  TCvCb extends AnyCvCb | unknown = AnyCvCb,
  TEvSchema extends ZObjOpt | unknown = ZObjOpt
> = FormConfigCb<TFormSchema, TCvCb, TEvSchema>;

type AnyFormCfgObj<
  TForm extends UiValues = any,
  TCalc = any,
  TExt extends EvOut = any
> = FormCfgReturnObj<TForm, TCalc, TExt>;

type AnyFormConfig<
  TFs extends ZObj = ZObj,
  TCvCb extends AnyCvCb = AnyCvCb,
  TEs extends ZObjOpt = ZObjOpt
> = {
  fields: FormConfig<TFs, InferCalcValuesFromCvCb<TCvCb>, EvOut<TEs>>;
  calcValuesCallback?: TCvCb;
  externalValues?: EvOut<TEs>;
};
 */
export type FormConfig<
  TFs extends ZObj,
  TCvCb extends CvCbOpt<TFs, any> = void,
  TEs extends ZObjOpt = void
> = {
  /** Field-level behaviour & validation */
  fields: Partial<FormConfigFields<TFs, TCvCb, TEs>>;
  /** Derived values callback (optional) */
  calcValuesCallback?: TCvCb;
  /** Runtime external values (optional) */
  externalValues?: EvOut<TEs>;
};
