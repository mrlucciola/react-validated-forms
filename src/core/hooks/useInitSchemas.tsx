import { useMemo } from "react";
import { z } from "zod";
// utils
import { buildDefaultSchema } from "@utils/utils";
// interfaces
import type { AnyCfgMeta, CfgFs, UiFormSchema } from "@utils/index";
import type { UseFormProps } from "@core/types";

/**
 * @todo Annotate
 */
const useInitSchemas = <C extends AnyCfgMeta, TFs extends CfgFs<C> = CfgFs<C>>(
  config: UseFormProps<C>
): {
  baseSchema: TFs;
  baseUserInputSchema: UiFormSchema<TFs>;
} => {
  const formSchema = config.schema;
  /** @note This object is memoized because:
   *   - Updates frequently (on each field change)
   *   - Can be expensive to recalculate (affects performance as # of fields (and the amount of nesting) increases
   */
  const baseSchema: TFs = useMemo(() => {
    // Extract the base schema from its refined form (if refined)
    const innerFormSchema: TFs =
      formSchema instanceof z.ZodEffects ? formSchema.innerType() : formSchema;

    if ((innerFormSchema as any) instanceof z.ZodEffects)
      throw new Error(
        "Refined schemas must use either a single `.refine`. Use `.superRefine` for one or more refinements."
      );

    return innerFormSchema;
  }, []);

  /** Schema used for validating user input - any fields without a `catch` have `.catch()` schema applied.
   * @note The output values of this schema should only be used within the form components.
   */
  const baseUserInputSchema: UiFormSchema<TFs> = useMemo(() => buildDefaultSchema(baseSchema), []);

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
