import type { CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

type ExternalValuesProp<TEs extends ZObjOpt> = [TEs] extends [void]
  ? // TEs is void
    {}
  : [void] extends [TEs]
  ? // TEs might be void
    { externalValues?: ExtValues<TEs> }
  : // TEs is present
    { externalValues: NonNullable<ExtValues<TEs>> };
type CvCbParams<TFs extends ZObj, TEs extends ZObjOpt> = {
  form: UiValues<TFs>;
} & ExternalValuesProp<TEs>;

export type CvCbInternal<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt
> = (values: { form: UiValues<TFs>; externalValues?: ExtValues<TEs> }) => TCv;

export type ConfigExternal<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = {
  schema: TFs;
} & (([TEs] extends [void]
  ? { externalSchema?: undefined }
  : { externalSchema: NonNullable<TEs> }) &
  ([TCv] extends [void]
    ? { calcValuesCallback?: undefined }
    : { calcValuesCallback: CvCbDefinition<TFs, TEs, TCv> }));

export type CvCbDefinition<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = (
  values: CvCbParams<TFs, TEs>
) => TCv;

/** This type represents the param `config` passed into `useForm`.
 * This should not be used outside of the `useForm` prop.
 */
export type ConfigDef<TFs extends ZObj, TEs extends ZObj, TCv extends CalcValues> = {
  schema: TFs;
  externalSchema?: TEs;

  /** This is typed incorrectly:
   * - The end-user (React developer) use-case is working as expected:
   *    - When defining the object in `useForm({ ... })` - types are correct, all fields and props propagate correctly;
   * - For the internal library developer (within useForm(config: ConfigDef<A, B, C>) => {}:
   *    - `config.calcValuesCallback({form, externalValues})` Is typed incorrectly - `externalValues` prop does not exist;
   */
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
};

export type ConfigInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObj = ZObj,
  TCv extends CalcValues = CalcValues
> = {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbInternal<TFs, TEs, TCv>;
};

export type InferFs<T extends ConfigDef<any, any, any>> = T extends ConfigDef<infer Fs, any, any>
  ? Fs
  : never;
export type InferEs<T extends ConfigDef<any, any, any>> = T extends ConfigDef<any, infer Es, any>
  ? Es
  : never;
export type InferCv<T extends ConfigDef<any, any, any>> = T extends ConfigDef<any, any, infer Cv>
  ? Cv
  : never;
export type InferConfig<T extends ConfigDef<any, any, any>> = ConfigInternal<
  InferFs<T>,
  InferEs<T>,
  InferCv<T>
>;
