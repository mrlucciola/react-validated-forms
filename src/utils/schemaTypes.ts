import type { z } from "zod";

/** Convenience type for z.ZodObject schema */
export type ZObj = z.ZodObject<z.ZodRawShape>;

/** "Form" zod-validation-schema */
export type ZFormSchema = ZObj;

/**
 * @deprecated use ZEvSchema
 */
export type EvSchema = ZEvSchema;
/** Represents "External Values" zod-validation-schema */
export type ZEvSchema = ZObj | undefined;
