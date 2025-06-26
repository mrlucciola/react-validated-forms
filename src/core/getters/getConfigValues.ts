import type { ConfigInternal, CvCbInternal, Ev } from "@utils/configTypes";
import type { FieldConfigValueProp } from "@utils/fieldConfigTypes";
import type { CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

const getExternalValues = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(
  config: ConfigInternal<TFs, TEs, TCv>
): Ev<TEs> => {
  const out = (config.externalSchema &&
    config.externalSchema.parse(config.externalValues ?? {})) satisfies ExtValues<TEs>;

  return out;
};

const getCalculatedValues = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(
  config: ConfigInternal<TFs, TEs, TCv>,
  uiValues: UiValues<TFs>,
  externalValues: Ev<TEs>
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

  return out as unknown as FieldConfigValueProp<TFs, TEs, TCv>;
};

export default getConfigValues;
