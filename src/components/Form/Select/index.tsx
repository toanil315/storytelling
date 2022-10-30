import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Select, { CustomSelectProps } from "src/components/commons/Select";

type Props<T extends FieldValues> = CustomSelectProps & UseControllerProps<T>;

const RHFSelect = <T extends FieldValues>(props: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <Select
      error={error}
      value={field.value}
      onChange={field.onChange}
      {...props}
    />
  );
};

export default RHFSelect;
