// utils
import getConfigValues from "@core/getters/getConfigValues";
// hooks
import useInitSchemas from "./hooks/useInitSchemas";
import useInitStates from "@core/hooks/useInitStates";
import useBuildConfigSchema from "@core/hooks/useBuildConfigSchema";
import useSetField from "@core/setters/setField";
import useGetFieldProps from "@core/getters/useGetFieldProps";
// interfaces
import type { CalcValues, CalcValuesOpt, CfgFieldKeys, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ConfigDef, ConfigInternal } from "@utils/configTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";
import type { SchemaSpaReturn } from "@core/types";
import type { SchemaParseErrors } from "@core/getters/interfaces";
import type { ResolveFor, ResolveTo } from "@utils/utilityTypes";
import type { CvCbDefinition, CvCbInternal, FieldConfigs } from "@utils/configPropTypes";

/** ### Stateful form with validation, based on `zod`.
 *
 * - While the validation schema and initialization schema are different, which The values may be nullable/invalid, and this should be reflected
 * - We mainly need the `form` var for deriving the `isValid` (and occasionally value access when not using `getFieldProps`)
 *
 * @todo Support `ZodEffects` schemas (`superRefine`, `transform`, `preprocess`);
 * @todo Add logic to handle nested fields (candidate impl.: use a 'selector' callback);
 * @todo Optionally handle request body validation;
 * @todo Implement `effects`:
 * - Effects - 2D array of field-names to listen on and logic to run when those fields change via `setField`
 *    - Example: A field needs to update when **any** of the provided 5 fields updates
 *     i.e. `{ effect: () => cond1 && cond2, fields: [field123, fieldAbc] }`
 *     `[]`
 */
const useForm = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends CfgFieldKeys<TFs>
>(
  configDefinition: {
    schema: TFs;
    externalSchema?: TEs;
    calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
    fieldConfigs?: FieldConfigs<TFs, ResolveFor<TEs, ZObj>, ResolveFor<TCv, CalcValues>, FcKeys>; // @todo create definition-type `FieldConfigsDef`
  },
  externalInputs?: {
    defaults?: Partial<UiValues<TFs>>;
    externalValues?: ResolveTo<TEs, Partial<ExtValues<TEs>>>;
  } // @todo create definition-type ExternalInputsDef
) => {
  const _test: ConfigDef<TFs, TEs, TCv, FcKeys> = {
    ...configDefinition,
    calcValuesCallback: configDefinition.calcValuesCallback as CvCbInternal<TFs, TEs, TCv>, // @todo remove type coersion
    fieldConfigs: configDefinition.fieldConfigs as FieldConfigs<TFs, TEs, TCv, FcKeys>, // @todo remove type coersion
  };
  // Currently need this type-coersion to allow types in the definitions to be provided to other props within the same definition object (external-schema and calculated-values)
  // 1) `externalSchema` defines `TEs`, which is used in `calcValuesCallback` and `fieldConfigs`;
  // 2) `calcValuesCallback` defines 'calculated-values' type `TCv`, which is used in `fieldConfigs`;
  const config = configDefinition as ConfigInternal<TFs, TEs, TCv>; // @todo remove this variable, replace usage with configDef
  const configDef = configDefinition as ConfigDef<TFs, TEs, TCv, FcKeys>; // @todo remove coersion

  const schemas = useInitSchemas(configDefinition);

  const { form, setForm, updateForm, markDirty, dirtyFields, isDirty, resetToDefault } =
    useInitStates(schemas, externalInputs);

  const configValues = getConfigValues(configDef, form, externalInputs);

  // @todo rename
  const appliedUiSchema = useBuildConfigSchema(config, configValues);

  const setField = useSetField(setForm, config, configValues, markDirty);

  // ----------------- Getters (below) -----------------
  const validation: SchemaSpaReturn<TFs> = appliedUiSchema.safeParse(form);
  const errors: SchemaParseErrors<TFs> | undefined = validation.error?.formErrors.fieldErrors;
  const isValid = validation.success;
  const getFieldProps = useGetFieldProps(setField, form, errors, config, configValues);

  return {
    form,
    setForm,
    setField,
    updateForm,
    markDirty,
    isDirty,
    dirtyFields,
    resetToDefault,

    /** Allows correctly-typed use of `external values` when used in config methods outside of this framework.
     * - This happens by assigning the type defined in the generic. */
    configValues,
    validation,
    errors,
    isValid,

    // Utils
    getFieldProps,

    appliedUiSchema,
    ...schemas,
  } as const;
};

export default useForm;
