import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Switch, { CustomSwitchProps } from "src/components/commons/Switch";

type Props<T extends FieldValues> = CustomSwitchProps & UseControllerProps<T>;

const RHFSwitch = <T extends FieldValues>(props: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <Switch value={field.value} handleChange={field.onChange} {...props} />
  );
};

export default RHFSwitch;
