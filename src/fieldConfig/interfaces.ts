import { z } from "zod";
// interfaces
import { AppliedFieldOutput, OptionalAppliedFieldOutput } from "../interfaces";

/** Convenience type for z.ZodObject schema */
export type ZObj = z.ZodObject<z.ZodRawShape>;
/** Represents "External Values" schema */
export type EvSchema = ZObj | undefined;

/** Represents "Calculated Values Callback"
 * Input form values + (optional) external values and returns `calculated` values */
export type CvCb<TFv extends FormOut, TEv extends EvOut, TCv> = (
  form: TFv,
  externalValues?: TEv
) => TCv;
export type CvCb_<TCv, TFv extends FormOut = any, TEv extends EvOut = any> = (
  form: TFv,
  externalValues?: TEv
) => TCv;

export type CvCbFromCalc<TCv> = TCv extends never | undefined ? never : CvCb<any, any, TCv>;

/** "Form Values" output */
export type FormOut<TSchema extends ZObj = ZObj> = AppliedFieldOutput<TSchema>;
/** "External Values" output */
export type EvOut<TEvSchema extends EvSchema = EvSchema> = OptionalAppliedFieldOutput<TEvSchema>;

/** Key-type used for accessing the config */
export type CfgKey<TForm extends FormOut> = keyof TForm;

/** @note Unused - keeping for reference
 * 
export type CvCbRtn<T> = T extends CvCb<infer _, infer _, infer TCv>
  ? ReturnType<CvCb<_, _, TCv>>
  : undefined;

export type CvCbProp<TForm extends FormOut, TEv extends EvOut, T> = CvCb<TForm, TEv, T>;
export type CalcOut<T> = T extends CvCbProp<infer _, infer _, infer TCv> ? TCv : undefined;

export type CvCbGeneric<T> = T extends CvCb<infer TForm, infer TEv, infer TCv>
  ? CvCb<TForm, TEv, TCv>
  : never;
*/
