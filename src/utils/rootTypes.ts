import type { z } from "zod";

/** Convenience type for z.ZodObject schema */
export type ZObj<T extends z.ZodRawShape = any> = z.ZodObject<T, any, any, any, any>;

/** Convenience type for optional z.ZodObject schema */
export type ZObjOpt<T extends z.ZodRawShape = any> = ZObj<T> | void;

export type CalcValues = Record<string, any>;
export type CalcValuesOpt = CalcValues | void;
