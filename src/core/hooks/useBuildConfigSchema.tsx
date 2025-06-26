import { useMemo } from "react";
import { z } from "zod";
// utils
import { zAddRulesIssue } from "@utils/zod";
// interfaces
import type { ResolveConfigValues } from "@external/configValuesTypes";
// DEPRECATED IMPORTS
import type { AnyCfgMetaDEPREC, CfgFc, CfgFs } from "@utils/deprec/formConfigDefinition";
import type { CfgUiValues } from "@utils/deprec/derived";
import type { CfgFieldConfig } from "@utils/deprec/fieldConfig";
import type { UseFormProps } from "@utils/deprec/useFormTypes/useFormTypes";

type FieldKeyOf<C extends AnyCfgMetaDEPREC> = keyof C["_fc"] & keyof CfgUiValues<C>;

// Helper types for odd one-off data structures used throughout the file
type FieldCfgEntry<C extends AnyCfgMetaDEPREC, FieldKey extends FieldKeyOf<C> = FieldKeyOf<C>> = [
  FieldKey,
  CfgFieldConfig<C, FieldKey>
];

/**
 * @deprecated needs to be analyzed
 */
const applyFieldConfigValidationRefinements =
  <C extends AnyCfgMetaDEPREC>(configValues: ResolveConfigValues<C>) =>
  <FieldKey extends FieldKeyOf<C> = FieldKeyOf<C>>(
    fieldEntryTuple: FieldCfgEntry<C, FieldKey> //FieldCfgEntry<C, FieldKey>
  ): ((form: CfgUiValues<C>, ctx: z.RefinementCtx) => void) => {
    const [fieldKey, fieldCfg] = fieldEntryTuple;

    return (form: CfgUiValues<C>, ctx: z.RefinementCtx): void => {
      // IF `.registerOn()` IS DEFINED: Run `.registerOn()`, otherwise `registered = true`
      // If no `registerOn` is set for a given field, then the field is always registered
      // const testFieldCfgValues = !fieldCfg.registerOn || fieldCfg.registerOn(configValues);

      // IF (FIELD IS REGISTERED) & (FIELD IS NULL): THROW VALIDATION ERROR
      if (!!fieldCfg.registerOn && form[fieldKey] === null) {
        zAddRulesIssue([ctx, fieldKey]);
      } else {
        // IF `isRegistered === true` & `.rules()` IS DEFINED: Run rules
        !!fieldCfg.rules && fieldCfg.rules({ ...configValues, form }, ctx, fieldKey);
      }
    };
  };
//

/**
 * Iterates through each field in the form-schema (object-schema):
 * 1. Looks-up the field-schema
 * 2.  applies Modify baseSchema
 * 1. Convert field schemas to array
 * 2. Get config-fields that have `.registerOn()` and `.rules()` defined
 * 3. For each field: Apply schema refinements defined in config to the baseSchema
 * Generate user-input form schema, applying any additional form-config logic
 * @param baseSchema
 * @param config
 * @param configValues
 * @returns
 */

// export type ConfigDefinition<TCfg extends AnyCfgMetaDEPREC> = {
//   formSchema: CfgFs<TCfg>;
//   externalSchema?: CfgEs<TCfg>;
//   calcValuesCallback?: CfgCvCb<TCfg>;
//   fieldConfigs?: CfgFc<TCfg>;
// };

/**
 * For each field: Apply schema refinements defined in config to the baseSchema
 */
const useBuildConfigSchema = <C extends AnyCfgMetaDEPREC>(
  config: UseFormProps<C>,
  configValues: ResolveConfigValues<C>
) => {
  type TFs = CfgFs<C>;
  type TFc = CfgFc<C>;

  const baseSchema: TFs = config.schema;
  const fieldConfigs: TFc = config.fieldConfigs;

  // if no config provided: Early return `uiSchema`
  if (!fieldConfigs) return baseSchema;

  /**
   * Array of field-configs that have `registerOn() and .rules() defined
   */
  const configFieldsFiltered: FieldCfgEntry<C>[] = useMemo(() => {
    const entries = Object.entries(fieldConfigs) as FieldCfgEntry<C>[];
    return entries.filter(([_fieldKey, fieldCfg]) => !!fieldCfg.registerOn || !!fieldCfg.rules);
  }, []);

  if (configFieldsFiltered.length < 1) return baseSchema;

  // Apply custom refinement logic defined in `.registerOn()` and `.rules()` (for each field's configuration)
  const factory = applyFieldConfigValidationRefinements(configValues);
  const cfgRuleArr = configFieldsFiltered.map(applyFieldConfigValidationRefinements(configValues));

  // Enable these custom refinements to run when `schema.parse()` is called.
  const injected = (form: z.output<TFs>, ctx: z.RefinementCtx) => {
    for (let idx = 0; idx < cfgRuleArr.length; idx++) {
      const appliedFieldRefinement = cfgRuleArr[idx];
      appliedFieldRefinement && appliedFieldRefinement(form, ctx);
    }
  };

  return baseSchema.superRefine(injected);
};

export default useBuildConfigSchema;
