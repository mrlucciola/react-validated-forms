import type { AppliedFieldOutput, OptionalAppliedFieldOutput } from "./fxnTypes";
import type { ZEvSchema, ZFormSchema } from "./schemaTypes";

/** "Form Values" output
 * @todo differentiate between:
 * - "User Input"/display form values; and,
 * - "Actual" form values
 */
export type FormOut<TSchema extends ZFormSchema = ZFormSchema> = AppliedFieldOutput<TSchema>;

/** "External Values" output
 * @todo differentiate between:
 * - display form values; and,
 * - "Actual" form values
 */
export type EvOut<TEvSchema extends ZEvSchema = ZEvSchema> = OptionalAppliedFieldOutput<TEvSchema>;
