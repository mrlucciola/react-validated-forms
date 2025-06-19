import type {
  CvCbOpt,
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
  TCvCb extends CvCbOpt<TFs, TEs>
>({
  formSchema,
  fields,
  calcValuesCallback,
  externalSchema,
  ...other
}: FormConfigDefinition<TFs, TCvCb, TEs>) => {
  if (!externalSchema) {
    const formConfigCb: FormConfigFactory<TFs, TCvCb, TEs> = (...args: any[]) => {
      const configInstance: FormConfigInstance<TFs, TCvCb, TEs> = { fields, calcValuesCallback };

      return configInstance;
    };
  }

  const formConfigCb: FormConfigFactory<TFs, TCvCb, TEs> = (ev: EvOut) => {
    const externalValues = externalSchema?.parse(ev ?? {});

    return { fields, calcValuesCallback, externalValues };
  };

  return formConfigCb satisfies FormConfig<
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
