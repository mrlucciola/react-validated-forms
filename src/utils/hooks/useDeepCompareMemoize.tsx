import { isEqual } from "lodash";
import { useRef } from "react";

const useDeepCompareMemoize = <T,>(value: T): T => {
  const ref = useRef(value);
  if (!isEqual(ref.current, value)) ref.current = value;
  return ref.current;
};

export default useDeepCompareMemoize;
