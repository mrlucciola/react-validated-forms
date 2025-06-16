// interfaces
import type { EvOut, FormOut } from "@fieldConfig/interfaces";
import type { EvProp } from "@fieldConfig/returnTypes";
import type { DefinedFormConfigCb, FormConfigDefinition } from "./interfaces";
import type { EvSchema, ZObj } from "@utils/index";

// export type EvOut<TEvSchema extends EvSchema = EvSchema> = OptionalAppliedFieldOutput<TEvSchema>;
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
