import type { FormOut } from "./formTypes";

export type FieldCbValueProp<TForm extends FormOut, TCalc, TExt extends EvOut> = Omit<
  {
    form: TForm;
    calculated: TCalc;
    external: TExt;
  },
  TExt extends undefined ? "external" : never | (TCalc extends undefined ? "calculated" : never)
>;
