import type { z } from "zod";
//
import useForm from "@core/index";
import type { Nullish } from "@utils/utilityTypes";
import { formSchema } from "./formSchema";
import { externalSchema } from "./externalSchema";

export const useTestFormState = (external?: Nullish<z.infer<typeof externalSchema>>) => {
  const formState = useForm(
    {
      schema: formSchema,
      externalSchema,
      calcValuesCallback: ({ form, externalValues }) => {
        return { hai: "asdf", lo: 9, someName: form.name + externalValues.company };
      },

      fieldConfigs: {
        name: {
          changeEvent: ({ calculated, form, external }) => {
            return { fullName: "", num: calculated.someName.length };
          },
        },
      },
    },
    { externalValues: external }
  );
  return formState;
};
