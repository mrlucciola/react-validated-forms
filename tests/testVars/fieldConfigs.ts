import type {
  CfgDefMeta,
  ConfigDefinition,
  FormConfigFieldsInternal,
  PublicConfigFields,
  PublicFormConfigFields,
} from "@utils/index";
import type { FormSchema } from "./formSchema";
import type { CalcValuesCallback } from "./calcValuesCallback";
import type { ExternalSchema } from "./externalSchema";

type asdf = CfgDefMeta<FormSchema, ExternalSchema, CalcValuesCallback>;
const newFieldConfigs = <
  T extends FormConfigFieldsInternal<asdf>,
  R extends PublicConfigFields<T> = PublicConfigFields<T> // ① real type the function needs
>(
  input: T
) => input as R;

export const fieldConfigs = newFieldConfigs({
  arr: {},
  name: {
    changeEvent: ({ form, external, calculated }) => {
      return {};
    },
    registerOn: ({ form, external, calculated }) => {
      return true;
    },
    rules: ({ form, external, calculated }) => {},
  },
}) satisfies FormConfigFieldsInternal<asdf>;
fieldConfigs; // all fields are partial. two should be required (arr, name) and the rest should be omitted
export type FieldConfigs = PublicConfigFields<typeof fieldConfigs>;
