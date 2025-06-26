import type {
  CalcValues,
  CalcValuesOpt,
  FieldConfigs,
  FieldConfigsOpt,
  ZObj,
  ZObjOpt,
} from "@utils/rootTypes";
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
  TEs extends ZObj,
  TCv extends CalcValues,
  TFc extends FieldConfigs<TFs, TEs | void>
> = {
  schema: TFs;
  externalSchema?: TEs;

  /** This is typed incorrectly:
   * - The end-user (React developer) use-case is working as expected:
   *    - When defining the object in `useForm({ ... })` - types are correct, all fields and props propagate correctly;
   * - For the internal library developer (within useForm(config: ConfigDef<A, B, C>) => {}:
   *    - `config.calcValuesCallback({form, externalValues})` Is typed incorrectly - `externalValues` prop does not exist;
   */
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: Partial<ExtValues<TEs>>;
  fieldConfigs?: TFc;
};

export type ConfigInternal<
  TFs extends ZObj = ZObj,
  TEs extends ZObj | void = ZObj,
  TCv extends CalcValues | void = CalcValues,
  TFc extends FieldConfigs<ZObj, TEs> | void = FieldConfigs<ZObj, TEs>
> = ConfigDef<
  TFs,
  TEs extends ZObj ? TEs : ZObj,
  TCv extends CalcValues ? TCv : CalcValues,
  TFc extends FieldConfigs<ZObj, ZObjOpt> ? FieldConfigs<TFs, TEs> : FieldConfigs<TFs, TEs>
> & {
  calcValuesCallback?: CvCbInternal;
};
