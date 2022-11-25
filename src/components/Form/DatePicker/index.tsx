import moment, { Moment } from "moment";
import { useEffect } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import DatePicker, {
  CustomDatePickerProps,
} from "src/components/commons/DatePicker";
import { boolean } from "yup";

type Props<T extends FieldValues> = CustomDatePickerProps &
  UseControllerProps<T>;

const RHFDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const {
    field: { value, ...restField },
    fieldState: { error },
  } = useController(props);

  const handleDatePickerChange = (value: Moment | null, dateString: string) => {
    restField.onChange(dateString);
  };

  useEffect(() => {
    if (!Boolean(value)) {
      restField.onChange(moment(new Date()).format(props.format));
    }
  }, [value]);

  return (
    <DatePicker
      allowClear={false}
      error={error}
      {...props}
      {...restField}
      value={value !== "" ? moment(value) : moment(new Date())}
      onChange={handleDatePickerChange}
    />
  );
};

export default RHFDatePicker;
