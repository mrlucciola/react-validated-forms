// interfaces
import type { EvOut, EvProp, EvSchema, FormOut, ZObj } from "@utils/index";
import type { FormConfig } from "./formConfigTypes";
import type { DefinedFormConfigCb } from "./interfaces";

type FormConfigDefinition<
  TFormSchema extends ZObj,
  TCv extends Record<string, any>,
  TEvSchema extends EvSchema
> = {
  /** Used only for providing types */
  formSchema: TFormSchema;
  fields: Partial<FormConfig<FormOut<TFormSchema>, TCv, EvOut<TEvSchema>>>; // prev: ConfigFieldsProp

  // Optional parameters
  calcValues?: (form: FormOut<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;
  externalSchema?: TEvSchema;
};

/** Only for use in `useValidatedForm`
 * For fields on `externalSchema`, `null` is applied to fields where a catch is not provided
 */
export const defineFormConfig = <
  TFormSchema extends ZObj,
  TEvSchema extends EvSchema,
  TCv extends Record<string, any>
>(
  formConfigDefinition: FormConfigDefinition<TFormSchema, TCv, TEvSchema>
) => {
  const { fields, calcValues, externalSchema } = formConfigDefinition;

  return ((ev?: EvProp<EvOut<TEvSchema>>) => {
    const externalValues = externalSchema?.parse(ev ?? {});

    return { fields, calcValues, externalValues };
  }) as DefinedFormConfigCb<
    FormOut<TFormSchema>,
    typeof formConfigDefinition.calcValues, // @note having issues propagating return type throughout config
    EvOut<TEvSchema>
  >;
};
