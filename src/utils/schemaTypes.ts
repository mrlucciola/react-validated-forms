import type { ZObj } from "@utils/zodTypes";

/** "Form" zod-validation-schema */
export type ZFormSchema = ZObj;

/**
 * @deprecated use ZEvSchema
 */
export type EvSchema = ZEvSchema;
/** Represents "External Values" zod-validation-schema */
export type ZEvSchema = ZObj | undefined;
