import type { ConfigFieldsOpt } from "@utils/deprec/formFieldConfigs";

/** @todo add description */
const getFieldConfig = <Fc extends ConfigFieldsOpt<any, any, any>, FcKey extends keyof Fc>(
  fieldConfigs: Fc,
  fieldConfigKey: FcKey
): Fc extends void ? undefined : NonNullable<Fc[FcKey]> => {
  if (!fieldConfigs) return undefined as Fc extends void ? undefined : NonNullable<Fc[FcKey]>;

  return fieldConfigs[fieldConfigKey] as Fc extends void ? undefined : NonNullable<Fc[FcKey]>;
};

export default getFieldConfig;
