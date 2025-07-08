import type { ChangeEvent } from "react";
import type { z } from "zod";
import type dayjs from "dayjs";
// internal
import type { ZObj } from "@utils/rootTypes";

/** Convenience-type to correct issues in zod impl */
export type SchemaSpaReturn<TSchema extends ZObj> = z.SafeParseReturnType<
  z.input<TSchema>,
  z.output<TSchema>
>;

/** @deprecated change name to `OnChangeEventUnion` (from: `OnChangeEventUnionNew`); rescope to appropriate file */
export type OnChangeEventUnionNew =
  | { target?: Partial<ChangeEvent<HTMLInputElement>["target"]> }
  | (dayjs.Dayjs | null);
