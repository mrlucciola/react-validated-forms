import { z } from "zod";
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
import type { SchemaParseErrors, SchemaSpaReturn } from "./interfaces";
import type { Nullish, ZObj } from "@utils/index";
import type { FormConfig } from "@configDsl/interfaces";

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
const useForm = <TBase extends ZObj, TConfig extends FormConfig<TBase, any, any>>(
  originalSchema: TBase,
  defaultFormValues?: Nullish<z.input<TBase>> | null,
  formConfig?: TConfig // @todo use AppliedFormCfgReturnCb - prev: config
) => {
  const { baseSchema, baseUserInputSchema } = useInitSchemas(originalSchema);

  const { form, setForm, referenceFormValues, resetToDefault } = useInitStates(
    baseUserInputSchema,
    defaultFormValues,
    baseSchema
  ); // Other props: setReferenceFormValues, uninitializedForm, initializedForm,

  // @todo Fix type
  const configValues = getConfigValues(form, formConfig);

  // @todo rename
  const appliedSchema = useBuildConfigSchema(baseSchema, formConfig);

  // ----------------- Getters (below) -----------------
  const validation: SchemaSpaReturn<TBase> = appliedSchema.safeParse(form);
  const errors: SchemaParseErrors<TBase> | undefined = validation.error?.formErrors.fieldErrors;

  const isValid = validation.success;
  const isDirty = !isEqual(referenceFormValues, form);
  /** Error @ `configValues`
   * Argument of type 'OutType<TConfig> | { form: { [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: addQuestionMarks<...>[k]; }; external: {} | undefined; calculated: InferCalcValuesFromConfig<...>; }' is not assignable to parameter of type 'AnyFormConfigValues<TBase> | undefined'.
   * Type '{ form: { [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: objectUtil.addQuestionMarks<...>[k]; }; external: {} | undefined; calculated: InferCalcValuesFromConfig<...>; }' is not assignable to type 'AnyFormConfigValues<TBase>'.
   *      Property 'fields' is missing in type '{ form: { [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: objectUtil.addQuestionMarks<...>[k]; }; external: {} | undefined; calculated: InferCalcValuesFromConfig<...>; }' but required in type 'FormValuesCtx<TBase>'.ts(2345)
   * - formConfigValueTypes.ts(4, 43): 'fields' is declared here.
   * - const configValues: OutType<TConfig> | {
   *      form: { [k in keyof z.objectUtil.addQuestionMarks<z.baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: z.objectUtil.addQuestionMarks<...>[k]; };
   *      external: {} | undefined;
   *      calculated: InferCalcValuesFromConfig<...>;
   *  }
   */
  const setField = useSetField(setForm, formConfig, configValues);
  /** Error @ `configValues`
   * - Argument of type 'OutType<TConfig> | { form: { [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: addQuestionMarks<...>[k]; }; external: {} | undefined; calculated: InferCalcValuesFromConfig<...>; }' is not assignable to parameter of type 'AnyFormConfigValues<TBase> | undefined'.
   * - Type '{ form: { [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: objectUtil.addQuestionMarks<...>[k]; }; external: {} | undefined; calculated: InferCalcValuesFromConfig<...>; }' is not assignable to type 'AnyFormConfigValues<TBase>'.
   * - Property 'fields' is missing in type '{ form: { [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: objectUtil.addQuestionMarks<...>[k]; }; external: {} | undefined; calculated: InferCalcValuesFromConfig<...>; }' but required in type 'FormValuesCtx<TBase>'.ts(2345)
   * - formConfigValueTypes.ts(4, 43): 'fields' is declared here.
   * - const configValues: OutType<TConfig> | {
   *     form: { [k in keyof z.objectUtil.addQuestionMarks<z.baseObjectOutputType<CatchSchemaShape<InferFormSchemaFromConfig<TConfig>>>, any>]: z.objectUtil.addQuestionMarks<...>[k]; };
   *     external: {} | undefined;
   *     calculated: InferCalcValuesFromConfig<...>;
   * }
   */
  const getFieldProps = useGetFieldProps(setField, form, errors, formConfig, configValues);

  return {
    form,
    setForm,
    setField,
    validation,
    errors,
    isValid,
    isDirty,
    resetToDefault,
    // Utils
    getFieldProps,
    /** Official validation schema. Use whenever the full payload needs to be valid. @todo apply correct type */
    schema: appliedSchema as TBase,
    /** Schema applied to form values.
     * @note Only for use within the form.
     * All fields have 'catch'/'default' schemas to avoid setting all form values to `undefined` when a single field is invalid.
     * @note Previous names: `formSchema`, `userInputSchema`
     */
    baseUserInputSchema,

    /** Allows correctly-typed use of `external values` when used in config methods outside of this framework.
     * - This happens by assigning the type defined in the generic. */
    config: configValues,
    // config: configValues as unknown as FormConfigCbReturnInferred<TConfig>,
  } as const;
};

export default useForm;
