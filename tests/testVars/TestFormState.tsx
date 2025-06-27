import useForm from "@core/index";
import { formSchema } from "./formSchema";
import { externalSchema } from "./externalSchema";
import type { z } from "zod";
import type { Nullish } from "@utils/utilityTypes";

export const useTestFormState = (external?: Nullish<z.infer<typeof externalSchema>>) => {
  const formState = useForm({
    schema: formSchema,
    externalSchema,
    calcValuesCallback: ({ form, externalValues }) => {
      return { hai: "asdf", lo: 9, someName: form.name + externalValues.company };
    },
    externalValues: external,
    fieldConfigs: {
      name: {
        changeEvent: ({ calculated, form, external }) => {
          return { fullName: "", num: calculated.someName.length };
        },
      },
    },
  });
  return formState;
};
