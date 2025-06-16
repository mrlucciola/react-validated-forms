// interfaces
import type { EvOut, FieldCbValueProp, FormOut, ZObj } from "@utils/index";
import type { CvCbFromCalc } from "./interfaces";
import type { AnyFormCfgObj, FormCfgReturnObj } from "./returnTypes";

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
