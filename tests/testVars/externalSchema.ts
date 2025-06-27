import { z } from "zod";
//
import { zDayjs } from "@utils/zod";
import type { ZObjOpt } from "@utils/rootTypes";

const TestObj = z.object({ name: z.string(), date: zDayjs, num: z.number() });

export const externalSchema = z.object({
  userId: z.string(),
  dtLogin: zDayjs,
  points: z.number(),
  company: TestObj,
  connections: z.array(TestObj),
}) satisfies ZObjOpt;
export type ExternalSchema = typeof externalSchema;
