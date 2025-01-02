import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { isEqual } from "lodash";
// utils
import { Nullable, Nullish } from "@/interfaces/utilityTypes";
import { buildDefaultSchema, buildRefinedSchema, getValueFromEvent } from "./utils";
// interfaces
import { OnChangeEventUnionNew, AppliedFieldSchema } from "./interfaces";
import { ExtOut, FormOut, ZObj } from "./fieldConfig/interfaces";
import { AnyFormCfgObj, FormCfgReturnObj, FormCfgRtnObjGeneric } from "./fieldConfig/returnTypes";
import { FormConfigCbReturnInferred } from "./fieldConfig/callbacks";

/** @deprecated move to utils file */
const getFormConfigField = <
  TForm extends FormOut,
  TCalc,
  TExt extends ExtOut,
  TField extends keyof TForm
>(
  config: FormCfgReturnObj<TForm, TCalc, TExt> | undefined,
  fieldKey: TField
) => config?.fields && config.fields[fieldKey];
/** @deprecated move to utils file */
const getConfigValues = <TForm extends FormOut, TConfig extends AnyFormCfgObj<TForm>>(
  form: TForm,
  config: FormCfgRtnObjGeneric<TConfig> | undefined
) => {
  if (!config) return null;

  return {
    form,
    external: config.externalValues,
    calculated: config.calcValues && config.calcValues(form, config.externalValues),
  };
};

/** ### Stateful form with validation, based on `zod`.
 *
 * - While the validation schema and initialization schema are different, which The values may be nullable/invalid, and this should be reflected
 * - We mainly need the `form` var for deriving the `isValid` (and occasionally value access when not using `getFieldProps`)
 *
 * @todo Add logic to handle nested fields (candidate impl.: use a 'selector' callback)
 * @todo Optionally handle request body validation
 * @todo Create generic `UseValidatedForm<FormSchema | FormConfig>`
 *
 * ### For config implementation (v3):
 * - Build object of fields to use in form
 * - Effects - 2D array of field-names to listen on and logic to run when those fields change via `setField`
 *    - Example: A field needs to update when **any** of the provided 5 fields updates
 *     i.e. `{ effect: () => cond1 && cond2, fields: [field123, fieldAbc] }`
 *     `[]`
 * - Enable 'external data'/'data out of form-mgmt'
 */
const useValidatedForm = <TBase extends ZObj, TConfig extends AnyFormCfgObj<FormOut<TBase>>>(
  baseSchemaInput: TBase,
  defaultFormValues?: Nullish<z.input<TBase>> | null,
  config?: TConfig // @todo use AppliedFormCfgReturnCb
) => {
  type FormSchema = AppliedFieldSchema<TBase>;
  type FormOutput = FormOut<TBase>;

  /** @note This object is memoized because:
   *   - Updates frequently (on each field change)
   *   - Can be expensive to recalculate (affects performance as # of fields (and the amount of nesting) increases
   */
  const baseSchema: TBase = useMemo(() => {
    // Extract the base schema from its refined form (if refined)
    const innerFormSchema: TBase =
      baseSchemaInput instanceof z.ZodEffects ? baseSchemaInput.innerType() : baseSchemaInput;

    if (innerFormSchema instanceof z.ZodEffects)
      throw new Error(
        "Refined schemas must use either a single `.refine`. Use `.superRefine` for one or more refinements."
      );

    return innerFormSchema;
  }, []);
  const formSchema: FormSchema = useMemo(() => buildDefaultSchema(baseSchema), []);
  /** @note Used for checking if first render (**BEFORE**, state/passed in defaults are set ) */
  const initializedForm: FormOutput = useMemo(() => formSchema.parse({}), []);

  // @note Used for initializing form-field states
  // Form-field states
  const [referenceFormValues, setReferenceFormValues] = useState<FormOutput>(
    formSchema.parse(defaultFormValues ?? {})
  );
  const [form, setForm] = useState<FormOutput>(formSchema.parse(defaultFormValues ?? {}));

  const configValues = getConfigValues(
    form,
    config
  ) as unknown as FormConfigCbReturnInferred<TConfig>;

  // memoize
  const appliedSchema = config ? buildRefinedSchema(baseSchema, config, configValues) : baseSchema;

  // ----------------- Getters (below) -----------------
  const validation: z.SafeParseReturnType<
    z.input<TBase>,
    z.output<TBase>
  > = appliedSchema.safeParse(form);
  const errors = validation.error?.formErrors.fieldErrors as
    | { [P in keyof TBase["shape"]]?: string[] | undefined }
    | undefined;
  const isValid = validation.success;
  const isDirty = !isEqual(referenceFormValues, form);

  // ----------------- Getters (above) -----------------

  // ----------------- Utilities (below) -----------------
  const resetToDefault = (
    newDefaultValues?: Nullish<z.input<TBase>> | null,
    overwriteExistingFormValues: boolean = false
  ) => {
    const updatedDefaultForm = {
      ...(overwriteExistingFormValues ? {} : form),
      ...(newDefaultValues ?? {}),
    };
    const parsed: FormOutput = formSchema.parse(updatedDefaultForm);
    setReferenceFormValues(parsed);
    setForm(parsed);
  };

  const setField = useCallback(
    <TField extends keyof Nullable<z.input<TBase>>>(
      fieldKey: TField,
      value: z.input<TBase>[TField] | null // use the applied-form-schema type instead
    ): void => {
      setForm((prevFormValues) => {
        const newForm = { ...prevFormValues, [fieldKey]: value };

        const fieldEffect = getFormConfigField(config, fieldKey)?.changeEvent;
        if (config && fieldEffect) {
          const configValues = getConfigValues(newForm, config);
          const effectValues = configValues && fieldEffect(configValues);
          return { ...newForm, ...effectValues };
        }

        return newForm;
      });
    },
    [configValues]
  );

  const getFieldProps = <
    TField extends keyof z.input<TBase>,
    TInValue extends Nullable<z.input<TBase>>[TField]
  >(
    fieldKey: TField
  ) => {
    const onChange = (e: OnChangeEventUnionNew, ...args: (boolean | unknown)[]) => {
      const newFieldValue = getValueFromEvent(e, args) as TInValue;
      setField(fieldKey, newFieldValue);
    };

    const registerOn = getFormConfigField(config, fieldKey)?.registerOn;
    const shouldDisplay = registerOn && configValues ? registerOn({ ...configValues, form }) : true;
    /** @deprecated not yet configured in `FormConfig` */
    const disabled = false;

    return {
      onChange,
      errors: errors && errors[fieldKey]?.join(",\n"),
      value: form[fieldKey] ?? null, // (form[fieldKey] ?? null) as TOutValue
      hidden: !shouldDisplay,
      /** @deprecated not yet configured in `FormConfig` */
      disabled,
    };
  };
  // ----------------- Utilities (above) -----------------

  // @todo update init-logic (see 'todo's)
  useEffect(() => {
    const isRefFormInit = isEqual(initializedForm, referenceFormValues);
    const isFormInit = isEqual(initializedForm, form);

    // Set form after once when default-form-values is available
    // @todo Replace with below 'todo'
    if (isRefFormInit && isFormInit && defaultFormValues !== null) {
      resetToDefault(formSchema.parse(defaultFormValues ?? {}));
    }
    // @todo Uncomment below line after fixed:
    // resetToDefault(formSchema.parse({ ...referenceFormValues, ...form, ...defaultFormValues }));

    // @todo Apply updated default-form-values to non-dirty fields (requires defining `dirtyValues` object)
  }, [JSON.stringify(defaultFormValues)]);

  return {
    form,
    setForm,
    setField,
    validation,
    errors,
    isValid,
    isDirty,
    resetToDefault,
    getFieldProps,
    /** Official validation schema. Use whenever the full payload needs to be valid. @todo apply correct type */
    schema: appliedSchema as TBase,
    /** Schema applied to form values.
     * @note Only for use within the form.
     * All fields have 'catch'/'default' schemas to avoid setting all form values to `undefined` when a single field is invalid. */
    formSchema,
    /** Allows correctly-typed use of `external values` when used in config methods outside of this framework.
     * - This happens by assigning the type defined in the generic. */
    config: configValues as unknown as FormConfigCbReturnInferred<TConfig>,
  } as const;
};

export default useValidatedForm;
