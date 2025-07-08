import type { ConfigDef, ConfigExternalInputs } from "@utils/configTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";
import type { ConfigValues } from "@utils/fieldConfigTypes";

type InitConfigValues<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = {
  form: UiValues<TFs>;
  external?: ExtValues<TEs>;
  calculated?: TCv;
};

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(
  config: ConfigDef<TFs, TEs, TCv, any>,
  uiValues: UiValues<TFs>,
  externalInputs: ConfigExternalInputs<TFs, TEs>
): ConfigValues<TFs, TEs, TCv> => {
  const configValues: InitConfigValues<TFs, TEs, TCv> = { form: uiValues };

  if (config.externalSchema) {
    configValues.external = config.externalSchema.parse(externalInputs?.externalValues ?? {});
  }

  const cvcb = config.calcValuesCallback;
  if (cvcb) {
    const calcValues = cvcb({ form: uiValues, externalValues: configValues.external });
    configValues.calculated = calcValues;
  }
  configValues satisfies InitConfigValues<TFs, TEs, TCv>;

  return configValues as ConfigValues<TFs, TEs, TCv>;
};

export default getConfigValues;
