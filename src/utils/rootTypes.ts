import type { z } from "zod";
//
import type { ConfigDef, ConfigInternal } from "@utils/configTypes";

/** Convenience type for z.ZodObject schema */
export type ZObj<T extends z.ZodRawShape = any> = z.ZodObject<T, any, any, any, any>;

/** Convenience type for optional z.ZodObject schema */
export type ZObjOpt<T extends z.ZodRawShape = any> = ZObj<T> | void;

export type CalcValues = Record<string, any>;
export type CalcValuesOpt = CalcValues | void;

/** Root Configuration Definition type
 * This is a "phantom" type, implemented to:
 * - Reduce type-coupling/improve flexibility
 * - Facilitate deriving other types
 */
export type CfgMeta<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = void,
  TCv extends CalcValuesOpt = void
> = {
  readonly __types?: [TFs, TEs, TCv];
};
/** Root Configuration Definition "adapter" type
 * This is a "phantom" type, implemented to:
 * - Reduce type-coupling/improve flexibility
 * - Facilitate deriving other types
 */
export type AnyCfgMeta = CfgMeta<any, any, any>;
// export type AnyCfgDef = ConfigDef<any, any, any>;
export type AnyCfgDef = {
  schema: z.ZodObject<any, any, any, any, any>;
  externalSchema?: z.ZodObject<any, any, any, any, any>;
  calcValuesCallback?: (values: {
    form: z.output<z.ZodObject<any, any, any, any, any>>;
    externalValues?: z.output<z.ZodObject<any, any, any, any, any>>;
  }) => Record<string, any>;
};

export type MetaFs<M extends AnyCfgMeta> = M extends CfgMeta<infer TFs, any, any> ? TFs : never;
export type MetaEs<M extends AnyCfgMeta> = M extends CfgMeta<any, infer TEs, any> ? TEs : void;
export type MetaCv<M extends AnyCfgMeta> = M extends CfgMeta<any, any, infer TCv> ? TCv : void;
export type AnyFs = Pick<ConfigDef<ZObj, any, any>, "schema">;
export type AnyEs = Pick<ConfigDef<any, ZObjOpt, any>, "externalSchema">;
export type AnyCvCb = Pick<ConfigDef<ZObj, any, CalcValuesOpt>, "calcValuesCallback">;
// export type AnyCv = Pick<ConfigDef<ZObj, any, CalcValuesOpt>, "calcValuesCallback">;

export type UseFormConfig<M extends CfgMeta<any, any, any>> = M extends CfgMeta<
  infer TFs,
  infer TEs,
  infer TCv
>
  ? ConfigInternal<TFs, TEs, TCv>
  : never;
