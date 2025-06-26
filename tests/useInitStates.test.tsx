import type { FC } from "react";
// local
import useForm from "@core/index";
import { defineFormConfig } from "@configDsl/index";
import { z } from "zod";
import { zDayjs } from "@utils/zod";

const schema = z.object({
  fullName: z.string(),
  phone: z.string(),
  dob: zDayjs,
});
const externalSchema = z.object({
  email: z.string().email(),
  amount: z.number(),
});

const TestComponent: FC = () => {
  const formState = useForm({
    schema,
    externalSchema,
    calcValuesCallback: (values) => {
      return { hai: "asdf" };
    },
  });
  const {
    form,
    setForm,
    updateForm,
    markDirty,
    isDirty,
    dirtyFields,
    resetToDefault,
    uiSchema,
    evSchema,
    configValues,
  } = formState;
  form;
  configValues.form.dob;
  configValues.external.email;
  configValues.calculated.hai;

  formState.form; // No fields show up. the type is just `(property) form: UiValues<TBase>`
  formState.uiSchema; // This shows the expected type however.
  return <div></div>;
};
