import type { z } from "zod";
//
import type { CvCbOpt } from "@utils/deprec/cvCbTypes";
import type { CvCbCalculatedValues, FsUiKeys } from "@utils/deprec/derived";
import type { AnyCfgMetaDEPREC, CfgCvCb, CfgEs, CfgFc, CfgFs } from "@utils/deprec/formConfigDefinition";
import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { Nullish } from "@utils/utilityTypes";
import type { ExtValues, UiValues } from "@utils/deprec/formOutputTypes";

/** @deprecated duplicate - see internal */
export type DefineConfigValues<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
> = {
  form: UiValues<TFs>;
  external?: ExtValues<TEs>;
  calculated?: CvCbCalculatedValues<TCvCb>;
};

export type FieldConfig<
  C extends AnyCfgMetaDEPREC,
  TField extends FieldCfgs extends [void] ? keyof FieldCfgs : never,
  FieldCfgs extends CfgFc<C> = CfgFc<C>
> = FieldCfgs extends [void] ? never : FieldCfgs[TField];

export type CfgFieldConfig<
  C extends AnyCfgMetaDEPREC,
  FieldKey extends FsUiKeys<CfgFs<C>>
> = DefineFieldConfig<CfgFs<C>, CfgEs<C>, CfgCvCb<C>, FieldKey>;

/** Validation-schema configuration for a single form-field */
export type DefineFieldConfig<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>,
  FieldKey extends FsUiKeys<TFs>
> = {
  /** ### Return `undefined` to abort.
   * @todo Rename to `fieldEffect` &
   * Field Effect: when a field is updated, all fields defined in the return object are updated when the specified field is changed by the user
   */
  changeEvent?: (values: DefineConfigValues<TFs, TEs, TCvCb>) => Partial<Nullish<TFs>>;

  /** @todo add `generalEffect`
   * General Effect: **any time** a field in the array is changed, all fields defined in its callback's return object are updated
   */
  // generalEffect?: () => {}

  /** Conditionally include/ignore field validation by providing a callback.
   * For default validation, leave this field `undefined`.
   * See `buildCatchSchema` for how this method is applied. */
  registerOn?: (values: DefineConfigValues<TFs, TEs, TCvCb>) => boolean;

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
    values: DefineConfigValues<TFs, TEs, TCvCb>,
    ctx: z.RefinementCtx,
    fieldKey: FieldKey
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
