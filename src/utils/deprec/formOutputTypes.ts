import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { AppliedFieldOutput } from "./fxnTypes";

type StripIndexSignature<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};

// type StripIndexSignature<TSchema extends ZObj<U>, U extends z.ZodRawShape=z.ZodRawShape> = {
//   [K in keyof U as string extends K ? never : number extends K ? never : K]: U[K];
// };
// type StripIndexSignatureDeprec<T extends z.ZodRawShape> = {
//   [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
// };

/** "Form Values" output
 * @todo differentiate between:
 * - "User Input"/display form values; and,
 * - "Actual" form values
 */
export type UiValues<T extends ZObj = ZObj> = AppliedFieldOutput<T>;
// export type UiValues<T extends ZObj> = StripIndexSignature<AppliedFieldOutput<T>>;
export type UiValuesDeprec<TFs extends ZObj = ZObj> = AppliedFieldOutput<TFs>;

/** "External Values" output */
export type ExtValues<TEs extends ZObjOpt = ZObjOpt> = TEs extends ZObj
  ? UiValues<NonNullable<TEs>>
  : void;
