// interfaces
import type { CvCbOpt, FormConfigFields, ZObj, ZObjOpt } from "@utils/index";

/**
 * What the schema author writes once, usually in a separate file.
 * No runtime data here – just the recipe.
 */
export type FormConfigDefinition<
  TFs extends ZObj, // the form validation schema
  TEs extends ZObjOpt, // external-values schema (optional)
  TCvCb extends CvCbOpt<TFs, TEs> // derived-values cb (optional)
> = {
  formSchema: TFs;
  /** rename to fieldConfigs */
  fields: Partial<FormConfigFields<TFs, TEs, TCvCb>>;
  calcValuesCallback?: TCvCb;
  externalSchema?: TEs;
};

export type AnyCfgDef<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = void,
  TCvCb extends CvCbOpt<TFs, TEs> = void
> = FormConfigDefinition<TFs, TEs, TCvCb>;
