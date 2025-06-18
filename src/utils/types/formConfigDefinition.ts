// interfaces
import type { CvCb, FormConfigFields, ZObj } from "@utils/index";

/**
 * What the schema author writes once, usually in a separate file.
 * No runtime data here – just the recipe.
 */
export interface FormConfigDefinition<
  TFs extends ZObj, // the form validation schema
  TCvCb extends CvCb<TFs, any, any> | void, // derived-values cb (optional)
  TEs extends ZObj | void // external-values schema (optional)
> {
  formSchema: TFs;
  fields: Partial<FormConfigFields<TFs, TCvCb, TEs>>;
  calcValuesCallback?: TCvCb;
  externalSchema?: TEs;
}
