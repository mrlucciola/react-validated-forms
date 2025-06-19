import type { z } from "zod";

/** Convenience type for z.ZodObject schema */
export type ZObj<T extends z.ZodRawShape = z.ZodRawShape> = z.ZodObject<T>;

/** Convenience type for optional z.ZodObject schema */
export type ZObjOpt<T extends z.ZodRawShape = z.ZodRawShape> = void | z.ZodObject<T>;
