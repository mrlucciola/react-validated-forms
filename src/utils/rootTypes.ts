import type { z } from "zod";
//
import type { DefineFieldConfig } from "@utils/fieldConfigTypes";
import type { UiValues } from "@utils/valueTypes";

/** Convenience type for z.ZodObject schema */
export type ZObj<T extends z.ZodRawShape = any> = z.ZodObject<T, any, any, any, any>;

/** Convenience type for optional z.ZodObject schema */
export type ZObjOpt<T extends z.ZodRawShape = any> = ZObj<T> | void;

export type CalcValues = Record<string, any>;
export type CalcValuesOpt = CalcValues | void;

export type FieldConfigs<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends keyof UiValues<TFs>
> = { [FieldKey in FcKeys]: DefineFieldConfig<TFs, TEs, TCv, FieldKey> };

export type FieldConfigsOpt<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FcKeys extends keyof UiValues<TFs> = keyof UiValues<TFs>
> = FieldConfigs<TFs, TEs, TCv, FcKeys> | void;

/** Root Configuration Definition type
 * This is a "phantom" type, implemented to:
 * - Reduce type-coupling/improve flexibility
 * - Facilitate deriving other types
 */
// export type CfgMeta<
//   TFs extends ZObj = ZObj,
//   TEs extends ZObj = ZObj,
//   TCv extends CalcValues = CalcValues
// > = {
//   _fs: TFs;
//   _es?: TEs;
//   _cv?: TCv;
// };
// export type MetaToCfgDef<M extends CfgMeta<any, any, any>> = ConfigDef<
//   M["_fs"],
//   M["_es"] extends ZObj ? M["_es"] : never,
//   M["_cv"] extends CalcValues ? M["_cv"] : never
// >;
// export type MetaToCfgInternal<M extends CfgMeta<any, any, any>> = ConfigInternal<
//   M["_fs"],
//   M["_es"] extends ZObj ? M["_es"] : never,
//   M["_cv"] extends CalcValues ? M["_cv"] : never
// >;
