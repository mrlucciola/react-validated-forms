import type { z } from "zod";

/** Convenience type for z.ZodObject schema */
export type ZObj = z.ZodObject<z.ZodRawShape>;

/** Represents "Form" schema */
export type ZFormSchema = ZObj;

/** Represents "External Values" schema */
export type EvSchema = ZObj | undefined;
