// utils
import getConfigValues from "@core/getters/getConfigValues";
// hooks
import useInitSchemas from "./hooks/useInitSchemas";
import useInitStates from "@core/hooks/useInitStates";
import useBuildConfigSchema from "@core/hooks/useBuildConfigSchema";
import useSetField from "@core/setters/setField";
import useGetFieldProps from "@core/getters/useGetFieldProps";
// interfaces
import type { CalcValues, CalcValuesOpt, FieldConfigs, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ConfigInternal, CvCbDefinition } from "@utils/configTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";
import type { SchemaSpaReturn } from "@core/types";
import type { SchemaParseErrors } from "@core/getters/interfaces";
import type { ResolveFor, ResolveTo } from "@utils/utilityTypes";

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
const useForm = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends keyof UiValues<TFs>
>(configInput: {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: ResolveTo<TEs, Partial<ExtValues<TEs>>>;
  fieldConfigs?: FieldConfigs<TFs, ResolveFor<TEs, ZObj>, ResolveFor<TCv, CalcValues>, FcKeys>;
}) => {
  const config = configInput as ConfigInternal<TFs, TEs, TCv>;

  const { evSchema, uiSchema } = useInitSchemas(config);

  const { form, setForm, updateForm, markDirty, dirtyFields, isDirty, resetToDefault } =
    useInitStates(config, uiSchema);

  const configValues = getConfigValues(config, form);

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

    /** Schema applied to form values.
     * @note Only for use within the form.
     * All fields have 'catch'/'default' schemas to avoid setting all form values to `undefined` when a single field is invalid.
     * @note Previous names: `formSchema`, `userInputSchema`
     */
    uiSchema,
    evSchema,
    appliedUiSchema,
  } as const;
};

export default useForm;
