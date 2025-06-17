import type { CfgKey, FieldConfig } from "@configDsl/fieldConfigTypes";
import type { EvOut, FormOut } from "@utils/index";

/** Defines the configuration for all form fields
 *
 * Usage:
 * ```tsx
 * // In provider/component file `MyProvider.tsx`/`MyForm.tsx`:
 * useCtxState = () => {
 *   const formState = useValidatedForm(MySchema, defaultValues, mySchemaConfig);
 *
 *   return { formState, ...values,}
 * };
 *
 * // In schema-definition file:
 *
 * // Define the schema here - must be a `ZodObject`
 * export const MySchema = z.object({
 *   field1: z.number(),
 *   // ... more schema fields ...
 * });
 * export type MySchema = z.infer<typeof MySchema>;
 *
 * // Define config
 * export const mySchemaConfig = defineFormConfig({
 *   //
 *   field1
 *   //
 * });
 * ```
 */
export type FormConfig<TForm extends FormOut, TCalc, TExt extends EvOut> = {
  [FieldKey in CfgKey<TForm>]: FieldConfig<TForm, NonNullable<TCalc>, TExt, FieldKey>;
};
