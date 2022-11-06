import { SwitchProps } from "antd/lib/switch";
import React from "react";
import Box from "../Box";
import { Label, Wrapper } from "../Select/styles";
import Text from "../Typography";
import { StyledSwitch } from "./styles";

export interface CustomSwitchProps extends SwitchProps {
  label?: string;
  handleChange?: (value: any) => void;
  disabled?: boolean;
  value?: boolean;
}

const Switch = ({
  label,
  handleChange,
  disabled = false,
  value = false,
  ...restProps
}: CustomSwitchProps) => {
  const onChange = (checked: boolean) => {
    handleChange && handleChange(checked);
  };

  return (
    <Box className="flex items-center">
      <Box
        as={Text}
        padding="0 7px 0 0"
        fontSize="sm"
        fontWeight="medium"
        lineHeight="normal"
      >
        {label}:
      </Box>
      <StyledSwitch checked={value} onChange={onChange} {...restProps} />
    </Box>
  );
};

export default Switch;
