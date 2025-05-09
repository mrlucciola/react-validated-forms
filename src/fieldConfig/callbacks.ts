// interfaces
import type { CvCbFromCalc, EvOut, FormOut, ZObj } from "./interfaces";
import type { AnyFormCfgObj, FormCfgReturnObj } from "./returnTypes";

export type FieldCbValueProp<TForm extends FormOut, TCalc, TExt extends EvOut> = Omit<
  {
    form: TForm;
    calculated: TCalc;
    external: TExt;
  },
  TExt extends undefined ? "external" : never | (TCalc extends undefined ? "calculated" : never)
>;

export type FormConfigCbReturnInferred<T extends AnyFormCfgObj> = T extends FormCfgReturnObj<
  infer TForm,
  infer TCvCb extends CvCbFromCalc<any>,
  infer TExt
>
  ? FieldCbValueProp<TForm, ReturnType<TCvCb>, TExt>
  : never;

export type FormConfigValuesFromZObj<TBase extends ZObj> = FieldCbValueProp<
  FormOut<TBase>,
  NonNullable<ReturnType<CvCbFromCalc<any>>>,
  NonNullable<EvOut>
>;

/**
 * ### Example:
 * ```ts
 * type PmtFormCfgValues = FormConfigOutput<typeof paymentFormCfg>;
 * ```
 */
export type FormConfigOutput<T extends (_: any) => AnyFormCfgObj> = T extends (
  _: any
) => FormCfgReturnObj<infer TForm, infer TCvCb extends CvCbFromCalc<any>, infer TExt>
  ? FieldCbValueProp<TForm, ReturnType<TCvCb>, TExt>
  : never;
