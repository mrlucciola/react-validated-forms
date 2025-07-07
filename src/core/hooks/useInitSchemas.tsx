import { useMemo } from "react";
import { z } from "zod";
// utils
import { buildDefaultSchema } from "@core/utils";
// interfaces
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtSchema, UiSchema } from "@utils/schemaTypes";
import type { CvCbDefinition } from "@utils/configPropTypes";
import type { ResolveFor, ResolveProp } from "@utils/utilityTypes";
import type { InitSchemas } from "@core/hooks/interfaces";

type Schemas<TFs extends ZObj, TEs extends ZObjOpt> = {
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
} & ResolveProp<ResolveFor<ExtSchema<TEs>, ZObj>, "evSchema">;

const useInitSchemas = <TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt>(config: {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
}): Schemas<TFs, TEs> => {
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
  const baseSchema: TFs = useMemo(() => config.schema, []);

  /** Schema used for validating user input - any fields without a `catch` have `.catch()` schema applied.
   * @note The output values of this schema should only be used within the form components.
   */
  const uiSchema: UiSchema<TFs> = useMemo(() => buildDefaultSchema(baseSchema), []);
  const evSchema = useMemo(() => {
    const out = config.externalSchema ? buildDefaultSchema(config.externalSchema) : undefined;
    return out;
  }, []) as ExtSchema<TEs>; // @todo remove this coersion

  const out: InitSchemas<TFs, TEs> = { baseSchema, uiSchema };
  if (config.externalSchema) {
    out.evSchema = evSchema;
  }

  return out as Schemas<TFs, TEs>;
};

export default useInitSchemas;
