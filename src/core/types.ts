import type { z } from "zod";
import type { FieldProps } from "@core/getters/getFieldProps";
import type { SchemaParseErrors } from "@core/getters/interfaces";
import type {
  AnyCfgMeta,
  CfgCvCb,
  CfgDefaults,
  CfgDefMeta,
  CfgEs,
  CfgFc,
  CfgFs,
  ConfigFieldsOpt,
  CvCbOpt,
  ExtValues,
  FormConfigValues,
  FsUiKeys,
  Nullish,
  SetState,
  Tighten,
  UiFormSchema,
  UiValues,
  ZObj,
  ZObjOpt,
} from "@utils/index";

export type UseFormProps<C extends AnyCfgMeta> = {
  defaults?: CfgDefaults<C>;
  schema: CfgFs<C>;
  calcValues?: CfgCvCb<C>;
  fieldConfigs?: CfgFc<C>;
  externalSchema?: CfgEs<C>;
  externalValues?: Partial<ExtValues<CfgEs<C>>>;
};

export type UseFormState<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CvCbOpt<TFs, TEs>,
  TFc extends ConfigFieldsOpt<TFs, TEs, TCv>
> = {
  /* ——— reactive state ——— */
  form: UiValues<TFs>;
  setForm: SetState<UiValues<TFs>>;
  setField: <K extends FsUiKeys<TFs>>(key: K, value: UiValues<TFs>[K] | null) => void;

  /* ——— validation results ——— */
  validation: SchemaSpaReturn<TFs>;
  errors: SchemaParseErrors<TFs>;
  isValid: boolean;
  isDirty: boolean;
  dirtyFields: keyof UiValues<TFs>[];

  /* ——— helpers ——— */
  resetToDefault: (defaults?: Nullish<UiValues<TFs>> | null, overwrite?: boolean) => void;

  getFieldProps: <K extends FsUiKeys<TFs>>() => FieldProps<TFs, K>;

  /* ——— static artefacts ——— */
  schema: TFs; // official schema
  userInputSchema: UiFormSchema<TFs>; // “catch” schema
  config: FormConfigValues<AnyCfgMeta<TFs, TEs, TCv, TFc>>;

  /* ——— resolved config (optional parts omitted if unused) ——— */
} & ResolvedConfigInstance<AnyCfgMeta<TFs, TEs, TCv, TFc>>;

/** Convenience-type to correct issues in zod impl */
export type SchemaSpaReturn<TSchema extends ZObj> = z.SafeParseReturnType<
  z.input<TSchema>,
  z.output<TSchema>
>;

/** Shape of config-instance Runtime */
export type ResolvedConfigInstance<C extends AnyCfgMeta<ZObj, any, any, any>> = Tighten<{
  externalValues?: ExtValues<CfgEs<C>>;
  calcValuesCallback?: CfgCvCb<C>;
  fieldConfigs?: CfgFc<C>;
}>;
