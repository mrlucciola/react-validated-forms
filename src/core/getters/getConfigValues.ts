import type { ConfigExternalInputs, ConfigInternal } from "@utils/configTypes";
import type { CvCbInternal } from "@utils/configPropTypes";
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
  config: ConfigInternal<TFs, TEs, TCv>,
  uiValues: UiValues<TFs>,
  externalInputs: ConfigExternalInputs<TFs, TEs>
): ConfigValues<TFs, TEs, TCv> => {
  const configValues: InitConfigValues<TFs, TEs, TCv> = { form: uiValues };

  if (config.externalSchema) {
    configValues.external = config.externalSchema.parse(externalInputs?.externalValues ?? {});
  }

  const cvcb = config.calcValuesCallback as CvCbInternal<TFs, TEs, TCv> | undefined;
  if (cvcb) {
    const calcValues = cvcb({ form: uiValues, externalValues: configValues.external });
    configValues.calculated = calcValues;
  }

  return configValues as ConfigValues<TFs, TEs, TCv>;
};

export default getConfigValues;
