import type { CvCb, FieldConfig, UiValues, ZObj, ZObjOpt } from "@utils/index";

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
export type FormConfigFields<
  TFs extends ZObj,
  TCvCb extends CvCb<TFs, any, any> | void,
  TEs extends ZObj | void
> = {
  [FieldKey in CfgKey<UiValues<TFs>>]: FieldConfig<TFs, TCvCb, TEs, FieldKey>;
};

/** Key-type used for accessing the config */
export type CfgKey<TForm extends UiValues> = keyof TForm;
