import type { ConfigFieldsProp } from "@fieldConfig/input";
import type { CvCbFromCalc, EvOut, FormOut } from "@fieldConfig/interfaces";
import type { EvProp } from "@fieldConfig/returnTypes";
import type { EvSchema, ZObj } from "@utils/index";

export type FormConfigDefinition<
  TFormSchema extends ZObj,
  TCv extends Record<string, any>,
  TEvSchema extends EvSchema
> = {
  /** Used only for providing types */
  formSchema: TFormSchema;
  fields: Partial<ConfigFieldsProp<FormOut<TFormSchema>, TCv, EvOut<TEvSchema>>>;

  // Optional parameters
  calcValues?: (form: FormOut<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;
  externalSchema?: TEvSchema;
};

// FormCfgReturnCb
export type DefinedFormConfigCb<TFv extends FormOut, TCv, TEv extends EvOut> = (
  ...args: EvProp<TEv>
) => {
  fields: ConfigFieldsProp<TFv, TCv, TEv>;
  calcValues?: CvCbFromCalc<TCv>;
  externalValues?: TEv;
};
