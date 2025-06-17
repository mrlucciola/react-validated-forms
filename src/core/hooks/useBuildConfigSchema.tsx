import { useCallback, useMemo } from "react";
import { z } from "zod";
// utils
import { zAddRulesIssue } from "@utils/zod";
// interfaces
import type { FormOut, ZFormSchema } from "@utils/index";
import type { AnyFormCfgObj, AnyFormConfigValues } from "@configDsl/interfaces";
import type { FieldConfig } from "@configDsl/fieldConfigTypes";

/**
 * 
 * @deprecated needs to be completed
const applyFieldConfigValidationRefinements = <
  TBase extends ZFormSchema,
  TConfig extends AnyFormCfgObj<FormOut<TBase>>,
  FieldKey extends keyof TConfig["fields"] = keyof TConfig["fields"]
>(
  fieldTuple: [FieldKey, FieldConfig<any, any, any, FieldKey>] // [FieldKey, FieldCfg]
): ((form: z.output<TBase>, ctx: z.RefinementCtx) => void) => {};
 */

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
const useBuildConfigSchema = <TBase extends ZFormSchema, TConfig extends AnyFormCfgObj<TBase>>(
  baseSchema: TBase,
  config?: TConfig
) => {
  // if no config provided: Early return `baseUserInputSchema`
  if (!config || !config.fields) return baseSchema;

  // Convert field schemas to array
  type FieldKey = keyof z.output<TBase>;
  type FieldCfg = FieldConfig<any, any, any, FieldKey>;
  const configFieldsArr = useMemo(() => Object.entries(config.fields), []) as [
    FieldKey,
    FieldCfg
  ][];

  if (configFieldsArr.length < 1) return baseSchema;

  // Get config-fields that have `.registerOn()` and `.rules()` defined
  const configFieldsFiltered = useMemo(
    () =>
      configFieldsArr.filter(([_fieldKey, fieldCfg]) => !!fieldCfg.registerOn || !!fieldCfg.rules),
    []
  );

  // @todo memoize
  // For each field: Apply schema refinements defined in config to the baseSchema
  const getCalculatedValues = useCallback(
    (form: FormOut<TBase>, config: TConfig) =>
      config?.calcValues ? config.calcValues(form, config?.externalValues) : undefined,
    []
  );

  const cfgRuleArr = configFieldsFiltered.map(([fieldKey, fieldCfg]) => {
    return (form: z.output<TBase>, ctx: z.RefinementCtx) => {
      const calculated = getCalculatedValues(form, config?.externalValues);

      const configValues = {
        form,
        externalValues: config?.externalValues,
        calculated: config?.calcValues
          ? config.calcValues(form, config?.externalValues)
          : undefined,
      };

      // IF `.registerOn()` IS DEFINED: Run `.registerOn()`, otherwise `registered = true`
      // If no `registerOn` is set for a given field, then the field is always registered
      // const testFieldCfgValues = !fieldCfg.registerOn || fieldCfg.registerOn(configValues);

      // IF (FIELD IS REGISTERED) & (FIELD IS NULL): THROW VALIDATION ERROR
      if (!!fieldCfg.registerOn && form[fieldKey] === null) {
        zAddRulesIssue([ctx, fieldKey]);
      } else {
        // IF `isRegistered === true` & `.rules()` IS DEFINED: Run rules
        !!fieldCfg.rules && fieldCfg.rules({ ...configValues, fields: form }, ctx, fieldKey);
      }
    };
  });
  const injected = (form: z.output<TBase>, ctx: z.RefinementCtx) => {
    for (let idx = 0; idx < cfgRuleArr.length; idx++) {
      const appliedFieldRefinement = cfgRuleArr[idx];
      appliedFieldRefinement && appliedFieldRefinement(form, ctx);
    }
  };

  return baseSchema.superRefine(injected);
};

export default useBuildConfigSchema;
