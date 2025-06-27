import type { z } from "zod";
import type { ZObj } from "@utils/rootTypes";

// export type UseFormState<
//   TFs extends ZObj,
//   TEs extends ZObj,
//   TCv extends CalcValues,
//   TFc extends ConfigFieldsOpt<TFs, TEs, TCv>
// > = {
//   /* ——— reactive state ——— */
//   form: UiValues<TFs>;
//   setForm: SetState<UiValues<TFs>>;
//   setField: <K extends keyof UiValues<TFs>>(key: K, value: UiValues<TFs>[K] | null) => void;

//   /* ——— validation results ——— */
//   validation: SchemaSpaReturn<TFs>;
//   errors: SchemaParseErrors<TFs>;
//   isValid: boolean;
//   isDirty: boolean;
//   dirtyFields: keyof UiValues<TFs>[];

//   /* ——— helpers ——— */
//   resetToDefault: (defaults?: Nullish<UiValues<TFs>> | null, overwrite?: boolean) => void;

//   getFieldProps: <K extends keyof UiValues<TFs>>() => FieldProps<TFs, K>;

//   /* ——— static artefacts ——— */
//   schema: TFs; // official schema
//   userInputSchema: UiSchema<TFs>; // “catch” schema
//   config: ResolveConfigValues<AnyCfgMetaDEPREC<TFs, TEs, TCv, TFc>>;

//   /* ——— resolved config (optional parts omitted if unused) ——— */
// } & ResolvedConfigInstance<AnyCfgMetaDEPREC<TFs, TEs, TCv, TFc>>;

/** Convenience-type to correct issues in zod impl */
export type SchemaSpaReturn<TSchema extends ZObj> = z.SafeParseReturnType<
  z.input<TSchema>,
  z.output<TSchema>
>;
