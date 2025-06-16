import type { AppliedFieldOutput, EvSchema, OptionalAppliedFieldOutput, ZObj } from "./interfaces";

/** "Form Values" output */
export type FormOut<TSchema extends ZObj = ZObj> = AppliedFieldOutput<TSchema>;

/** "External Values" output */
export type EvOut<TEvSchema extends EvSchema = EvSchema> = OptionalAppliedFieldOutput<TEvSchema>;
