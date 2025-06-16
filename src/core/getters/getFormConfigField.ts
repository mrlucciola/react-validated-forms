import type { FormOut } from "@fieldConfig/interfaces";
import type { FormConfigProp } from "../interfaces";
import type { ZObj } from "@utils/interfaces";

/**
 * @todo add description
 *
 * @param config
 * @param fieldKey
 * @returns
 */
const getFormConfigField = <TBase extends ZObj>(
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
