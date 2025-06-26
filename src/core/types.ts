import type { z } from "zod";
import type { FieldProps } from "@core/getters/getFieldProps";
import type { SchemaParseErrors } from "@core/getters/interfaces";
import type { Resolved } from "@utils/utilityTypes";
import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { Nullish, SetState } from "@utils/utilityTypes";
import type { ResolveConfigValues } from "@external/configValuesTypes";
// DEPRECATED IMPORTS
import type { CvCbOpt } from "@utils/deprec/cvCbTypes";
import type { ConfigFieldsOpt } from "@utils/deprec/formFieldConfigs";
import type { ExtValues, UiValues } from "@utils/deprec/formOutputTypes";
import type { FsUiKeys } from "@utils/deprec/derived";
import type { UiSchema } from "@utils/deprec/fxnTypes";
import type { AnyCfgMetaDEPREC, CfgCvCb, CfgEs, CfgFc } from "@utils/deprec/formConfigDefinition";

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
  userInputSchema: UiSchema<TFs>; // “catch” schema
  config: ResolveConfigValues<AnyCfgMetaDEPREC<TFs, TEs, TCv, TFc>>;

  /* ——— resolved config (optional parts omitted if unused) ——— */
} & ResolvedConfigInstance<AnyCfgMetaDEPREC<TFs, TEs, TCv, TFc>>;

/** Convenience-type to correct issues in zod impl */
export type SchemaSpaReturn<TSchema extends ZObj> = z.SafeParseReturnType<
  z.input<TSchema>,
  z.output<TSchema>
>;

/** Shape of config-instance Runtime */
export type ResolvedConfigInstance<C extends AnyCfgMetaDEPREC<ZObj, any, any, any>> = Resolved<{
  externalValues?: ExtValues<CfgEs<C>>;
  calcValuesCallback?: CfgCvCb<C>;
  fieldConfigs?: CfgFc<C>;
}>;
