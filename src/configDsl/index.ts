import type {
  CvCbOpt,
  EvOut,
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
  TCvCb extends CvCbOpt<TFs, TEs>
>({
  formSchema,
  fields,
  calcValuesCallback,
  externalSchema,
  ...other
}: FormConfigDefinition<TFs, TEs, TCvCb>): FormConfigFactory<TFs, TCvCb, TEs> => {
  if (!externalSchema) {
    const formConfigCb = ((...args: any[]): FormConfigInstance<TFs, TCvCb, TEs> => {
      const configInstance: FormConfigInstance<TFs, TCvCb, TEs> = {
        fields,
        calcValuesCallback,
      } satisfies FormConfigInstance<TFs, TCvCb, TEs>;

      return configInstance;
    }) satisfies FormConfigFactory<TFs, TCvCb, TEs>;
  }

  const formConfigCb: FormConfigFactory<TFs, TCvCb, TEs> = (ev: EvOut) => {
    const externalValues = externalSchema?.parse(ev ?? {});

    return { fields, calcValuesCallback, externalValues };
  };

  return formConfigCb satisfies FormConfigFactory<TFs, TCvCb, TEs>;

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
