import type { FC } from "react";
import { z } from "zod";
// local
import useForm from "@core/index";
import { zDayjs } from "@utils/zod";
import type { Dayjs } from "dayjs";
import type { CvCbDefinition } from "@utils/configTypes";
import dayjs from "dayjs";

const schema = z.object({ fullName: z.string(), phone: z.string(), dob: zDayjs });
const externalSchema = z.object({ email: z.string().email(), amount: z.number() });
type Cvcb<T extends Record<string, any> = Record<string, any>> = CvCbDefinition<
  typeof schema,
  typeof externalSchema,
  T
>;

const TestComponent: FC = () => {
  const formState = useForm({
    schema,
    externalSchema,
    calcValuesCallback: ({ form, externalValues }) => {
      form.dob satisfies Dayjs | null; // CORRECT
      form.fullName satisfies string | null; // CORRECT
      form.phone satisfies string | null; // CORRECT
      externalValues.amount satisfies number | null; // CORRECT: (property) amount: number | null
      externalValues.email satisfies string | null; // CORRECT: (property) email: string | null

      return { hai: "asdf" };
    },
    defaults: { dob: dayjs(), fullName: "" },
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

  uiSchema.parse({}).dob;
  uiSchema.parse({}).fullName;
  uiSchema.parse({}).phone;
  evSchema.parse({}).amount; // `evSchema` SHOULD NOT BE PARTIAL IF `externalSchema` IS DEFINED
  evSchema.parse({}).email; // `evSchema` SHOULD NOT BE PARTIAL IF `externalSchema` IS DEFINED

  form.dob;
  configValues.form.dob;
  configValues.external.email;
  configValues.calculated.hai;

  return <div></div>;
};
