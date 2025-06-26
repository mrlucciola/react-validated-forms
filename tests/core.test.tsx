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
  email: z.string().email(),
  amount: z.number(),
});

const formConfigFactory = defineFormConfig({
  formSchema: schema,
  externalSchema: z.object({ username: z.string(), companyId: z.number() }),

  /** In `calcValuesCallback` params: Type errors on form and ext:
   * 
'form' is declared but its value is never read.ts(6133)
Parameter 'form' implicitly has an 'any' type.ts(7006)
(parameter) form: any

'ext' is declared but its value is never read.ts(6133)
Parameter 'ext' implicitly has an 'any' type.ts(7006)
(parameter) ext: any
   */
  calcValuesCallback: (form, ext) => {
    return {};
  },
  // fieldConfigs: ... // Solve calcValuesCallback issues first
});
const TestComponent: FC = () => {
  /** Type error in formConfigFactory parameter (empty object):
"""
Argument of type '{}' is not assignable to parameter of type '{ username: string | null; companyId: number | null; }'.
  Type '{}' is missing the following properties from type '{ username: string | null; companyId: number | null; }': username, companyId ts(2345)
"""
   * ### Intended effect: 
   * Since the externalSchema becomes a "Catch" schema, missing fields are just defaulted to null when returned from useForm.
   * This should allow the user to provide any, all or no fields - i.e. the input fields should be typed as Partial.
   * The type should be: (ev?: { username?: string | null; companyId?: number | null; }) => ...
   */
  const formCfgInst = formConfigFactory({});

  /** Type error in `formCfgInst`:
"""
Argument of type 'FormConfigInstance<BuildCfg<{ formSchema: ZodObject<{ fullName: ZodString; phone: ZodString; dob: ZodEffects<ZodType<Dayjs, ZodTypeDef, Dayjs>, Dayjs, unknown>; email: ZodString; amount: ZodNumber; }, "strip", ZodTypeAny, { ...; }, { ...; }>; externalSchema: ZodObject<...>; calcValuesCallback: (form: any, ext: any) ...' is not assignable to parameter of type 'AnyCfgDef'.
  Property 'formSchema' is missing in type 'FormConfigInstance<BuildCfg<{ formSchema: ZodObject<{ fullName: ZodString; phone: ZodString; dob: ZodEffects<ZodType<Dayjs, ZodTypeDef, Dayjs>, Dayjs, unknown>; email: ZodString; amount: ZodNumber; }, "strip", ZodTypeAny, { ...; }, { ...; }>; externalSchema: ZodObject<...>; calcValuesCallback: (form: any, ext: any) ...' but required in type 'AnyCfgDef'. ts(2345)
"""
   * 
   * 
   */
  const formState = useForm(schema, undefined, formCfgInst);

  formState.form; // No fields show up. the type is just `(property) form: UiValues<TBase>`
  formState.uiSchema; // This shows the expected type however.
  return <div></div>;
};
