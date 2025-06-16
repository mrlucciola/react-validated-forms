import { z } from "zod";

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
