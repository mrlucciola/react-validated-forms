import type { ZFormSchema } from "@utils/index";
import type { FormConfig } from "@configDsl/interfaces";

/** @todo add description */
const getFormConfigField = <TBase extends ZFormSchema>(
  config: FormConfig<TBase> | undefined,
  fieldKey: keyof TBase
  /** Error: `config?.fields[fieldKey]`
   * Type 'keyof TBase' cannot be used to index type 'Partial<FormConfigFields<{ [k in keyof addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TBase>>, any>]: addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TBase>>, any>[k]; }, any, {}>>'.ts(2536)
   * - (property) fields: Partial<FormConfigFields<{ [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TBase>>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<CatchSchemaShape<TBase>>, any>[k]; }, any, {}>>
   */
) => config?.fields[fieldKey];

export default getFormConfigField;
