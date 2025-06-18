import { z } from "zod";
// local
import { defineFormConfig } from "@configDsl/index";
import { zDayjs } from "@utils/zod";
import type { ZEvSchema, ZFormSchema, EvOut, UiValues, CvCb_, CvCbFromCv } from "@utils/index";

type DefCalcValues<
  TFormSchema extends ZFormSchema = ZFormSchema,
  TCv = any,
  TEvSchema extends ZEvSchema = ZEvSchema
> = (form: UiValues<TFormSchema>, ext?: EvOut<TEvSchema>) => TCv;

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
type TestForm = UiValues<TestFormSchema>;
type TestCv = ReturnType<TestCalculatedValues>;
type TestEv = EvOut<TestExternalSchema>;

// Extracted types: config outputs
type TestReturn = ReturnType<typeof testFormConfig>;
type InferredFieldConfigs = ReturnType<typeof testFormConfig>["fields"];
type InferredCv = ReturnType<typeof testFormConfig>["calcValues"];
const calcValuesCallback: CvCb_<TestForm, TestEv, TestCv> =
  testFormConfigOutput.calcValues satisfies CvCbFromCv<TestCv>;

const asdf = calcValuesCallback({} as TestForm, {} as TestEv);

type InferredEv = ReturnType<typeof testFormConfig>["calcValues"];

{
  const testExternalValues = {} as NonNullable<EvOut<TestExternalSchema>>;
  const testFxnCbInput = <TEvSchema extends ZEvSchema | unknown>(
    input?: FormConfigCbInput<TEvSchema>
  ) => {
    return input;
  };
  const testCbInput = testFxnCbInput(externalSchema); // ERROR: this should show an error - `externalSchema` is `ZEvSchema` type NOT `FormConfigCbInput<TEvSchema>`
  const testCbInputTyped = testFxnCbInput<TestExternalSchema>(testExternalValues); // no error
  const testCbInputUndefined = testFxnCbInput(undefined); // no error
  const testCbInputUndefinedTyped = testFxnCbInput<undefined>(undefined); // no error
  const testCbInputUndefined2 = testFxnCbInput(); // no error
  const testCbInputUndefined2Typed = testFxnCbInput<undefined>(); // no error
  const testCbInputUnknown = testFxnCbInput({} as unknown);
  const testCbInputUnknownTyped = testFxnCbInput<unknown>({} as unknown); // this gives error when it shouldnt
  const testCbInputUnknown2 = testFxnCbInput<unknown>();

  // Adding another layer: Function Props
  const testFxnCbProps = <TEvSchema extends ZEvSchema>(input?: FormConfigCbProps<TEvSchema>) => {
    return input;
  };
  const testCbProps = testFxnCbProps(testCbInput);
  const testCbProps2 = testFxnCbProps<TestExternalSchema>([testCbInput]);
  const testCbPropsUndefined = testFxnCbProps();
  const testCbPropsUndefined2 = testFxnCbProps<undefined>([]);
  const testCbPropsUnknown = testFxnCbProps([{} as unknown]);
  const testCbPropsUnknown2 = testFxnCbProps<unknown>({} as unknown);

  // Adding another layer: Function ReturnType
  const testFxnCbReturnType = <TFcProps extends FormConfigCbProps>(input: TFcProps) => {
    return input;
  };
  const testCbReturnType = testFxnCbReturnType((_: typeof externalSchema) => {});
  const testCbReturnTypeUndefined = testFxnCbReturnType((_: undefined) => {});
  const testCbReturnTypeUnknown = testFxnCbReturnType((_: unknown) => {});
  const testCbReturnTypeUnknown2 = testFxnCbReturnType();

  // // Adding another layer: Function definition
  // const testFxnCb = <TFcProps extends FormConfigCbProps>(input: TFcProps) => {
  //   return input;
  // };
  // const testCb = testFxnCb((_: typeof externalSchema) => {});
  // const testCbUndefined = testFxnCb((_: undefined) => {});
  // const testCbUnknown = testFxnCb((_: unknown) => {});
  // const testCbUnknown2 = testFxnCb();
}

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
