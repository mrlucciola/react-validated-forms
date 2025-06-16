import { z } from "zod";
// interfaces
import type { FieldCbValueProp, Nullish, FormOut, EvOut } from "@utils/index";
import type { CfgKey } from "./interfaces";

export type ConfigFieldsProp<
  TForm extends FormOut,
  // TCvCb extends CvCbProp<TForm, TExt, T>,
  TCalc,
  TExt extends EvOut
  // > = FormConfig<TForm, ReturnType<NonNullable<TCvCb>>, CvCbOut<TCvCb>, TExt>;
> = FormConfig<TForm, TCalc, TExt>;
// > = FormConfig<TForm, ReturnType<NonNullable<TCvCb>>, NonNullable<TCalc2>, TExt>;

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
type FormConfig<TForm extends FormOut, TCalc, TExt extends EvOut> = {
  [FieldKey in CfgKey<TForm>]: FieldConfig<TForm, NonNullable<TCalc>, TExt, FieldKey>;
};

/** Validation-schema configuration for a single form-field */
export type FieldConfig<
  TForm extends FormOut,
  TCalcVal,
  TExt extends EvOut,
  TField extends CfgKey<TForm>
> = {
  /** ### Return `undefined` to abort.
   * @todo Rename to `fieldEffect` &
   * Field Effect: when a field is updated, all fields defined in the return object are updated when the specified field is changed by the user
   */
  changeEvent?: (values: FieldCbValueProp<TForm, TCalcVal, TExt>) => Partial<Nullish<TForm>>;

  /** @todo add `generalEffect`
   * General Effect: **any time** a field in the array is changed, all fields defined in its callback's return object are updated
   */
  // generalEffect?: () => {}

  /** Conditionally include/ignore field validation by providing a callback.
   * For default validation, leave this field `undefined`.
   * See `buildCatchSchema` for how this method is applied. */
  registerOn?: (values: FieldCbValueProp<TForm, TCalcVal, TExt>) => boolean;

  /** this gets passed into a refinement
   * Rules/refinement logic will run if:
   * 1. `.registerOn()` field is not set
   * 1. `.registerOn()` returns `true`
   *
   * @todo add custom and `isRegistered` validation rules (i.e. form.billAddress === null && zAddIssue(args, "billAddress"))
   *
   * See `buildCatchSchema` for how this method is applied.
   * See: RefinementRules<TSchema>
   * See: ZTransformEffect, ZRefinementEffect
   */
  rules?: (
    values: FieldCbValueProp<TForm, TCalcVal, TExt>,
    ctx: z.RefinementCtx,
    fieldKey: TField
  ) => void | undefined | never;

  /** @todo Implement
   * If not set, `getFormProps(<field>).display` applies the boolean return from `.registerOn()`.
   * - In short, with-regards-to this overrides
   *
   * @deprecated
   */
  display?: () => void;
  // disabled: ____ , @todo add `getter` field

  /**
   * @todo Implement `effects` - apply a single callback function to a set of fields to subscribe to changes.
   * This callback function runs AFTER any of the subscribed fields changes.
   * Example:
   * ```ts
   * effects: [
   *   {
   *     effect: (form: ExampleSchema, ctx: FieldConfigCtx) => {
   *       const oddEvenNullStr =
   *         form.field2Number === null ? "Im null" : form.field2Number % 2 ? "Im even" : "Im odd";
   *       const newField1Str = `${oddEvenNullStr} - You chose ${form.field3Enum}`;
   *       ctx.setField(newField1Str);
   *     },
   *     fields: ["field2Number", "field3Enum"],
   *   },
   * ],
   * ```
   */
};
