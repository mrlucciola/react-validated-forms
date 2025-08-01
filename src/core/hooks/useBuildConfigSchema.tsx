import { useMemo } from "react";
import { z } from "zod";
// utils
import { zAddRulesIssue } from "@utils/zod";
// interfaces
import type { CalcValuesOpt, CfgFieldKeys, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ConfigInternal } from "@utils/configTypes";
import type { UiValues } from "@utils/valueTypes";
import type { DefineFieldConfig, ConfigValues } from "@utils/fieldConfigTypes";

// Helper types for odd one-off data structures used throughout the file
type FieldCfgEntry<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends CfgFieldKeys<TFs>,
  FieldKey extends FcKeys = FcKeys
> = [FieldKey, DefineFieldConfig<TFs, TEs, TCv, FieldKey>];

/** For each field: Apply schema refinements defined in config to the baseSchema
 * @deprecated needs to be analyzed
 */
const applyFieldConfigValidationRefinements =
  <
    TFs extends ZObj = ZObj,
    TEs extends ZObjOpt = ZObjOpt,
    TCv extends CalcValuesOpt = CalcValuesOpt,
    FcKeys extends CfgFieldKeys<TFs> = CfgFieldKeys<TFs>
  >(
    configValues: ConfigValues<TFs, TEs, TCv>
  ) =>
  <FieldKey extends FcKeys>(
    fieldEntryTuple: FieldCfgEntry<TFs, TEs, TCv, FcKeys, FieldKey>
  ): ((form: UiValues<TFs>, ctx: z.RefinementCtx) => void) => {
    const [fieldKey, fieldCfg] = fieldEntryTuple;

    return (form: UiValues<TFs>, ctx: z.RefinementCtx): void => {
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
const useBuildConfigSchema = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends CfgFieldKeys<TFs>,
  C extends ConfigInternal<TFs, TEs, TCv, FcKeys> = ConfigInternal<TFs, TEs, TCv, FcKeys>
>(
  config: C,
  configValues: ConfigValues<TFs, TEs, TCv>
) => {
  const baseSchema: TFs = config.schema;
  const fieldConfigs = config.fieldConfigs;

  // if no config provided: Early return `uiSchema`
  if (!fieldConfigs) return baseSchema;

  /**
   * Array of field-configs that have `registerOn() and .rules() defined
   */
  const configFieldsFiltered: FieldCfgEntry<TFs, TEs, TCv, FcKeys>[] = useMemo(() => {
    const entries = Object.entries(fieldConfigs) as FieldCfgEntry<TFs, TEs, TCv, FcKeys>[];
    return entries.filter(([_fieldKey, fieldCfg]) => !!fieldCfg.registerOn || !!fieldCfg.rules);
  }, []);

  if (configFieldsFiltered.length < 1) return baseSchema;

  // Apply custom refinement logic defined in `.registerOn()` and `.rules()` (for each field's configuration)
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
