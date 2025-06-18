import type { z } from "zod";
import type { CfgKey, CvCb, FormConfigValues, Nullish, UiValues, ZObj } from "@utils/index";

/** Validation-schema configuration for a single form-field */
export type FieldConfig<
  TFs extends ZObj,
  TCvCb extends CvCb<TFs, any, any> | void,
  TEs extends ZObj | void,
  TField extends CfgKey<UiValues<TFs>>
> = {
  /** ### Return `undefined` to abort.
   * @todo Rename to `fieldEffect` &
   * Field Effect: when a field is updated, all fields defined in the return object are updated when the specified field is changed by the user
   */
  changeEvent?: (values: FormConfigValues<TFs, TCvCb, TEs>) => Partial<Nullish<TFs>>;

  /** @todo add `generalEffect`
   * General Effect: **any time** a field in the array is changed, all fields defined in its callback's return object are updated
   */
  // generalEffect?: () => {}

  /** Conditionally include/ignore field validation by providing a callback.
   * For default validation, leave this field `undefined`.
   * See `buildCatchSchema` for how this method is applied. */
  registerOn?: (values: FormConfigValues<TFs, TCvCb, TEs>) => boolean;

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
    values: FormConfigValues<TFs, TCvCb, TEs>,
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
