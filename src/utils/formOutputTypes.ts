import type { AppliedFieldOutput, OptionalAppliedFieldOutput } from "./interfaces";
import type { EvSchema, ZFormSchema } from "./schemaTypes";

/** "Form Values" output */
export type FormOut<TSchema extends ZFormSchema = ZFormSchema> = AppliedFieldOutput<TSchema>;

/** "External Values" output */
export type EvOut<TEvSchema extends EvSchema = EvSchema> = OptionalAppliedFieldOutput<TEvSchema>;
