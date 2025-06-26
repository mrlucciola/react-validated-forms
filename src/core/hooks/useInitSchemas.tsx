import { useMemo } from "react";
import { z } from "zod";
// utils
import { buildDefaultSchema } from "@core/utils";
// interfaces
import type { AnyCfgDef } from "@utils/rootTypes";
import type { ExtSchema, UiSchema } from "@utils/schemaTypes";
import type { ConfigInternal } from "@utils/metaTypes";

const useInitSchemas = <D extends ConfigInternal<any, any, any>>(
  config: D
): {
  baseSchema: D["schema"];
  evSchema: ExtSchema<D["externalSchema"]>;
  uiSchema: UiSchema<D["schema"]>;
} => {
  type TFs = D["schema"];
  type TEs = D["externalSchema"];
  if (config.schema instanceof z.ZodEffects) {
    throw new Error(
      `Schema cannot be an Effect type (preprocess/transform/refine): Provided: ${config.schema}`
    );
  }

  if (config.externalSchema && config.externalSchema instanceof z.ZodEffects) {
    throw new Error(
      `External schema cannot be an Effect type (preprocess/transform/refine): Provided: ${config.externalSchema}`
    );
  }

  /** @note This object is memoized because:
   *   - Updates frequently (on each field change)
   *   - Can be expensive to recalculate (affects performance as # of fields (and the amount of nesting) increases
   */
  const baseSchema: D["schema"] = useMemo(() => config.schema, []);

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
