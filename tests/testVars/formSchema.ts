import { z } from "zod";
import dayjs from "dayjs";
// local
import { zDayjs } from "@utils/zod";
import type { ZObj, ZObjOpt } from "@utils/rootTypes";

const TestObj = z.object({ name: z.string(), date: zDayjs, num: z.number() });

export const formSchema = z.object({
  name: z.string().catch(""),
  date: zDayjs.default(dayjs()),
  num: z.number().catch(0),
  obj: TestObj,
  arr: z.array(TestObj),
}) satisfies ZObj;
export type FormSchema = typeof formSchema;

export const formSchemaOpt: ZObjOpt = undefined satisfies ZObjOpt;
export type FormSchemaOpt = typeof formSchemaOpt;
