import type {
  CfgDefMeta,
  ConfigDefinition,
  DefineConfigFields,
  ConfigFieldsOpt,
  CvCbOpt,
  ZObj,
  ZObjOpt,
} from "@utils/index";
import type { FormSchema } from "./formSchema";
import type { CalcValuesCallback } from "./calcValuesCallback";
import type { ExternalSchema } from "./externalSchema";

const buildFieldConfigs = <TFs extends ZObj, TEs extends ZObjOpt, TCvCb extends CvCbOpt<TFs, TEs>>(
  input: ConfigFieldsOpt<TFs, TEs, TCvCb>
): DefineConfigFields<TFs, TEs, TCvCb> => {
  const configFields = {};
  return configFields;
};

const fieldConfigs = buildFieldConfigs();

export const test = {
  arr: {},
  name: {
    changeEvent: ({ form, external, calculated }) => {
      return {};
    },
    registerOn: ({ form, external, calculated }) => {
      return true;
    },
    rules: ({ form, external, calculated }) => {},
  },
} satisfies DefineConfigFields<FormSchema, ExternalSchema, CalcValuesCallback>;

export type FieldConfigs = typeof fieldConfigs;
export type TestCfgDef = CfgDefMeta<FormSchema, ExternalSchema, CalcValuesCallback, FieldConfigs>;
