import type { CvCbFromCalc, EvOut, FormOut } from "@utils/index";
import type { FormConfigReturn } from "./formConfigCallbackTypes";

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
export type FormConfigValuesBase<TFv extends FormOut, TCv, TEv extends EvOut> = {
  form: TFv;
  calculated: TCv;
  external: TEv;
};

/** */
export type FormConfigValues<TFv extends FormOut, TCv, TEv extends EvOut> = Omit<
  FormConfigValuesBase<TFv, TCv, TEv>,
  // @note Notice opposite condition for `Omit`
  (TEv extends undefined ? "external" : never) | (TCv extends undefined ? "calculated" : never)
>;

export type FormConfigCbReturnInferred<T extends AnyFormCfgObj> = T extends FormCfgReturnObj<
  infer TForm,
  infer TCvCb extends CvCbFromCalc<any>,
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
