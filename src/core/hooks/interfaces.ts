import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { UiSchema } from "@utils/schemaTypes";

export type InitSchemas<TFs extends ZObj, TEs extends ZObjOpt> = {
  /** The schema used for validating values used outside of the form fields.
   * The original schema goes through one validation check, is memoized and is returned here.
   * @note This object is memoized because:
   *   - Updates frequently (on each field change)
   *   - Can be expensive to recalculate (affects performance as # of fields (and the amount of nesting) increases
   */
  baseSchema: TFs;
  /** Schema used for validating user input - any fields without a `catch` have `.catch()` schema applied.
   * @note The output values of this schema should only be used within the form components.
   */
  uiSchema: UiSchema<TFs>;

  /** Schema used for validating external input - any fields without a `catch` have `.catch()` schema applied.
   * @note The output values of this schema should only be used within the form components.
   * @todo remove typecast
   */
  evSchema?: TEs extends ZObj ? UiSchema<TEs> : undefined;
};
