import { useMemo } from "react";
import { z } from "zod";
// utils
import { buildDefaultSchema } from "@core/utils";
// interfaces
import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ConfigDef } from "@utils/configTypes";
import type { ExtSchema, UiSchema } from "@utils/schemaTypes";

const useInitSchemas = <
  C extends ConfigDef<any, any, any>,
  TFs extends ZObj = C["schema"],
  TEs extends ZObjOpt = C["externalSchema"]
>(
  config: C
): {
  baseSchema: TFs;
  evSchema: ExtSchema<TEs>;
  uiSchema: UiSchema<TFs>;
} => {
  if (config.schema instanceof z.ZodEffects) {
    throw new Error(
      `Schema cannot be an Effect type (preprocess/transform/refine): Provided: ${config.schema}`
    );
  }
  if (config.externalSchema instanceof z.ZodEffects) {
    throw new Error(
      `External schema cannot be an Effect type (preprocess/transform/refine): Provided: ${config.externalSchema}`
    );
  }

  /** @note This object is memoized because:
   *   - Updates frequently (on each field change)
   *   - Can be expensive to recalculate (affects performance as # of fields (and the amount of nesting) increases
   */
  const baseSchema: TFs = useMemo(() => config.schema, []);

  /** Schema used for validating user input - any fields without a `catch` have `.catch()` schema applied.
   * @note The output values of this schema should only be used within the form components.
   */
  const uiSchema: UiSchema<TFs> = useMemo(() => buildDefaultSchema(baseSchema), []);
  const evSchema: ExtSchema<TEs> = useMemo(() => {
    const out = config.externalSchema ? buildDefaultSchema(config.externalSchema) : undefined;
    return out as ExtSchema<TEs>; // @todo remove this coersion
  }, []);

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
    uiSchema,
    /** Schema used for validating external input - any fields without a `catch` have `.catch()` schema applied.
     * @note The output values of this schema should only be used within the form components.
     */
    evSchema,
  };
};

export default useInitSchemas;
