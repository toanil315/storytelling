import { DatePickerProps } from "antd";
import React from "react";
import Box from "../Box";
import ErrorMessage from "../ErrorMessage";
import { DatePickerWrapper, Label, StyledDatePicker, Wrapper } from "./styles";

export type CustomDatePickerProps = DatePickerProps & {
  error?: { message?: string };
  label?: string;
  isRequired?: boolean;
  format: string;
};

const DatePicker = ({
  label,
  isRequired,
  error,
  disabled,
  format,
  ...restProps
}: CustomDatePickerProps) => {
  return (
    <Wrapper>
      <Label>
        {label}
        {isRequired && (
          <Box as="span" color="danger">
            {" "}
            *
          </Box>
        )}
      </Label>
      <DatePickerWrapper isError={!!error} disabled={disabled}>
        <StyledDatePicker<any>
          getPopupContainer={(trigger: any) => trigger}
          format={format}
          {...restProps}
        />
      </DatePickerWrapper>
      <ErrorMessage text={error?.message ?? ""} />
    </Wrapper>
  );
};

export default DatePicker;
