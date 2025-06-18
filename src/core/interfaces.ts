import type { z } from "zod";
// interfaces
import type { ZObj } from "@utils/index";

/** The error-object type from an object schema's `safeParse`. */
export type SchemaParseErrors<TSchema extends ZObj> = z.typeToFlattenedError<
  z.input<TSchema>,
  string | undefined
>["fieldErrors"];

/** Convenience-type to correct issues in zod impl */
export type SchemaSpaReturn<TSchema extends ZObj> = z.SafeParseReturnType<
  z.input<TSchema>,
  z.output<TSchema>
>;
