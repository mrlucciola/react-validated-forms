import type { FC } from "react";
import { z } from "zod";
import type { Dayjs } from "dayjs";
// local
import useForm from "@core/index";
import { zDayjs } from "@utils/zod";
import { externalSchema } from "./testVars/externalSchema";
import { formSchema } from "./testVars/formSchema";
import dayjs from "dayjs";

// const schema = z.object({ fullName: z.string(), phone: z.string(), dob: zDayjs });
// const externalSchema = z.object({ email: z.string().email(), amount: z.number() });

const TestComponent: FC = () => {
  const formState = useForm({
    schema: formSchema,
    externalSchema,
    calcValuesCallback: ({ form, externalValues }) => {
      form.date satisfies Dayjs | null; // CORRECT
      form.name satisfies string | null; // CORRECT
      form.arr satisfies { name: string; date: Dayjs; num: number }[] | null; // CORRECT
      externalValues.dtLogin satisfies Dayjs | null; // CORRECT: (property) amount: number | null
      externalValues.points satisfies number | null; // CORRECT: (property) amount: number | null
      externalValues.userId satisfies string | null; // CORRECT: (property) email: string | null

      return { hai: "asdf", lo: 9 };
    },
    defaults: { date: dayjs(), name: "" },
    externalValues: { points: null },
    fieldConfigs: {
      name: {
        changeEvent: (values) => {
          values.calculated.hai;
          values.external.points;
          const { calculated, form, external } = values;
          form.name;
          external.dtLogin;
          calculated.hai;

          return { fullName: "" };
        },
      },
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

    configValues,
    validation,
    errors,
    isValid,

    uiSchema,
    evSchema,
    appliedUiSchema,
  } = formState;

  uiSchema.parse({}).date;
  uiSchema.parse({}).name;
  uiSchema.parse({}).num;
  evSchema.parse({}).company; // `evSchema` SHOULD NOT BE PARTIAL IF `externalSchema` IS DEFINED
  evSchema.parse({}).connections; // `evSchema` SHOULD NOT BE PARTIAL IF `externalSchema` IS DEFINED

  form.name;
  configValues.form.date;
  configValues.external.userId;
  configValues.calculated.hai;

  return <div></div>;
};
