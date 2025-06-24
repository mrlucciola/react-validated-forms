import type {
  AnyCfgMeta,
  CfgFc,
  CvCbOpt,
  DefineFieldConfig,
  FsUiKeys,
  ZObj,
  ZObjOpt,
} from "@utils/index";

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
type FormConfigFieldsBase<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = {
  [FieldKey in FsUiKeys<TFs>]: DefineFieldConfig<TFs, TEs, TCvCb, FieldKey>;
};

export type DefineConfigFields<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = Partial<FormConfigFieldsBase<TFs, TEs, TCvCb>>;

export type ConfigFieldsOpt<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = DefineConfigFields<TFs, TEs, TCvCb> | void;
