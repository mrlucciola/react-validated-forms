import { isEqual } from "lodash";
// utils
import useBuildConfigSchema from "./hooks/useBuildConfigSchema";
import useSetField from "./setters/setField";
import getConfigValues from "./getters/getConfigValues";
// hooks
import useGetFieldProps from "./getters/getFieldProps";
import useInitSchemas from "./hooks/useInitSchemas";
import useInitStates from "./hooks/useInitStates";
// interfaces
import type { SchemaParseErrors } from "./getters/interfaces";
import type { SchemaSpaReturn, UseFormState } from "@core/types";
// DEPRECATED IMPORTS
import type { AnyCfgMeta, CfgCvCb, CfgEs, CfgFc, CfgFs } from "@utils/deprec/formConfigDefinition";
import type { UseFormProps } from "@utils/deprec/useFormTypes/useFormTypes";

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
const useForm = <C extends AnyCfgMeta>(
  config: UseFormProps<C>
): UseFormState<CfgFs<C>, CfgEs<C>, CfgCvCb<C>, CfgFc<C>> => {
  const { baseSchema, baseUserInputSchema } = useInitSchemas(config);

  const { form, setForm, updateForm, markDirty, dirtyFields, isDirty, resetToDefault } =
    useInitStates(baseUserInputSchema, config.defaults);

  const configValues = getConfigValues(config, form);

  // @todo rename
  const appliedSchema = useBuildConfigSchema(config, configValues);

  // ----------------- Getters (below) -----------------
  const validation: SchemaSpaReturn<CfgFs<C>> = appliedSchema.safeParse(form);
  const errors: SchemaParseErrors<CfgFs<C>> | undefined = validation.error?.formErrors.fieldErrors;

  const isValid = validation.success;

  const setField = useSetField(setForm, config, configValues, markDirty);

  const getFieldProps = useGetFieldProps(setField, form, errors, config, configValues);

  return {
    form,
    setForm,
    setField,
    validation,
    errors,
    isValid,
    isDirty,
    dirtyFields,
    resetToDefault,
    // Utils
    getFieldProps,
    /** Official validation schema. Use whenever the full payload needs to be valid. @todo apply correct type */
    schema: appliedSchema as CfgFs<C>,
    /** Schema applied to form values.
     * @note Only for use within the form.
     * All fields have 'catch'/'default' schemas to avoid setting all form values to `undefined` when a single field is invalid.
     * @note Previous names: `formSchema`, `userInputSchema`
     */
    userInputSchema: baseUserInputSchema,

    /** Allows correctly-typed use of `external values` when used in config methods outside of this framework.
     * - This happens by assigning the type defined in the generic. */
    config: configValues,
    // config: configValues as unknown as FormConfigCbReturnInferred<TCfg>,
  } as const;
};

export default useForm;
