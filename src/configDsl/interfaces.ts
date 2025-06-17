import type { CvCbFromCalc, EvOut, EvProp, FormOut } from "@utils/index";
import type { FormConfig } from "./formConfigTypes";

/**
 * 'Values' property for the callback function.
 * This value is an object that may have 1-3 fields.
 */
export type FieldCbValueProp<TForm extends FormOut, TCalc, TExt extends EvOut> = Omit<
  {
    form: TForm;
    calculated: TCalc;
    external: TExt;
  },
  TExt extends undefined ? "external" : never | (TCalc extends undefined ? "calculated" : never)
>;

export type DefinedFormConfigCb<TFv extends FormOut, TCalc, TEv extends EvOut> = (
  ...args: EvProp<TEv>
) => {
  fields: FormConfig<TFv, TCalc, TEv>; // prev: ConfigFieldsProp
  calcValues?: CvCbFromCalc<TCalc>;
  externalValues?: TEv;
};

export type FormCfgReturnObj<TForm extends FormOut, TCalc, TExt extends EvOut> = ReturnType<
  DefinedFormConfigCb<TForm, TCalc, TExt>
>;

export type AnyFormCfgObj<
  TForm extends FormOut = any,
  TCalc = any,
  TExt extends EvOut = any
> = FormCfgReturnObj<TForm, TCalc, TExt>;

export type FormConfigCbReturnInferred<T extends AnyFormCfgObj> = T extends FormCfgReturnObj<
  infer TForm,
  infer TCvCb extends CvCbFromCalc<any>,
  infer TExt
>
  ? FieldCbValueProp<TForm, ReturnType<TCvCb>, TExt>
  : never;
