import type {
  AnyCfgDef,
  CfgFs,
  ConfigDefinition,
  CvCbOpt,
  FieldConfig,
  InferFormKeys,
  ResolvePartial,
  Tighten,
  UiValues,
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
export type FormConfigFieldsBase<TCfg extends AnyCfgDef> = {
  [FieldKey in InferFormKeys<CfgFs<TCfg>>]: FieldConfig<TCfg, FieldKey>;
};
export type FormConfigFieldsInternal<TCfg extends AnyCfgDef> = Partial<FormConfigFieldsBase<TCfg>>;

export type PublicFormConfigFields<TCfg extends AnyCfgDef> = Tighten<
  FormConfigFieldsInternal<TCfg>
>;

export type ConfigFieldsOpt<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = FormConfigFieldsInternal<AnyCfgDef<TFs, TEs, TCvCb>> | void;
