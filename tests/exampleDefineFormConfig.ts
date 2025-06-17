import { z } from "zod";
// local
import { defineFormConfig } from "@configDsl/index";
import { zDayjs } from "@utils/zod";
import type { ZEvSchema, ZFormSchema, ZObj } from "@utils/schemaTypes";
import type { EvOut, FormOut } from "@utils/formOutputTypes";
import type { Nullish } from "@utils/utilityTypes";
import type { CvCb, CvCbFromCv } from "@utils/formConfigTypes";

type DefCalcValues<
  TFormSchema extends ZFormSchema = ZFormSchema,
  TCv = any,
  TEvSchema extends ZEvSchema = ZEvSchema
> = (form: FormOut<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;

const TestObj = z.object({ name: z.string(), date: zDayjs, num: z.number() });

export const formSchema = z.object({
  name: z.string(),
  date: zDayjs,
  num: z.number(),
  obj: TestObj,
  arr: z.array(TestObj),
}) satisfies ZFormSchema;

export const externalSchema = z.object({
  userId: z.string(),
  dtLogin: zDayjs,
  points: z.number(),
  company: TestObj,
  connections: z.array(TestObj),
}) satisfies ZEvSchema;

const defCalcValues = ((fields, ext) => {
  const definedOutsideReturn =
    (fields.name ?? "null-fields.name") + (ext?.userId ?? "null-ext.userId");

  return {
    definedOutsideReturn,
    definedWithinReturn: (fields.num ?? -1) + (ext?.points ?? -10),
  };
}) satisfies DefCalcValues<TestFormSchema, unknown, TestExternalSchema>;

const testFormConfig = defineFormConfig({
  fields: {
    name: {
      changeEvent: ({ fields, external, calculated }) => {
        return {};
      },
      registerOn: ({ fields, external, calculated }) => {
        return true;
      },
      rules: ({ fields, external, calculated }) => {},
    },
  },
  formSchema,
  calcValues: defCalcValues,
  externalSchema,
});
const testFormConfigOutput = testFormConfig({});

// # Extracted types:
// Extracted types: config inputs
type TestFormSchema = typeof formSchema;
type TestExternalSchema = typeof externalSchema;
type TestCalculatedValues = typeof defCalcValues;
type TestForm = FormOut<TestFormSchema>;
type TestCv = ReturnType<TestCalculatedValues>;
type TestEv = EvOut<TestExternalSchema>;

// Extracted types: config outputs
type TestReturn = ReturnType<typeof testFormConfig>;
type InferredFieldConfigs = ReturnType<typeof testFormConfig>["fields"];
type InferredCv = ReturnType<typeof testFormConfig>["calcValues"];
const calcValuesCallback: CvCb<TestForm, TestCv, TestEv> =
  testFormConfigOutput.calcValues satisfies CvCbFromCv<TestCv>;

const asdf = calcValuesCallback({} as TestForm, {} as TestEv);

type InferredEv = ReturnType<typeof testFormConfig>["calcValues"];

// Type-check tests: config variables
{
  const baseFormSchema: ZFormSchema = formSchema;
  const baseExternalSchema: ZEvSchema = externalSchema;
  const defCalcValues = ((fields: TestForm, ext: TestEv) => {
    const definedOutsideReturn =
      (fields.name ?? "null-fields.name") + (ext?.userId ?? "null-ext.userId");

    return {
      definedOutsideReturn,
      definedWithinReturn: (fields.num ?? -1) + (ext?.points ?? -10),
    };
  }) satisfies DefCalcValues<TestFormSchema, unknown, TestExternalSchema>;
}
// Type-check tests: root level of config output
{
  const fields: ZFormSchema = testFormConfigOutput.fields;
}

testFormConfigOutput.fields.name.changeEvent; // this should be available
testFormConfigOutput.fields.date.changeEvent; // this should throw a type error, because the `changeEvent` for field `date` is not defined
testFormConfigOutput.externalValues; // this should throw a type error, because the `changeEvent` for field `date` is not defined
