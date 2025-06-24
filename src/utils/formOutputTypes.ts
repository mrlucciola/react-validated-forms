import type { ZObj, ZObjOpt } from "@utils/index";
import type { AppliedFieldOutput, OptionalAppliedFieldOutput } from "./fxnTypes";

/** "Form Values" output
 * @todo differentiate between:
 * - "User Input"/display form values; and,
 * - "Actual" form values
 */
export type UiValues<TFs extends ZObj = ZObj> = AppliedFieldOutput<TFs>;

/** "External Values" output */
export type ExtValues<TEs extends ZObjOpt = ZObjOpt> = TEs extends ZObj
  ? AppliedFieldOutput<NonNullable<TEs>>
  : void;
