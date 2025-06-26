import type { InferConfigValues } from "@internal/configValuesTypes";
import type { ResolveConfigValues } from "@external/configValuesTypes";
import type { ZObj } from "@utils/rootTypes";
// DEPREC IMPORTS
import type { UseFormProps } from "@utils/deprec/useFormTypes/useFormTypes";
import type { AnyCfgMetaDEPREC, CfgEs, CfgFs } from "@utils/deprec/formConfigDefinition";
import type { ExtValues, UiValues } from "@utils/deprec/formOutputTypes";
import type { CfgCalculatedValues } from "@utils/deprec/derived";

const getExternalValues = <C extends AnyCfgMetaDEPREC>(
  config: UseFormProps<C>
): CfgEs<C> extends void ? undefined : NonNullable<ExtValues<CfgEs<C>>> => {
  const schema = config.externalSchema;
  if (schema) {
    return schema.parse(config.externalValues);
  }
  const out = (config.externalSchema &&
    config.externalSchema.parse(config.externalValues ?? {})) satisfies ExtValues<CfgEs<C>>;

  return undefined;
};

const getCalculatedValues = <C extends AnyCfgMetaDEPREC>(
  config: UseFormProps<C>,
  uiValues: UiValues<CfgFs<C>>,
  parsedExternalValues: ExtValues<CfgEs<C>>
): CfgCalculatedValues<C> => {
  return config.calcValuesCallback && config.calcValuesCallback(uiValues, parsedExternalValues);
};

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <C extends AnyCfgMetaDEPREC<ZObj, any, any, any>>(
  config: UseFormProps<C>,
  uiValues: UiValues<CfgFs<C>>
) => {
  const parsedExternalValues = getExternalValues(config);
  const calculatedValues = getCalculatedValues(config, uiValues, parsedExternalValues);

  const out = {
    form: uiValues,
    external: parsedExternalValues,
    calculated: calculatedValues,
  } satisfies InferConfigValues<C>;

  return out as unknown as ResolveConfigValues<C>;
};

export default getConfigValues;
