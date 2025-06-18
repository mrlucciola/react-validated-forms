import type { FormConfigFields } from "@configDsl/deprecatedInterfaces";
import type { CvCb, EvOut, FormOut, ZObj } from "@utils/index";

export * from "./inferredFrom";

/** One ring to rule them all
 * Replaces:
type AnyFormConfigCb<
  TFormSchema extends ZFormSchema = ZFormSchema,
  TCvCb extends AnyCvCb | unknown = AnyCvCb,
  TEvSchema extends ZEvSchema | unknown = ZEvSchema
> = FormConfigCb<TFormSchema, TCvCb, TEvSchema>;

type AnyFormCfgObj<
  TForm extends FormOut = any,
  TCalc = any,
  TExt extends EvOut = any
> = FormCfgReturnObj<TForm, TCalc, TExt>;

type AnyFormConfig<
  TFs extends ZFormSchema = ZFormSchema,
  TCvCb extends AnyCvCb = AnyCvCb,
  TEs extends ZEvSchema = ZEvSchema
> = {
  fields: FormConfig<TFs, InferCalcValuesFromCvCb<TCvCb>, EvOut<TEs>>;
  calcValuesCallback?: TCvCb;
  externalValues?: EvOut<TEs>;
};
 */
export type FormConfig<
  TSchema extends ZObj,
  /** Error:
   * Generic type 'CvCb' requires 3 type argument(s).ts(2314)
   * - (alias) type CvCb<TFs extends ZFormSchema, TEs extends ZEvSchema, TCv extends Record<string, any> | undefined> = TCv extends undefined ? never : CvCbBase<TFs, TEs, NonNullable<TCv>>
   */
  TCvCb extends CvCb | undefined = undefined,
  TEvSchema extends ZObj | undefined = undefined
> = {
  /** Field-level behaviour & validation */
  fields: Partial<FormConfigFields<FormOut<TSchema>, ReturnType<TCvCb>, EvOut<TEvSchema>>>;
  /** Derived values callback (optional) */
  calcValuesCallback?: TCvCb;
  /** Runtime external values (optional) */
  externalValues?: EvOut<TEvSchema>;
};
