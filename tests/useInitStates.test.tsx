import type { FC } from "react";
import { z } from "zod";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
// local
import useForm from "@core/index";
import { zDayjs } from "@utils/zod";

const schema = z.object({ fullName: z.string(), phone: z.string(), dob: zDayjs });
const externalSchema = z.object({ email: z.string().email(), amount: z.number() });

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
    externalValues: { amount: null },
    fieldConfigs: {
      // fullName: "",
      dob: {
        changeEvent: ({ form, external, calculated }) => {
          // Type error for `calculated`
          /**
           * Property 'calculated' does not exist on type 'FieldConfigValueProp<ZodObject<{ fullName: ZodString; phone: ZodString; dob: ZodEffects<ZodType<Dayjs, ZodTypeDef, Dayjs>, Dayjs, unknown>; }, "strip", ZodTypeAny, { ...; }, { ...; }>, ZodObject<...>, never>'.ts(2339)
(parameter) calculated: any
           */
          form.fullName;
          external.amount;
          calculated.hai; // this shouldnt be `any`

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
