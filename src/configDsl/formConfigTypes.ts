import type { EvOut, FormOut, Nullish } from "@utils/index";
import type { CfgKey, FieldConfig } from "./fieldConfigTypes";

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
export type FormConfig<TFv extends FormOut, TCv, TEv extends EvOut> = {
  [FieldKey in CfgKey<TFv>]: FieldConfig<TFv, NonNullable<TCv>, TEv, FieldKey>;
};

type ExternalValuesCb<TEv extends EvOut> = (
  externalValues?: Nullish<NonNullable<TEv>> | null
) => void;

/** Parameters for `ExternalValuesCb` */
export type EvProp<TEv extends EvOut> = TEv extends undefined | never
  ? never
  : Parameters<ExternalValuesCb<TEv>>;
