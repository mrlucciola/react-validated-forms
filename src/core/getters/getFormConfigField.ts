import type { FormOut, ZFormSchema } from "@utils/index";
import type { FormConfigProp } from "../interfaces";

/**
 * @todo add description
 *
 * @param config
 * @param fieldKey
 * @returns
 */
const getFormConfigField = <TBase extends ZFormSchema>(
  config: FormConfigProp<TBase>,
  fieldKey: keyof FormOut<TBase>
) => config?.fields && config.fields[fieldKey];

// const getFormConfigField = <
//   TBase extends ZObj,
//   TForm extends FormOut<TBase>,
//   TCalc,
//   TExt extends ExtOut
// >(
//   config: FormCfgReturnObj<TForm, TCalc, TExt> | undefined, // FormConfigProp<TBase>
//   fieldKey: keyof TForm
// ) => config?.fields && config.fields[fieldKey];

export default getFormConfigField;
