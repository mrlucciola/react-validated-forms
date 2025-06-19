import type { ZObj, ZObjOpt } from "@utils/index";
import type { EvOut, UiValues } from "./formOutputTypes";

/** CvCb Param Utility Type for optional second param (External Values)
 * Optional second parameter only when an external-values schema is present.
 */
type ExtArg<TEs extends ZObjOpt> = [TEs] extends [ZObj] ? [externalValues: EvOut<TEs>] : [];

/** Represents "Calculated Values Callback"
 * Input form values + (optional) external values and returns `calculated` values
 */
export type CvCb<
  TFs extends ZObj, // form schema
  TEs extends ZObjOpt = void, // external-values schema (optional)
  TCv extends Record<string, any> = Record<string, any>
> = (form: UiValues<TFs>, ...args: ExtArg<TEs>) => TCv;
export type CvCbOpt<TFs extends ZObj, TEs extends ZObjOpt = void> = void | CvCb<TFs, TEs>;

export type InferCv<T extends CvCbOpt<any, any>> = T extends CvCb<any, any, infer R> ? R : void;
