import type {
  ConfigFactoryParams,
  ExtValues,
  ConfigDefinition,
  FormConfigFactory,
  FormConfigInstance,
  InferCfg,
  CfgEs,
  AnyCfgDef,
} from "@utils/index";

/** Only for use in `useValidatedForm`
 * For fields on `externalSchema`, `null` is applied to fields where a catch is not provided
 */
export const defineFormConfig = <TCfg extends AnyCfgDef>(
  def: ConfigDefinition<TCfg>
): FormConfigFactory<TCfg> => {
  const formConfigCb: FormConfigFactory<TCfg> = (...args: ConfigFactoryParams<CfgEs<TCfg>>) => {
    const evArg = args.length ? args[0] ?? {} : {};
    const externalValues = def.externalSchema?.parse(evArg) as ExtValues<CfgEs<TCfg>>;

    const configInstance = {
      externalValues,
      calcValuesCallback: def.calcValuesCallback,
      fieldConfigs: def.fieldConfigs,
    } satisfies FormConfigInstance<TCfg>;
    return configInstance;
  };

  return formConfigCb satisfies FormConfigFactory<TCfg>;
};
