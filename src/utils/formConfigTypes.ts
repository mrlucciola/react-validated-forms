import type { EvOut, FormOut } from "./formOutputTypes";

/** Represents "Calculated Values Callback"
 * Input form values + (optional) external values and returns `calculated` values
 */
export type CvCb<TFv extends FormOut, TCv, TEv extends EvOut> = (
  form: TFv,
  externalValues?: TEv
) => TCv;

export type AnyCvCb<TFv extends FormOut = FormOut, TCv = any, TEv extends EvOut = any> = CvCb<
  TFv,
  TCv,
  TEv
>;

/** "Calculated Values Callback" type, derived from "calculatedValues" */
export type CvCbFromCv<TCv> = TCv extends never | undefined ? never : CvCb<any, TCv, any>;
