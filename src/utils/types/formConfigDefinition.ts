// interfaces
import type { CvCb, FormConfigFields, ZEvSchema, ZObj } from "@utils/index";

export type FormConfigDefinition<
  TFormSchema extends ZObj,
  TCv extends Record<string, any>,
  TEvSchema extends ZEvSchema
> = {
  /** Used only for providing types */
  formSchema: TFormSchema;
  /**
   * @deprecated rename to `fieldConfigs` (or similar name)
   * @deprecated create type for this field
   */
  fields: Partial<FormConfigFields<TFormSchema, TCv, TEvSchema>>; // prev: ConfigFieldsProp

  // Optional parameters
  // calcValuesCallback?: (form: UiValues<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;
  calcValuesCallback?: CvCb<TFormSchema, TEvSchema, TCv>;
  externalSchema?: TEvSchema;
};
