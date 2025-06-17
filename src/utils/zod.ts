import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

/** Convenience utility for use in `.rules()` - `useValidatedForm` */
export const zAddRulesIssue = (
  refinementArgs: [z.RefinementCtx, string | number | symbol, ...any],
  /** Custom error message */
  message?: string,
  config?: Omit<z.IssueData, "message" | "path" | "code"> & Partial<Pick<z.IssueData, "code">>
) => {
  const [ctx, pathInput] = refinementArgs;
  const { code, ...appliedConfig } = config ?? { code: z.ZodIssueCode.custom };
  const path = typeof pathInput === "symbol" ? pathInput.toString() : pathInput;

  const appliedMsg = message ?? `This field is required`;
  // @ts-ignore - @note There seems to be a bug in the type for `code` property
  const newIssue: z.IssueData = { ...appliedConfig, message: appliedMsg, path: [path], code };

  ctx.addIssue(newIssue);
};

export const zDayjsInstance = z.instanceof(dayjs as unknown as typeof Dayjs);
export const zDayjs = z.preprocess((val) => {
  const toDayjs = dayjs(val as any);
  return toDayjs.isValid() ? toDayjs : null;
}, zDayjsInstance);

export const zNumeric = z.union([z.number(), z.string()]).pipe(z.coerce.number());
export type Numeric = `${number}` | number;

export const zUrl = z.string().url();
export type zUrl = z.infer<typeof zUrl>;
