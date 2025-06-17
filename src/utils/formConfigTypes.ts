import type { EvOut, FormOut } from "./formOutputTypes";

/** Represents "Calculated Values Callback"
 * Input form values + (optional) external values and returns `calculated` values
 */
type CvCb<TFv extends FormOut, TEv extends EvOut, TCv> = (form: TFv, externalValues?: TEv) => TCv;

/** "Calculated Values Callback" type, derived from "calculatedValues" */
export type CvCbFromCalc<TCv> = TCv extends never | undefined ? never : CvCb<any, any, TCv>;
