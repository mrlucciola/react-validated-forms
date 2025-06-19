import type {
  AnyCfgDef,
  InferCfgDefFieldConfigs,
  InferCfgDefFormSchema,
  InferFormKeys,
} from "@utils/index";

/** @todo add description */
const getFieldConfig = <
  TConfig extends AnyCfgDef,
  TKey extends keyof InferFormKeys<InferCfgDefFormSchema<TConfig>>
>(
  config: TConfig | undefined,
  fieldKey: TKey
): InferCfgDefFieldConfigs<TConfig> extends NonNullable<InferCfgDefFieldConfigs<TConfig>[TKey]>
  ? InferCfgDefFieldConfigs<TConfig>[TKey]
  : undefined => {
  if (!config) return undefined;
  if (!config.fieldConfigs) return undefined;
  return config.fieldConfigs[fieldKey];
};

export default getFieldConfig;
