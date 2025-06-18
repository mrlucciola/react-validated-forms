import type { OmitPartialParams, ZEvSchema, ZFormSchema, ZObj } from "@utils/index";
import type { EvOut, FormOut } from "./formOutputTypes";

/** This is always required */
type FormCvCbArg<TFs extends ZFormSchema> = [form: TFs];
/** This is conditionally required */
type ExtValCvCbArg<TEs extends ZEvSchema> = [externalValues?: NonNullable<EvOut<NonNullable<TEs>>>];
export type CvCbArgs<TFs extends ZFormSchema = ZFormSchema, TEs extends ZEvSchema = ZEvSchema> = [
  ...FormCvCbArg<TFs>,
  ...ExtValCvCbArg<TEs>
];
// type ExtValCvCbArgStrict<TEs extends ZEvSchema> = TEs extends ZObj
//   ? Required<ExtValCvCbArg<NonNullable<TEs>>>
//   : OmitPartialParams<ExtValCvCbArg<TEs>>;
// export type CvCbArgsStrict = .../

type CvCbBase<
  TFs extends ZFormSchema,
  TEs extends ZEvSchema,
  TCv extends Record<string, any> = Record<string, any>
> = (...args: CvCbArgs<TFs, TEs>) => TCv;
// type CvCbBaseStrict<
//   TFs extends ZFormSchema,
//   TEs extends ZEvSchema,
//   TCv extends Record<string, any> = Record<string, any>
// > = (...args: CvCbArgs<TFs, TEs>) => TCv;

//////////////////////////////////////////////////////////////////////////////////////////////

export type CvCb<
  TFs extends ZFormSchema,
  TEs extends ZEvSchema,
  TCv extends Record<string, any> | undefined
> = TCv extends undefined ? never : CvCbBase<TFs, TEs, NonNullable<TCv>>;
// type CvCbStrict<
//   TFs extends ZFormSchema,
//   TEs extends ZEvSchema,
//   TCv extends Record<string, any> | undefined
// > = TCv extends undefined ? undefined : CvCbBaseStrict<TFs, TEs, NonNullable<TCv>>;

//////////////////////////////////////////////////////////////////////////////////////////////

export type AnyCvCb<
  TFs extends ZFormSchema = ZFormSchema,
  TEs extends ZEvSchema = ZEvSchema,
  TCv extends Record<string, any> | undefined = Record<string, any> | undefined
> = CvCb<TFs, TEs, TCv>;
// type AnyCvCbStrict<
//   TFs extends ZFormSchema = ZFormSchema,
//   TEs extends ZEvSchema = ZEvSchema,
//   TCv extends Record<string, any> | undefined = undefined
// > = CvCbStrict<TFs, TEs, TCv>;

//////////////////////////////////////////////////////////////////////////////////////////////

export type InferCalcValuesFromCvCb<TCvCb extends AnyCvCb | undefined> = TCvCb extends undefined
  ? undefined
  : ReturnType<NonNullable<TCvCb>>;

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
