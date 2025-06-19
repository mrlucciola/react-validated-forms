import type {
  CvCb,
  FormConfig,
  FormConfigDefinition,
  FormConfigFactory,
  FormConfigInstance,
  ZObj,
  ZObjOpt,
} from "@utils/index";

/** Only for use in `useValidatedForm`
 * For fields on `externalSchema`, `null` is applied to fields where a catch is not provided
 */
export const defineFormConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCb<ZObj, any, any> | void
>({
  formSchema,
  fields,
  calcValuesCallback,
  externalSchema,
  ...other
}: FormConfigDefinition<TFs, TCvCb, TEs>) => {
  if (!externalSchema) {
    /**
     * 
     * @param args 'formConfigCb' is declared but its value is never read.ts(6133)
Type '(...args: any[]) => FormConfigInstance<TFs, TCvCb, TEs>' is not assignable to type 'FormConfigFactory<TFs, TCvCb, TEs>'.ts(2322)
const formConfigCb: FormConfigFactory<TFs, TCvCb, TEs>
     * @returns 
     */
    const formConfigCb: FormConfigFactory<TFs, TCvCb, TEs> = (...args: any[]) => {
      /**
       * Type '{ fields: Partial<FormConfigFields<TFs, TCvCb, TEs>>; calcValuesCallback: TCvCb | undefined; }' is not assignable to type 'FormConfigInstance<TFs, TCvCb, TEs>'.ts(2322)
const configInstance: FormConfigInstance<TFs, TCvCb, TEs>
       */
      const configInstance: FormConfigInstance<TFs, TCvCb, TEs> = { fields, calcValuesCallback };

      return configInstance;
    };
  }
  /**
   * # Error at `const formConfigCb:`:
   * 'formConfigCb' is declared but its value is never read.ts(6133)
   * - Type '(ev: any) => { fields: Partial<FormConfigFields<{ [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFs>>, any>]: addQuestionMarks<...>[k]; }, TCv, OptionalAppliedFieldOutput<...>>>; calcValuesCallback: CvCb<...> | undefined; externalValues: { ...; } | undefined; }' is not assignable to type 'FormConfig<TFs, CvCbFromCv<TCv>, TEs>'.ts(2322)
   * - const formConfigCb: FormConfig<TFs, TCvCb, TEs>
   *
   * # Error at `= (ev) =>`:
   * Parameter 'ev' implicitly has an 'any' type.ts(7006)
   * - (parameter) ev: any
   */
  const formConfigCb: FormConfigFactory<TFs, TCvCb, TEs> = (ev: EvOut) => {
    const externalValues = externalSchema?.parse(ev ?? {});

    return { fields, calcValuesCallback, externalValues };
  };

  return formConfigCb satisfies FormConfig<
    /** Error:
     * Type '{ [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFs>>, any>]: addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFs>>, any>[k]; }' does not satisfy the constraint 'ZObj'.
     * - Type '{ [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFs>>, any>]: addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TFs>>, any>[k]; }' is missing the following properties from type 'ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, { [x: string]: any; }, { [x: string]: any; }>': _cached, _getCached, _parse, shape, and 52 more.ts(2344)
     * - (type parameter) TFs in <TFs extends ZObj, TEs extends ZEvSchema, TCv extends Record<string, any>>(formConfigDefinition: FormConfigDefinition<TFs, TCv, TEs>): FormConfig<TFs, CvCbFromCv<TCv>, TEs>
     */
    TFs,
    typeof formConfigDefinition.calcValuesCallback, // @note having issues propagating return type throughout config
    TEs
  >;

  // PROBLEMATIC - keeping for reference
  // return ((ev?: EvProp<EvOut<TEs>>) => {
  //   const externalValues = externalSchema?.parse(ev ?? {});

  //   return { fields, calcValuesCallback, externalValues };
  // }) as FormConfig<
  //   UiValues<TFs>,
  //   typeof formConfigDefinition.calcValuesCallback, // @note having issues propagating return type throughout config
  //   EvOut<TEs>
  // >;
};
