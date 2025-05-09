import type { Nullish } from "../common/interfaces";
import type { EvOut, EvSchema, FormOut, ZObj } from "./interfaces";
import type { DefinedFormConfigCb } from "../defineFormConfig/interfaces";

// export type ExternalValuesCbProps
export type ExternalValuesCb<TEv extends EvOut> = (
  externalValues?: Nullish<NonNullable<TEv>> | null
) => void;

/** Parameters for `ExternalValuesCb` */
export type EvProp<TEv extends EvOut> = TEv extends undefined | never
  ? never
  : Parameters<ExternalValuesCb<TEv>>;

// // // //
export type FormCfgReturnObj<TForm extends FormOut, TCalc, TExt extends EvOut> = ReturnType<
  DefinedFormConfigCb<TForm, TCalc, TExt>
>;
export type AnyFormCfgObj<
  TForm extends FormOut = any,
  TCalc = any,
  TExt extends EvOut = any
> = FormCfgReturnObj<TForm, TCalc, TExt>;

export type AnyFormCfgReturnCb<
  TBase extends ZObj = any,
  TExt extends EvSchema = any,
  TCalc = any
> = DefinedFormConfigCb<FormOut<TBase>, TCalc, EvOut<TExt>>;

export type FormCfgRtnObjGeneric<T> = T extends DefinedFormConfigCb<
  infer TForm,
  infer TCalc,
  infer TExt
>
  ? ReturnType<DefinedFormConfigCb<TForm, TCalc, TExt>>
  : T extends FormCfgReturnObj<infer TForm, infer TCalc, infer TExt>
  ? FormCfgReturnObj<TForm, TCalc, TExt>
  : never;

export type FormCfgRtnCbApplied<TForm extends FormOut, T, TExt extends EvOut> = (
  ...args: EvProp<TExt>
) => FormCfgRtnObjApplied<TForm, T, TExt>;

export type ExtractFormConfigGenerics<T> = T extends DefinedFormConfigCb<
  infer TForm,
  infer TCalc,
  infer TExt
>
  ? DefinedFormConfigCb<TForm, TCalc, TExt>
  : never;
export type FormCfgRtnObjApplied<TForm extends FormOut, TCalc, TExt extends EvOut> = Required<
  Omit<
    FormCfgReturnObj<TForm, TCalc, TExt>,
    | (TCalc extends undefined ? "calcValues" : never)
    | (TExt extends undefined ? "externalValues" : never)
  >
>;
export type ExtractFormConfig<T> = T extends AnyFormCfgObj<infer TForm, infer TCalc, infer TExt>
  ? FormCfgRtnObjApplied<TForm, TCalc, TExt>
  : never;
