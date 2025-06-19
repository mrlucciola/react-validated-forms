import type { ConfigFieldsOpt, CvCbOpt, ZObj, ZObjOpt } from "@utils/index";

/**
 * What the schema author writes once, usually in a separate file.
 * No runtime data here – just the recipe.
 */
export type FormConfigDefinition<
  TFs extends ZObj, // the form validation schema
  TEs extends ZObjOpt, // external-values schema (optional)
  TCvCb extends CvCbOpt<TFs, TEs>, // derived-values cb (optional)
  TFc extends ConfigFieldsOpt<TFs, TEs, TCvCb>
> = {
  formSchema: TFs;
  fieldConfigs?: TFc;
  calcValuesCallback?: TCvCb;
  externalSchema?: TEs;
};

export type AnyCfgDef<
  TFs extends ZObj = ZObj,
  TEs extends ZObjOpt = void,
  TCvCb extends CvCbOpt<TFs, TEs> = void,
  TFc extends ConfigFieldsOpt<TFs, TEs, TCvCb> = void
> = FormConfigDefinition<TFs, TEs, TCvCb, TFc>;
