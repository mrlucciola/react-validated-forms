import type { FC } from "react";
import { useTestFormState } from "./testVars/TestFormState";

const TestComponent: FC = () => {
  const { getFieldProps, ...formState } = useTestFormState();

  return <div></div>;
};
