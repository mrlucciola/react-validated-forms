import type { FormConfig, ZObj } from "@utils/index";

/** @todo add description */
const getFormConfigField = <TFs extends ZObj>(
  config: FormConfig<TFs> | undefined,
  fieldKey: keyof TFs
) => config?.fields[fieldKey];

export default getFormConfigField;
