import { z } from "zod";
// local
import { defineFormConfig } from "@configDsl/index";
import { zDayjs } from "@utils/zod";

const TestObj = z.object({ name: z.string(), date: zDayjs, num: z.number() });

const formSchema = z.object({
  name: z.string(),
  date: zDayjs,
  num: z.number(),
  obj: TestObj,
  arr: z.array(TestObj),
});

const externalSchema = z.object({
  userId: z.string(),
  dtLogin: zDayjs,
  points: z.number(),
  company: TestObj,
  connections: z.array(TestObj),
});

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
  calcValues: (fields, ext) => {
    /** Test 1: Defined as a separate value
     * @todo fix `ext!.userId` - `ext` should not be `undefined` if:
     * - `config.externalSchema` is defined.
     */
    const definedOutsideReturn =
      (fields.name ?? "null-fields.name") + (ext?.userId ?? "null-ext.userId");

    return {
      definedOutsideReturn,
      /** Test 2: Defined within the return */
      definedInReturn: (fields.num ?? -1) + (ext?.points ?? -10),
    };
  },
  externalSchema,
});
const asdf = testFormConfig();

asdf.fields.name.changeEvent; // this should be available
asdf.fields.date.changeEvent; // this should throw a type error, because the `changeEvent` for field `date` is not defined
