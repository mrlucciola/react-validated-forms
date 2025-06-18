import type {
  AnyCvCb,
  EvOut,
  FormConfig,
  OmitOptionalKeys,
  PartialOrOmit,
  ZEvSchema,
  ZFormSchema,
  ZObj,
} from "@utils/index";

/** See: FormConfigDefinition<TFormSchema extends ZObj, TCv extends Record<string, any>, TEvSchema extends EvSchema> = {
  formSchema: TFormSchema;
  fields: Partial<FormConfigFields<UiValues<TFormSchema>, TCv, EvOut<TEvSchema>>>; // prev: ConfigFieldsProp
  calcValuesCallback?: (form: UiValues<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;
  externalSchema?: TEvSchema;
};
 */
export type FormConfigCbArgs<TEs extends ZEvSchema | unknown> = [TEs] extends [ZObj]
  ? [externalValues: NonNullable<EvOut<NonNullable<TEs>>>]
  : [TEs] extends [undefined]
  ? []
  : [externalValues?: unknown];

////////////////////////////////////////////////////////////////////////////////

/** Atomic context slice of Form-Field-Configs */
type FieldConfigsCtx<TFs extends ZObj> = FormConfig<TFs>["fields"];
/** Atomic context slice of Calculated-Values-Callback */
type CvCbCtx<T extends AnyCvCb | undefined | unknown> = PartialOrOmit<T, { calcValuesCallback: T }>;
type ExtValues_<T extends ZEvSchema | unknown> = T extends ZEvSchema ? EvOut<T> : unknown;
/** Atomic context slice of External-Values */
type ExtValuesCtx<T extends ZEvSchema | unknown, U = ExtValues_<T>> = PartialOrOmit<
  U,
  { externalValues: U }
>;

////////////////////////////////////////////////////////////////////////////////

export type FormConfigCbReturn<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema | unknown
> = FieldConfigsCtx<TFormSchema> & CvCbCtx<TCvCb> & ExtValuesCtx<TEvSchema>;

export type FormConfigCbReturnStrict<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema
> = OmitOptionalKeys<FormConfigCbReturn<TFormSchema, TCvCb, TEvSchema>>;

////////////////////////////////////////////////////////////////////////////////

/** Generics represent original types */
export type FormConfigCb<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema | unknown
> = (...args: FormConfigCbArgs<TEvSchema>) => FormConfigCbReturn<TFormSchema, TCvCb, TEvSchema>;

export type FormConfigCbStrict<
  TFormSchema extends ZFormSchema,
  TCvCb,
  TEvSchema extends ZEvSchema
> = (
  // May need to do a ternary with `never` in props for `undefined` types
  ...args: FormConfigCbArgs<TEvSchema>
) => FormConfigCbReturnStrict<TFormSchema, TCvCb, TEvSchema>;
