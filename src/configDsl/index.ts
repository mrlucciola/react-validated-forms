// interfaces
import type {
  CvCbFromCv,
  EvOut,
  FormConfig,
  FormConfigDefinition,
  UiValues,
  ZEvSchema,
  ZObj,
} from "@utils/index";

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

  /**
   * # Error at `const formConfigCb:`:
   * 'formConfigCb' is declared but its value is never read.ts(6133)
   * - Type '(ev: any) => { fields: Partial<FormConfigFields<{ [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFormSchema>>, any>]: addQuestionMarks<...>[k]; }, TCv, OptionalAppliedFieldOutput<...>>>; calcValuesCallback: CvCb<...> | undefined; externalValues: { ...; } | undefined; }' is not assignable to type 'FormConfig<TFormSchema, CvCbFromCv<TCv>, TEvSchema>'.ts(2322)
   * - const formConfigCb: FormConfig<TFormSchema, CvCbFromCv<TCv>, TEvSchema>
   *
   * # Error at `= (ev) =>`:
   * Parameter 'ev' implicitly has an 'any' type.ts(7006)
   * - (parameter) ev: any
   */
  const formConfigCb: FormConfig<TFormSchema, TCvCb, TEvSchema> = (ev) => {
    const externalValues = externalSchema?.parse(ev ?? {});

    return { fields, calcValuesCallback, externalValues };
  };

  return formConfigCb satisfies FormConfig<
    /** Error:
     * Type '{ [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFormSchema>>, any>]: addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFormSchema>>, any>[k]; }' does not satisfy the constraint 'ZObj'.
     * - Type '{ [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFormSchema>>, any>]: addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFormSchema>>, any>[k]; }' is missing the following properties from type 'ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, { [x: string]: any; }, { [x: string]: any; }>': _cached, _getCached, _parse, shape, and 52 more.ts(2344)
     * - (type parameter) TFormSchema in <TFormSchema extends ZObj, TEvSchema extends ZEvSchema, TCv extends Record<string, any>>(formConfigDefinition: FormConfigDefinition<TFormSchema, TCv, TEvSchema>): FormConfig<TFormSchema, CvCbFromCv<TCv>, TEvSchema>
     */
    UiValues<TFormSchema>,
    typeof formConfigDefinition.calcValuesCallback, // @note having issues propagating return type throughout config
    EvOut<TEvSchema>
  >;

  // PROBLEMATIC - keeping for reference
  // return ((ev?: EvProp<EvOut<TEvSchema>>) => {
  //   const externalValues = externalSchema?.parse(ev ?? {});

  //   return { fields, calcValuesCallback, externalValues };
  // }) as FormConfig<
  //   UiValues<TFormSchema>,
  //   typeof formConfigDefinition.calcValuesCallback, // @note having issues propagating return type throughout config
  //   EvOut<TEvSchema>
  // >;
};
