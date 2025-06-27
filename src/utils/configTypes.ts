import type { FormConfigFieldsBase } from "@utils/fieldConfigTypes";
import type { CalcValues, CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

export type CalcValuesProp<TCv extends CalcValuesOpt> = [TCv] extends [void]
  ? // TCv is void
    {}
  : [void] extends [TCv]
  ? // TCv might be void
    { calculated?: TCv }
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

export type CvCbParams<TFs extends ZObj, TEs extends ZObjOpt> = {
  form: UiValues<TFs>;
} & ExternalValuesProp<TEs>;

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
  FcKeys extends keyof UiValues<TFs>
> = {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: Partial<ExtValues<TEs>>;
  fieldConfigs?: FormConfigFieldsBase<TFs, TEs, TCv, FcKeys>;
};

export type ConfigInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = ZObj,
  TCv extends CalcValuesOpt = CalcValues,
  FcKeys extends keyof UiValues<TFs> = keyof UiValues<TFs>
> = ConfigDef<
  TFs,
  TEs extends ZObj ? TEs : ZObj,
  TCv extends CalcValues ? TCv : CalcValues,
  FcKeys extends keyof UiValues<TFs> ? FcKeys : keyof UiValues<TFs>
> & {
  calcValuesCallback?: CvCbInternal;
};
