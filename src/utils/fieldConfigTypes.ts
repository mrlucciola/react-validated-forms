import type { z } from "zod";
//
import type { Nullish, ResolveProp } from "@utils/utilityTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

export type ConfigValues<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt
> = ResolveProp<TCv, "calculated"> &
  ResolveProp<ExtValues<TEs>, "external"> & { form: UiValues<TFs> };

/** Validation-schema configuration for a single form-field */
export type DefineFieldConfig<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FieldKey extends keyof UiValues<TFs>
> = {
  /** ### Return `undefined` to abort.
   * @todo Rename to `fieldEffect` &
   * Field Effect: when a field is updated, all fields defined in the return object are updated when the specified field is changed by the user
   */
  changeEvent?: (values: ConfigValues<TFs, TEs, TCv>) => Nullish<UiValues<TFs>>;

  /** This gets passed into a refinement
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
    values: ConfigValues<TFs, TEs, TCv>,
    ctx: z.RefinementCtx,
    fieldKey: FieldKey
  ) => void | undefined | never;

  /** Define logic to control input-field's `hidden` state.
   * - This field matches the `HTML` element prop `hidden` - if true: show/hide a field.
   * - If not specified, HTML element's `hidden` state will default to `false`.
   * - Setting value to `false` will force field to always be displayed.
   */
  isHidden?: false | ((values: ConfigValues<TFs, TEs, TCv>) => boolean);

  /** Conditionally include/ignore field validation by providing a callback.
   * For default validation, leave this field `undefined`.
   * See `buildCatchSchema` for how this method is applied.
   * - If `isHidden` evaluates to `true`: field will NOT be registered (because user cannot modify it).
   */
  registerOn?: (values: ConfigValues<TFs, TEs, TCv>) => boolean;

  /** Define logic to control input-field's `disabled` state
   * - This field matches the `HTML` input-element prop `disabled` - disable/enable a field.
   * - @todo Evaluate this logic: "If not set, `getFormProps(<field>).display` applies the boolean return from `.registerOn()`.""
   */
  disableOn?: (values: ConfigValues<TFs, TEs, TCv>) => boolean;

  /** @todo add `generalEffect`
   * General Effect: **any time** a field in the array is changed, all fields defined in its callback's return object are updated
   * generalEffect?: () => {}
   */
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

export type FormConfigFieldsBase<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends keyof UiValues<TFs>
> = { [FieldKey in FcKeys]: DefineFieldConfig<TFs, TEs, TCv, FieldKey> };
