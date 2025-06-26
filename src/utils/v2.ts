import { z } from "zod";
//
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import { buildDefaultSchema } from "../core/utils";

type CatchFieldSchema<TField extends z.ZodTypeAny> = TField extends z.ZodCatch<infer _ICatch>
  ? TField
  : // If no catch, wrap in a catch
    z.ZodCatch<
      TField extends z.ZodDefault<infer _IDefault>
        ? TField
        : TField extends z.ZodNullable<infer _INullable>
        ? TField
        : // If not nullable, wrap in a nullable
          z.ZodNullable<TField>
    >;
type CatchSchemaShape<TFs extends ZObj> = {
  [FieldKey in keyof TFs["shape"]]: CatchFieldSchema<TFs["shape"][FieldKey]>;
};
type UiFormSchema<TFs extends ZObj> = z.ZodObject<CatchSchemaShape<TFs>>;
type AppliedFieldOutput<TFs extends ZObj> = z.output<UiFormSchema<TFs>>;
type UiValues<T extends ZObj = ZObj> = AppliedFieldOutput<T>;
type ExtValues<TEs extends ZObjOpt = ZObjOpt> = TEs extends ZObj
  ? UiValues<NonNullable<TEs>>
  : void;

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
type CvCbDefinition<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = (
  values: CvCbParams<TFs, TEs>
) => TCv;
type ConfigExternal<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = {
  schema: TFs;
} & (([TEs] extends [void]
  ? { externalSchema?: undefined }
  : { externalSchema: NonNullable<TEs> }) &
  ([TCv] extends [void]
    ? { calcValuesCallback?: undefined }
    : { calcValuesCallback: CvCbDefinition<TFs, TEs, TCv> }));

type ConfigDef<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: CvCbDefinition<TFs, TEs, TCv>;
};
const buildConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt = void,
  TCv extends CalcValuesOpt = void
>(
  config: ConfigDef<TFs, TEs, TCv>
) => {
  return config as unknown as ConfigExternal<TFs, TEs, TCv>;
};

const newCfg1 = buildConfig({
  schema: z.object({ name: z.string(), amount: z.number() }),
  externalSchema: z.object({ alias: z.string(), loginNonce: z.number() }),
  calcValuesCallback: (values) => {
    values.form.name;
    return { testing: "" };
  },
});

newCfg1.schema;
newCfg1.externalSchema;
const calcValues1 = newCfg1.calcValuesCallback({
  form: { amount: null, name: null },
  externalValues: { alias: null, loginNonce: null },
});
const cv1Testing: string = calcValues1.testing;

const useInitSchemas = <C extends ConfigDef<any, any, any>, TFs extends ZObj = C["schema"]>(
  config: C
): {
  baseSchema: TFs;
  baseUserInputSchema: UiFormSchema<TFs>;
} => {
  const formSchema = config.schema;
  const baseSchema: TFs = formSchema instanceof z.ZodEffects ? formSchema.innerType() : formSchema;
  const baseUserInputSchema: UiFormSchema<TFs> = buildDefaultSchema(baseSchema);

  return { baseSchema, baseUserInputSchema };
};

const initSchemas = useInitSchemas(newCfg1);
initSchemas.baseUserInputSchema.parse({}) satisfies UiValues<typeof newCfg1.schema>;
