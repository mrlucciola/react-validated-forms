import type {
  CfgDefMeta,
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
export type FormConfigFieldsBase<TCfg extends CfgDefMeta<any, any, any>> = {
  [FieldKey in InferFormKeys<CfgFs<TCfg>>]: FieldConfig<TCfg, FieldKey>;
};
export type FormConfigFieldsInternal<TCfg extends CfgDefMeta<any, any, any>> = Partial<
  FormConfigFieldsBase<TCfg>
>;

export type PublicFormConfigFields<TCfg extends CfgDefMeta<any, any, any>> = ResolvePartial<
  FormConfigFieldsInternal<TCfg>
>;
export type PublicConfigFields<TCf extends FormConfigFieldsInternal<CfgDefMeta<any, any, any>>> =
  ResolvePartial<TCf>;

export type ConfigFieldsOpt<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = FormConfigFieldsInternal<CfgDefMeta<TFs, TEs, TCvCb>> | void;
