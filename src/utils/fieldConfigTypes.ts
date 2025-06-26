import type { z } from "zod";
//
import type { Nullish } from "@utils/utilityTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { UiValues } from "@utils/valueTypes";
import type { CalcValuesProp, ExternalValuesProp2 } from "@utils/configTypes";

export type FieldConfigValueProp<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt
> = CalcValuesProp<TCv> &
  ExternalValuesProp2<TEs> & {
    form: UiValues<TFs>;
  };

/** Validation-schema configuration for a single form-field */
export type DefineFieldConfig<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FieldKey extends keyof UiValues<TFs>,
  TValProp extends FieldConfigValueProp<TFs, TEs, TCv> = FieldConfigValueProp<TFs, TEs, TCv>
> = {
  /** ### Return `undefined` to abort.
   * @todo Rename to `fieldEffect` &
   * Field Effect: when a field is updated, all fields defined in the return object are updated when the specified field is changed by the user
   */
  changeEvent?: (values: TValProp) => Nullish<UiValues<TFs>>;

  /** Conditionally include/ignore field validation by providing a callback.
   * For default validation, leave this field `undefined`.
   * See `buildCatchSchema` for how this method is applied.
   */
  registerOn?: (values: TValProp) => boolean;

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
  rules?: (values: TValProp, ctx: z.RefinementCtx, fieldKey: FieldKey) => void | undefined | never;

  /** @todo add `generalEffect`
   * General Effect: **any time** a field in the array is changed, all fields defined in its callback's return object are updated
   * generalEffect?: () => {}
   */

  /** @todo Implement this and its corresponding 'getter' field
   * If not set, `getFormProps(<field>).display` applies the boolean return from `.registerOn()`.
   * - In short, with-regards-to this overrides
   *
   * display?: () => void;
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
  TCv extends CalcValuesOpt
> = {
  [FieldKey in keyof UiValues<TFs>]: DefineFieldConfig<TFs, TEs, TCv, FieldKey>;
};
