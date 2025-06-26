import type { ExtValues } from "@utils/deprec/formOutputTypes";
import type { BuildCfg, CfgEs, ConfigDefinition } from "@utils/deprec/formConfigDefinition";
import type {
  ConfigFactoryParams,
  FormConfigFactory,
  FormConfigInstance,
} from "@utils/deprec/formConfigFactory";

/** Only for use in `useValidatedForm`
 * For fields on `externalSchema`, `null` is applied to fields where a catch is not provided
 */
export const defineFormConfig = <TDef extends ConfigDefinition<any>>(def: TDef) => {
  type TCfg = BuildCfg<TDef>;

  const factory: FormConfigFactory<TCfg> = (...args: ConfigFactoryParams<CfgEs<TCfg>>) => {
    // external values – parse or fallback to {}
    const evRaw = args.length ? args[0] ?? {} : {};
    const externalValues = def.externalSchema?.parse(evRaw) as ExtValues<CfgEs<TCfg>>;

    // This is what is passedreturn the fully-typed instance
    return {
      fieldSchema: def.formSchema,
      externalValues,
      calcValuesCallback: def.calcValuesCallback,
      fieldConfigs: def.fieldConfigs,
    } satisfies FormConfigInstance<TCfg>;
  };

  return factory;
};
