import type { z } from "zod";
import type { FieldProps } from "@core/getters/getFieldProps";
import type { SchemaParseErrors } from "@core/getters/interfaces";
import type {
  AnyCfgMeta,
  CfgCvCb,
  CfgDefMeta,
  CfgEs,
  CfgFc,
  CfgFs,
  ConfigFieldsOpt,
  CvCbOpt,
  ExtValues,
  InferFormKeys,
  Nullish,
  SetState,
  Tighten,
  UiFormSchema,
  UiValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";

type MaybeSchema<C extends CfgDefMeta> = CfgEs<C> extends ZObj ? CfgEs<C> : never;

export type UseFormPropsExt<C extends CfgDefMeta> = {
  externalSchema?: MaybeSchema<C>;
  externalValues?: MaybeSchema<C> extends never ? never : Partial<ExtValues<CfgEs<C>>>;
};

export type UseFormProps<C extends CfgDefMeta> = {
  schema: CfgFs<C>;
  defaults?: CfgDefaults<C>;
  fieldConfigs?: CfgFc<C>;
  calcValues?: CfgCvCb<C>;
} & UseFormPropsExt<C>;

export type UseFormState<
  TFs extends ZObj,
  TEs extends ZObjOpt | void = void,
  TCv extends CvCbOpt<TFs, TEs> | void = void,
  TFc extends ConfigFieldsOpt<TFs, TEs, TCv> | void = void
> = {
  /* ——— reactive state ——— */
  form: UiValues<TFs>;
  setForm: SetState<UiValues<TFs>>;
  setField: <K extends InferFormKeys<TFs>>(key: K, value: UiValues<TFs>[K] | null) => void;

  /* ——— validation results ——— */
  validation: SchemaSpaReturn<TFs>;
  errors: SchemaParseErrors<TFs>;
  isValid: boolean;
  isDirty: boolean;

  /* ——— helpers ——— */
  resetToDefault: (defaults?: Nullish<z.input<TFs>> | null, overwriteExisting?: boolean) => void;

  getFieldProps: <K extends InferFormKeys<TFs>>() => FieldProps<TFs, K>;

  /* ——— static artefacts ——— */
  schema: TFs; // official schema
  baseUserInputSchema: UiFormSchema<TFs>; // “catch” schema

  /* ——— resolved config (optional parts omitted if unused) ——— */
} & ResolvedConfig<CfgDefMeta<TFs, TEs, TCv, TFc>>;

/** Convenience-type to correct issues in zod impl */
export type SchemaSpaReturn<TSchema extends ZObj> = z.SafeParseReturnType<
  z.input<TSchema>,
  z.output<TSchema>
>;

export type ResolvedConfig<C extends AnyCfgMeta> = Tighten<{
  externalValues?: ExtValues<CfgEs<C>>;
  calcValuesCallback?: CfgCvCb<C>;
  fieldConfigs?: CfgFc<C>;
}>;

/** Derive `defaults` type from the config-definition type (passed into `useForm`) */
export type CfgDefaults<C extends AnyCfgMeta> = Partial<CfgUiValues<C>>;

/** Derive `defaults` type from the `formSchema`/`TFs` type */
export type FsDefaults<TFs extends ZObj> = Partial<UiValues<TFs>>;

/** Derive `uiValues`/`formValues` type from the config-definition type (passed into `useForm`) */
export type CfgUiValues<C extends AnyCfgMeta> = UiValues<CfgFs<C>>;
