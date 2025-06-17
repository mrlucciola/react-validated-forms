import { useMemo } from "react";
import { z } from "zod";
// utils
import { buildDefaultSchema } from "@utils/utils";
// interfaces
import type { UiFormSchema, ZObj } from "@utils/index";

/**
 * @todo Annotate
 */
const useInitSchemas = <TBase extends ZObj>(
  originalSchema: TBase
): {
  baseSchema: TBase;
  baseUserInputSchema: UiFormSchema<TBase>;
} => {
  /** @note This object is memoized because:
   *   - Updates frequently (on each field change)
   *   - Can be expensive to recalculate (affects performance as # of fields (and the amount of nesting) increases
   */
  const baseSchema: TBase = useMemo(() => {
    // Extract the base schema from its refined form (if refined)
    const innerFormSchema: TBase =
      originalSchema instanceof z.ZodEffects ? originalSchema.innerType() : originalSchema;

    if (innerFormSchema instanceof z.ZodEffects)
      throw new Error(
        "Refined schemas must use either a single `.refine`. Use `.superRefine` for one or more refinements."
      );

    return innerFormSchema;
  }, []);

  /** Schema used for validating user input - any fields without a `catch` have `.catch()` schema applied.
   * @note The output values of this schema should only be used within the form components.
   */
  const baseUserInputSchema: UiFormSchema<TBase> = useMemo(
    () => buildDefaultSchema(baseSchema),
    []
  );

  return {
    /** The schema used for validating values used outside of the form fields.
     * The original schema goes through one validation check and is returned here.
     * @note This object is memoized because:
     *   - Updates frequently (on each field change)
     *   - Can be expensive to recalculate (affects performance as # of fields (and the amount of nesting) increases
     */
    baseSchema,
    /** Schema used for validating user input - any fields without a `catch` have `.catch()` schema applied.
     * @note The output values of this schema should only be used within the form components.
     */
    baseUserInputSchema,
  };
};

export default useInitSchemas;
