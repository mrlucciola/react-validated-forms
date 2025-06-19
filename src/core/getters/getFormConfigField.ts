import type { FormConfig, ZObj } from "@utils/index";

/** @todo add description */
const getFormConfigField = <TConfig extends FormConfig<ZObj>>(
  config: TConfig,
  fieldKey: InferUiValueKeys<TConfig>
) => config.fields[fieldKey];

export default getFormConfigField;
