import type { ConfigInternal, CvCbInternal } from "@utils/configTypes";
import type { CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

type Ev<TEs extends ZObjOpt> = [TEs] extends [ZObj]
  ? NonNullable<ExtValues<NonNullable<TEs>>>
  : undefined;

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

  const out: ConfigValues<TFs, TEs, TCv> = {
    form: uiValues,
    external: parsedExternalValues,
    calculated: calculatedValues,
  };

  return out;
};
export type ConfigValues<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = {
  form: UiValues<TFs>;
  external: Ev<TEs>;
  calculated: TCv extends CalcValues ? TCv : undefined;
};

export default getConfigValues;
