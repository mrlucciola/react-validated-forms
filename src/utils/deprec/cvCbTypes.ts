import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "./formOutputTypes";

/** CvCb Param Utility Type for optional second param (External Values)
 * Optional second parameter only when an external-values schema is present.
 */
type ExtArg<TEs extends ZObjOpt> = [externalValues?: ExtValues<TEs>];
type ExtArgResolved<TEs extends ZObjOpt> = TEs extends ZObj ? [externalValues: ExtValues<TEs>] : [];

/** Represents "Calculated Values Callback"
 * Input form values + (optional) external values and returns `calculated` values
 */
export type CvCb<
  TFs extends ZObj, // form schema
  TEs extends ZObjOpt = void, // external-values schema (optional)
  TCv extends Record<string, any> = Record<string, any>
> = (form: UiValues<TFs>, ...args: ExtArgResolved<TEs>) => TCv;
export type CvCbOpt<TFs extends ZObj, TEs extends ZObjOpt = void> = void | CvCb<TFs, TEs>;
