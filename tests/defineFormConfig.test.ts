// ConfigDefinition<TFs, TCvCb, TEs>;

import type { ConfigDefinition } from "@utils/types";
import { formSchema, type FormSchema } from "./testVars/formSchema";
import { externalSchema, type ExternalSchema } from "./testVars/externalSchema";
import { type CalcValuesCallback, calcValuesCallback } from "./testVars/calcValuesCallback";

const formConfigDefinition: ConfigDefinition<FormSchema, CalcValuesCallback, ExternalSchema> = {
  formSchema,
  fields: { arr: { fields: {} } },
  calcValuesCallback,
  externalSchema,
} satisfies ConfigDefinition<FormSchema, CalcValuesCallback, ExternalSchema>;
/** */

/**

defineFormConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
>(formConfigDefinition: ConfigDefinition<TFs, TCvCb, TEs>) => {};
*/
