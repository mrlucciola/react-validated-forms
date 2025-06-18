import type { ZEvSchema, ZFormSchema } from "@utils/schemaTypes";
import type { ZObj } from "@utils/zodTypes";
import type { EvOut, FormOut } from "./formOutputTypes";

// export type CvCbArgs<
export type CvCbArgs<TFs extends ZFormSchema, TEs extends ZEvSchema | unknown> = [TEs] extends [
  ZObj
]
  ? [form: TFs, externalValues: NonNullable<EvOut<NonNullable<TEs>>>]
  : [TEs] extends [undefined]
  ? [form: TFs]
  : [form: TFs, externalValues?: unknown];

export type CvCbBase<
  TFs extends ZFormSchema,
  TCv extends Record<string, any> | unknown,
  TEs extends ZEvSchema | unknown
> = (...args: CvCbArgs<TFs, TEs>) => TCv;
// defineFormConfig = <
//   TFormSchema extends ZObj,
//   TEvSchema extends EvSchema,
//   TCv extends Record<string, any>
// >
export type CvCb<
  TFs extends ZFormSchema,
  TCv extends Record<string, any> | undefined | unknown,
  TEs extends ZEvSchema | unknown
> = TCv extends undefined ? undefined : CvCbBase<TFs, TCv, TEs>;

export type CvCbStrict<
  TFs extends ZFormSchema,
  TCv extends Record<string, any> | undefined,
  TEs extends ZEvSchema
> = TCv extends undefined ? undefined : CvCbBase<TFs, TCv, TEs>;

export type AnyCvCb<
  TFs extends ZFormSchema = ZFormSchema,
  TCv extends Record<string, any> | undefined | unknown = unknown,
  TEs extends ZEvSchema | unknown = unknown
> = CvCb<TFs, TCv, TEs>;

/** Represents "Calculated Values Callback"
 * Input form values + (optional) external values and returns `calculated` values
 */
export type CvCb_<TFv extends FormOut, TCv, TEv extends EvOut> = (
  form: TFv,
  externalValues?: TEv
) => TCv;

export type AnyCvCb_<TFv extends FormOut = FormOut, TCv = any, TEv extends EvOut = any> = CvCb_<
  TFv,
  TCv,
  TEv
>;

/** "Calculated Values Callback" type, derived from "calculatedValues" */
export type CvCbFromCv<TCv> = TCv extends never | undefined ? never : CvCb_<any, TCv, any>;
