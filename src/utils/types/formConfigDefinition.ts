// interfaces
import type { CvCbOpt, FormConfigFields, ZObj, ZObjOpt } from "@utils/index";

/**
 * What the schema author writes once, usually in a separate file.
 * No runtime data here – just the recipe.
 */
export type FormConfigDefinition<
  TFs extends ZObj, // the form validation schema
  TCvCb extends CvCbOpt<TFs, TEs>, // derived-values cb (optional)
  TEs extends ZObjOpt // external-values schema (optional)
> = {
  formSchema: TFs;
  /** rename to fieldConfigs */
  fields: Partial<FormConfigFields<TFs, TCvCb, TEs>>;
  calcValuesCallback?: TCvCb;
  externalSchema?: TEs;
};

export type AnyCfgDef<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs> = CvCbOpt<TFs, TEs>
> = FormConfigDefinition<TFs, TCvCb, TEs>;
