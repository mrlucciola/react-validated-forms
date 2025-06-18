// interfaces
import type { CvCb, CvCbFromCv, EvOut, EvSchema, FormOut, ZEvSchema, ZObj } from "@utils/index";
import type { EvProp, FormConfig } from "./deprecatedInterfaces/formConfigTypes";
import type {
  FormConfigCb,
  FormConfigCbReturn,
  FormConfigReturnDEPREC,
} from "./deprecatedInterfaces/formConfigCallbackTypes";

type FormConfigDefinition<
  TFormSchema extends ZObj,
  TCv extends Record<string, any>,
  TEvSchema extends ZEvSchema
> = {
  /** Used only for providing types */
  formSchema: TFormSchema;
  /**
   * @deprecated rename to `fieldConfigs` (or similar name)
   * @deprecated create type for this field
   */
  fields: Partial<FormConfig<FormOut<TFormSchema>, TCv, EvOut<TEvSchema>>>; // prev: ConfigFieldsProp

  // Optional parameters
  // calcValuesCallback?: (form: FormOut<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;
  calcValuesCallback?: CvCb<TFormSchema, TEvSchema, TCv>;
  externalSchema?: TEvSchema;
};

/** Only for use in `useValidatedForm`
 * For fields on `externalSchema`, `null` is applied to fields where a catch is not provided
 */
export const defineFormConfig = <
  TFormSchema extends ZObj,
  TEvSchema extends ZEvSchema,
  TCv extends Record<string, any>
>(
  formConfigDefinition: FormConfigDefinition<TFormSchema, TCv, TEvSchema>
) => {
  type TCvCb = CvCbFromCv<TCv>;
  const { fields, calcValuesCallback, externalSchema } = formConfigDefinition;

  const testOutput: FormConfigCb<TFormSchema, TCvCb, TEvSchema> = (ev) => {
    const externalValues = externalSchema?.parse(ev ?? {});

    const test = {} as FormConfigCbReturn<TFormSchema, TCvCb, TEvSchema>;

    return { fields, calcValuesCallback, externalValues };
  };

  return ((ev?: EvProp<EvOut<TEvSchema>>) => {
    const externalValues = externalSchema?.parse(ev ?? {});

    return { fields, calcValuesCallback, externalValues };
  }) as FormConfigReturnDEPREC<
    FormOut<TFormSchema>,
    typeof formConfigDefinition.calcValuesCallback, // @note having issues propagating return type throughout config
    EvOut<TEvSchema>
  >;
  // }) as FormConfigReturnDEPREC<
  //   FormOut<TFormSchema>,
  //   typeof formConfigDefinition.calcValuesCallback, // @note having issues propagating return type throughout config
  //   EvOut<TEvSchema>
  // >;
};
