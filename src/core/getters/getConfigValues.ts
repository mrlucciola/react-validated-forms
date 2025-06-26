import type { ConfigInternal } from "@utils/metaTypes";
import type { AnyCfgDef, AnyCvCb, ZObj } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";
// DEPREC IMPORTS

const getExternalValues = <D extends AnyCfgDef>(
  config: D
): D["externalSchema"] extends void ? undefined : NonNullable<ExtValues<D["externalSchema"]>> => {
  type C = D extends ConfigInternal<infer TFs, infer TEs, infer TCv>
    ? ConfigInternal<TFs, TEs, TCv>
    : never;// @todo implement config-types properly
  const schema = config.externalSchema as C["externalSchema"];
  if (schema) {
    return schema.parse(config.externalValues);
  }
  const out = (config.externalSchema &&
    config.externalSchema.parse(config.externalValues ?? {})) satisfies ExtValues<
    D["externalSchema"]
  >;

  return out;
};

const getCalculatedValues = <D extends ConfigInternal<any, any, any>>(
  config: D,
  uiValues: UiValues<D["schema"]>,
  parsedExternalValues: D["externalSchema"] extends void
    ? undefined
    : NonNullable<ExtValues<D["externalSchema"]>> // @todo implement config-types properly
): D["calcValuesCallback"] extends AnyCvCb ? ReturnType<D["calcValuesCallback"]> : undefined => {
  return (
    config.calcValuesCallback &&
    config.calcValuesCallback({ form: uiValues, externalValues: parsedExternalValues })
  );
};

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <D extends ConfigInternal<any, any, any>>(
  config: D,
  uiValues: UiValues<D["schema"]>
) => {
  type C = D extends ConfigInternal<infer TFs, infer TEs, infer TCv>
    ? ConfigInternal<TFs, TEs, TCv>
    : never; // @todo reomve this and type properly
  const parsedExternalValues = getExternalValues(config);
  const calculatedValues = getCalculatedValues(config, uiValues, parsedExternalValues);

  const out = {
    form: uiValues,
    external: parsedExternalValues as ExtValues<NonNullable<C["externalSchema"]>>, // @todo reomve cast
    calculated: calculatedValues as D extends ConfigInternal<any, any, infer T> ? T : undefined, // @todo reomve cast
  };

  return out;
};

export default getConfigValues;
