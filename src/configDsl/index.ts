import type {
  ConfigFactoryParams,
  ConfigFieldsOpt,
  CvCbOpt,
  ExtValues,
  FormConfigDefinition,
  FormConfigFactory,
  FormConfigInstance,
  UiValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";
import type { z } from "zod";

/** Only for use in `useValidatedForm`
 * For fields on `externalSchema`, `null` is applied to fields where a catch is not provided
 */
export const defineFormConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TFc extends ConfigFieldsOpt<TFs, TEs, TCvCb>
>(
  def: FormConfigDefinition<TFs, TEs, TCvCb, TFc>
): FormConfigFactory<TFs, TEs, TCvCb, TFc> => {
  const formConfigCb: FormConfigFactory<TFs, TEs, TCvCb, TFc> = (
    ...args: ConfigFactoryParams<TEs>
  ) => {
    const evArg = args.length ? args[0] ?? {} : {};
    const externalValues = def.externalSchema?.parse(evArg) as ExtValues<TEs>;

    const configInstance = {
      externalValues,
      calcValuesCallback: def.calcValuesCallback,
      fieldConfigs: def.fieldConfigs,
    } satisfies FormConfigInstance<TFs, TEs, TCvCb, TFc>;
    return configInstance;
  };

  return formConfigCb satisfies FormConfigFactory<TFs, TEs, TCvCb, TFc>;

  // PROBLEMATIC - keeping for reference
  // return ((ev?: EvProp<EvOut<TEs>>) => {
  //   const externalValues = externalSchema?.parse(ev ?? {});

  //   return { fields, calcValuesCallback, externalValues };
  // }) as FormConfigDefinition<
  //   UiValues<TFs>,
  //   typeof formConfigDefinition.calcValuesCallback, // @note having issues propagating return type throughout config
  //   EvOut<TEs>
  // >;
};
