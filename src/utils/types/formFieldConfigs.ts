import type { CvCbOpt, FieldConfig, UiValues, ZObj, ZObjOpt } from "@utils/index";

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
  TCvCb extends CvCbOpt<TFs, TEs>,
  TEs extends ZObjOpt
> = {
  [FieldKey in CfgKey<TFs>]: FieldConfig<TFs, TCvCb, TEs, FieldKey>;
};

/** Key-type used for accessing the config */
export type CfgKey<TFs extends ZObj> = keyof UiValues<TFs>;
