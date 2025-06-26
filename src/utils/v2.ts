import { z } from "zod";
//
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import { buildDefaultSchema } from "../core/utils";
import type { ConfigDef, ConfigExternal } from "@utils/configTypes";
import type { UiValues } from "@utils/valueTypes";
import type { UiSchema } from "@utils/schemaTypes";

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
  baseUserInputSchema: UiSchema<TFs>;
} => {
  const formSchema = config.schema;
  const baseSchema: TFs = formSchema instanceof z.ZodEffects ? formSchema.innerType() : formSchema;
  const baseUserInputSchema: UiSchema<TFs> = buildDefaultSchema(baseSchema);

  return { baseSchema, baseUserInputSchema };
};

const initSchemas = useInitSchemas(newCfg1);
initSchemas.baseUserInputSchema.parse({}) satisfies UiValues<typeof newCfg1.schema>;
