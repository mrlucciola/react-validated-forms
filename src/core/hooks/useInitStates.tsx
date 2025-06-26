import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isEqual } from "lodash";
// utils
import useResetToDefault from "../setters/useResetToDefault";
// interfaces
import type { AnyCfgDef, AnyCfgMeta } from "@utils/rootTypes";
import type { UiSchema } from "@utils/schemaTypes";
import type { UiValues } from "@utils/valueTypes";
// DEPRECATED IMPORTS

const useInitStates = <C extends AnyCfgDef, TFs extends C["schema"] = C["schema"]>(
  uiSchema: UiSchema<TFs>,
  config: C
) => {
  config.defaults;
  const defaults = {} as UiValues<TFs>; // config.defaults;
  /** Used for dependency array updates
   * - Keeps a stable reference for dependency arrays;
   * - BUT runs JSON.stringify every rerender;
   */
  const defaultsRef = useMemo(() => JSON.stringify(defaults ?? {}), [defaults]);
  const parsedDefaults = useMemo(() => uiSchema.parse(defaults ?? {}), [defaultsRef]);
  const refFormDefaults = useRef(parsedDefaults);

  // Form state + setter (see `updateForm` for public setter for `form` state)
  const [form, setForm] = useState<UiValues<TFs>>(parsedDefaults);
  // References for 'dirty' values
  type DirtyMapKeys = keyof UiValues<TFs>;
  type DirtyMap = Record<DirtyMapKeys, boolean>;
  const dirtyMap = useRef<DirtyMap>({} as DirtyMap);
  const markDirty = useCallback(<K extends DirtyMapKeys>(key: K, v: UiValues<TFs>[K]) => {
    dirtyMap.current[key] = !isEqual(v, refFormDefaults.current[key]);
  }, []);
  /** Public setter for `form` state. Maintains 'dirty'/'clean' state for form-fields. */
  const updateForm = useCallback(
    <K extends keyof UiValues<TFs>>(
      key: K,
      val: UiValues<TFs>[K] | ((prev: UiValues<TFs>[K]) => UiValues<TFs>[K])
    ) => {
      setForm((prev) => {
        // @note Not a huge fan of this conditional - this is an edge-case, however
        const next = typeof val === "function" ? (val as any)(prev[key]) : val;
        const merged = { ...prev, [key]: next };
        markDirty(key, next);
        return merged;
      });
    },
    []
  );

  /** Utility: reset form-fields to the default values/initial form state */
  const resetToDefault = useResetToDefault(uiSchema, setForm);

  /** When `defaultValues` is updated (i.e. from request), set those fields on the `form` state */
  useEffect(() => {
    setForm((prev) => {
      const merged: UiValues<TFs> = { ...prev };
      let changed = false;

      for (const k in parsedDefaults) {
        /** Merge only if user never touched that field */
        if (!dirtyMap.current[k as keyof UiValues<TFs>]) {
          const defVal: UiValues<TFs>[typeof k] = parsedDefaults[k];
          if (!isEqual(merged[k], defVal)) {
            // @ts-ignore
            merged[k] = defVal;
            changed = true;
          }
        }
      }
      if (changed) return merged;
      return prev;
    });
    refFormDefaults.current = parsedDefaults; // update baseline
  }, [parsedDefaults]);

  // Computed Values
  /** User-modified fields - form-fields which differ from the default values */
  const dirtyFields = useMemo(
    () =>
      Object.keys(dirtyMap.current).filter(
        (k) => dirtyMap.current[k as DirtyMapKeys]
      ) as DirtyMapKeys[],
    [form] // updates only when form changes
  );
  /** Is form modified - one or more form-fields differ from default values */
  const isDirty = dirtyFields.length > 0;

  return {
    // State + setters
    form,
    setForm,
    updateForm,

    // Utils
    resetToDefault,

    // Computed Values
    markDirty,
    dirtyFields,
    isDirty,
  };
};

export default useInitStates;
