import type { FormConfigFields } from "@utils/index";
import type { FormSchema } from "./formSchema";
import type { CalcValuesCallback } from "./calcValuesCallback";
import type { ExternalSchema } from "./externalSchema";

const newFieldConfigs = (
  input: Partial<FormConfigFields<FormSchema, CalcValuesCallback, ExternalSchema>>
) => input;

export const fieldConfigs = newFieldConfigs({
  arr: {},
  name: {
    changeEvent: ({ fields, external, calculated }) => {
      return {};
    },
    registerOn: ({ fields, external, calculated }) => {
      return true;
    },
    rules: ({ fields, external, calculated }) => {},
  },
}) satisfies Partial<FormConfigFields<FormSchema, CalcValuesCallback, ExternalSchema>>;
