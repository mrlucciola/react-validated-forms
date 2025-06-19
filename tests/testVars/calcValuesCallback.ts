import type { CvCb, CvCbOpt } from "@utils/cvCbTypes";
import type { FormSchema } from "./formSchema";
import type { ExternalSchema } from "./externalSchema";

export const calcValuesCallback: CvCb<FormSchema, ExternalSchema> = ((fields, ext) => {
  const definedOutsideReturn =
    (fields.name ?? "null-fields.name") + (ext.userId ?? "null-ext.userId");

  return {
    definedOutsideReturn,
    newDay: fields.date.add(1, "days"),
    definedWithinReturn: (fields.num ?? -1) + (ext.points ?? -10),
  };
}) satisfies CvCb<FormSchema, ExternalSchema>;
export type CalcValuesCallback = typeof calcValuesCallback;

export const calcValuesCallbackNoExt: CvCb<FormSchema> = ((fields) => {
  const definedOutsideReturn = (fields.name ?? "null-fields.name") + " - hello";

  return {
    definedOutsideReturn,
    definedWithinReturn: (fields.num ?? -1) + -20,
  };
}) satisfies CvCb<FormSchema>;
export type CalcValuesCallbackNoExt = typeof calcValuesCallbackNoExt;

export const calcValuesCallbackOpt: CvCbOpt<FormSchema, ExternalSchema> =
  undefined satisfies CvCbOpt<FormSchema, ExternalSchema>;
export type CalcValuesCallbackOpt = typeof calcValuesCallbackOpt;
