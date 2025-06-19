// FormConfigDefinition<TFs, TCvCb, TEs>;

import type { FormConfigDefinition } from "@utils/types";
import {
  formSchema,
  formSchemaOpt,
  type FormSchema,
  type FormSchemaOpt,
} from "./testVars/formSchema";
import { externalSchema, type ExternalSchema } from "./testVars/externalSchema";
import { type CalcValuesCallback, calcValuesCallback } from "./testVars/calcValuesCallback";

const formConfigDefinition: FormConfigDefinition<FormSchema, CalcValuesCallback, ExternalSchema> = {
  formSchema,
  fields: { arr: { fields: {} } },
  calcValuesCallback,
  externalSchema,
} satisfies FormConfigDefinition<FormSchema, CalcValuesCallback, ExternalSchema>;
/** */

/**

defineFormConfig = <
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>
>(formConfigDefinition: FormConfigDefinition<TFs, TCvCb, TEs>) => {};
*/
