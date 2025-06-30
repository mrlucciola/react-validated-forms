import type { ConfigInternal } from "@utils/configTypes";
import type { CvCbInternal } from "@utils/configPropTypes";
import type { ConfigValues } from "@utils/fieldConfigTypes";
import type { CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

const getExternalValues = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(
  config: ConfigInternal<TFs, TEs, TCv>
) => {
  const out = (config.externalSchema &&
    config.externalSchema.parse(config.externalValues ?? {})) satisfies ExtValues<TEs>;

  return out;
};

const getCalculatedValues = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(
  config: ConfigInternal<TFs, TEs, TCv>,
  uiValues: UiValues<TFs>,
  externalValues: ExtValues<TEs>
): TCv extends CalcValues ? TCv : undefined => {
  const cvcb = config.calcValuesCallback as CvCbInternal<TFs, TEs, TCv>;

  return (
    cvcb &&
    (cvcb({ form: uiValues, externalValues: externalValues }) as TCv extends CalcValues
      ? TCv
      : undefined)
  );
};

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(
  config: ConfigInternal<TFs, TEs, TCv>,
  uiValues: UiValues<TFs>
) => {
  const parsedExternalValues = getExternalValues(config);
  const calculatedValues = getCalculatedValues(config, uiValues, parsedExternalValues);

  const out = {
    form: uiValues,
    external: parsedExternalValues,
    calculated: calculatedValues,
  };

  return out as unknown as ConfigValues<TFs, TEs, TCv>;
};

export default getConfigValues;
