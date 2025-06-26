// utils
// hooks
import useInitSchemas from "./hooks/useInitSchemas";
// interfaces
// DEPRECATED IMPORTS
import type { AnyCfgMeta, CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import useInitStates from "@core/hooks/useInitStates";
import type { UiValues } from "@utils/valueTypes";
import type { ConfigDef, ConfigExternal, ConfigInternal, InferConfig } from "@utils/configTypes";
import getConfigValues from "@core/getters/getConfigValues";
import useBuildConfigSchema from "@core/hooks/useBuildConfigSchema";

/** ### Stateful form with validation, based on `zod`.
 *
 * - While the validation schema and initialization schema are different, which The values may be nullable/invalid, and this should be reflected
 * - We mainly need the `form` var for deriving the `isValid` (and occasionally value access when not using `getFieldProps`)
 *
 * @todo Add logic to handle nested fields (candidate impl.: use a 'selector' callback)
 * @todo Optionally handle request body validation
 * @todo Create generic `UseForm<FormSchema | FormConfig>`
 *
 * ### For config implementation (v3):
 * - Build object of fields to use in form
 * - Effects - 2D array of field-names to listen on and logic to run when those fields change via `setField`
 *    - Example: A field needs to update when **any** of the provided 5 fields updates
 *     i.e. `{ effect: () => cond1 && cond2, fields: [field123, fieldAbc] }`
 *     `[]`
 * - Enable 'external data'/'data out of form-mgmt'
 *
 * @todo rename `TBase` -> `TOutputSchema`
 * @todo rename `FormSchema` -> `FieldsSchema`
 */
const useForm = <TFs extends ZObj, TEs extends ZObjOpt = void, TCv extends CalcValuesOpt = void>(
  configInput: ConfigDef<TFs, TEs extends ZObj ? TEs : never, TCv extends CalcValues ? TCv : never>
) => {
  const config = configInput as ConfigInternal<TFs, TEs, TCv>;

  const { evSchema, uiSchema } = useInitSchemas<TFs, TEs, TCv>(config);

  const { form, setForm, updateForm, markDirty, dirtyFields, isDirty, resetToDefault } =
    useInitStates<TFs, TEs, TCv>(uiSchema, config);

  // const configValues = getConfigValues(config, form);

  // @todo rename
  // const appliedSchema = useBuildConfigSchema(config, configValues);
  /** TO-DO



  // ----------------- Getters (below) -----------------
  const validation: SchemaSpaReturn<CfgFs<C>> = appliedSchema.safeParse(form);
  const errors: SchemaParseErrors<CfgFs<C>> | undefined = validation.error?.formErrors.fieldErrors;

  const isValid = validation.success;

  const setField = useSetField(setForm, config, configValues, markDirty);

  const getFieldProps = useGetFieldProps(setField, form, errors, config, configValues);
  */
  return {
    form: form,
    setForm,
    updateForm,
    markDirty,
    isDirty,
    dirtyFields,
    resetToDefault,

    // Utils
    // getFieldProps,
    /** Schema applied to form values.
     * @note Only for use within the form.
     * All fields have 'catch'/'default' schemas to avoid setting all form values to `undefined` when a single field is invalid.
     * @note Previous names: `formSchema`, `userInputSchema`
     */
    uiSchema,
    evSchema,

    /** Allows correctly-typed use of `external values` when used in config methods outside of this framework.
     * - This happens by assigning the type defined in the generic. */
    // configValues,
  } as const;
};

export default useForm;
