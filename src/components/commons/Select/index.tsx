import { SelectProps } from "antd";
import React from "react";
import Box from "../Box";
import ErrorMessage from "../ErrorMessage";
import { Label, SelectWrapper, StyledSelect, Wrapper } from "./styles";

export interface CustomSelectProps extends SelectProps {
  label?: string;
  isRequired?: boolean;
  handleChange?: (value: any) => void;
  error?: { message?: string };
  disabled?: boolean;
}

const Select = ({
  label,
  isRequired,
  handleChange,
  error,
  disabled = false,
  ...restProps
}: CustomSelectProps) => {
  const onChange = (value: any) => {
    handleChange && handleChange(value);
  };

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
      <SelectWrapper isError={!!error} disabled={disabled}>
        <StyledSelect<any> onChange={onChange} {...restProps} />
      </SelectWrapper>
      <ErrorMessage text={error?.message ?? ""} />
    </Wrapper>
  );
};

export default Select;
