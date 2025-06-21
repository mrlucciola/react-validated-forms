// ConfigDefinition<TFs, TCvCb, TEs>;

import type { ConfigDefinition, GetConfigDefinition } from "@utils/index";
import { formSchema, type FormSchema } from "./testVars/formSchema";
import { externalSchema, type ExternalSchema } from "./testVars/externalSchema";
import { type CalcValuesCallback, calcValuesCallback } from "./testVars/calcValuesCallback";
import { fieldConfigs } from "./testVars/fieldConfigs";
import { defineFormConfig } from "@configDsl/index";

// Error on `ExternalSchema` generic param
type CfgDef1 = GetConfigDefinition<FormSchema, ExternalSchema, CalcValuesCallback>;
const formConfigDefinition1: CfgDef1 = {
  formSchema,
  fieldConfigs,
  calcValuesCallback,
  externalSchema,
} satisfies CfgDef1;
const formConfigFactory1 = defineFormConfig(formConfigDefinition1);
const asdf1 = formConfigFactory1(); // props within asdf1 are not resolved/all partial, but they should be
asdf1.calcValuesCallback; // this isn't typed accurately - this is `void | undefined`

type CfgDef2 = Parameters<typeof defineFormConfig>[0];
const formConfigDefinition2: CfgDef2 = {
  formSchema,
  fieldConfigs,
  calcValuesCallback,
  externalSchema,
} satisfies CfgDef2;
const formConfigFactory2 = defineFormConfig(formConfigDefinition2);
const asdf2 = formConfigFactory2(); // props within asdf2 are not resolved/all partial, but they should be
asdf2.calcValuesCallback; // this isn't typed accurately - this is `any`

/**

defineFormConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
>(formConfigDefinition: ConfigDefinition<TFs, TCvCb, TEs>) => {};
*/
