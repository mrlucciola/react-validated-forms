import { FormOut, type ZObj } from "../../fieldConfig/interfaces";
import type { FormConfigProp } from "../interfaces";

/**
 * @todo add description
 *
 * @param config
 * @param fieldKey
 * @returns
 */
const getFormConfigField = <TConfig extends FormConfigProp<TSchema>, TSchema extends ZObj>(
  config: TConfig,
  fieldKey: keyof FormOut<TSchema>
) => config?.fields && config.fields[fieldKey];

// const getFormConfigField = <
//   TSchema extends ZObj,
//   TForm extends FormOut<TSchema>,
//   TCalc,
//   TExt extends ExtOut
// >(
//   config: FormCfgReturnObj<TForm, TCalc, TExt> | undefined, // FormConfigProp<TSchema>
//   fieldKey: keyof TForm
// ) => config?.fields && config.fields[fieldKey];

export default getFormConfigField;
