import type { CvCbFromCv, EvOut, FormOut } from "@utils/index";
import type { FormConfigReturn } from "./formConfigCallbackTypes";

type PartialOrOmit<T, U> = T extends undefined
  ? {}
  : T extends unknown
  ? Partial<U>
  : NonNullable<U>;

/** Atomic context slice of Form-Config-Values */
type FormValuesCtx<T extends FormOut> = { fields: T };
/** Atomic context slice of Form-Config-Values */
type CalcValuesCtx<T extends any> = PartialOrOmit<T, { calculated: T }>;

/** Atomic context slice of Form-Config-Values */

type ExtValuesCtx<T extends EvOut | unknown> = PartialOrOmit<T, { external: T }>;

export type AnyFormConfigValues<
  TFv extends FormOut = FormOut,
  TCv = unknown,
  TEv extends EvOut | unknown = unknown
> = FormConfigCtx<TFv, TCv, TEv>;

export type InferFormValues<T extends AnyFormConfigValues> = T["fields"];
export type InferCalcValues<T extends AnyFormConfigValues> = T extends { calculated: infer C }
  ? C
  : undefined;
export type InferExtValues<T extends AnyFormConfigValues> = T extends { external: infer E }
  ? E
  : undefined;

export type WithCalcValues<T> = T extends { calculated: any } ? T : never;
export type WithExtValues<T> = T extends { external: any } ? T : never;

export type FormConfigCtx<TFv extends FormOut, TCv = unknown, TEv = unknown> = FormValuesCtx<TFv> &
  CalcValuesCtx<TCv> &
  ExtValuesCtx<TEv>;

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
export type FormConfigValuesBase<TFv extends FormOut, TCv, TEv extends EvOut> = FormValuesCtx<TFv> &
  CalcValuesCtx<TCv> &
  ExtValuesCtx<TEv>;

/** */
export type FormConfigValues<TFv extends FormOut, TCv, TEv extends EvOut> = Omit<
  FormConfigValuesBase<TFv, TCv, TEv>,
  // @note 'Opposite' condition due to `Omit`
  (TCv extends undefined ? "calculated" : never) | (TEv extends undefined ? "external" : never)
>;

export type FormConfigCbReturnInferred<T extends AnyFormCfgObj> = T extends FormCfgReturnObj<
  infer TForm,
  infer TCvCb extends CvCbFromCv<any>,
  infer TExt
>
  ? FormConfigValues<TForm, ReturnType<TCvCb>, TExt>
  : never;

export type FormCfgReturnObj<TFv extends FormOut, TCv, TEv extends EvOut> = ReturnType<
  FormConfigReturn<TFv, TCv, TEv>
>;

export type AnyFormCfgObj<
  TForm extends FormOut = any,
  TCalc = any,
  TExt extends EvOut = any
> = FormCfgReturnObj<TForm, TCalc, TExt>;
const zxcv = {} as AnyFormCfgObj;
