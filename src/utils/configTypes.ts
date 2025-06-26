import type { CalcValues, CalcValuesOpt, FieldConfigs, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

export type CalcValuesProp<TCv extends CalcValuesOpt> = [TCv] extends [void]
  ? // TCv is void
    {}
  : // TCv is present
    { calculated: NonNullable<TCv> };

export type ExternalValuesProp2<TEs extends ZObjOpt> = [TEs] extends [void]
  ? // TEs is void
    {}
  : [void] extends [TEs]
  ? // TEs might be void
    { external?: ExtValues<TEs> }
  : // TEs is present
    { external: NonNullable<ExtValues<TEs>> };
export type ExternalValuesProp<TEs extends ZObjOpt> = [TEs] extends [void]
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
export type CvCbInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObj | void = ZObj | void,
  TCv extends CalcValues | void = CalcValues
> = (values: { form: UiValues<TFs>; externalValues?: ExtValues<TEs> }) => TCv;

/** This type represents the param `config` passed into `useForm`.
 * This should not be used outside of the `useForm` prop.
 */
export type ConfigDef<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  TFc extends FieldConfigs<
    TFs,
    TEs extends ZObj ? TEs : never,
    TCv extends CalcValues ? TCv : never
  >
> = {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: Partial<ExtValues<TEs>>;
  fieldConfigs?: TFc;
};

export type ConfigInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObj | void = ZObj,
  TCv extends CalcValues | void = CalcValues,
  TFc extends FieldConfigs<any, any, any> | void = FieldConfigs<TFs, TEs, TCv>
> = ConfigDef<
  TFs,
  TEs extends ZObj ? TEs : ZObj,
  TCv extends CalcValues ? TCv : CalcValues,
  TFc extends FieldConfigs<ZObj, ZObj | void, CalcValues | void> ? any : FieldConfigs<TFs, TEs, TCv>
> & {
  calcValuesCallback?: CvCbInternal;
};

export type Ev<TEs extends ZObjOpt> = [TEs] extends [ZObj]
  ? NonNullable<ExtValues<NonNullable<TEs>>>
  : undefined;

export type ConfigValues<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = {
  form: UiValues<TFs>;
  external: Ev<TEs>;
  calculated: TCv extends CalcValues ? TCv : undefined;
};
